import { Route, Routes, useNavigate } from "react-router-dom";
import SignIn from "./customer/SignIn";
import SignUp from "./customer/SignUp";
import Frontpage from "./customer/Frontpage";
import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import ControlPanel from "./admin/ControlPanel";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        checkAdminStatus(uid);
      } else {
        navigate("/singin");
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
      <ToastContainer />
      <Routes>
        {admin && (
          <>
            <Route path="/admin" element={<ControlPanel />} />
          </>
        )}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Frontpage />} />
        <Route path="*" element={<Frontpage />} />
      </Routes>
    </>
  );
}

export default App;
