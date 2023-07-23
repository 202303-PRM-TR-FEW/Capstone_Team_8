'use client';
import { useRouter } from 'next/navigation';
import { login } from '@/firebase/firebase';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PageLayout from '@/components/PageLayout';

const Login = () => {
	const router = useRouter();

	const t = useTranslations();
	const schema = yup.object().shape({
		email: yup
			.string()
			.trim(t('white_space'))
			.required(t('email_required'))
			.email(t('email_invalid')),
		password: yup
			.string()
			.trim(t('white_space'))
			.required(t('password_required')),
	});
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		reset,
	} = useForm({ resolver: yupResolver(schema) });

	const onSubmit = async (data) => {
		const user = await login(data.email, data.password);

		if (user) {
			router.push('/');
		}
	};

	// const dispatch = useDispatch();

	return (
		<PageLayout>
			<div className='flex min-h-[80vh]  flex-col   justify-center   h-full overflow-auto   sm:px-4 px-2 py-24  w-full'>
				{' '}
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='flex  items-center justify-center py-8 px-4 sm:px-6 lg:px-8 '>
						<div className='w-full max-w-md space-y-8'>
							<div className='mt-8 space-y-6' method=''>
								<input type='hidden' name='remember' value='true' />
								<div className='space-y-4 rounded-md '>
									<div>
										<label htmlFor='email-address'>{t('Email address')}</label>
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
								</div>

								<div>
									<button
										type='submit'
										className='group relative flex w-full justify-center rounded-md border border-transparent  bg-[#D8605B] py-2 px-4 text-sm font-medium text-white hover:bg-[#b84c48] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
									>
										{t('Login')}
									</button>
								</div>
							</div>
						</div>
					</div>
				</form>
				<div className='flex justify-center'>
					<button
						className='text-center'
						onClick={() => router.push('/resetpassword')}
					>
						{t('Forgot password')}
					</button>
				</div>
				<div className='text-center py-4'>
					{t("Don't have an account?")}
					<button
						className='text-[#D8605B] font-bold pl-2'
						onClick={() => {
							router.push('/register');
						}}
					>
						{t('register')}
					</button>
				</div>
			</div>
		</PageLayout>
	);
};
export default Login;
