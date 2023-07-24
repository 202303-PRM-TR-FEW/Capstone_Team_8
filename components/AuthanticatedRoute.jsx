import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const withAuth = (WrappedComponent) => {
	const WithAuthComponent = (props) => {
		const [loading, setLoading] = useState(true);
		const Router = useRouter();
		const auth = getAuth();

		useEffect(() => {
			const unsubscribe = onAuthStateChanged(auth, (user) => {
				if (!user) {
					Router.replace('/');
				}
				setLoading(false);
			});

			return () => unsubscribe();
		}, [auth?.currentUser, Router]);
		props.loading = loading;
		props.user = auth?.currentUser;
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
