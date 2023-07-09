"use client";
import Image from "next/image";
import KickOffProject from "../components/KickOffProject";
import PageLayout from "@/components/pageLayout";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { query, collection, onSnapshot, addDoc } from "firebase/firestore";

import { db } from "../firebase/firebase";
export default function Home() {
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
        dataArr.push({ ...doc.data(), id: doc.id });
      });
      setData(dataArr);
      setFilteredData(dataArr);
    });
    return () => unsubscribe();
  }, []);

  const filterHandle = (category) => {
    setSelectedCategory(category);
    const filteredProject = data.filter((item) => item.category === category);
    setFilteredData(filteredProject.length ? filteredProject : data);
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
    ...data.map((item) => (
      <div key={item.id} className="p-2">
        <button
          key={item.id}
          className={`border-2 rounded-full h-24 w-24 flex items-center justify-center ${
            selectedCategory === item.category ? "bg-blue-500" : ""
          }`}
          onClick={() => filterHandle(item.category)}
        >
          {item.category}
        </button>
      </div>
    )),
  ];

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
                <Image
                  className="border-2 "
                  src={"/welcome_mobile.png"}
                  width={400}
                  height={300}
                  alt="Picture of the author"
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-4 sm:col-span-5 col-span-12  justify-end  ">
              <h3 className="font-bold lg:text-4xl md:text-3xl text-2xl ">
                Help us release a cookbook for parents and kids
              </h3>
              <p className="text-sm">
                We want something diffrenet and beautiful and helpful cooking
                book for parents and kids to have fun in kitchen.
              </p>

              <div className=" w-full flex flex-col gap-2 text-sm">
                <div className="h-2 w-full bg-gray-200 rounded">
                  <div className="h-2 w-1/2 bg-[#d4ee26] rounded"></div>
                </div>

                <div className="grid grid-cols-12">
                  <span className="col-span-11">Raised</span>{" "}
                  <span className="col-span-1">Goal:</span>
                </div>

                <div className="grid grid-cols-12">
                  <span className="col-span-11">$2.500</span>{" "}
                  <span className="col-span-1">$3500</span>
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
                  <Link
                    key={project.id}
                    className="block py-2 px-3 "
                    href={`/project/${project?.id}`}
                  >
                    <div
                      key={project.id}
                      className="flex flex-col shadow-lg gap-4 p-4 w-96"
                    >
                      <div className="relative w-96 h-64 ">
                        {" "}
                        <Image
                          className="rounded"
                          src={project?.img}
                          layout="fill"
                          alt="Picture of the author"
                        />
                      </div>
                      <h1>{project.title}</h1>
                      <div className=" w-full flex flex-col gap-2 text-sm">
                        <div className="h-2 w-full bg-gray-200 rounded">
                          <div className="h-2 w-1/2 bg-[#d4ee26] rounded"></div>
                        </div>

                        <div className="grid grid-cols-12">
                          <span className="col-span-11">Raised</span>{" "}
                          <span className="col-span-1">Goal:</span>
                        </div>

                        <div className="grid grid-cols-12">
                          <span className="col-span-11">${project.funded}</span>{" "}
                          <span className="col-span-1">${project.goal}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </main>
      </PageLayout>
    </>
  );
}
