import React, { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState(0);

  return <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>{children}</GlobalStateContext.Provider>;
};
