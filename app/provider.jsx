'use client';
import { store } from './store';
import { Provider } from 'react-redux';
import React, { useState, useEffect } from 'react';

export function ReduxProvider({ children }) {
	return <Provider store={store}>{children}</Provider>;
}
