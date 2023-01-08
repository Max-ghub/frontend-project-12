import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index';
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
  const defaultLng = 'ru';
  i18next.use(initReactI18next).init({
    lng: defaultLng,
    debug: false,
    resources,
  });

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
