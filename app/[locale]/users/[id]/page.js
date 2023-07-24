"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db, fetchDocByUserId } from "@/firebase/firebase";
import PageLayout from "@/components/PageLayout";
import ProjectCard from "@/components/ProjectCard";
import Image from "next/legacy/image";

function Users({ params }) {
  const id = params.id;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState([]);
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

      setData(dataArr);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    filterProjectByUserId();
  }, [data]);

  const filterProjectByUserId = () => {
    const filteredProjects = data?.filter((item) => item.userId === id);

    setFilteredData(filteredProjects);
    return filteredData;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = id;
        if (userId) {
          const userDoc = await fetchDocByUserId(userId);
          setUser(userDoc);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <PageLayout>
      <div className='flex  flex-col  w-full overflow-auto h-[100vh] sm:pt-24 pt-12  pb-20 '>
        <div className='flex items-center justify-center gap-2 pt-8'>
          <Image
            width={50}
            height={50}
            className='rounded-full'
            alt='Picture of the author'
            src={user[0]?.photoURL}
          />
          <h1>
            {user[0]?.displayName} {t("user_projects")} :
          </h1>
        </div>
        <div className='flex flex-col  lg:flex-row  lg:flex-wrap  w-full gap-4 lg:justify-start justify-center items-center '>
          {filteredData?.map((project) => {
            return (
              <ProjectCard project={project} key={project.id}></ProjectCard>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}

export default Users;
