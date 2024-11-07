

import React, { useContext, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Input from './inputs/input'; 
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';


function Login() {

  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  
  const handleLogin = async (data) => {
    const { email, password } = data;
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const credentials = await response.json();
      
      if (response.ok && credentials.token) {
        login(credentials.token);
        navigate('/home');
        toast.success("login successful.");
      } else {
        toast.error(credentials.error);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

   const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      
      const response = await axios.post('http://localhost:5000/google-login', {
        token: credential,
      });
       
      const { token } = response.data;
      if (token) {
        login(token);
        navigate('/home'); 
        toast.success("login successful.");
      } else {
        toast.error("Google login failed.");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("An error occurred with Google login.");
    }
  };

  const handleGoogleLoginFailure = () => {
    toast.error("Google login was unsuccessful. Please try again.");
  };


  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit(handleLogin)}>
        <Input
          label="Email"
          type="text"
          name="email"
          register={register}
          control={control}
          validation={{ required: 'email is required' , pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'invalid email address'}}}
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          register={register}
          control={control}
          validation={{ required: 'Password is required' }}
          error={errors.password}
        />
        <button
          type="submit"
          className="bg-slate-900 text-white py-2 px-4 rounded mt-4 w-full"
        >
          Submit
        </button>
      </form>

      <div className="text-center mt-4">
        <Link to="/signup" className="text-md hover:underline">
          I don't have an account
        </Link>
      </div>

      <div className="mt-4 w-full">
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
        />
      </div>
    </div>
  );
}

export default Login;

