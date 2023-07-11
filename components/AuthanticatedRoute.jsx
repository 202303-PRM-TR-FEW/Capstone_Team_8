'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const withAuth = (WrappedComponent) => {
	return (props) => {
		const Router = useRouter();
		const auth = getAuth();

		useEffect(() => {
			const unsubscribe = onAuthStateChanged(auth, (user) => {
				if (!user) {
					Router.replace('/');
				}
			});

			return () => unsubscribe();
		}, []);

		return <WrappedComponent {...props} />;
	};
};

export default withAuth;
