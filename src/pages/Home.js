import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { logout, isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  console.log(user);

  return (
    <div>
      <div className=" bg-slate-900 h-12 flex">
        <div className="w-full flex flex-row justify-end items-center gap-8 mr-8">
          <h1 className="text-white text-xl font-bold"> {user?.name}</h1>
          <button
            className="text-white  bg-red-700 rounded-2xl px-3 my-auto"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
