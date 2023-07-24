import { createSlice } from '@reduxjs/toolkit';
const initialState = localStorage.getItem('i18nextLng') || 'en';

const langSlice = createSlice({
	name: 'lang',
	initialState,
	reducers: {
		setLang: (state, action) => {
			localStorage.setItem('i18nextLng', action.payload);
			return action.payload;
		},
	},
});

export const { setLang } = langSlice.actions;

export default langSlice.reducer;
