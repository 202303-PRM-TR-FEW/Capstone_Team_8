'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslations } from 'next-intl';
import {
	createProject,
	uploadImage,
	updateProject,
	handleUpload,
	register,
} from '@/firebase/firebase';
import { getAuth } from 'firebase/auth';
import Image from 'next/legacy/image';
import moment from 'moment';
import { useSelector } from 'react-redux';

function EditProject({ setIsEditProjectOpen, project }) {
	const t = useTranslations();
	const lang = useSelector((state) => state.lang.lang);
	const [imageUrl, setImageUrl] = useState(project.img);
	const ref = useRef(null);
	const defaultValues = {
		title: project.title,
		goal: project.goal,
		about: project.about,
		endTime: moment(project.endTime.seconds * 1000).toDate(),
		category: project.category,
		img: project.img,
	};

	const auth = getAuth();
	const schema = yup.object().shape({
		title: yup.string().trim().required(t('title_required')),
		about: yup
			.string()
			.trim()
			.required(t('about_required'))
			.min(20, t('about_min_length'))
			.max(100, t('about_max_length')),
		goal: yup
			.number()
			.transform((value, originalValue) => {
				return originalValue === '' ? null : value;
			})
			.required(t('goal_required')),
		endTime: yup.date().required(t('deadline_required')).nullable(),
		img: yup.mixed().test('required', t('image_required'), (value) => {
			return value && value.length;
		}),
	});
	const {
		control,
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: defaultValues,
	});

	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				setIsEditProjectOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref]);

	const onSubmit = async (data) => {
		try {
			await updateProject(
				project.id,
				{
					title: data.title,
					goal: data.goal,
					about: data.about,
					endTime: data.endTime,
					img: imageUrl,
				},
				lang
			);
			setImageUrl('');
			reset();
			setIsEditProjectOpen(false);
		} catch (e) {
			console.log(e);
		}
	};

	const handleFileUpload = async (e) => {
		await handleUpload(e, setImageUrl);
		await updateProject(project.id, {
			img: imageUrl,
		});
	};

	return (
		<div className='fixed top-0 left-0 z-10 inset-0 overflow-y-auto w-full pt-16'>
			<div className='flex items-center justify-center min-h-screen overflow-auto pt-4 px-4 pb-20 text-center'>
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
					<div ref={ref} className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
						<form
							className='flex flex-col w-full'
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className='flex justify-end items-end'>
								<button
									type='button'
									onClick={() => {
										setIsEditProjectOpen(false);
									}}
									className='mt-3 inline-flex justify-center rounded-md  px-4 py-2 text-2xl font-medium text-gray-700  focus:outline-none sm:mt-0 sm:ml-3  '
								>
									<svg
										height='25px'
										id='Layer_1'
										version='1.1'
										viewBox='0 0 512 512'
										width='25px'
									>
										<path d='M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z' />
									</svg>
								</button>
							</div>

							<div className='flex flex-col sm:flex-row w-full gap-4'>
								<div className='sm:border-r-2 w-full pr-4'>
									<div className='mb-4'>
										<label className='block text-gray-700 text-sm font-bold mb-2'>
											{t('title')}
										</label>

										<div>
											<input
												{...register('title')}
												placeholder={t('title_placeholder')}
												className=' appearance-none border-b-2 border-black  w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
											/>
											<p
												className={`text-red-700 px-3 ${
													errors.title ? '' : 'invisible'
												}`}
											>
												{errors.title?.message || 'Placeholder'}
											</p>
										</div>
									</div>
									<div className='mb-4'>
										<label className='block text-gray-700 text-sm font-bold mb-2'>
											{t('about')}
										</label>

										<div className='w-full'>
											<textarea
												placeholder={t('about_placeholder')}
												{...register('about')}
												className=' appearance-none border-b-2 border-black  w-full py-2  text-black leading-tight focus:outline-none focus:shadow-outline min-h-[5rem]'
											/>
											<p
												className={`text-red-700 px-3 ${
													errors.about ? '' : 'invisible'
												}`}
											>
												{errors.about?.message || 'Placeholder'}
											</p>
										</div>
									</div>
								</div>
								<div className='w-full'>
									{' '}
									<div className='mb-4'>
										<label className='block text-gray-700 text-sm font-bold mb-2'>
											{t('goal')}
										</label>

										<div>
											<input
												type='number'
												placeholder={t('goal_placeholder')}
												{...register('goal')}
												className=' appearance-none border-b-2 border-black  w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
											/>
											<p
												className={`text-red-700 px-3 ${
													errors.goal ? '' : 'invisible'
												}`}
											>
												{errors.goal?.message || 'Placeholder'}
											</p>
										</div>
									</div>
									<div className='mb-4'>
										<label className='block text-gray-700 text-sm font-bold mb-2'>
											{t('deadline')}
										</label>

										<div>
											<Controller
												control={control}
												name='endTime'
												render={({ field }) => (
													<DatePicker
														placeholder={t('deadline_placeholder')}
														className=' appearance-none border-b-2 border-black  w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
														selected={new Date(field.value)}
														onChange={(date) => field.onChange(moment(date))}
														dateFormat='dd/MM/yyyy'
														minDate={new Date(moment())}
													/>
												)}
											/>
											<p
												className={`text-red-700 px-3 ${
													errors.endTime ? '' : 'invisible'
												}`}
											>
												{errors.endTime?.message || 'Placeholder'}
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className='mb-4'>
								<label className='block text-gray-700 text-sm font-bold mb-2'>
									<p>{t('upload_picture')} </p>
									<p className='opacity-80 text-blue-400'>
										{t('upload_picture_note')}
									</p>
								</label>

								<div>
									<input
										type='file'
										{...register('img')}
										accept='image/png, image/jpg, image/jpeg'
										onChange={handleFileUpload}
										className=' appearance-none border-b-2 border-black  w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
									/>
									{imageUrl !== '' && <p>{t('image_upload_file')} </p>}
									<div className=' relative w-full h-48     '>
										<Image
											src={imageUrl}
											layout='fill'
											className='rounded '
											alt='profile-picture'
										/>{' '}
									</div>

									<p
										className={`text-red-700 px-3 ${
											errors.img ? '' : 'invisible'
										}`}
									>
										{errors.img?.message || 'Placeholder'}
									</p>
								</div>
							</div>
							<div className=' px-4  w-full py-3 sm:px-6 flex justify-center'>
								<button
									type='submit'
									className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-lg font-bold text-white  focus:outline-none sm:ml-3  sm:text-sm'
								>
									{t('update_project')}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditProject;
