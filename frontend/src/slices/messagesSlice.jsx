import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelActions.removeChannel, (state, action) => {
        const channelId = action.payload;
        const messageEntities = Object.values(state.entities);

        const newMessageEntities = messageEntities
          .filter((item) => item.channelId !== channelId);

        messagesAdapter.setAll(state, newMessageEntities);
      });
  },
});

export const { actions } = messagesSlice;
export const messageSelectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
