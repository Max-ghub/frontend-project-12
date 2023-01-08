import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// Slices
import { actions as channelActions } from './slices/channelsSlice';
import { actions as messageActions } from './slices/messagesSlice';
// Socket
import { socket } from './socket';
// Providers
import { AuthProvider } from './providers/AuthProvider';
// Components
import { MainPage } from './MainPage';

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
    <AuthProvider>
      <MainPage />
    </AuthProvider>
  );
};

export default App;
