import React from 'react';
import { createComment, auth } from '@/firebase/firebase';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
const Comment = ({ projectId }) => {
	const schema = yup.object().shape({
		comment: yup.string().trim().required('Comment is required'),
	});
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = (data) => {
		createComment({
			projectId: projectId,
			comment: data?.comment,
			timestamp: new Date(),
			userUid: auth?.currentUser?.uid,
		});
		reset();
		// setComments([]);
	};

	return (
		<>
			{auth?.currentUser == null ? (
				<p>In order to command you need to Login</p>
			) : (
				<div className='flex'>
					<form className='flex' onSubmit={handleSubmit(onSubmit)}>
						<div>
							<textarea
								{...register('comment')}
								type='text'
								placeholder='Add a comment'
							/>
							<p
								className={`text-red-700 px-3 ${
									errors.comment ? '' : 'invisible'
								}`}
							>
								{errors.comment?.message || 'Placeholder'}
							</p>
						</div>
						<div>
							<button type='submit'>Submit</button>
						</div>
					</form>
				</div>
			)}
		</>
	);
};

export default Comment;
