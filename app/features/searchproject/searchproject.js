import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	searchResult: [],
};

const projectSearchSlice = createSlice({
	name: 'searchProject',
	initialState, // Corrected this line
	reducers: {
		// Action for opening the project modal
		setSearchResults: (state, action) => {
			state.searchResult = action.payload;
		},
		// Action for closing the project modal
		removeSearchResults: (state, action) => {
			state.searchResult = [];
		},
	},
});

export const { setSearchResults, removeSearchResults } =
	projectSearchSlice.actions;

export default projectSearchSlice.reducer;
