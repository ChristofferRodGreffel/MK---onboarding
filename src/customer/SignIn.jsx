import React, { useRef, useState } from "react";
import CustomButton from "../components/CustomButton";
import PageWrapper from "../components/PageWrapper";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import BackButtonWithArrow from "../components/BackButtonWithArrow";
import { firebaseErrorsCodes } from "../../firebaseErrorCodes";
import { toast } from "react-toastify";
import { DefaultToastifySettings } from "../helperfunctions/DefaultToastSettings";
import maulundLogo from "../assets/maulund-logo.webp";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { GoogleAuthProvider } from "firebase/auth";
import GoogleLogo from "../assets/google-logo.svg";

const SignIn = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const provider = new GoogleAuthProvider();
  let { state } = useLocation();

  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        checkUserExists(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const checkUserExists = async (user) => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      if (doc.id === user.uid) {
        if (state?.prevPath && state?.prevPath === "/cart") {
          navigate("/cart");
          setLoading(false);
        } else if (state?.prevPath && state?.prevPath === "/profile") {
          navigate("/profile");
          setLoading(false);
        } else {
          navigate("/");
          setLoading(false);
        }
        setLoading(false);
        return;
      } else {
        createUser(user);
        return;
      }
    });
  };

  const createUser = async (user) => {
    await setDoc(doc(db, "users", user.uid), {
      history: [],
      id: user.uid,
      level: "bronze",
      points: 0,
      memberPoints: 0,
      name: user.displayName,
      phone: user.providerData[0].phoneNumber,
    }).then(() => {
      if (state?.prevPath && state?.prevPath === "/cart") {
        navigate("/cart");
        setLoading(false);
      } else if (state?.prevPath && state?.prevPath === "/profile") {
        navigate("/profile");
        setLoading(false);
      } else {
        navigate("/");
        setLoading(false);
      }
    });
  };

  const userSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userEmail = formRef.current.email.value;
    const userPassword = formRef.current.password.value;

    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        // Signed in
        checkAdminStatus(userCredential.user.uid);
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = firebaseErrorsCodes[errorCode];
        toast.error(errorMessage, DefaultToastifySettings);
      });
  };

  // Tjekker om brugeren er admin eller ej, derefter navigeres som nødvendigt
  const checkAdminStatus = async (user) => {
    const querySnapshot = await getDocs(collection(db, "admin"));
    querySnapshot.forEach((doc) => {
      if (doc.id === user) {
        navigate("/admin");
        setLoading(false);
        return;
      } else {
        if (state?.prevPath && state?.prevPath === "/cart") {
          navigate("/cart");
          setLoading(false);
        } else if (state?.prevPath && state?.prevPath === "/profile") {
          navigate("/profile");
          setLoading(false);
        } else {
          navigate("/");
          setLoading(false);
        }
      }
    });
  };

  // Ændrer input feltets type og ikon når man klikker på øjet.
  const handleShowPassword = () => {
    const passwordInput = formRef.current.password;
    const eyeIcon = document.querySelector("#eyeIcon");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.setAttribute(
        "class",
        "fa-solid fa-eye absolute right-5 top-2.5 text-xl text-primaryGrey"
      );
    } else {
      passwordInput.type = "password";
      eyeIcon.setAttribute(
        "class",
        "fa-solid fa-eye-slash absolute right-5 top-2.5 text-xl text-primaryGrey"
      );
    }
  };

  return (
    <>
      <PageWrapper>
        <div className="lg:w-[600px] m-auto">
          <div className="mt-10 md:mt-40">
            <img
              src={maulundLogo}
              alt="Maulund Kundeklub logo"
              className="w-52 m-auto mb-12"
            />
            <BackButtonWithArrow linkTo="/" linkText="Fortsæt uden log ind" />
            <h1 className="font-bold text-2xl mb-10">
              Velkommen tilbage i Maulund kundeklub
            </h1>
            <form
              ref={formRef}
              onSubmit={userSignIn}
              name="sign-in-form"
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  required
                  name="email"
                  placeholder="Din e-mail..."
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password">Adgangskode</label>
                <div className="flex flex-col relative">
                  <input
                    type="password"
                    required
                    name="password"
                    placeholder="Din adgangskode..."
                  />
                  <i
                    id="eyeIcon"
                    onClick={handleShowPassword}
                    className="fa-solid fa-eye-slash absolute right-5 top-2.5 text-xl text-primaryGrey"
                  ></i>
                </div>
              </div>
              {loading ? (
                <>
                  <CustomButton
                    disabled={true}
                    title={
                      <PulseLoader color="#FFFFFF" size={11} className="p-2" />
                    }
                    function={userSignIn}
                  />
                </>
              ) : (
                <>
                  <CustomButton title="Log ind" function={userSignIn} />
                </>
              )}
            </form>
          </div>
          <div
            onClick={googleSignIn}
            className="border-primaryGrey border-2 rounded-full flex items-center w-full justify-center text-center md:w-fit md:justify-start cursor-pointer mt-10 py-1 px-3"
          >
            <img className="w-10" src={GoogleLogo} alt="google logo" />
            <p>Log ind med Google</p>
          </div>
          <p className="w-full mt-14">
            Har du ikke en bruger?{" "}
            <Link className="underline" to={"/signup"}>
              Opret dig her
            </Link>
          </p>
        </div>
      </PageWrapper>
    </>
  );
};

export default SignIn;
