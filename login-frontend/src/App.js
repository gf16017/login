import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import ApiTester from './components/ApiTester';
import Loading from './components/Loading';
import './App.css';

function App() {
  const { isLoading, error, isAuthenticated, user } = useAuth0();

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mi App con Auth0</h1>
        
        {!isAuthenticated ? (
          <div className="login-section">
            <p>Por favor, inicia sesión para continuar</p>
            <LoginButton />
          </div>
        ) : (
          <div className="authenticated-section">
            <div className="user-info">
              <img src={user.picture} alt={user.name} className="user-avatar" />
              <span>Bienvenido, {user.name}!</span>
              <LogoutButton />
            </div>
            
            <div className="content">
              <Profile />
              <ApiTester />
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;