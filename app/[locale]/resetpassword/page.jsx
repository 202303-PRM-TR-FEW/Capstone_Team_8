'use client';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next-intl/client';
import Loading from '@/app/[locale]/loading';

export default function ResetPassword() {
	const locale = useLocale();
	const t = useTranslations();
	const [loading, setLoading] = useState(false);

	const schema = yup.object().shape({
		email: yup
			.string()
			.trim(t('white_space'))
			.required(t('email_required'))
			.email(t('email_invalid')),
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });
	const router = useRouter();
	const auth = getAuth();
	const onSubmit = (data) => {
		setLoading(true);
		sendPasswordResetEmail(auth, data.email)
			.then(() => {
				enqueueSnackbar(t('reset_password_email_sent'), {
					variant: 'success',
				});
				router.push('/login', { locale: locale });
			})
			.catch((error) => {
				enqueueSnackbar(error.message, {
					variant: 'error',
				}).finally(() => {
					setLoading(false);
				});
			});
	};

	return (
		<>
			{loading && <Loading />}
			<div className='flex w-full pt-24 h-full  flex-col justify-center items-center px-2'>
				{' '}
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex  flex-col   justify-center  gap-2  h-full overflow-auto   sm:px-4 px-2 pb-2 pt-12  w-full max-w-[600px]'
				>
					<div>
						<h1 className='text-center text-3xl mb-4 font-bold tracking-tight text-gray-900'>
							{t('reset_password')}
						</h1>
					</div>
					<label className='text-left w-full px-3' htmlFor='email'>
						{t('email_address')}
					</label>
					<input
						{...register('email')}
						className='relative block w-full justify-center appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 my-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 mobile:text-sm'
						placeholder={t('email_address')}
					/>
					<p
						className={`text-red-700 text-left w-full px-3 ${
							errors.email ? '' : 'invisible'
						}`}
					>
						{errors.email?.message || 'Placeholder'}
					</p>
					<div className=' w-full'>
						<button
							type='submit'
							className='group relative flex w-full justify-center rounded-md border border-transparent  bg-blue-600 py-2 px-4 text-sm sm:text-base md:text-md lg:text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
						>
							{t('reset')}
						</button>
					</div>
					<div className='text-center py-4 w-full  flex flex-col'>
						<p> {t('already_have_account')} </p>
						<div className='w-full flex justify-center'>
							<button
								className='text-blue-600 font-bold pl-2 hover:text-blue-800 '
								onClick={() => router.push('/login', { locale: locale })}
							>
								{t('Login')}
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}
