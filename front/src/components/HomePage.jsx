import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { AuthContext } from '../contexts/AuthContext';
import { addChannels } from '../slices/channelsSlice';
import { addMessages } from '../slices/messagesSlice';
import routes from '../routes';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedIn, getAuthToken } = useContext(AuthContext);

  useEffect(() => {
    if (!loggedIn()) navigate('/login');
    const fetchData = async () => {
      const response = await axios.get(routes.dataPath(), { headers: { Authorization: `Bearer ${getAuthToken()}` } });
      const { channels, messages } = response.data;
      dispatch(addChannels(channels));
      dispatch(addMessages(messages));
    };
    fetchData();
  });

  return (
    <h1>Home</h1>
  );
};

export { HomePage };
