import { configureStore } from '@reduxjs/toolkit';
import projectSlice from './features/startproject/kickoff';
import fundSlice from './features/fundproject/fundproject';
import projectSearchSlice from './features/searchproject/searchproject';
import langSlice from './features/lang/langSlice';

export const store = configureStore({
	reducer: {
		isStartProjectOpen: projectSlice,
		isFundOpen: fundSlice,
		searchProject: projectSearchSlice,
		lang: langSlice,
	},
});
