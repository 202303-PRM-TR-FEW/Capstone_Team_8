"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db, fetchDocByUserId, auth } from "@/firebase/firebase";
import PageLayout from "@/components/PageLayout";
import ProjectCard from "@/components/ProjectCard";
import Image from "next/legacy/image";
import Follow from "@/components/Follow";

function Users({ params }) {
  const id = params.id;
  const userId = auth.currentUser?.uid;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState([]);
  const [userDonatedProjects, setUserDonatedProjects] = useState([]);
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
    filterDonatedProjectsByUserId();
  }, [data]);

  const filterProjectByUserId = () => {
    const filteredProjects = data?.filter((item) => item.userId === id);

    setFilteredData(filteredProjects);
    return filteredData;
  };

  const filterDonatedProjectsByUserId = () => {
    const userDonatedProjects = data.filter((item) =>
      item.donations.some((donation) => donation.user.uid === id)
    );
    setUserDonatedProjects(userDonatedProjects);
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
      <div className='flex  flex-col  w-full h-full sm:pt-24 pt-12  pb-20 '>
        <div>
          <div className='flex items-center justify-center gap-2 pt-8'>
            <div className='relative h-[5svh] w-[5svh] '>
              <Image
                src={user[0]?.photoURL}
                layout='fill'
                className='rounded-xl drop-shadow-lg'
                objectFit='cover'
                alt='Picture of the author'
              />
            </div>
            <h1>
              {user[0]?.displayName} {t("user_projects")} :
            </h1>
          </div>
          <div className='flex justify-center items-center'>
            <Follow userDetail={user[0]}></Follow>
          </div>
          {filteredData?.length > 0 ? (
            <div className='flex flex-col  lg:flex-row  lg:flex-wrap  w-full gap-4 lg:justify-start justify-center items-center '>
              {filteredData?.map((project) => {
                return (
                  <ProjectCard project={project} key={project.id}></ProjectCard>
                );
              })}
            </div>
          ) : (
            <div
              id='noData'
              className='flex  w-full h-[50vh] gap-4 pt-6 justify-center items-end '
            >
              <h1 className='text-2xl font-bold text-center'>
                {t("no_projects")}
              </h1>
            </div>
          )}
        </div>
        <div>
          <div className='flex items-center justify-center gap-2 pt-8'>
            <div className='relative h-[5svh] w-[5svh] '>
              <Image
                src={user[0]?.photoURL}
                layout='fill'
                className='rounded-xl drop-shadow-lg'
                objectFit='cover'
                alt='Picture of the author'
              />
            </div>
            <h1>
              {user[0]?.displayName} {t("donated_projects")} :
            </h1>
          </div>
          <div className='flex justify-center items-center'>
            <Follow userDetail={user[0]}></Follow>
          </div>
          {userDonatedProjects?.length > 0 ? (
            <div className='flex flex-col  lg:flex-row  lg:flex-wrap  w-full gap-4 lg:justify-start justify-center items-center '>
              {userDonatedProjects?.map((project) => {
                return (
                  <ProjectCard project={project} key={project.id}></ProjectCard>
                );
              })}
            </div>
          ) : (
            <div
              id='noData'
              className='flex  w-full h-[50vh] gap-4 pt-6 justify-center items-end '
            >
              <h1 className='text-2xl font-bold text-center'>
                {t("no_donated_projects")}
              </h1>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

export default Users;
