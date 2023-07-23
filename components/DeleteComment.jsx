"use client";
import React, { useState, useEffect, useRef } from "react";
import { db, auth, handleCommentDelete } from "@/firebase/firebase";
import { useTranslations } from "next-intl";

function DeleteComment({ setIsDeleteCommentOpen, commentId }) {
  const ref = useRef();
  const t = useTranslations();
  const handleDeleteComment = async () => {
    await handleCommentDelete(commentId);
    setIsDeleteCommentOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsDeleteCommentOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className='fixed top-0 left-0 z-10 inset-0 overflow-y-auto w-full pt-16'>
      <div className='flex items-center justify-center min-h-screen overflow-auto pt-4 px-4 pb-20 text-center'>
        <div
          className='fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity'
          aria-hidden='true'
        ></div>
        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>
        <div className='inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
          <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <div ref={ref} className='flex flex-col gap-12 '>
              <div>
                <p>{t("comment_delete")} </p>
              </div>
              <div className='flex justify-center items-center'>
                <button
                  onClick={handleDeleteComment}
                  className='bg-red-400 text-white rounded m-2 p-2'
                >
                  {" "}
                  {t("Delete")}
                </button>
                <button
                  onClick={() => {
                    setIsDeleteCommentOpen(false);
                  }}
                  className=' rounded m-2 p-2 bg-transparent text-black'
                >
                  {" "}
                  {t("Cancel")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteComment;
