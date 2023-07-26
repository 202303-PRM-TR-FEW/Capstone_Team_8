import React, { useState, useEffect } from "react";
import { auth, fetchDocByUserId } from "@/firebase/firebase";
import Image from "next/legacy/image";
import { useTranslations } from "next-intl";
import Followers from "./Followers";

function ProfileInfo() {
  const [data, setData] = useState([]);
  const t = useTranslations();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = auth?.currentUser?.uid;
        if (userId) {
          const userDoc = await fetchDocByUserId(userId);
          setData(userDoc);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center gap-2 w-full h-full'>
      <div className='flex items-center justify-center gap-2'>
        <div className='relative h-[5svh] w-[5svh] '>
          <Image
            src={data[0]?.photoURL}
            layout='fill'
            className='rounded-xl drop-shadow-lg'
            objectFit='cover'
            alt='Picture of the author'
          />
        </div>
        <h1>{data[0]?.displayName}</h1>
      </div>
      <div className='flex justify-center items-center gap-2'>
        <span>{t("e-mail")}: </span>
        <p>{auth.currentUser.email} </p>
      </div>
      <div className='p-4 h-full w-full'>
        <Followers />
      </div>
    </div>
  );
}

export default ProfileInfo;
