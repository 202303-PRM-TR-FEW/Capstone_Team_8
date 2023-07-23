'use client';
import { useState } from 'react';
import { register as registerUser, handleUpload } from '@/firebase/firebase';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PageLayout from '@/components/PageLayout';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next-intl/client';
import Link from 'next-intl/link';
export default function Register() {
	const locale = useLocale();
	const [loading, setLoading] = useState(false);
	const [image, setImageUrl] = useState('');
	const t = useTranslations();
	const schema = yup.object().shape({
		userName: yup
			.string()
			.trim(t('white_space'))
			.required(t('user_name_required')),
		email: yup
			.string()
			.trim(t('white_space'))
			.required(t('email_required'))
			.email(t('email_invalid')),
		password: yup
			.string()
			.trim(t('white_space'))
			.required(t('password_required'))
			.min(6, t('password_min_length')),
		confirmPassword: yup
			.string()
			.trim(t('white_space'))
			.required(t('password_required'))
			.oneOf([yup.ref('password'), null], t('password_not_match')),
		img: yup.mixed().required(t('image_required')),
	});
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		reset,
	} = useForm({ resolver: yupResolver(schema) });

	const router = useRouter();
	const handleFileUpload = async (e) => {
		await handleUpload(e, setImageUrl);
	};
	const watchedImg = watch('img');

	const onSubmit = async (data) => {
		setLoading(true);
		const user = await registerUser(
			data.email,
			data.password,
			data.userName,
			image
		);
		if (user) {
			router.push('/login', { locale: locale });
			reset();
		}
	};

	return (
		<PageLayout>
			<div className='flex  flex-col   justify-center min-h-[90vh]   h-full overflow-auto   sm:px-4 px-2 py-2  w-full'>
				{' '}
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='flex min-h-full items-center justify-center py-8 px-4 sm:px-6 lg:px-8'>
						<div className='w-full max-w-md space-y-8'>
							<div>
								<div>
									{' '}
									<h1 className='text-center text-3xl font-bold tracking-tight text-gray-900'>
										{t('register')}
									</h1>
								</div>
							</div>
							<div className='mt-8 space-y-6' method=''>
								<input type='hidden' name='remember' value='true' />
								<div className=' space-y-4 rounded-md shadow-sm'>
									<div>
										<label htmlFor='email-address'>{t('user_name')}</label>
										<input
											{...register('userName')}
											className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
											placeholder={t('user_name')}
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
										<label htmlFor='email-address'>{t('email_address')}</label>
										<input
											{...register('email')}
											className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
											placeholder={t('email_address')}
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
										<label htmlFor='password'>{t('Password')}</label>
										<input
											type='password'
											{...register('password')}
											className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
											placeholder={t('Password')}
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
										<label htmlFor='password'>{t('confirm_pass')}</label>
										<input
											type='password'
											{...register('confirmPassword')}
											className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
											placeholder={t('confirm_pass')}
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
										<label htmlFor='password'>{t('upload_picture')} </label>
										<input
											{...register('img')}
											onChange={handleFileUpload}
											type='file'
											accept='image/png, image/jpeg, image/jpg'
											className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
										/>
										{watchedImg?.length < 1 && (
											<p className='text-red-700 px-3'>
												{errors.img?.message || 'Image Must be uploaded'}
											</p>
										)}
									</div>
								</div>

								<div>
									<button
										type='submit'
										className='group relative flex w-full justify-center rounded-md border border-transparent  bg-[#D8605B] py-2 px-4 text-sm font-medium text-white hover:bg-[#b84c48] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
									>
										{t('register')}
									</button>
								</div>
							</div>
						</div>
					</div>
				</form>
				<div className='text-center py-4 '>
					{t('already_have_account')}
					<button
						className='text-[#D8605B] font-bold pl-2'
						onClick={() => router.push('/login', { locale: locale })}
					>
						{t('Login')}
					</button>
				</div>
			</div>
		</PageLayout>
	);
}
