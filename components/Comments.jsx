import React, { useState, useEffect } from 'react';
import { db, auth, handleCommentDelete } from '@/firebase/firebase';
import {
	collection,
	onSnapshot,
	query,
	where,
	getDocs,
} from 'firebase/firestore';
import Image from 'next/legacy/image';
const Comments = ({ projectId }) => {
	const [comments, setComments] = useState([]);
	const [isDeleteCommentOpen, setIsDeleteCommentOpen] = useState(false);
	useEffect(() => {
		const commentsRef = collection(db, 'comments');
		const q = query(commentsRef, where('projectId', '==', projectId));
		const unsubscribe = onSnapshot(q, async (querySnapshot) => {
			const commentsData = [];
			for (const doc of querySnapshot.docs) {
				const comment = doc?.data();
				const commentId = doc?.id;
				const usersCollection = collection(db, 'users');
				const userQuery = query(
					usersCollection,
					where('uid', '==', comment.userUid)
				);
				const userQuerySnapshot = await getDocs(userQuery);
				const userData = userQuerySnapshot.docs[0].data();
				commentsData.push({ ...comment, user: userData, id: commentId });
			}
			commentsData.sort((a, b) => b.timestamp - a.timestamp);
			setComments(commentsData);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const openDeleteComment = () => {
		setIsDeleteCommentOpen(true);
	};
	return (
		<>
			{isDeleteCommentOpen && (
				<DeleteComment
					setIsDeleteCommentOpen={setIsDeleteCommentOpen}
					projectId={projectId}
				/>
			)}
			<div className='flex flex-col'>
				<div>
					{comments?.map((comment) => (
						<div key={comment?.timestamp}>
							<div className='flex items-center'>
								<Image
									width={40}
									height={40}
									className='rounded-full'
									alt='user image'
									src={comment?.user?.photoURL}
								/>
								<p>{comment?.user?.displayName}, Said:</p>
							</div>

							<p>{comment?.comment}</p>
							<p>{comment?.timestamp?.toDate().toLocaleString()}</p>
							{auth?.currentUser?.uid === comment?.userUid ? (
								<button onClick={openDeleteComment}>Delete</button>
							) : (
								''
							)}
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Comments;
