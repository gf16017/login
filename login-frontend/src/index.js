import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      scope: "openid profile email"
    }}
  >
    <App />
  </Auth0Provider>
);

// Log environment variables to verify they are set correctly
console.log('Auth0 Domain:', process.env.REACT_APP_AUTH0_DOMAIN);
console.log('Auth0 Client ID:', process.env.REACT_APP_AUTH0_CLIENT_ID);
console.log('Auth0 Audience:', process.env.REACT_APP_AUTH0_AUDIENCE);

//             throw new Error(`HTTP error! status: ${response.status}`);
<Auth0Provider
  domain={process.env.REACT_APP_AUTH0_DOMAIN}
  clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
  authorizationParams={{
    redirect_uri: window.location.origin,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  }}
>
  <App />
</Auth0Provider>

