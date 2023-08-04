"use client";
import React, { useEffect, useState } from "react";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import ProjectCard from "@/components/ProjectCard";
import { useTranslations } from "next-intl";

function Success() {
  const [filteredData, setFilteredData] = useState([]);
  const t = useTranslations();

  useEffect(() => {
    const q = query(collection(db, "app"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let dataArr = [];
      querySnapshot.forEach((doc) => {
        const projectData = { ...doc.data(), id: doc.id };
        const totalDonations = projectData.donations.reduce(
          (total, donation) => total + parseInt(donation.donation),
          0
        );
        dataArr.push({ ...projectData, totalDonations });
      });
      dataArr.sort((a, b) => b.totalDonations - a.totalDonations);
      const filterSuccess = dataArr.filter(
        (item) => item.totalDonations === item.goal
      );
      setFilteredData(filterSuccess);
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      <main className='flex  flex-col   justify-start   h-screen   sm:px-4 px-2 py-24  w-full '>
        <div className='my-6 flex flex-col justify-center items-center w-full '>
          <h1 className='font-bold text-2xl'>{t("success_stories")}</h1>
        </div>
        <div className='flex justify-center items-center w-full'>
          <div className='flex flex-col  lg:flex-row  lg:flex-wrap  w-full gap-4 lg:justify-start justify-center items-center '>
            {filteredData.map((item) => {
              return <ProjectCard project={item} key={item.id}></ProjectCard>;
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default Success;
