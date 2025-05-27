import React from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import LoginButton from './components/LoginButton';
import Loading from './components/Loading';
import Dashboard from './components/Dashboard';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

const ProtectedDashboard = withAuthenticationRequired(Dashboard, {
    onRedirecting: () => <Loading />,
});

function App() {
  const { isLoading, error, isAuthenticated } = useAuth0();

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              !isAuthenticated ? (
                <div className="login-section">
                  <h1>Mi App con Auth0</h1>
                  <p>Por favor, inicia sesión para continuar</p>
                  <LoginButton />
                </div>
              ) : (
                <Navigate to="/dashboard" replace={true} />
              )
            }
          />
          <Route path="/dashboard" element={<ProtectedDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;