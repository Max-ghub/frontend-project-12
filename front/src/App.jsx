/* eslint-disable react/no-unstable-nested-components */
import { Routes, Route } from 'react-router-dom';
// Pages
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage/HomePage';
import { AuthPage } from './components/AuthPage/AuthPage';
import { SignupPage } from './components/SignupPage';
import { NotFoundPage } from './components/NotFoundPage';
import { RequireAuth } from './hoc/RequireAuth';

const App = () => {
  return (
    <div className="d-flex flex-column h-100">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RequireAuth><HomePage /></RequireAuth>} />
          <Route path="login" element={<AuthPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
