'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PageLayout from '@/components/PageLayout';
import WithAuth from '@/components/AuthanticatedRoute';
import Loading from '@/app/loading';
import { useParams } from 'next/navigation';

function Thankyou(props) {
	const { id } = useParams();

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
							<Link
								className='bg-red-900 text-white border-2 border-solid'
								href={`/project/${id}`}
							>
								Make another donation.
							</Link>
						</div>
						<div>
							<Link
								className='bg-red-900 text-white border-2 border-solid'
								href='/projects'
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
