'use client';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { closeAddProject } from '../../app/features/startproject/kickoff';
import Loading from '@/app/loading';
import {
	createProject,
	uploadImage,
	handleUpload,
	register,
} from '../../firebase/firebase';
import { getAuth } from 'firebase/auth';
import Image from 'next/image';
import withAuth from '@/components/AuthanticatedRoute';
import welcome from '@/public/welcome_mobile.png';
import PageLayout from '@/components/PageLayout';
const Profile = (props) => {
	const auth = getAuth();

	// const imageUrl = useSelector(()=>state.imageUrl.imageUrl)
	const kickOffModalStatus = useSelector(
		(state) => state.isStartProjectOpen.modalOpen
	);
	const [imageUrl, setImageUrl] = useState('');
	console.log(auth?.currentUser);

	const schema = yup.object().shape({
		password: yup.string().trim().required('Title is required'),
		repeatpassword: yup
			.string()
			.trim()
			.required('About is required')
			.min(20, 'About must be at least 50 characters')
			.max(100, 'About cannot be more than 200 characters'),
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
	if (props.loading || !props.user)
		return (
			<div>
				<Loading></Loading>
			</div>
		);
	return (
		<PageLayout>
			<div className='flex  flex-col   justify-center items-center   h-full overflow-auto   md:px-12 px-6 py-24  w-full'>
				<div>
					<div>Name: {auth?.currentUser?.displayName}</div>
					<div>Email:{auth?.currentUser?.email}</div>
					<h1 className='border-b-2 w-full'>Profile Picture</h1>

					<Image
						src={auth?.currentUser?.photoURL || welcome}
						width={75}
						height={75}
						className='rounded-full'
						alt='Picture of the author'
					/>
				</div>
				<div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='mb-4'>
							<label className='block text-gray-700 text-sm font-bold mb-2'>
								Password
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
								Repeat Password
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
								Update Profile
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
		</PageLayout>
	);
};

export default withAuth(Profile);
