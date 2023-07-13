'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PageLayout from '@/components/PageLayout';
import WithAuth from '@/components/AuthanticatedRoute';
import Loading from '@/app/loading';

function Thankyou(props) {
	const router = useRouter;

	if (props.loading || !props.user)
		return (
			<div>
				<Loading></Loading>
			</div>
		);

	return (
		<PageLayout>
			<div className='h-[100vh] w-full p-24'>
				<div className='thankyou flex flex-col justify-end items-center   w-full'>
					<div className='flex flex-col'>
						<h1>Thank you</h1>
						<h3>for supporting us!</h3>
					</div>
					<div className='flex flex-col lg:flex-row'>
						<div>
							<button
								className='bg-red-900 text-white border-2 border-solid'
								onClick={() => {
									router.back();
								}}
							>
								Make another donation.
							</button>
						</div>
						<div>
							<Link
								className='bg-red-900 text-white border-2 border-solid'
								href='/'
							>
								Go to the Home Page
							</Link>
						</div>
					</div>
				</div>
			</div>
		</PageLayout>
	);
}

export default WithAuth(Thankyou);
