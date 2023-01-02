import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// const channels

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
  },
});

export const { addChannels, addChannel, removeChannel } = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
