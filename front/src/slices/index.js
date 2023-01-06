import { configureStore } from '@reduxjs/toolkit';
// Slices
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import modalReducer from './modalSlice';

const chatStore = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalReducer,
  },
});

export default chatStore;
