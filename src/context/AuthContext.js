import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Create the Auth context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token); 
        setUser(decodedUser.userDetails);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid token", error);
        logout(); 
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token); 
    const decodedUser = jwtDecode(token); 
    setUser(decodedUser.userDetails);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token"); 
    setUser(null);
    setIsAuthenticated(false);
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
