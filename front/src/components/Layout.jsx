import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <nav className="shadow navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container">
          <Link className="navbar-brand text-light" to="/">Hexlet Chat</Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export { Layout };
