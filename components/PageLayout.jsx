'use client';
import Navbar from './Navbar';
import { auth } from '@/firebase/firebase';
const PageLayout = ({ children }) => {
	return (
		<>
			{auth?.currentUser && <Navbar />}
			{children}
		</>
	);
};

export default PageLayout;
