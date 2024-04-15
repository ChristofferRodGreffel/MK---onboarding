import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import PageWrapper from "../components/PageWrapper";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DefaultToastifySettings } from "../helperfunctions/DefaultToastSettings";
import { signOut } from "firebase/auth";
import { PulseLoader } from "react-spinners";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  const handleSignOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        navigate("/signin");
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Der skete en fejl, prøv igen...", DefaultToastifySettings);
        setLoading(false);
      });
  };

  return (
    <PageWrapper>
      <div>Profile</div>
      {loading ? (
        <>
          <CustomButton
            disabled={true}
            customColor="bg-customRed"
            title={<PulseLoader color="#FFFFFF" size={11} className="p-1" />}
          />
        </>
      ) : (
        <>
          <CustomButton
            title="Log ud"
            customColor="bg-customRed"
            function={handleSignOut}
          />
        </>
      )}
    </PageWrapper>
  );
};

export default Profile;
