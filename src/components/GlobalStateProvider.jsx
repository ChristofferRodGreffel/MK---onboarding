import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState(0);
  const [adminValues, setAdminValues] = useState();
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      fetchDataFromFirestore();
    };

    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, check admin status
        checkAdminStatus(user.uid);
      } else {
        // User is signed out
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchDataFromFirestore = () => {
    const unsub = onSnapshot(doc(db, "general", "settings"), (doc) => {
      setAdminValues(doc.data());
    });
  };

  const checkAdminStatus = async (userID) => {
    const querySnapshot = await getDocs(collection(db, "admin"));
    querySnapshot.forEach((doc) => {
      if (doc.id === userID) {
        setIsAdmin(true);
        return;
      } else {
        setIsAdmin(false);
      }
    });
  };

  return (
    <GlobalStateContext.Provider
      value={{ globalState, setGlobalState, adminValues, isAdmin }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
