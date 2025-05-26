import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { callProtectedApi } from '../services/api';

const Profile = () => {
    const { user, getAccessTokenSilently } = useAuth0();
    const [serverProfile, setServerProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchServerProfile = React.useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const token = await getAccessTokenSilently();
            const data = await callProtectedApi('/protected/profile', token);
            setServerProfile(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [getAccessTokenSilently]);

    useEffect(() => {
        fetchServerProfile();
    }, [fetchServerProfile]);

    return (
        <div className="profile-section">
            <h2>Perfil de Usuario</h2>

            <div className="profile-grid">
                <div className="client-profile">
                    <h3>Información del Cliente (Auth0)</h3>
                    <div className="profile-card">
                        <img src={user.picture} alt={user.name} />
                        <p><strong>Nombre:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Email verificado:</strong> {user.email_verified ? 'Sí' : 'No'}</p>
                        <p><strong>ID:</strong> {user.sub}</p>
                    </div>
                </div>

                <div className="server-profile">
                    <h3>Información del Servidor</h3>
                    {loading && <p>Cargando perfil del servidor...</p>}
                    {error && <p className="error">Error: {error}</p>}
                    {serverProfile && (
                        <div className="profile-card">
                            <p><strong>Subject:</strong> {serverProfile.sub}</p>
                            <p><strong>Email:</strong> {serverProfile.email}</p>
                            <p><strong>Nombre:</strong> {serverProfile.name}</p>
                            <p><strong>Issuer:</strong> {serverProfile.iss}</p>
                            <p><strong>Audience:</strong> {serverProfile.aud}</p>
                        </div>
                    )}
                    <button
                        className="btn btn-outline"
                        onClick={fetchServerProfile}
                        disabled={loading}
                    >
                        Actualizar desde Servidor
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;