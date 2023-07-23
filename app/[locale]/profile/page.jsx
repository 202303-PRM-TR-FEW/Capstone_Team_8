'use client';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '@/app/[locale]/loading';
import {
	createProject,
	uploadImage,
	handleUpload,
	register,
} from '../../../firebase/firebase';
import { getAuth } from 'firebase/auth';
import Image from 'next/image';
import withAuth from '@/components/AuthanticatedRoute';
import welcome from '@/public/welcome_mobile.png';
import PageLayout from '@/components/PageLayout';
import {
	updateUserPassword,
	updateUserProfilePicture,
} from '@/firebase/firebase';
const Profile = (props) => {
	const auth = getAuth();
	const kickOffModalStatus = useSelector(
		(state) => state.isStartProjectOpen.modalOpen
	);
	const [imageUrl, setImageUrl] = useState('');

	const passwordSchema = yup.object().shape({
		password: yup
			.string()
			.trim('No leading/trailing whitepaces allowed')
			.required('Password is required')
			.min(6, 'Password must be at least 6 characters'),
		repeatpassword: yup
			.string()
			.trim('No leading/trailing whitepaces allowed')
			.required('Password is required')
			.min(6, 'Password must be at least 6 characters')
			.oneOf(
				[yup.ref('password'), null],
				'Password and Confirm Password must match'
			),
	});

	const imageSchema = yup.object().shape({
		img: yup.mixed().required('A file is required'),
	});

	const {
		control: passwordControl,
		handleSubmit: passwordSubmit,
		register: passwordRegister,
		reset,
		formState: { errors: passwordErrors },
	} = useForm({
		resolver: yupResolver(passwordSchema),
	});

	const {
		control: imageControl,
		handleSubmit: imageSubmit,
		register: imageRegister,
		formState: { errors: imageErrors },
	} = useForm({
		resolver: yupResolver(imageSchema),
	});

	const onSubmitPassword = (data) => {
		updateUserPassword(data.password);

		reset();
	};

	const onSubmitImage = () => {
		if (imageUrl && imageUrl.trim().length < 1) {
			alert('No file has been uploaded');
			return;
		}

		updateUserProfilePicture(imageUrl);
		setImageUrl('');
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
					<div>
						{' '}
						<form onSubmit={passwordSubmit(onSubmitPassword)}>
							<div className='mb-4'>
								<label className='block text-gray-700 text-sm font-bold mb-2'>
									Password
								</label>

								<div>
									<input
										type='password'
										{...passwordRegister('password')}
										className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									/>
									<p
										className={`text-red-700 px-3 ${
											passwordErrors.password ? '' : 'invisible'
										}`}
									>
										{passwordErrors.password?.message || 'Placeholder'}
									</p>
								</div>
							</div>
							<div className='mb-4'>
								<label className='block text-gray-700 text-sm font-bold mb-2'>
									Repeat Password
								</label>

								<div>
									<input
										type='password'
										{...passwordRegister('repeatpassword')}
										className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									/>
									<p
										className={`text-red-700 px-3 ${
											passwordErrors.repeatpassword ? '' : 'invisible'
										}`}
									>
										{passwordErrors.repeatpassword?.message || 'Placeholder'}
									</p>
								</div>
							</div>

							<div className=' px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse flex justify-center'>
								<button
									type='submit'
									className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
								>
									Change Password
								</button>
							</div>
						</form>
					</div>
					<div>
						<form onSubmit={imageSubmit(onSubmitImage)}>
							<div className='mb-4'>
								<label className='block text-gray-700 text-sm font-bold mb-2'>
									Update Your Profile Picture
								</label>

								<div>
									<input
										type='file'
										{...imageRegister('img')}
										accept='image/png, image/jpeg, image/jpg'
										onChange={handleFileUpload}
										className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									/>
									<p
										className={`text-red-700 px-3 ${
											imageErrors.img ? '' : 'invisible'
										}`}
									>
										{imageErrors.img?.message || 'Placeholder'}
									</p>
								</div>
								<div className=' px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse flex justify-center'>
									<button
										type='submit'
										className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
									>
										Update Image
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</PageLayout>
	);
};

export default withAuth(Profile);
