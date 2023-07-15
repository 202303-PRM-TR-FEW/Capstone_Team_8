"use client";
import Image from "next/legacy/image";
import KickOffProject from "@/components/KickOffProject";
import PageLayout from "@/components/PageLayout";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { query, collection, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Loading from "@/app/loading";
import WithAuth from "@/components/AuthanticatedRoute";
import ProjectCard from "@/components/ProjectCard";
function Home(props) {
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

  const filterHandle = (category) => {
    setSelectedCategory(category);
    const filteredProject = category
      ? data.filter((item) => item.category === category)
      : data;
    setFilteredData(filteredProject);
  };

  const buttons = [
    <div key="all" className="p-2">
      <button
        className={`border-2 rounded-full h-24 w-24 flex items-center justify-center ${
          selectedCategory === null ? "bg-blue-500" : ""
        }`}
        onClick={() => filterHandle(null)}
      >
        All
      </button>
    </div>,
    <div key="animal" className="p-2">
      <button
        className={`border-2 rounded-full h-24 w-24 flex items-center justify-center ${
          selectedCategory === "animal" ? "bg-blue-500" : ""
        }`}
        onClick={() => filterHandle("animal")}
      >
        Animal
      </button>
    </div>,
    <div key="sport" className="p-2">
      <button
        className={`border-2 rounded-full h-24 w-24 flex items-center justify-center ${
          selectedCategory === "sport" ? "bg-blue-500" : ""
        }`}
        onClick={() => filterHandle("sport")}
      >
        Sport
      </button>
    </div>,
    <div key="education" className="p-2">
      <button
        className={`border-2 rounded-full h-24 w-24 flex items-center justify-center ${
          selectedCategory === "education" ? "bg-blue-500" : ""
        }`}
        onClick={() => filterHandle("education")}
      >
        Education
      </button>
    </div>,
    <div key="denem1" className="p-2">
      <button
        className={`border-2 rounded-full h-24 w-24 flex items-center justify-center ${
          selectedCategory === "denem1" ? "bg-blue-500" : ""
        }`}
        onClick={() => filterHandle("denem1")}
      >
        Denem1
      </button>
    </div>,
  ];

  if (props.loading || !props?.user)
    return (
      <div>
        <Loading></Loading>
      </div>
    );

  return (
    <>
      <PageLayout>
        {kickOffModalStatus && <KickOffProject />}
        <main className="flex  flex-col   justify-center   h-full overflow-auto   md:px-12 px-6 py-24  w-full ">
          <div className="grid grid-cols-12 gap-6 border-b-2 pb-12 ">
            <div className="w-full flex flex-col justify-center gap-12 md:pt-0 sm:col-span-7 col-span-12  ">
              <h1 className="text-6xl text- font-bold">Project of the week</h1>
              <div className="w-full">
                {" "}
                <Link
                  key={data[0]?.id}
                  className="block py-2 px-3 lg:w-2/4"
                  href={`/project/${data[0]?.id}`}
                >
                  <Image
                    className="border-2 "
                    src={data[0]?.img}
                    layout="responsive"
                    width={300}
                    height={200}
                    alt="Picture of the author"
                  />
                </Link>
              </div>
            </div>
            <div className="w-full flex flex-col gap-4 sm:col-span-5 col-span-12  justify-end  ">
              <h3 className="font-bold lg:text-4xl md:text-3xl text-2xl ">
                {data[0]?.title}
              </h3>
              <p className="text-sm">{data[0]?.desc}</p>

              <div className=" w-full flex flex-col gap-2 text-sm">
                <div className="h-2 w-full bg-gray-200 rounded">
                  <div
                    style={{
                      maxWidth: "100%",
                      width: `${
                        (data[0]?.totalDonations / data[0]?.goal) * 100
                      }%`,
                    }}
                    className="h-2  bg-[#d4ee26] rounded"
                  ></div>
                </div>

                <div className="grid grid-cols-12">
                  <span className="col-span-11">Raised</span>{" "}
                  <span className="col-span-1">Goal:</span>
                </div>

                <div className="grid grid-cols-12">
                  <span className="col-span-11">
                    ${data[0]?.totalDonations}
                  </span>{" "}
                  <span className="col-span-1">${data[0]?.goal}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="my-6 flex flex-col justify-start items-start w-full ">
            <h1 className="text-4xl text-left">Categories</h1>
            <div>
              <ul className="flex gap-4 my-6">{buttons}</ul>
            </div>

            <div className="flex flex-wrap w-full gap-8 ">
              {filteredData.map((project) => {
                return (
                  <ProjectCard
                    project={project}
                    key={project.id}
                    props={props}
                  ></ProjectCard>
                );
              })}
            </div>
          </div>
        </main>
      </PageLayout>
    </>
  );
}
export default WithAuth(Home);
