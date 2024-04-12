import { Route, Routes } from "react-router-dom";
import SignIn from "./customer/SignIn";
import SignUp from "./customer/SignUp";
import Frontpage from "./customer/Frontpage";
import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        checkAdminStatus(uid);
      }
    });
  }, []);

  const checkAdminStatus = async (user) => {
    const querySnapshot = await getDocs(collection(db, "admin"));
    querySnapshot.forEach((doc) => {
      if (doc.id === user) {
        setAdmin(true);
      }
    });
  };

  return (
    <>
      <Routes>
        {admin && (
          <>
            <Route path="ControlPanel" element={<ControlPanel />} />
          </>
        )}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Frontpage />} />
      </Routes>
    </>
  );
}

export default App;
