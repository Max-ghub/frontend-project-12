import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { Provider, ErrorBoundary } from '@rollbar/react';
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

  const rollbarConfig = {
    accessToken: 'e6607fcc9c3d4412b1f7889e6be37196',
    environment: 'testenv',
  };

  const ruDict = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDict);

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
    <Provider config={rollbarConfig}>
      <AuthProvider>
        <ErrorBoundary>
          <MainPage />
        </ErrorBoundary>
      </AuthProvider>
    </Provider>
  );
};

export default App;
