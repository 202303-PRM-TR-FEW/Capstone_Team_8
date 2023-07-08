import { configureStore } from '@reduxjs/toolkit';
import projectSlice from './features/startproject/kickoff';

export const store = configureStore({
	reducer: {
		isStartProjectOpen: projectSlice,
	},
});
