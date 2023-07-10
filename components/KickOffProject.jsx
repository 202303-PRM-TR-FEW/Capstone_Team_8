'use client';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { closeAddProject } from '../app/features/startproject/kickoff';

import {
	createProject,
	uploadImage,
	handleUpload,
	register,
} from '../firebase/firebase';
import { getAuth } from 'firebase/auth';
// import { SnackbarProvider, enqueueSnackbar } from 'notistack';

function KickOffProject() {
	// const imageUrl = useSelector(()=>state.imageUrl.imageUrl)
	const kickOffModalStatus = useSelector(
		(state) => state.isStartProjectOpen.modalOpen
	);
	const [imageUrl, setImageUrl] = useState('');

	const auth = getAuth();
	const categoryOptions = ['All', 'animal', 'education', 'sport', 'denem1'];
	const schema = yup.object().shape({
		title: yup.string().trim().required('Title is required'),
		about: yup
			.string()
			.trim()
			.required('About is required')
			.min(20, 'About must be at least 50 characters')
			.max(100, 'About cannot be more than 200 characters'),

		desc: yup.string().trim().required('Description is required'),
		goal: yup.string().trim().required('Goal is required'),
		startTime: yup.date().required('Start time is required').nullable(),
		endTime: yup
			.date()
			.required('End time is required')
			.nullable()
			.when('startTime', (startTime, yup) =>
				startTime
					? yup.min(startTime, 'End time must be later than start time')
					: yup
			),
		category: yup
			.string()
			.trim()
			.required('Category is required')
			.oneOf(
				['All', 'animal', 'education', 'sport', 'denem1'],
				'Invalid category'
			),
		img: yup.mixed().required('A file is required'),
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

	const dispatch = useDispatch();

	const onSubmit = (data) => {
		console.log(auth.currentUser);
		createProject({
			title: data.title,
			desc: data.desc,
			goal: data.goal,
			about: data.about,
			startTime: data.startTime,
			endTime: data.endTime,
			category: data.category,
			userId: auth.currentUser.uid,
			img: imageUrl,
			donations: [],
		});
		setImageUrl('');
		reset();
		dispatch(closeAddProject());
	};

	const handleFileUpload = async (e) => {
		await handleUpload(e, setImageUrl);
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
				<div className='inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
					<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='mb-4'>
								<label className='block text-gray-700 text-sm font-bold mb-2'>
									Title
								</label>
								<Controller
									name='title'
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
								<label className='block text-gray-700 text-sm font-bold mb-2'>
									Description
								</label>
								<Controller
									name='desc'
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
								<label className='block text-gray-700 text-sm font-bold mb-2'>
									About Project
								</label>
								<Controller
									name='about'
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
								<label className='block text-gray-700 text-sm font-bold mb-2'>
									Goal
								</label>
								<Controller
									name='goal'
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
								<label className='block text-gray-700 text-sm font-bold mb-2'>
									Start Time
								</label>
								<Controller
									name='startTime'
									control={control}
									defaultValue=''
									render={({ field }) => (
										<div>
											<input
												type='date'
												{...field}
												className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
											/>
											{getFormErrorMessage(field.name)}
										</div>
									)}
								/>
							</div>
							<div className='mb-4'>
								<label className='block text-gray-700 text-sm font-bold mb-2'>
									End Time
								</label>
								<Controller
									name='endTime'
									control={control}
									defaultValue=''
									render={({ field }) => (
										<div>
											<input
												type='date'
												{...field}
												className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
											/>
											{getFormErrorMessage(field.name)}
										</div>
									)}
								/>
							</div>
							<div className='mb-4'>
								<label className='block text-gray-700 text-sm font-bold mb-2'>
									Category
								</label>
								<Controller
									name='category'
									control={control}
									defaultValue=''
									render={({ field }) => (
										<div>
											<select
												{...field}
												className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
											>
												{categoryOptions.map((item, index) => {
													return (
														<>
															<option value={item} key={index}>
																{item}
															</option>
														</>
													);
												})}
											</select>

											{getFormErrorMessage(field.name)}
										</div>
									)}
								/>
							</div>
							<div className='mb-4'>
								<label className='block text-gray-700 text-sm font-bold mb-2'>
									Upload Your Picture
								</label>
								<Controller
									name='img'
									control={control}
									defaultValue=''
									render={({ field }) => (
										<div>
											<input
												type='file'
												{...field}
												onChange={handleFileUpload}
												className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
											/>

											{getFormErrorMessage(field.name)}
										</div>
									)}
								/>
							</div>
							<div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
								<button
									type='submit'
									className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
								>
									Upload Porject
								</button>
								<button
									type='button'
									onClick={() => {
										dispatch(closeAddProject());
									}}
									className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
								>
									Close
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default KickOffProject;
