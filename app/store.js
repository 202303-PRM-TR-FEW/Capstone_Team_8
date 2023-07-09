import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./features/startproject/kickoff";
import fundSlice from "./features/fundproject/fundproject";

export const store = configureStore({
  reducer: {
    isStartProjectOpen: projectSlice,
    isFundOpen: fundSlice,
  },
});
