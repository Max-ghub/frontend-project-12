import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
// Slices
import { actions as channelActions } from './slices/channelsSlice';
import { actions as messageActions } from './slices/messagesSlice';
// Socket
import { socket } from './socket';
// Hoc
import { RequireAuth } from './hoc/RequireAuth';
// Components
import { Modal } from './components/Modal';
import { Layout } from './components/Layout';
import { ChatPage } from './components/ChatPage';
import { AuthPage } from './components/AuthPage';
import { SignupPage } from './components/SignupPage';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(messageActions.addMessage(payload));
    });
    socket.on('newChannel', (payload) => {
      dispatch(channelActions.addChannel(payload));
      dispatch(channelActions.setCurrentChannel(payload.id));
    });
    socket.on('removeChannel', ({ id }) => {
      dispatch(channelActions.removeChannel(id));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(channelActions.updateChannel({ id: payload.id, changes: payload }));
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
      <Modal />
    </div>
  );
};

export default App;
