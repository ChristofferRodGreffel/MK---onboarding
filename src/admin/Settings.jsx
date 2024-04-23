import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import BackButtonWithArrow from "../components/BackButtonWithArrow";
import { useGlobalState } from "../components/GlobalStateProvider";
import SettingsBox from "../components/SettingsBox";
import { db } from "../../firebaseConfig";
import {
  DocumentSnapshot,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const Settings = () => {
  const { adminValues } = useGlobalState();
  const [earningsRate, setEarningsRate] = useState(null);
  const [bronzeExchange, setBronzeExchange] = useState(null);
  const [silverExchange, setSilverExchange] = useState(null);
  const [goldExchange, setGoldExchange] = useState(null);

  const handleChangeSetting = async (setting) => {
    const adminRef = doc(db, "admin", "settings");
    const docSnapshot = await getDoc(adminRef);
    const currentSettings = docSnapshot.data();
    console.log(currentSettings);

    let updateData = {};

    switch (setting) {
      case "earningsRate":
        updateData = { earnRate: earningsRate };
        break;
      case "exchangerateBronze":
        updateData = {
          exchangeRates: {
            ...currentSettings.exchangeRates,
            bronze: bronzeExchange,
          },
        };
        break;
      case "exchangerateSilver":
        updateData = {
          exchangeRates: {
            ...currentSettings.exchangeRates,
            silver: silverExchange,
          },
        };
        break;
      case "exchangerateGold":
        updateData = {
          exchangeRates: {
            ...currentSettings.exchangeRates,
            silver: goldExchange,
          },
        };
        break;
      default:
        break;
    }

    await updateDoc(adminRef, updateData);
  };

  return (
    <PageWrapper>
      <div className="mt-10">
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
