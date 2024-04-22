import { Route, Routes } from "react-router-dom";
import SignIn from "./customer/SignIn";
import SignUp from "./customer/SignUp";
import Frontpage from "./customer/Frontpage";
import Cart from "./customer/Cart";
import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import ControlPanel from "./admin/ControlPanel";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./customer/Profile";
import OrderRecieved from "./customer/OrderRecieved";
import PointHistory from "./customer/PointHistory";
import Donate from "./customer/Donate";
import DonateRecieved from "./customer/DonateRecieved";
import Questions from "./customer/Questions";
import ScrollToTop from "./helperfunctions/ScrollToTop";
import Customer from "./admin/Customer";

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
      <ToastContainer stacked />
      <Routes>
        {admin && (
          <>
            <Route path="/admin" element={<ControlPanel />} />
            <Route path="/customer/:id" element={<Customer />} />
          </>
        )}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/questions" element={<Questions />} />
        <Route
          path="/orderrecieved/:totalPoints/:memberPoints"
          element={<OrderRecieved />}
        />
        <Route path="/orderrecieved" element={<OrderRecieved />} />
        <Route
          path="/donationrecieved/:organization/:amount"
          element={<DonateRecieved />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/history" element={<PointHistory />} />
        <Route path="/" element={<Frontpage />} />
        <Route path="*" element={<Frontpage />} />
      </Routes>
      <ScrollToTop />
    </>
  );
}

export default App;
