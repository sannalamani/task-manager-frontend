import './App.css';

import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './pages/Home';
import CreateProjectForm from './components/forms/CreateProjectForm';
import CreateTaskForm from './components/forms/CreateTaskForm';
import  Project from './pages/Project';
import ProjectWrapper from './utils/project/ProjectWrapper';
import EditTaskWrapper from './utils/task/EditTaskWrapper';
import Header from './components/layout/Layout';
import Collaborators from './utils/project/Collaborators';
// import PrivateRoute from './routes/privateRoute';


const App = () => {


  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-project" element={<CreateProjectForm />} />
        <Route path="/project/:projectId" element={<ProjectWrapper />}>
          <Route path="/project/:projectId" element={<Project />} />
          <Route path="/project/:projectId/collaborators" element={<Collaborators />} />
          <Route path="/project/:projectId/create-task" element={<CreateTaskForm />}/>
          <Route path="/project/:projectId/edit-task/:taskId" element={<EditTaskWrapper />}/>
        </Route>
        {/* Redirect base URL to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
