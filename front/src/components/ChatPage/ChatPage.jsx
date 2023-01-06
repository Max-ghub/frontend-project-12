import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
// Slices
import { actions as channelsActions } from '../../slices/channelsSlice';
import { actions as messagesActions } from '../../slices/messagesSlice';
// Contexts
import { AuthContext } from '../../contexts/AuthContext';
// Routes
import routes from '../../routes';
// Components
import { ChatChannels } from './ChatElements/ChatChannels/ChatChannels';
import { ChatMessages } from './ChatElements/ChatMessages/ChatMessages';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { getAuthToken } = useContext(AuthContext);

  useEffect(() => {
    // Getting a data from server with channels and messages of a user
    const fetchData = async () => {
      const response = await axios.get(routes.dataPath(), { headers: { Authorization: `Bearer ${getAuthToken()}` } });
      const { channels, messages } = response.data;
      dispatch(channelsActions.addChannels(channels));
      dispatch(messagesActions.addMessages(messages));
      console.log(channels, messages);
    };
    fetchData();
  }, [dispatch, getAuthToken]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChatChannels />
        <ChatMessages />
      </div>
    </div>
  );
};

export { ChatPage };
