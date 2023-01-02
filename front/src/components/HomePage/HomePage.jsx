import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
// Slices
import { addChannels } from '../../slices/channelsSlice';
import { addMessages } from '../../slices/messagesSlice';
// Contexts
import { AuthContext } from '../../contexts/AuthContext';
// Routes
import routes from '../../routes';
// Components
import { HomeChannels } from './HomeChannels';
import { HomeMessages } from './HomeMessages/HomeMessages';

const HomePage = () => {
  const dispatch = useDispatch();
  const { getAuthToken } = useContext(AuthContext);

  useEffect(() => {
    // Getting a data from server with channels and messages of a user
    const fetchData = async () => {
      const response = await axios.get(routes.dataPath(), { headers: { Authorization: `Bearer ${getAuthToken()}` } });
      const { channels, messages } = response.data;
      dispatch(addChannels(channels));
      dispatch(addMessages(messages));
      console.log(channels, messages);
    };
    fetchData();
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <HomeChannels />
        <HomeMessages />
      </div>
    </div>
  );
};

export { HomePage };
