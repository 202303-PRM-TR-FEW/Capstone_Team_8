import React, { useEffect, useState } from "react";
import { auth, db } from "@/firebase/firebase";
import {
  onSnapshot,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { useTranslations, useLocale } from "next-intl";
import Link from "next-intl/link";
import Image from "next/legacy/image";

function Followers() {
  const t = useTranslations();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const userUid = auth?.currentUser?.uid;
  const locale = useLocale();
  useEffect(() => {
    const q = query(collection(db, "follow"));
    const unsubsricibe = onSnapshot(q, async (querySnapshot) => {
      let data = [];
      let followersArr = [];
      let followingArr = [];

      querySnapshot.forEach((doc) => {
        const { follower, following } = doc.data();

        if (follower.length > 0 || following.length > 0) {
          data.push({ ...doc.data() });

          if (follower == userUid) {
            followersArr.push(doc.data().following);
          }

          if (following.includes(userUid)) {
            followingArr.push(doc.data().follower);
          }
        }
      });

      const followingData = followersArr.map((follower) => {
        let data = [];
        const q = query(collection(db, "users"), where("uid", "==", follower));
        onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });
        });
        return data;
      });
      const followersData = followingArr.map((follower) => {
        let data = [];
        const q = query(collection(db, "users"), where("uid", "==", follower));
        onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });
        });
        return data;
      });

      setFollowers(followersData);
      setFollowing(followingData);
    });

    return () => unsubsricibe();
  }, []);

  return (
    <div className='flex md:flex-row flex-col h-full gap-4 p-4 justify-center items-start '>
      <div className='px-4'>
        <h1 className='text-lg font-bold'>{t("follows_you")} :</h1>
        <div className='flex flex-col gap-2'>
          {followers.flat().length === 0 && <p>{t("no_followers")} </p>}
          {followers.flat().map((follower) => {
            return (
              <div key={follower.uid} className='flex gap-2 items-center'>
                <div className='relative h-[5svh] w-[5svh] '>
                  <Image
                    src={follower.photoURL}
                    layout='fill'
                    className='rounded-xl drop-shadow-lg'
                    objectFit='cover'
                    alt='Picture of the author'
                  />
                </div>
                <Link
                  key={follower.id}
                  href={{
                    pathname: `/users/${follower?.uid}`,
                  }}
                  locale={locale}
                >
                  <p>{follower.displayName}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className='px-4'>
        <h1 className='text-lg font-bold'>{t("you_are_following")} :</h1>
        <div className='flex flex-col gap-2'>
          {following.flat().length === 0 && <p>{t("no_follows")}!</p>}
          {following.flat().map((follower) => {
            return (
              <div key={follower.uid} className='flex gap-2 items-center'>
                <div className='relative h-[5svh] w-[5svh] '>
                  <Image
                    src={follower.photoURL}
                    layout='fill'
                    className='rounded-xl drop-shadow-lg'
                    objectFit='cover'
                    alt='Picture of the author'
                  />
                </div>
                <Link
                  key={follower.id}
                  href={{
                    pathname: `/users/${follower?.uid}`,
                  }}
                  locale={locale}
                >
                  <p>{follower.displayName}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Followers;
