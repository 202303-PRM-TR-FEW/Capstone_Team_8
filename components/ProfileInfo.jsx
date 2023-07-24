import React, { useState, useEffect } from "react";
import { auth, fetchDocByUserId } from "@/firebase/firebase";
import Image from "next/image";
import { useTranslations } from "next-intl";

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

  console.log(data);
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <div className='flex items-center justify-center gap-2'>
        <Image
          width={50}
          height={50}
          className='rounded-full'
          alt='Picture of the author'
          src={data[0]?.photoURL}
        />
        <h1>{data[0]?.displayName}</h1>
      </div>
      <div className='flex justify-center items-center gap-2'>
        <span>{t("e-mail")} : </span>
        <p>{auth.currentUser.email} </p>
      </div>
    </div>
  );
}

export default ProfileInfo;
