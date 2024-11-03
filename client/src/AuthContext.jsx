import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('loggedInUser');
    if (token) {
      setUser({ token, name });
    }
  }, []);

  const login = ({ token, name }) => {
    setUser({ token, name });
    // localStorage.setItem('token', token);
    // localStorage.setItem('loggedInUser', name);
  };

  const logout = () => {
    setUser(null);
    // localStorage.removeItem('token');
    // localStorage.removeItem('loggedInUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};