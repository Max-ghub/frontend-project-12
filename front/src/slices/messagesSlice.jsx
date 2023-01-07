import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
    removeMessagesByChannelId: (state, actions) => {
      const channelId = actions.payload;
      const messageEntities = Object.values(state.entities);

      const newMessageEntities = messageEntities
        .filter((item) => item.channelId !== channelId);

      messagesAdapter.setAll(state, newMessageEntities);
    },
  },
});

export const { actions } = messagesSlice;
export const messageSelectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
