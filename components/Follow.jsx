import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { auth, db } from "@/firebase/firebase";
import {
  onSnapshot,
  query,
  doc,
  updateDoc,
  arrayRemove,
  addDoc,
  collection,
} from "firebase/firestore";

function Follow({ userDetail }) {
  const t = useTranslations();
  const [data, setData] = useState([]);
  const [check, setCheck] = useState(false);
  const userUid = auth?.currentUser?.uid;

  useEffect(() => {
    const q = query(collection(db, "follow"));
    const unsubsricibe = onSnapshot(q, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setData(data);
    });
    return () => unsubsricibe();
  }, []);
  const checkIfUserFollows = () => {
    if (!userUid) {
      return false;
    }
    return data.some(
      (entry) =>
        entry.follower === userUid && entry.following === userDetail?.uid
    );
  };

  useEffect(() => {
    const followsUser = checkIfUserFollows();
    setCheck(followsUser);
  }, [data, userDetail]);
  const handleFollow = () => {
    const payload = {
      follower: userUid,
      following: userDetail?.uid,
    };
    try {
      addDoc(collection(db, "follow"), payload);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnFollow = () => {
    if (!userUid) {
      return;
    }
    const entryToUnfollow = data.find(
      (entry) =>
        entry.follower === userUid && entry.following === userDetail?.uid
    );
    if (!entryToUnfollow) {
      return;
    }
    const docId = entryToUnfollow.id;
    try {
      const docRef = doc(db, "follow", docId);
      updateDoc(docRef, {
        follower: arrayRemove(userUid),
        following: arrayRemove(userDetail?.uid),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {userUid == null || userUid == userDetail?.uid ? (
        ""
      ) : (
        <div>
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
      )}
    </>
  );
}

export default Follow;
