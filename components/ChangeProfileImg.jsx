import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
	updateUserProfilePicture,
	handleUpload,
	auth,
} from '@/firebase/firebase';
import { useTranslations, useLocale } from 'next-intl';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next-intl/client';
import Image from 'next/legacy/image';
function ChangeProfileImg({ setLoading }) {
	const t = useTranslations();
	const [imageUrl, setImageUrl] = useState(auth.currentUser.photoURL);
	const imageSchema = yup.object().shape({
		img: yup.mixed().required(t('image_required')),
	});
	const router = useRouter();
	const locale = useLocale();

	const {
		control: imageControl,
		handleSubmit: imageSubmit,
		register: imageRegister,
		reset,
		formState: { errors: imageErrors },
	} = useForm({
		resolver: yupResolver(imageSchema),
	});

	const onSubmitImage = async () => {
		if (
			imageUrl &&
			(imageUrl.trim().length < 1 || imageUrl == auth.currentUser.photoURL)
		) {
			enqueueSnackbar(t('image_required'), { variant: 'error' });
			return;
		}

		await updateUserProfilePicture(imageUrl, setLoading);
		reset();
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
		<div>
			<div>
				<form onSubmit={imageSubmit(onSubmitImage)}>
					<div className='mb-4 flex flex-col justify-center items-center gap-4'>
						<div className=' relative w-56 h-48     '>
							<Image
								src={imageUrl || '/images/placeholder.png'}
								layout='fill'
								loading='lazy'
								className='rounded '
								alt='profile-picture'
							/>
						</div>
						<div className='flex flex-col justify-center items-center'>
							<input
								type='file'
								{...imageRegister('img')}
								accept='image/png, image/jpeg, image/jpg'
								onChange={handleFileUpload}
								className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
								className=' inline-flex justify-center gap-4 rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
							>
								<span> {t('update_profile_picture')}</span>

								<svg
									fill='#ffff'
									height='20px'
									width='20px'
									id='Capa_1'
									viewBox='0 0 496.77 496.77'
								>
									<g id='XMLID_646_'>
										<path
											id='XMLID_651_'
											d='M248.385,201.496c-48.174,0-87.37,39.199-87.37,87.372c0,48.172,39.196,87.371,87.37,87.371
		c48.175,0,87.371-39.199,87.371-87.371C335.756,240.695,296.56,201.496,248.385,201.496z'
										/>
										<path
											id='XMLID_647_'
											d='M447.981,141.179h-6.403v-20.116c0-14.554-11.789-26.35-26.342-26.35h-46.67
		c-14.555,0-26.341,11.796-26.341,26.35v20.116h-156.73v-21.353c0-32.925-26.697-59.614-59.62-59.614H59.621
		C26.698,60.212,0,86.902,0,119.826v267.943c0,26.94,21.846,48.788,48.787,48.788h399.194c26.942,0,48.788-21.848,48.788-48.788
		V189.967C496.77,163.025,474.924,141.179,447.981,141.179z M49.676,119.826c0-5.482,4.463-9.938,9.945-9.938h66.254
		c5.48,0,9.942,4.455,9.942,9.938v20.957H49.676V119.826z M248.385,409.357c-66.43,0-120.491-54.051-120.491-120.489
		c0-66.439,54.062-120.489,120.491-120.489c66.431,0,120.489,54.05,120.489,120.489
		C368.874,355.306,314.815,409.357,248.385,409.357z'
										/>
									</g>
								</svg>
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ChangeProfileImg;
