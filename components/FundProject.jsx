'use client';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth } from '../firebase/firebase';
import * as yup from 'yup';
import { handleEdit } from '../firebase/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function FundProject({ setIsOpen, projectId, totalAmount, projectDetail }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
	}, [auth]);

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

	const router = useRouter();
	const onSubmit = async (data) => {
		await handleEdit(projectId, data);
		setIsOpen(false);
		reset();
		router.push('/thankyou');
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
					<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
						{!user && (
							<div>
								<h1>In order to fund this project please login or sign up</h1>
								<div className='flex justify-center items-center gap-6 w-full text-white'>
									<Link
										className='m-2 p-2 text-center w-full bg-blue-400'
										href='/login'
									>
										Login
									</Link>
									<Link
										className='m-2 p-2 text-center w-full bg-gray-700'
										href='/register'
									>
										Sign Up
									</Link>
								</div>
							</div>
						)}

						{user && (
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className='mb-4'>
									<label className='block text-gray-700 text-sm font-bold mb-2'>
										Enter the Donation Amount:
									</label>
									<Controller
										name='donation'
										control={control}
										defaultValue=''
										render={({ field }) => (
											<div>
												<input
													{...field}
													className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
												/>
												{getFormErrorMessage(field.name)}
											</div>
										)}
									/>
								</div>
								<div className='mb-4'>
									<span className='text-black'> Add 2% chartiy?</span>
									<input {...register('checkbox')} type='checkbox' value='A' />
								</div>
								<div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
									<button
										type='submit'
										className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
									>
										Fund Project
									</button>
									<button
										type='button'
										onClick={() => {
											setIsOpen(false);
										}}
										className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
									>
										Close
									</button>
								</div>
							</form>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default FundProject;
