import React, { useRef, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import BackButtonWithArrow from "../components/BackButtonWithArrow";
import { useGlobalState } from "../components/GlobalStateProvider";
import SettingsBox from "../components/SettingsBox";
import { db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { DefaultToastifySettings } from "../helperfunctions/DefaultToastSettings";
import AdminHeader from "./AdminHeader";

const Settings = () => {
  const { adminValues } = useGlobalState();
  const [earningsRate, setEarningsRate] = useState(null);
  const [bronzeExchange, setBronzeExchange] = useState(null);
  const [silverExchange, setSilverExchange] = useState(null);
  const [goldExchange, setGoldExchange] = useState(null);

  const handleChangeSetting = async (setting) => {
    const settingsRef = doc(db, "general", "settings");
    const docSnapshot = await getDoc(settingsRef);
    const currentSettings = docSnapshot.data();

    let updateData = {};

    switch (setting) {
      case "earningsRate":
        updateData = { earnRate: earningsRate };
        toast.success("Indstilling ændret", DefaultToastifySettings);
        break;
      case "exchangerateBronze":
        updateData = {
          exchangeRates: {
            ...currentSettings.exchangeRates,
            bronze: bronzeExchange,
          },
        };
        toast.success("Indstilling ændret", DefaultToastifySettings);
        break;
      case "exchangerateSilver":
        updateData = {
          exchangeRates: {
            ...currentSettings.exchangeRates,
            silver: silverExchange,
          },
        };
        toast.success("Indstilling ændret", DefaultToastifySettings);
        break;
      case "exchangerateGold":
        updateData = {
          exchangeRates: {
            ...currentSettings.exchangeRates,
            silver: goldExchange,
          },
        };
        toast.success("Indstilling ændret", DefaultToastifySettings);
        break;
      default:
        break;
    }

    await updateDoc(settingsRef, updateData).catch(() =>
      toast.error("Der er sket en fejl", DefaultToastifySettings)
    );
  };

  return (
    <PageWrapper>
      <div className="mt-10">
        <AdminHeader />
      </div>
      <div className="mt-5">
        <BackButtonWithArrow
          linkText="Tilbage til kontrolpanel"
          linkTo={`/admin`}
        />
      </div>
      <h1 className="font-bold text-xl mb-5">Indstillinger</h1>
      <div className="flex flex-col gap-2">
        <div>
          <h2 className="text-lg font-semibold">Optjening af point</h2>
          <p className="mt-1">
            Herunder kan du rette hvor mange point en kunde skal optjene pr. kr.
          </p>
          <SettingsBox
            title="Antal point pr. DKK"
            name="earningsRate"
            state={earningsRate}
            setState={setEarningsRate}
            placeholder={adminValues.earnRate}
            onClick={handleChangeSetting}
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Point værdi</h2>
          <p className="mt-1">
            Herunder kan du rette hvor meget point skal være værd på de
            forskellige klub niveauer.
          </p>
          <SettingsBox
            title="Point værdi - Bronze kunde"
            name="exchangerateBronze"
            state={bronzeExchange}
            setState={setBronzeExchange}
            placeholder={adminValues.exchangeRates.bronze}
            textColor="text-bronze"
            onClick={handleChangeSetting}
          />
          <SettingsBox
            title="Point værdi - Sølv kunde"
            name="exchangerateSilver"
            state={silverExchange}
            setState={setSilverExchange}
            placeholder={adminValues.exchangeRates.silver}
            textColor="text-silver"
            onClick={handleChangeSetting}
          />
          <SettingsBox
            title="Point værdi - Guld kunde"
            name="exchangerateGold"
            state={goldExchange}
            setState={setGoldExchange}
            placeholder={adminValues.exchangeRates.gold}
            textColor="text-gold"
            onClick={handleChangeSetting}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Settings;
