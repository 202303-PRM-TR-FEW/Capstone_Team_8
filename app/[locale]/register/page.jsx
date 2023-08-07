'use client';
import { useState } from 'react';
import { register as registerUser, handleUpload } from '@/firebase/firebase';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next-intl/client';
import Loading from '../loading';
export default function Register() {
	const [showPassword, setShowPassword] = useState(false);
	const [showRepeatPassword, setShowRepeatPassword] = useState(false);
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
		img: yup.mixed().test('required', t('image_required'), (value) => {
			return value && value.length;
		}),
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
		const user = await registerUser(
			data.email,
			data.password,
			data.userName,
			image,
			setLoading
		);
		if (user) {
			router.push('/', { locale: locale });
			setLoading(false);
			reset();
		}
	};
	const togglePasswordVisibility = (field) => {
		if (field === 'password') {
			setShowPassword((prev) => !prev);
		} else if (field === 'repeatpassword') {
			setShowRepeatPassword((prev) => !prev);
		}
	};

	return (
		<>
			{loading && <Loading />}
			<div className='flex  flex-col   justify-center    h-full overflow-auto   sm:px-4 px-2 pb-2 pt-12  w-full'>
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
									<div className='relative'>
										<label htmlFor='password'>{t('Password')}</label>
										<input
											type={showPassword ? 'text' : 'password'}
											{...register('password')}
											className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
											placeholder={t('Password')}
										/>
										<div
											className='absolute top-8 right-3 cursor-pointer'
											onClick={() => togglePasswordVisibility('password')}
										>
											<svg
												fill='#000000'
												version='1.1'
												id='Capa_1'
												width='18px'
												height='18px'
												viewBox='0 0 442.04 442.04'
											>
												<g>
													<g>
														<path
															d='M221.02,341.304c-49.708,0-103.206-19.44-154.71-56.22C27.808,257.59,4.044,230.351,3.051,229.203
			c-4.068-4.697-4.068-11.669,0-16.367c0.993-1.146,24.756-28.387,63.259-55.881c51.505-36.777,105.003-56.219,154.71-56.219
			c49.708,0,103.207,19.441,154.71,56.219c38.502,27.494,62.266,54.734,63.259,55.881c4.068,4.697,4.068,11.669,0,16.367
			c-0.993,1.146-24.756,28.387-63.259,55.881C324.227,321.863,270.729,341.304,221.02,341.304z M29.638,221.021
			c9.61,9.799,27.747,27.03,51.694,44.071c32.83,23.361,83.714,51.212,139.688,51.212s106.859-27.851,139.688-51.212
			c23.944-17.038,42.082-34.271,51.694-44.071c-9.609-9.799-27.747-27.03-51.694-44.071
			c-32.829-23.362-83.714-51.212-139.688-51.212s-106.858,27.85-139.688,51.212C57.388,193.988,39.25,211.219,29.638,221.021z'
														/>
													</g>
													<g>
														<path
															d='M221.02,298.521c-42.734,0-77.5-34.767-77.5-77.5c0-42.733,34.766-77.5,77.5-77.5c18.794,0,36.924,6.814,51.048,19.188
			c5.193,4.549,5.715,12.446,1.166,17.639c-4.549,5.193-12.447,5.714-17.639,1.166c-9.564-8.379-21.844-12.993-34.576-12.993
			c-28.949,0-52.5,23.552-52.5,52.5s23.551,52.5,52.5,52.5c28.95,0,52.5-23.552,52.5-52.5c0-6.903,5.597-12.5,12.5-12.5
			s12.5,5.597,12.5,12.5C298.521,263.754,263.754,298.521,221.02,298.521z'
														/>
													</g>
													<g>
														<path d='M221.02,246.021c-13.785,0-25-11.215-25-25s11.215-25,25-25c13.786,0,25,11.215,25,25S234.806,246.021,221.02,246.021z' />
													</g>
												</g>
											</svg>
										</div>
										<p
											className={`text-red-700 px-3 ${
												errors.password ? '' : 'invisible'
											}`}
										>
											{errors.password?.message || 'Placeholder'}
										</p>
									</div>
									<div className='relative'>
										<label htmlFor='password'>{t('confirm_pass')}</label>
										<input
											type={showRepeatPassword ? 'text' : 'password'}
											{...register('confirmPassword')}
											className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
											placeholder={t('confirm_pass')}
										/>
										<div
											className='absolute top-8 right-3 cursor-pointer'
											onClick={() => togglePasswordVisibility('repeatpassword')}
										>
											<svg
												fill='#000000'
												version='1.1'
												id='Capa_1'
												width='18px'
												height='18px'
												viewBox='0 0 442.04 442.04'
											>
												<g>
													<g>
														<path
															d='M221.02,341.304c-49.708,0-103.206-19.44-154.71-56.22C27.808,257.59,4.044,230.351,3.051,229.203
			c-4.068-4.697-4.068-11.669,0-16.367c0.993-1.146,24.756-28.387,63.259-55.881c51.505-36.777,105.003-56.219,154.71-56.219
			c49.708,0,103.207,19.441,154.71,56.219c38.502,27.494,62.266,54.734,63.259,55.881c4.068,4.697,4.068,11.669,0,16.367
			c-0.993,1.146-24.756,28.387-63.259,55.881C324.227,321.863,270.729,341.304,221.02,341.304z M29.638,221.021
			c9.61,9.799,27.747,27.03,51.694,44.071c32.83,23.361,83.714,51.212,139.688,51.212s106.859-27.851,139.688-51.212
			c23.944-17.038,42.082-34.271,51.694-44.071c-9.609-9.799-27.747-27.03-51.694-44.071
			c-32.829-23.362-83.714-51.212-139.688-51.212s-106.858,27.85-139.688,51.212C57.388,193.988,39.25,211.219,29.638,221.021z'
														/>
													</g>
													<g>
														<path
															d='M221.02,298.521c-42.734,0-77.5-34.767-77.5-77.5c0-42.733,34.766-77.5,77.5-77.5c18.794,0,36.924,6.814,51.048,19.188
			c5.193,4.549,5.715,12.446,1.166,17.639c-4.549,5.193-12.447,5.714-17.639,1.166c-9.564-8.379-21.844-12.993-34.576-12.993
			c-28.949,0-52.5,23.552-52.5,52.5s23.551,52.5,52.5,52.5c28.95,0,52.5-23.552,52.5-52.5c0-6.903,5.597-12.5,12.5-12.5
			s12.5,5.597,12.5,12.5C298.521,263.754,263.754,298.521,221.02,298.521z'
														/>
													</g>
													<g>
														<path d='M221.02,246.021c-13.785,0-25-11.215-25-25s11.215-25,25-25c13.786,0,25,11.215,25,25S234.806,246.021,221.02,246.021z' />
													</g>
												</g>
											</svg>
										</div>
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
										className='group relative flex w-full justify-center rounded-md border border-transparent  bg-blue-600 py-2 px-4 text-sm sm:text-base md:text-md lg:text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
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
						className='text-blue-600 font-bold pl-2'
						onClick={() => router.push('/login', { locale: locale })}
					>
						{t('Login')}
					</button>
				</div>
			</div>
		</>
	);
}
