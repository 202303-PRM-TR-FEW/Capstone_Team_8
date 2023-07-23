'use client';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PageLayout from '@/components/PageLayout';
// import Spinner from '../components/Spinner';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default function ResetPassword() {
	const [loading, setLoading] = useState(false);

	const schema = yup.object().shape({
		email: yup
			.string()
			.trim('No leading/trailing whitepaces allowed')
			.required('Email is required')
			.email('Invalid email address'),
	});
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		reset,
	} = useForm({ resolver: yupResolver(schema) });

	const router = useRouter();

	const auth = getAuth();

	const onSubmit = (data) => {
		setLoading(true);
		sendPasswordResetEmail(auth, data.email)
			.then(() => {
				// toast('Password reset email sent!', {
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

				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
			});
	};

	return (
		<PageLayout>
			<div className='flex w-full h-full min-h-[95vh]   flex-col justify-center align-middle  items-center px-2'>
				<div>
					<div>
						{' '}
						<h1 className='text-center text-3xl font-bold tracking-tight text-gray-900'>
							Reset Your Password
						</h1>
					</div>
					<div className='align-center justify-center flex'>
						{' '}
						<img src='./screen.svg' alt='screen'></img>
					</div>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex w-full h-full mobile:w-full  max-w-[600px]  flex-col justify-center  items-center'
				>
					<input
						{...register('email')}
						className='relative block w-full justify-center appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 my-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 mobile:text-sm'
						placeholder='Email address'
					/>
					<p
						className={`text-red-700 text-left w-full px-3 ${
							errors.email ? '' : 'invisible'
						}`}
					>
						{errors.email?.message || 'Placeholder'}
					</p>
					<div>
						<button
							type='submit'
							className='group relative flex w-full justify-center rounded-md border border-transparent  bg-[#D8605B] py-2 px-4 text-sm font-medium text-white hover:bg-[#b84c48] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
						>
							Reset
						</button>
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
			</div>
		</PageLayout>
	);
}
