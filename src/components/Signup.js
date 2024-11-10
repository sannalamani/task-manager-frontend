import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Input from './inputs/input'; 
import { toast } from 'react-toastify';

 function Signup() {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleSignup = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: data.username, email: data.email, password: data.password }),
      });
      const responseData = await response.json();
      if (response.ok) {
        toast.success("Signup successful. Please login.");
        navigate('/login');
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit(handleSignup)}>
          <Input
            label="Username"
            type="text"
            name="username"
            register={register}
            control={control}
            validation={{ required: "Username is required" }}
            error={errors.userName}
          />
        <Input
          label="Email"
          type="text"
          name="email"
          register={register}
          control={control}
          validation={{ required: "Email is required" }}
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          register={register}
          control={control}
          validation={{ required: "Password is required" }}
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
        <Link to="/login" className="text-md hover:underline">
          I have an account
        </Link>
      </div>
    </div>
  );
}

export default Signup;