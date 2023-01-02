import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const RequireAuth = ({ children }) => {
  const { loggedIn } = useContext(AuthContext);

  if (!loggedIn()) return <Navigate to="login" />;

  return children;
};

export { RequireAuth };
