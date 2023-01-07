import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from 'react-bootstrap';
// Contexts
import { AuthContext } from '../contexts/AuthContext';

const Layout = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      <nav className="shadow navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container">
          <Link className="navbar-brand text-light" to="/">Hexlet Chat</Link>
          {auth.loggedIn() && <Button onClick={auth.logout}>Выйти</Button>}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export { Layout };
