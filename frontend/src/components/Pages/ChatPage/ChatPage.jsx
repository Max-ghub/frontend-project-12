import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
// Slices
import { actions as channelsActions } from '../../../slices/channelsSlice';
import { actions as messagesActions } from '../../../slices/messagesSlice';
// Contexts
import { AuthContext } from '../../../contexts/AuthContext';
// Routes
import routes from '../../../routes';
// Components
import { ChannelsPanel } from './ChatPageElements/ChannelsPanel/ChannelsPanel';
import { ChatBody } from './ChatPageElements/ChatBody/ChatBody';
import { ChatModal } from './ChatPageElements/ChatModal';

const ChatPage = () => {
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);

  useEffect(() => {
    // Getting channels and messages from server
    const fetchData = async () => {
      const response = await axios.get(routes.dataPath(), { headers: { Authorization: `Bearer ${auth.getAuthToken()}` } });
      const { channels, messages } = response.data;
      dispatch(channelsActions.addChannels(channels));
      dispatch(messagesActions.addMessages(messages));
    };
    fetchData();
  }, [auth, dispatch]);

  return (
    <>
      <ChatModal />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <ChannelsPanel />
          <ChatBody />
        </div>
      </div>
    </>
  );
};

export { ChatPage };
