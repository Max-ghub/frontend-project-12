import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
// Components
import { Layout } from './components/Layout';
import { ChatPage } from './components/ChatPage/ChatPage';
import { AuthPage } from './components/AuthPage/AuthPage';
import { SignupPage } from './components/SignupPage';
import { NotFoundPage } from './components/NotFoundPage';
// Hoc
import { RequireAuth } from './hoc/RequireAuth';
// Slices
import { actions as channelActions } from './slices/channelsSlice';
import { actions as messageActions } from './slices/messagesSlice';
// Socket
import { socket } from './socket';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      console.log(payload);
      dispatch(messageActions.addMessage(payload));
    });
    socket.on('newChannel', (payload) => {
      dispatch(channelActions.addChannel(payload));
      dispatch(channelActions.setCurrentChannel(payload.id));
    });
  }, [dispatch]);

  return (
    <div className="d-flex flex-column h-100">
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
};

export default App;
