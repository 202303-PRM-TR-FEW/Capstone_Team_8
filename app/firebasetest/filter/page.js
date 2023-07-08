"use client";
import React, { useEffect, useState } from "react";
import { query, collection, onSnapshot, addDoc } from "firebase/firestore";

import { db } from "../../firebase";

function Filter() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    const q = query(collection(db, "app"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let dataArr = [];
      querySnapshot.forEach((doc) => {
        dataArr.push({ ...doc.data(), id: doc.id });
      });
      setData(dataArr);
    });
    return () => unsubscribe();
  }, []);
  console.log(data);
  const buttons = [
    <div key="all" className="p-2">
      <button
        className={`border-2 rounded-full h-24 w-24 flex items-center justify-center ${
          selectedCategory === null ? "bg-blue-500" : ""
        }`}
        onClick={() => setSelectedCategory(null)}
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
          onClick={() => setSelectedCategory(item.category)}
        >
          {item.category}
        </button>
      </div>
    )),
  ];

  const filteredProjects = selectedCategory
    ? data.filter((item) => item.category === selectedCategory)
    : data;
  const projects = filteredProjects.map((item) => (
    <div key={item.id} className="flex flex-row">
      <div>
        <h1>{item.title}</h1>
      </div>
      <div>
        <img src={item.img} alt="Project" />
      </div>
      <div
        className="bg-green-600 h-2.5 rounded-full"
        style={{ width: "45%" }}
      ></div>
      <div>
        <span>${item.funded}</span>
        <span>${item.goal}</span>
      </div>
    </div>
  ));

  return (
    <div className="flex ">
      <div className="flex flex-row p-2">{buttons}</div>
      <div>{projects} </div>
    </div>
  );
}

export default Filter;
