import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { Link, useNavigate } from "react-router-dom";
import CustomerCard from "../components/CustomerCard";
import { query } from "firebase/database";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { DefaultToastifySettings } from "../helperfunctions/DefaultToastSettings";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const ControlPanel = () => {
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCustomers();
  }, []);

  const getAllCustomers = async () => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {
        toast.error("Der skete en fejl, prøv igen...", DefaultToastifySettings);
      });
  };

  const handleFilterUsers = async (e) => {
    const inputValue = e.target.value.toLowerCase();
    if (inputValue) {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(inputValue) ||
          user.phone.toString().includes(inputValue)
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(null);
    }
  };

  return (
    <PageWrapper>
      <div className="mt-10">
        <h1 className="font-bold text-2xl">Maulund Kundeklub</h1>
        <p className="text-xl">Kontrolpanel</p>
        <div className="flex justify-between mt-5">
          <Link
            to={"/admin/settings"}
            className="bg-primaryGrey text-white font-medium py-2 px-5 rounded-md flex items-center gap-2"
          >
            Indstillinger <i className="fa-solid fa-gear"></i>
          </Link>
          <button
            onClick={handleLogOut}
            className="bg-customRed text-white font-medium py-2 px-5 rounded-md flex items-center gap-2"
          >
            Log ud <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
        <div className="mt-5">
          <input
            onChange={(e) => handleFilterUsers(e)}
            type="search"
            name="customer-search"
            id="customerSearch"
            placeholder="Søg efter kunde"
            className="border-2 border-primaryGrey w-full rounded-md py-2 px-5"
          />
          <div className="flex flex-col gap-3 mt-5">
            {filteredUsers
              ? filteredUsers.map((user, key) => {
                  return (
                    <div key={key}>
                      <CustomerCard
                        name={user.name}
                        points={user.points}
                        id={user.id}
                      />
                    </div>
                  );
                })
              : users?.map((user, key) => {
                  return (
                    <div key={key}>
                      <CustomerCard
                        name={user.name}
                        points={user.points}
                        id={user.id}
                      />
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ControlPanel;
