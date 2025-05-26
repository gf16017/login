import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { callPublicApi, callProtectedApi } from '../services/api';

const ApiTester = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [responses, setResponses] = useState({});
    const [loading, setLoading] = useState({});

    const callApi = async (endpoint, isProtected = false) => {
        const key = endpoint;
        setLoading(prev => ({ ...prev, [key]: true }));

        try {
            let data;
            if (isProtected) {
                const token = await getAccessTokenSilently();
                data = await callProtectedApi(endpoint, token);

            } else {
                data = await callPublicApi(endpoint);
            }

            setResponses(prev => ({
                ...prev,
                [key]: { success: true, data, timestamp: new Date().toLocaleTimeString() }
            }));
        } catch (error) {
            setResponses(prev => ({
                ...prev,
                [key]: { success: false, error: error.message, timestamp: new Date().toLocaleTimeString() }
            }));
        } finally {
            setLoading(prev => ({ ...prev, [key]: false }));
        }
    };

    const testEndpoints = [
        { name: 'Endpoint Público', endpoint: '/public/hello', protected: false },
        { name: 'Perfil Protegido', endpoint: '/protected/profile', protected: true },
        { name: 'Info Usuario', endpoint: '/protected/user-info', protected: true },
    ];

    return (
        <div className="api-tester">
            <h2>Pruebas de API</h2>

            <div className="endpoints-grid">
                {testEndpoints.map(({ name, endpoint, protected: isProtected }) => (
                    <div key={endpoint} className="endpoint-card">
                        <h3>{name}</h3>
                        <p className="endpoint-url">
                            <code>{endpoint}</code>
                            {isProtected && <span className="protected-badge">🔒 Protegido</span>}
                        </p>

                        <button
                            className="btn btn-primary"
                            onClick={() => callApi(endpoint, isProtected)}
                            disabled={loading[endpoint]}
                        >
                            {loading[endpoint] ? 'Cargando...' : 'Probar'}
                        </button>

                        {responses[endpoint] && (
                            <div className={`response ${responses[endpoint].success ? 'success' : 'error'}`}>
                                <small>Última respuesta: {responses[endpoint].timestamp}</small>
                                <pre>
                                    {responses[endpoint].success
                                        ? JSON.stringify(responses[endpoint].data, null, 2)
                                        : `Error: ${responses[endpoint].error}`
                                    }
                                </pre>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApiTester;