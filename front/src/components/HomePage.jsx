import { Navigate } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <h1>Home</h1>
      <Navigate to="/login" />
    </>
  );
};

export { HomePage };
