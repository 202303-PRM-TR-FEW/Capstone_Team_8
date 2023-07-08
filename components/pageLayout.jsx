'use client';
import Navbar from './navbar';

const PageLayout = ({ children }) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
};

export default PageLayout;
