'use client';
import { store } from './store';
import { Provider } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

export function ReduxProvider({ children }) {
	return (
		<SnackbarProvider
			autoHideDuration={3000}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		>
			<Provider store={store}>{children}</Provider>
		</SnackbarProvider>
	);
}
