import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ currentChannelId: 1 });
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    updateChannel: channelsAdapter.updateOne,
    setCurrentChannel: (state, action) => {
      const newCurrentChannelId = action.payload;
      state.currentChannelId = newCurrentChannelId;
    },
  },
});

export const { actions } = channelsSlice;
export const channelSelectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
