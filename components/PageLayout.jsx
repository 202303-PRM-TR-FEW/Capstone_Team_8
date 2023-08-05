'use client';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { auth } from '@/firebase/firebase';
import Foooter from '@/components/Footer';
import ScrollToTop from './ScrollToTop';
const PageLayout = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
	}, [user]);

	return (
		<div className='flex flex-col h-screen justify-between'>
			<Navbar />
			<ScrollToTop />
			<div className='flex-grow'>{children}</div>
			<Foooter />
		</div>
	);
};

export default PageLayout;
