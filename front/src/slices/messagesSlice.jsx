import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
    removeMessage: messagesAdapter.removeOne,
  },
});

export const { actions } = messagesSlice;
export const messageSelectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
