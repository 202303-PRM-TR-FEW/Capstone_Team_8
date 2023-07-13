'use client';
import { useState } from 'react';
import {
	register as registerUser,
	createProject,
	uploadImage,
	handleUpload,
} from '@/firebase/firebase';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// import Spinner from '../components/Spinner';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
export default function Register() {
	const [loading, setLoading] = useState(false);
	const [image, setImageUrl] = useState('');
	const schema = yup.object().shape({
		userName: yup
			.string()
			.trim('No leading/trailing whitepaces allowed')
			.required('User Name is required'),
		email: yup
			.string()
			.trim('No leading/trailing whitepaces allowed')
			.required('Email is required')
			.email('Invalid email address'),
		password: yup
			.string()
			.trim('No leading/trailing whitepaces allowed')
			.required('Password is required')
			.min(6, 'Password must be at least 6 characters'),
		confirmPassword: yup
			.string()
			.trim('No leading/trailing whitepaces allowed')
			.required('Password is required')
			.min(6, 'Password must be at least 6 characters')
			.oneOf(
				[yup.ref('password'), null],
				'Password and Confirm Password must match'
			),
		img: yup.mixed().required('A file is required'),
	});
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		reset,
	} = useForm({ resolver: yupResolver(schema) });

	const router = useRouter();
	console.log(image);
	const handleFileUpload = async (e) => {
		await handleUpload(e, setImageUrl);
	};
	watch('img');

	const onSubmit = async (data) => {
		setLoading(true);
		const user = await registerUser(
			data.email,
			data.password,
			data.userName,
			image
		);
		// toast('Registered Successfully', {
		// 	position: 'top-right',
		// 	autoClose: 2000,
		// 	hideProgressBar: false,
		// 	closeOnClick: true,
		// 	pauseOnHover: true,
		// 	draggable: true,
		// 	progress: undefined,
		// 	theme: 'light',
		// 	type: 'success',
		// });

		router.push('/login');

		return user;
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='flex min-h-full items-center justify-center py-8 px-4 sm:px-6 lg:px-8'>
					<div className='w-full max-w-md space-y-8'>
						<div>
							<div>
								{' '}
								<h1 className='text-center text-3xl font-bold tracking-tight text-gray-900'>
									Register
								</h1>
							</div>
							<div className='align-center justify-center flex'>
								{' '}
								<img src='./screen.svg' alt='screen'></img>
							</div>
						</div>
						<div className='mt-8 space-y-6' method=''>
							<input type='hidden' name='remember' value='true' />
							<div className=' space-y-4 rounded-md shadow-sm'>
								<div>
									<label htmlFor='email-address'>User Name</label>
									<input
										{...register('userName')}
										className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
										placeholder='User Name'
									/>
									<p
										className={`text-red-700 px-3 ${
											errors.userName ? '' : 'invisible'
										}`}
									>
										{errors.userName?.message || 'Placeholder'}
									</p>
								</div>
								<div>
									<label htmlFor='email-address'>Email address</label>
									<input
										{...register('email')}
										className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
										placeholder='Email address'
									/>
									<p
										className={`text-red-700 px-3 ${
											errors.email ? '' : 'invisible'
										}`}
									>
										{errors.email?.message || 'Placeholder'}
									</p>
								</div>
								<div>
									<label htmlFor='password'>Password</label>
									<input
										type='password'
										{...register('password')}
										className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
										placeholder='Password'
									/>
									<p
										className={`text-red-700 px-3 ${
											errors.password ? '' : 'invisible'
										}`}
									>
										{errors.password?.message || 'Placeholder'}
									</p>
								</div>
								<div>
									<label htmlFor='password'>Password</label>
									<input
										type='password'
										{...register('confirmPassword')}
										className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
										placeholder='Confirm Password'
									/>
									<p
										className={`text-red-700 px-3 ${
											errors.confirmPassword ? '' : 'invisible'
										}`}
									>
										{errors.confirmPassword?.message || 'Placeholder'}
									</p>
								</div>
								<div>
									<label htmlFor='password'>Upload Your Picture</label>
									<input
										{...register('img')}
										onChange={handleFileUpload}
										type='file'
										className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
										placeholder='Confirm Password'
									/>
									<p
										className={`text-red-700 px-3 ${
											errors.confirmPassword ? '' : 'invisible'
										}`}
									>
										{errors.confirmPassword?.message || 'Placeholder'}
									</p>
								</div>
							</div>

							<div>
								<button
									type='submit'
									className='group relative flex w-full justify-center rounded-md border border-transparent  bg-[#D8605B] py-2 px-4 text-sm font-medium text-white hover:bg-[#b84c48] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
								>
									Register
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
			<div className='text-center py-4 '>
				Already have an account?{' '}
				<button
					className='text-[#D8605B] font-bold pl-2'
					onClick={() => router.push('/login')}
				>
					Login
				</button>
			</div>
		</>
	);
}
