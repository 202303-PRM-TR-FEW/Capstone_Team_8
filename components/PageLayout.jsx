"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { auth } from "@/firebase/firebase";
import Foooter from "@/components/Footer";
const PageLayout = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [auth]);

  return (
    <>
      <Navbar />
      {children}
      <Foooter />
    </>
  );
};

export default PageLayout;
