import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const withAuth = (WrappedComponent) => {
	const WithAuthComponent = (props) => {
		const Router = useRouter();
		const auth = getAuth();

		useEffect(() => {
			const unsubscribe = onAuthStateChanged(auth, (user) => {
				if (!user) {
					Router.replace('/');
				}
			});

			return () => unsubscribe();
		}, [auth?.currentUser, Router]);

		return <WrappedComponent {...props} />;
	};

	WithAuthComponent.displayName = `WithAuth(${getDisplayName(
		WrappedComponent
	)})`;

	return WithAuthComponent;
};

function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuth;
