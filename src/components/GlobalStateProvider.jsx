import { doc, onSnapshot } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../../firebaseConfig";

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState(0);
  const [adminValues, setAdminValues] = useState();

  useEffect(() => {
    const fetchData = async () => {
      fetchDataFromFirestore();
    };

    fetchData();
  }, []);

  const fetchDataFromFirestore = () => {
    const unsub = onSnapshot(doc(db, "admin", "settings"), (doc) => {
      setAdminValues(doc.data());
    });
  };

  return (
    <GlobalStateContext.Provider
      value={{ globalState, setGlobalState, adminValues }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
