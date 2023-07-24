import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
};

const fundSlice = createSlice({
  name: "isFundOpen",
  initialState, // Corrected this line
  reducers: {
    // Action for opening the project modal
    openFund: (state, action) => {
      state.modalOpen = true;
    },
    // Action for closing the project modal
    closeFund: (state, action) => {
      state.modalOpen = false;
    },
  },
});

export const { openFund, closeFund } = fundSlice.actions;

export default fundSlice.reducer;
