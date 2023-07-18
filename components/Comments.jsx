import React, { useState, useEffect } from "react";
import { db, firestore, createComment, auth } from "@/firebase/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
const Comments = ({ projectId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, [comments]);

  const fetchComments = async () => {
    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, where("projectId", "==", projectId));
    onSnapshot(q, (querySnapshot) => {
      const commentsData = querySnapshot.docs.map((doc) => doc.data());
      commentsData.sort((a, b) => b.timestamp - a.timestamp);
      setComments(commentsData);
    });
  };

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
  const onSubmit = (data) => {
    createComment({
      projectId: projectId,
      comment: data.comment,
      timestamp: new Date(),
      userUid: auth.currentUser.uid,
    });
    reset();
    setComments([]);
  };

  return (
    <div>
      {auth.currentUser == null ? (
        ""
      ) : (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
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
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      <div>
        {comments.map((comment) => (
          <div key={comment.timestamp}>
            <p>{comment.comment}</p>
            <p>{comment.timestamp.toDate().toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
