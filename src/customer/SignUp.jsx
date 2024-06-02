import React, { useRef, useState } from "react";
import CustomButton from "../components/CustomButton";
import PageWrapper from "../components/PageWrapper";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { firebaseErrorsCodes } from "../../firebaseErrorCodes";
import { toast } from "react-toastify";
import { DefaultToastifySettings } from "../helperfunctions/DefaultToastSettings";
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import maulundLogo from "../assets/maulund-logo.webp";

const SignUp = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Skifter typen af input feltet når man trykker på øjet
  // og ændrer samtidig ikonet.
  const handleShowPassword = () => {
    const passwordInput = formRef.current.password;
    const eyeIcon = document.querySelector("#eyeIcon");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.setAttribute("class", "fa-solid fa-eye absolute right-5 top-3.5 text-primaryGrey");
    } else {
      passwordInput.type = "password";
      eyeIcon.setAttribute("class", "fa-solid fa-eye-slash absolute right-5 top-3.5 text-primaryGrey");
    }
  };

  // Henter email og password og opretter en profil med firebase auth.
  const userSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    const userEmail = formRef.current.email.value;
    const userPassword = formRef.current.password.value;

    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        addUserData(user);
      })
      .then(() => {
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = firebaseErrorsCodes[errorCode];
        toast.error(errorMessage, DefaultToastifySettings);
      });
  };

  // Tilføjer brugerdata til firestore
  const addUserData = async (user) => {
    const username = formRef.current.name.value;
    const tel = formRef.current.phone.value;

    await setDoc(doc(db, "users", user.uid), {
      history: [],
      id: user.uid,
      level: "bronze",
      points: 0,
      memberPoints: 0,
      name: username,
      onboarded: false,
      phone: tel,
    });
  };

  return (
    <>
      <PageWrapper>
        <div className="lg:w-[600px] m-auto">
          <div className="mt-10">
            <img src={maulundLogo} alt="Maulund Kundeklub logo" className="w-52 m-auto" />
            <div className="mb-5 mt-8">
              <h1 className="font-bold text-2xl">Opret en konto i Maulund kundeklub</h1>
            </div>
            <form ref={formRef} onSubmit={userSignUp} name="sign-up-form" className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label htmlFor="name">Dit navn</label>
                <input type="text" required name="name" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone">Dit telefonnr.</label>
                <input type="tel" required name="phone" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Din email</label>
                <input type="email" required name="email" />
              </div>

              <div className="flex flex-col">
                <label htmlFor="password">Adgangskode*</label>
                <div className="flex flex-col relative">
                  <input type="password" required name="password" />
                  <i
                    id="eyeIcon"
                    onClick={handleShowPassword}
                    className="fa-solid fa-eye-slash absolute right-5 top-3.5 text-primaryGrey"
                  ></i>
                </div>
                <p className="italic text-sm">*Skal være mindst (6) karakterer</p>
              </div>
              {loading ? (
                <>
                  <CustomButton
                    title={<PulseLoader color="#FFFFFF" size={11} className="p-2" />}
                    function={userSignUp}
                  />
                </>
              ) : (
                <>
                  <CustomButton title="Opret profil" function={userSignUp} />
                </>
              )}
            </form>
          </div>
          <p className="text-center mt-10 w-full">
            Har du allerede en profil?{" "}
            <Link className="underline" to={"/signin"}>
              Log ind her
            </Link>
          </p>
        </div>
      </PageWrapper>
    </>
  );
};

export default SignUp;
