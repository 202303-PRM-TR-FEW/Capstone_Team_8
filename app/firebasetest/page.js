"use client";
import React, { useEffect, useState } from "react";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { query, collection, onSnapshot, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { db } from "../firebase";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function Page() {
  const [data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const schema = yup.object().shape({
    title: yup
      .string()
      .trim("No leading/trailing white spaces allowed")
      .required("Title is required"),
    desc: yup
      .string()
      .trim("No leading/trailing white spaces allowed")
      .required("Description is required"),
    goal: yup
      .string()
      .trim("No leading/trailing white spaces allowed")
      .required("Goal is required"),
    startTime: yup
      .string()
      .trim("No leading/trailing white spaces allowed")
      .required("Start time is required"),
    endTime: yup
      .string()
      .trim("No leading/trailing white spaces allowed")
      .required("End time is required"),
    category: yup
      .string()
      .trim("No leading/trailing white spaces allowed")
      .required("Category is required"),
    img: yup.mixed().required("A file is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
    }
  }, []);

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

  const createDoc = async (data) => {
    await addDoc(collection(db, "app"), {
      title: data.title,
      desc: data.desc,
      goal: data.goal,
      startTime: data.startTime,
      endTime: data.endTime,
      category: data.category,
      img: imageUrl,
      donations: [],
    });
    setImageUrl("");
    reset();
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    try {
      const downloadURL = await uploadImage(file);
      setImageUrl(downloadURL);
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

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      setUser(user);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Error signing in:", error);
      // Handle sign-in error (e.g., display an error message)
    }
  };

  const handleSignUp = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        displayName
      );
      setUser(user);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("New user created:", user);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <div>
        {isLoggedIn ? (
          <div>
            <div>
              {data.map((item) => (
                <div key={item.id} className="flex flex-col">
                  <h2>{item.title}</h2>
                  <p>Funded: {item.funded}</p>
                  <p>Goal: {item.goal}</p>
                  <p>Description: {item.desc}</p>
                  <img className="w-36 h-36" src={item.img} alt="" />
                  <p>Starting Time: {item.startTime} </p>
                  <p>Ending Time: {item.endTime}</p>
                  <p>Category : {item.category}</p>
                  <hr />
                </div>
              ))}
            </div>
            <div>
              <form onSubmit={handleSubmit(createDoc)}>
                <p>Title</p>
                <input
                  name="title"
                  {...register("title")}
                  className="border-2 border-black"
                />
                {errors.title && <p>{errors.title.message}</p>}
                <p>Desc</p>
                <input
                  name="desc"
                  {...register("desc")}
                  className="border-2 border-black"
                />
                {errors.desc && <p>{errors.desc.message}</p>}
                <p>Goal</p>
                <input
                  name="goal"
                  {...register("goal")}
                  className="border-2 border-black"
                />
                {errors.goal && <p>{errors.goal.message}</p>}
                <p>Start Time</p>
                <input
                  name="startTime"
                  type="date"
                  {...register("startTime")}
                  className="border-2 border-black"
                />
                {errors.startTime && <p>{errors.startTime.message}</p>}
                <p>End Time</p>
                <input
                  name="endTime"
                  type="date"
                  {...register("endTime")}
                  className="border-2 border-black"
                />
                {errors.timeframe && <p>{errors.timeframe.message}</p>}
                <p>Category</p>
                <select
                  name="category"
                  {...register("category")}
                  className="border-2 border-black"
                >
                  <option value="">Select a category</option>
                  <option value="Product-Based">Product-Based</option>
                  <option value="Creative Projects">Creative Projects</option>
                  <option value="Technology">Technology</option>
                  <option value="Social Cause">Social Cause</option>
                </select>
                {errors.category && <p>{errors.category.message}</p>}
                <p>File</p>
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
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <div>
            <form onSubmit={handleSignIn}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Sign In</button>
            </form>
            <form onSubmit={handleSignUp}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="displayName">First Name</label>
                <input
                  type="text"
                  id="displayName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Sign Up</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
