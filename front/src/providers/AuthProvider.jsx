/* eslint-disable react/jsx-no-constructed-context-values */
import { useState } from 'react';

import { AuthContext } from '../contexts/AuthContext';

export const AuthProvider = ({ children }) => {
  const userLocalData = localStorage.getItem('userData');
  const [userData, setUserData] = useState(userLocalData || null);

  const loggedIn = () => !!userData;

  const login = (data) => {
    const jsonData = JSON.stringify(data);
    localStorage.setItem('userData', jsonData);
    setUserData(jsonData);
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
