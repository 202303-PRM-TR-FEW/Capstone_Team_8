"use client";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import app from "../firebase/firebase";
import { useRouter } from "next/navigation";
const auth = getAuth(app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const auth = getAuth();
  const [user, setUser] = useState(false);
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

  return (
    <AuthContext.Provider value={{ user }}> {children}</AuthContext.Provider>
  );
};
