import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
