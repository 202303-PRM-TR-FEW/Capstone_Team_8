"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import Loading from "./loading";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import app from "../firebase/firebase";
import { useRouter } from "next/navigation";
const auth = getAuth(app);

export function ReduxProvider({ children }) {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUser(false);
        router.push("/login");
      } else {
        setUser(true);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router]);

  if (user == null) {
    return <Loading />;
  } else {
    return <Provider store={store}>{children}</Provider>;
  }
}
