'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth } from '../firebase/firebase';
import * as yup from 'yup';
import { handleEdit } from '../firebase/firebase';
import { useRouter } from 'next/navigation';

function FundProject({ setIsOpen, projectId, totalAmount, projectDetail }) {
	const ref = useRef(null);

	const remaining = parseFloat(
		parseFloat(Number(projectDetail.goal)) - parseFloat(Number(totalAmount))
	);
	// Include remaining amount in the schema
	const schema = yup.object().shape({
		donation: yup
			.number()
			.required('Donation is required')
			.max(remaining, 'Donation must not exceed the goal'),
	});
	const {
		control,
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				setIsOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref]);
	const router = useRouter();
	const onSubmit = async (data) => {
		await handleEdit(projectId, data);
		setIsOpen(false);
		reset();

		router.push(`/thankyou/${projectId}`);
	};

	const getFormErrorMessage = (name) => {
		return errors[name] ? (
			<small className='text-red-600'>{errors[name].message}</small>
		) : (
			<small className='text-red-600'>&nbsp;</small>
		);
	};

	return (
		<div className='fixed z-10 inset-0 overflow-y-auto w-full'>
			<div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center'>
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

				<div className='inline-block  align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
					<div
						ref={ref}
						className='bg-white px-12 pt-2 pb-16  flex flex-col w-full'
					>
						<div className='flex justify-end items-end'>
							{' '}
							<button
								type='button'
								onClick={() => {
									setIsOpen(false);
								}}
								className='mt-3  inline-flex justify-center rounded-md    px-4 py-2  text-lg font-bold text-gray-700  focus:outline-none   '
							>
								<svg
									height='25px'
									id='Layer_1'
									version='1.1'
									viewBox='0 0 512 512'
									width='25px'
								>
									<path d='M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z' />
								</svg>
							</button>
						</div>

						<form
							className='flex flex-col gap-20'
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className='mb-4'>
								<label className='block text-black text-2xl font-bold mb-8'>
									Enter the Donation <br /> Amount:
								</label>

								<div>
									<input
										type='number'
										placeholder='Enter the amount'
										{...register('donation')}
										className='appearance-none border-b-2 border-black w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline'
									/>
									<p
										className={`text-red-700 px-3 ${
											errors.donation ? '' : 'invisible'
										}`}
									>
										{errors.donation?.message || 'Placeholder'}
									</p>
								</div>
							</div>

							<div className=' px-4 py-3 sm:px-6 flex w-full justify-center '>
								<button
									type='submit'
									className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-2 bg-black text-xl font-medium text-white  focus:outline-none sm:ml-3  '
								>
									Pay Now
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FundProject;
