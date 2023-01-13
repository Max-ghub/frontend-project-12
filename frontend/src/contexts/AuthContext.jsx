/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/prefer-default-export */
import { useState, createContext } from 'react';

export const AuthProvider = ({ children }) => {
  const userLocalData = localStorage.getItem('userData');
  const [userData, setUserData] = useState(userLocalData || null);

  const loggedIn = () => !!userData;

  const login = (data) => {
    const jsonUserData = JSON.stringify(data);
    localStorage.setItem('userData', jsonUserData);
    setUserData(jsonUserData);
  };

  const logout = () => {
    localStorage.removeItem('userData');
    setUserData(null);
  };

  const getUsername = () => (userData ? JSON.parse(userData).username : null);

  const getAuthToken = () => (userData ? JSON.parse(userData).token : null);

  return (
    <AuthContext.Provider value={{
      userData, loggedIn, login, logout, getUsername, getAuthToken,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext({});
