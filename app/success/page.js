"use client";
import React, { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import ProjectCard from "@/components/ProjectCard";

function Success() {
  const [filteredData, setFilteredData] = useState([]);

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
    <PageLayout>
      <div className="flex justify-center items-center p-24">
        <div className="flex flex-wrap w-full gap-8 ">
          {filteredData.map((item) => {
            return <ProjectCard project={item} key={item.id}></ProjectCard>;
          })}
        </div>
      </div>
    </PageLayout>
  );
}

export default Success;
