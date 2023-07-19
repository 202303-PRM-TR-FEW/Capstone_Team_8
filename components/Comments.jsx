import React, { useState, useEffect } from "react";
import {
  db,
  createComment,
  auth,
  handleCommentDelete,
} from "@/firebase/firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Image from "next/legacy/image";
const Comments = ({ projectId }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, where("projectId", "==", projectId));
    onSnapshot(q, async (querySnapshot) => {
      const commentsData = [];

      for (const doc of querySnapshot.docs) {
        const comment = doc.data();
        const commentId = doc.id;
        const usersCollection = collection(db, "users");
        const userQuery = query(
          usersCollection,
          where("uid", "==", comment.userUid)
        );
        const userQuerySnapshot = await getDocs(userQuery);
        const userData = userQuerySnapshot.docs[0].data();

        commentsData.push({ ...comment, user: userData, id: commentId });
      }

      commentsData.sort((a, b) => b.timestamp - a.timestamp);
      setComments(commentsData);
    });
  }, []);

  console.log(comments);
  const schema = yup.object().shape({
    comment: yup.string().trim().required("Comment is required"),
  });
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data, e) => {
    e.preventDefault();
    createComment({
      projectId: projectId,
      comment: data.comment,
      timestamp: new Date(),
      userUid: auth.currentUser.uid,
    });
    reset();
    setComments([]);
  };
  const handleDelete = async (commentId) => {
    await handleCommentDelete(commentId);
  };
  return (
    <>
      <div className="flex flex-col">
        <div>
          {comments.map((comment) => (
            <div key={comment?.timestamp}>
              <div className="flex items-center">
                <Image
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt="user image"
                  src={comment?.user?.photoURL}
                />
                <p>{comment?.user?.displayName}, Said:</p>
              </div>

              <p>{comment?.comment}</p>
              <p>{comment?.timestamp.toDate().toLocaleString()}</p>
              {auth?.currentUser?.uid === comment.userUid ? (
                <button onClick={() => handleDelete(comment.id)}>Delete</button>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
      {auth.currentUser == null ? (
        <p>In order to command you need to Login</p>
      ) : (
        <div className="flex">
          <form className="flex" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <textarea
                {...register("comment")}
                type="text"
                placeholder="Add a comment"
              />
              <p
                className={`text-red-700 px-3 ${
                  errors.comment ? "" : "invisible"
                }`}
              >
                {errors.comment?.message || "Placeholder"}
              </p>
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Comments;
