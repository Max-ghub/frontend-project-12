import { useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
// import { io } from 'socket.io-client';
// Slices
import { addChannels } from '../../slices/channelsSlice';
import { addMessages } from '../../slices/messagesSlice';
// Contexts
import { AuthContext } from '../../contexts/AuthContext';
// Routes
import routes from '../../routes';
// Components
import { ChatChannels } from './ChatElements/ChatChannels';
import { ChatMessages } from './ChatElements/ChatMessages/ChatMessages';

const ChatPage = () => {
  // const socket = io();
  const dispatch = useDispatch();
  const { getAuthToken } = useContext(AuthContext);
  const [selectedChannel, setSelectedChannel] = useState(1);

  useEffect(() => {
    // Getting a data from server with channels and messages of a user
    const fetchData = async () => {
      const response = await axios.get(routes.dataPath(), { headers: { Authorization: `Bearer ${getAuthToken()}` } });
      const { channels, messages } = response.data;
      dispatch(addChannels(channels));
      dispatch(addMessages(messages));
      // socket.emit('newMessage', { body: 'message text', channelId: 1, username: 'admin' });
      console.log(channels, messages);
    };
    fetchData();
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChatChannels channelId={selectedChannel} setChannelId={setSelectedChannel} />
        <ChatMessages channelId={selectedChannel} />
      </div>
    </div>
  );
};

export { ChatPage };
