'use client';
import React from 'react';
import Loading from '@/app/[locale]/loading';
import withAuth from '@/components/AuthanticatedRoute';
import PageLayout from '@/components/PageLayout';
import ProfilePageTab from '@/components/ProfilePageTab';
const Profile = (props) => {
	if (props.loading || !props.user)
		return (
			<div>
				<Loading></Loading>
			</div>
		);
	return (
		<PageLayout>
			<main className='flex  flex-col   justify-center   overflow-auto h-full   sm:px-4 px-2 py-24   w-full '>
				<ProfilePageTab />
			</main>
		</PageLayout>
	);
};

export default withAuth(Profile);
