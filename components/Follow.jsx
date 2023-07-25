// Follow.jsx

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { auth, db, updateFollow } from "@/firebase/firebase";
import { FieldValue } from "firebase/firestore";
import { onSnapshot, query, doc } from "firebase/firestore";
import Loading from "@/app/[locale]/loading";
import { collection } from "firebase/firestore";
import firebase from "firebase/compat/app";

function Follow({ userDetail }) {
  const t = useTranslations();
  const [currentUser, setCurrentUser] = useState([]);
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = auth?.currentUser?.uid;

  useEffect(() => {
    const fetchData = () => {
      const q = query(collection(db, "users"));
      onSnapshot(q, (querySnapshot) => {
        let data = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        const filteredData = data.filter((item) => item.uid === userId);
        setCurrentUser(filteredData);
      });
    };
    fetchData();
  }, []);
  console.log(currentUser);
  const checkFollow = async () => {
    if (currentUser[0]?.followed?.includes(userDetail?.uid)) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  useEffect(() => {
    checkFollow();
  }, []);

  const handleFollow = () => {
    if (auth.currentUser && userDetail?.uid) {
      try {
        updateFollow(userDetail?.uid);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUnFollow = async () => {
    try {
      const currentUserDocRef = doc(db, "users", userId);
      await currentUserDocRef.update({
        followed: firebase.firestore.FieldValue.arrayRemove(userDetail.uid),
      });
      setCheck(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loading && <Loading />}
      {check ? (
        <button
          onClick={handleUnFollow}
          className='bg-[#f61900f3] text-white rounded p-2'
        >
          {t("unfollow")}
        </button>
      ) : (
        <button
          onClick={handleFollow}
          className='bg-[#0095f6] text-white rounded p-2'
        >
          {t("follow")}
        </button>
      )}
    </div>
  );
}

export default Follow;
