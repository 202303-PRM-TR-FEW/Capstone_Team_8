'use client';
import React from 'react';
import Loading from '@/app/[locale]/loading';
import withAuth from '@/components/AuthanticatedRoute';
import ProfilePageTab from '@/components/ProfilePageTab';
const Profile = (props) => {
	const [loading, setLoading] = React.useState(false);
	if (props.loading || !props.user)
		return (
			<div>
				<Loading></Loading>
			</div>
		);
	return (
		<main className='flex flex-col justify-start sm:px-4 px-2 py-24 w-full'>
			{loading && <Loading />}
			<ProfilePageTab setLoading={setLoading} />
		</main>
	);
};

export default withAuth(Profile);
