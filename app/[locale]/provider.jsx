'use client';
import React, { useState, useEffect } from 'react';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { store } from './store';

export function ReduxProvider({ children }) {
	const [anchorOrigin, setAnchorOrigin] = useState({
		vertical: 'top',
		horizontal: 'left',
	});

	useEffect(() => {
		function handleResize() {
			// Update anchorOrigin based on window width
			if (window.innerWidth <= 768) {
				setAnchorOrigin({
					vertical: 'bottom',
					horizontal: 'left',
				});
			} else {
				setAnchorOrigin({
					vertical: 'top',
					horizontal: 'left',
				});
			}
		}

		// Add window resize listener
		window.addEventListener('resize', handleResize);

		// Initial handling of resize to set the correct value on component mount
		handleResize();

		// Clean up the listener on unmount
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<SnackbarProvider autoHideDuration={3000} anchorOrigin={anchorOrigin}>
			<Provider store={store}>{children}</Provider>
		</SnackbarProvider>
	);
}
