"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
  put,
} from "firebase/storage";
import { storage } from "../firebase";
import { db } from "../firebase";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function Page() {
  const [data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState(""); // to store the download URL

  const schema = yup.object().shape({
    title: yup
      .string()
      .trim("No leading/trailing whitepaces allowed")
      .required("Title is required"),
    desc: yup
      .string()
      .trim("No leading/trailing whitepaces allowed")
      .required("Description is required"),
    goal: yup
      .string()
      .trim("No leading/trailing whitepaces allowed")
      .required("Goal is required"),
    funded: yup
      .string()
      .trim("No leading/trailing whitepaces allowed")
      .required("Funded amount is required"),
    img: yup.mixed().required("A file is required"), // validation changed
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  // Read data
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

  // Update data
  const handleUpdate = async (data) => {
    await addDoc(collection(db, "app"), {
      title: data.title,
      funded: data.funded,
      goal: data.goal,
      desc: data.desc,
      img: imageUrl, // use imageUrl here
    });
    setImageUrl(""); // clear imageUrl after submit
    reset(); // Reset form values
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    try {
      const downloadURL = await uploadImage(file);
      setImageUrl(downloadURL); // set the state here
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const uploadImage = (imageFile) => {
    const storageRef = ref(storage, "bucket/" + imageFile.name);
    return uploadBytes(storageRef, imageFile).then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    });
  };
  console.log(data);
  return (
    <div>
      <div>
        {data.map((item) => (
          <div key={item.id} className="flex flex-col">
            <h2>{item.title}</h2>
            <p>Funded: {item.funded}</p>
            <p>Goal: {item.goal}</p>
            <p>Description: {item.desc}</p>
            <img className="w-36 h-36" src={item.img} />
            <hr />
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <input
            name="title"
            {...register("title")}
            className="border-2 border-black"
          />
          {errors.title && <p>{errors.title.message}</p>}

          <input
            name="funded"
            {...register("funded")}
            className="border-2 border-black"
          />
          {errors.funded && <p>{errors.funded.message}</p>}

          <input
            name="goal"
            {...register("goal")}
            className="border-2 border-black"
          />
          {errors.goal && <p>{errors.goal.message}</p>}

          <input
            name="desc"
            {...register("desc")}
            className="border-2 border-black"
          />
          {errors.desc && <p>{errors.desc.message}</p>}

          <input
            type="file"
            {...register("img")}
            className="border-2 border-black"
            onChange={handleUpload}
          />
          {errors.img && <p>{errors.img.message}</p>}

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default Page;
