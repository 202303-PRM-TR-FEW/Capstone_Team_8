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
		<div className='flex flex-col w-full h-full min-h-screen relative'>
			<ScrollToTop />
			<Navbar />
			{children}
			<Foooter className='absolute bottom-0 left-0 w-full' />
		</div>
	);
};

export default PageLayout;
