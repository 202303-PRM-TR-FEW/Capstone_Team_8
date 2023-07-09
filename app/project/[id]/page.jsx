'use client';
import React, { useState, useEffect } from 'react';
import { fetchDocById } from '../../../firebase/firebase';
import PageLayout from '@/components/pageLayout';
import Link from 'next/link';
import FundProject from '@/components/FundProject';
import moment from 'moment';
export default async function ProjectDetail({ params }) {
	const [isOpen, setIsOpen] = useState(false);
	if (!params || !params.id) {
		return <div>Error: Missing user ID</div>;
	}
	const projectDetail = await fetchDocById(params.id);

	const totalAmount = projectDetail.donations.reduce((total, donation) => {
		return total + parseFloat(donation.donation);
	}, 0);

	const progress = (totalAmount / projectDetail.goal) * 100;

	console.log(progress);
	const endTime = moment.unix(projectDetail.endTime.seconds);

	const now = moment();

	const dayLeft = endTime.diff(now, 'days');

	const handleClick = () => {
		setIsOpen(true);
	};

	return (
		<PageLayout>
			{isOpen && (
				<FundProject
					setIsOpen={setIsOpen}
					projectDetail={params}
					projectId={params?.id}
				/>
			)}
			<section className='flex  flex-col   justify-center   h-full    md:px-12 px-6 py-24  w-full '>
				<div className='grid grid-cols-12 gap-8  justify-center items-center w-full '>
					<div className=' relative  lg:h-[70vh] w-full h-full  lg:col-span-4 flex col-span-12 '>
						<img src={projectDetail?.img} alt='projectImage' />
					</div>

					<div className='flex flex-col  content-around lg:col-span-8 col-span-12 gap-2 sm:gap-4 md:gap-10'>
						<div className='p-2  lg:p-6  flex flex-col gap-4 lg:gap-8'>
							<h1>{projectDetail.title}</h1>
							<p>{projectDetail.desc} </p>
						</div>
						<div className='grid grid-cols-12   '>
							<div className='w-full col-span-12 p-2  lg:p-6  sm:col-span-6 border-solid sm:border-t-2 border-b-2 border-black'>
								<h2 className='font-bold'>About Section</h2>
								<p className='break-words'>{projectDetail.about}</p>
							</div>
							{/* <div className='border-solid border-l-4 border-black'></div> */}

							<div className='border-solid sm:border-l-2 border-y-2 p-2  lg:p-6  border-black col-span-12 sm:col-span-6 order-first sm:order-2'>
								<div className=' w-full flex flex-col gap-2 text-sm     '>
									<div className='flex flex-col self-center justify-self-center'>
										<div className='grid grid-cols-12'>
											<span className='col-span-11'>Raised</span>{' '}
											<span className='col-span-1'>Goal:</span>
										</div>
										<div className='h-2 w-full bg-gray-200 rounded'>
											<div
												style={{ width: `${progress}%` }}
												className='h-2 bg-[#d4ee26] rounded'
											></div>
										</div>
										<div className='grid grid-cols-12'>
											<span className='col-span-11'>${totalAmount}</span>{' '}
											<span className='col-span-1'>${projectDetail.goal}</span>
										</div>
										<div>
											{dayLeft < 0 ? (
												<span>Expired</span>
											) : (
												<span>
													<span>{dayLeft}</span> <span>Days Left</span>
												</span>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div>
							<button
								className='block py-2 pl-3 pr-4 text-center lg:w-1/2 w-full bg-gray-900 text-white rounded  hover:drop-shadow-xl hover:text-[#d4ee26]'
								onClick={handleClick}
								disabled={dayLeft < 0}
							>
								Fund This project
							</button>
						</div>
					</div>
				</div>
			</section>
		</PageLayout>
	);
}
