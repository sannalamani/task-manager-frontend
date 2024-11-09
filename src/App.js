import './App.css';

import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './pages/Home';
import CreateProjectForm from './components/forms/CreateProjectForm';
import 'react-toastify/dist/ReactToastify.css';
import  Project from './pages/Project';
import Header from './components/layout/Layout';
// import PrivateRoute from './routes/privateRoute';


const App = () => {

  return (
    <Routes>
      <Route element={<Header />}>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/create-project" element={<CreateProjectForm />} />
      <Route path="/project/:projectId" element={<Project />} />
      {/* Redirect base URL to /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
