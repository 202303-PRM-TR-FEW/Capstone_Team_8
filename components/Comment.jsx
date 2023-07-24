import React from 'react';
import { createComment, auth } from '@/firebase/firebase';
import Image from 'next/legacy/image';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import welcome from '@/public/welcome_mobile.png';
import { comment } from 'postcss';
const Comment = ({ projectId }) => {
	const schema = yup.object().shape({
		comment: yup.string().trim(),
	});
	const {
		handleSubmit,
		reset,
		register,
		setValue,
		clearErrors,
		watch,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const comment = watch('comment', '');
	const onSubmit = (data) => {
		createComment({
			projectId: projectId,
			comment: data?.comment,
			timestamp: new Date(),
			userUid: auth?.currentUser?.uid,
		});
		reset();
	};
	const handleCancel = (e) => {
		e.preventDefault();
		setValue('comment', '');
		clearErrors('comment');
	};

	return (
		<>
			{auth?.currentUser == null ? (
				<p>In order to command you need to Login</p>
			) : (
				<div className='flex my-6 shadow-lg p-4 '>
					<form className='flex w-full ' onSubmit={handleSubmit(onSubmit)}>
						<div className='flex-flex-col w-full'>
							<div className='w-full flex items-center gap-4'>
								<Image
									width={40}
									height={40}
									className='rounded-full'
									alt='user image'
									src={auth?.currentUser?.photoURL || welcome}
								/>

								<div className='w-full'>
									<input
										className='border-b-2 border-black p-2 w-full focus:outline-none focus:shadow-outline'
										{...register('comment')}
										type='text'
										placeholder='Add a comment'
									/>
									<p
										className={`text-red-700 pt-2 px-2 ${
											errors.comment ? '' : 'invisible'
										}`}
									>
										{errors.comment?.message || 'Placeholder'}
									</p>
								</div>
							</div>

							<div className='flex justify-end gap-4 '>
								<button
									onClick={handleCancel}
									className='p-2 rounded bg-red-400 text-white hover:bg-red-600 hover:dropshadow-lg'
								>
									Cancel
								</button>{' '}
								<button
									className={`p-2 rounded text-white hover:dropshadow-lg 
		${
			comment?.trim().length < 1
				? 'bg-blue-200 cursor-not-allowed'
				: 'bg-blue-400 hover:bg-blue-600'
		}`}
									type='submit'
									disabled={comment?.trim().length < 1}
								>
									Submit
								</button>
							</div>
						</div>
					</form>
				</div>
			)}
		</>
	);
};

export default Comment;
