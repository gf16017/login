// api.js
const API_BASE_URL = 'http://localhost:8080/api';

// Función para llamadas públicas
export const callPublicApi = async () => {
    try {
        console.log('Calling public endpoint:', `${API_BASE_URL}/public/hello`);

        const response = await fetch(`${API_BASE_URL}/public/hello`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Public API response:', data);
        return data;
    } catch (error) {
        console.error('Error calling public API:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        throw error;
    }
};

// Función para llamadas protegidas con JWT (Auth0)
export const callProtectedApi = async (endpoint, token) => {
    try {
        console.log('Using access token, length:', token.length);
        console.log('Calling protected endpoint:', `${API_BASE_URL}${endpoint}`);

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response body:', errorText);
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }

        const data = await response.json();
        console.log('Protected API response:', data);
        return data;
    } catch (error) {
        console.error('Error calling protected API:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        throw error;
    }
};

// Funciones específicas para cada endpoint
export const getProfile = (token) =>
    callProtectedApi('/protected/profile', token);

export const getUserInfo = (token) =>
    callProtectedApi('/protected/user-info', token);

export const testProtectedPost = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/protected/test`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in POST request:', error);
        throw error;
    }
};