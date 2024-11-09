import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from "@react-oauth/google"
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <React.StrictMode>
      <Router>
        <AuthProvider>
          <ToastContainer theme="light" position="bottom-right" autoClose={2000} />
          <App />
        </AuthProvider>
      </Router>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

