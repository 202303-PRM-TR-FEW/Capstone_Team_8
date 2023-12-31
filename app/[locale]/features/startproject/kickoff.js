import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
};

const projectSlice = createSlice({
  name: "isStartProjectOpen",
  initialState, // Corrected this line
  reducers: {
    // Action for opening the project modal
    openAddProject: (state, action) => {
      state.modalOpen = true;
    },
    // Action for closing the project modal
    closeAddProject: (state, action) => {
      state.modalOpen = false;
    },
  },
});

export const { openAddProject, closeAddProject } = projectSlice.actions;

export default projectSlice.reducer;
