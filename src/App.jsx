import { Route, Routes } from "react-router-dom";
import SignIn from "./customer/SignIn";
import SignUp from "./customer/SignUp";
import Frontpage from "./customer/Frontpage";
import Cart from "./customer/Cart";
import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
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
import CorrectPoints from "./admin/CorrectPoints";
import Settings from "./admin/Settings";
import Statistics from "./customer/Statistics";
import ProductPage from "./customer/ProductPage";
import CreateProduct from "./admin/CreateProduct";
import EditProduct from "./admin/EditProduct";
import Onboarding from "./components/onboarding/Onboarding";

function App() {
  const [admin, setAdmin] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        checkAdminStatus(uid);
        checkOnboardingStatus(uid);
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

  const checkOnboardingStatus = async (uid) => {
    let skipped = localStorage.getItem("skippedOnboarding");
    if (skipped) {
      setShowOnboarding(false);
      return;
    }
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (docSnap.data().onboarded === false) {
        setShowOnboarding(true);
      } else {
        setShowOnboarding(false);
      }
    } else {
      console.log("Error getting user document.");
    }
  };

  return (
    <>
      {showOnboarding && <Onboarding setShowOnboarding={setShowOnboarding} />}
      <ToastContainer stacked />
      <div className={showOnboarding ? "hidden" : "block"}>
        <Routes>
          {admin && (
            <>
              <Route path="/admin" element={<ControlPanel />} />
              <Route path="/admin/customer/:id" element={<Customer />} />
              <Route path="/admin/customer/correctpoints/:id" element={<CorrectPoints />} />
              <Route path="/admin/settings" element={<Settings />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
            </>
          )}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/orderrecieved/:totalPoints/:memberPoints" element={<OrderRecieved />} />
          <Route path="/orderrecieved" element={<OrderRecieved />} />
          <Route path="/donationrecieved/:organization/:amount" element={<DonateRecieved />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/history" element={<PointHistory />} />
          <Route path="/" element={<Frontpage />} />
          <Route path="*" element={<Frontpage />} />
        </Routes>
      </div>
      <ScrollToTop />
    </>
  );
}

export default App;
