/* eslint-disable import/prefer-default-export */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// Hoc
import { RequireAuth } from './hoc/RequireAuth';
// Components
import { Layout } from './components/Layout';
import { ChatPage } from './components/Pages/ChatPage/ChatPage';
import { AuthPage } from './components/Pages/AuthPage/AuthPage';
import { SignupPage } from './components/Pages/SignUpPage/SignUpPage';
import { NotFoundPage } from './components/Pages/NotFoundPage/NotFoundPage';

const MainPage = () => (
  <div className="d-flex flex-column h-100">
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RequireAuth><ChatPage /></RequireAuth>} />
        <Route path="login" element={<AuthPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </div>
);

export { MainPage };
