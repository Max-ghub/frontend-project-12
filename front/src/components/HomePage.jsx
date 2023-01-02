import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';

const HomePage = () => {
  const { loggedIn } = useContext(AuthContext);
  if (!loggedIn()) return <Navigate to="/login" />;
  return (
    <h1>Home</h1>
  );
};

export { HomePage };
