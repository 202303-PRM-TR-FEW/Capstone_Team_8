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
								X
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
