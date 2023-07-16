'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/legacy/image';
import { auth } from '../firebase/firebase';
import { getUserInfo } from '../firebase/adminsdk';

function TransactionHistory({ setIsTransactionHistoryOpen, project }) {
	useEffect(() => {
		// getUserInfo(auth?.currentUser?.uid);
		// project.forEach((project) => {
		// 	const userDetail = getUserInfo(project.user.uid);
		// 	project.user.imageUrl = userDetail.photoURL;
		// 	project.user.name = userDetail.displayName;
		// });
	}, []);

	const handleCloseModal = () => {
		setIsTransactionHistoryOpen(false);
	};
	return (
		<div className='fixed top-0 left-0 z-10 inset-0 overflow-y-auto w-full pt-16'>
			<div className='flex items-center justify-center min-h-screen overflow-auto pt-4 px-4 pb-20 text-center'>
				<div
					className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
					aria-hidden='true'
				></div>
				<span
					className='hidden sm:inline-block sm:align-middle sm:h-screen'
					aria-hidden='true'
				>
					&#8203;
				</span>
				<div className='inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
					<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
						<div className='flex flex-col gap-12 '>
							<h1>Transaction History</h1>
							<div className='flex flex-col gap-2 rounded'>
								{project?.donations.map((item, index) => {
									return (
										<div className='flex flex-row justify-between gap-2 items-center rounded p-2 bg-gray-200 '>
											<div className='flex gap-4 items-center'>
												{' '}
												<span>{index + 1}</span>
												<Image
													width={40}
													height={40}
													className='rounded'
													src={item?.user?.imageUrl}
												/>
												<p>{item?.user?.displayName}</p>
											</div>
											<div className='flex gap-4'>
												{' '}
												<p>{item?.donation}$</p>
											</div>
										</div>
									);
								})}
							</div>
							<div className='flex justify-center items-center'>
								<button
									onClick={handleCloseModal}
									className=' rounded m-2 p-2 bg-transparent text-black'
								>
									{' '}
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TransactionHistory;
