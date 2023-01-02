import { Routes, Route } from 'react-router-dom';

import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { AuthPage } from './components/AuthPage/AuthPage';
import { SignupPage } from './components/SignupPage';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => (
  <div className="d-flex flex-column h-100">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </div>
);

export default App;
