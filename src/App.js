import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import PrivateRoute from './routes/privateRoute';

const App = () => {

  return (
      <Router>
        <ToastContainer 
          theme='light'
          position='bottom-right'
          autoClose={2000}
        />
        <Routes>
        <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} /> 
          {/* Redirect base URL to /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
  );
};

export default App;
