import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    type: null,
    item: null,
  },
  reducers: {
    openModal: (state, actions) => {
      const modalSettings = actions.payload;

      state.type = modalSettings.type;
      state.item = modalSettings.item;
    },
    closeModal: (state) => {
      state.type = null;
      state.item = null;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
