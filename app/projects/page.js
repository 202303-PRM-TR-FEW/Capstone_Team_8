"use client";
import Image from "next/legacy/image";
import KickOffProject from "@/components/KickOffProject";
import PageLayout from "@/components/PageLayout";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Loading from "@/app/loading";
import ProjectCard from "@/components/ProjectCard";
import FilterCategories from "@/components/FilterCategories";
import Tabs from "@/components/Tabs";
function Home() {
  const kickOffModalStatus = useSelector(
    (state) => state.isStartProjectOpen.modalOpen
  );
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
      setData(dataArr);
      setFilteredData(dataArr);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <PageLayout>
        {kickOffModalStatus && <KickOffProject />}
        <main className='flex  flex-col   justify-center   h-full overflow-auto   md:px-12 px-6 py-24  w-full '>
          <Tabs data={data} />

          <div className='my-6 flex flex-col justify-center items-center w-full '>
            <h1 className='text-5xl text-left font-bold'>Categories</h1>
            <div className='justify-center items-center'>
              <ul className='flex gap-4 my-6 '>
                {
                  <FilterCategories
                    data={data}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setFilteredData={setFilteredData}
                  />
                }
              </ul>
            </div>
          </div>
          <div className='flex justify-center items-center w-full'>
            <div className='flex flex-wrap w-full gap-4 '>
              {filteredData.map((project) => {
                return (
                  <ProjectCard project={project} key={project.id}></ProjectCard>
                );
              })}
            </div>
          </div>
        </main>
      </PageLayout>
    </>
  );
}
export default Home;
