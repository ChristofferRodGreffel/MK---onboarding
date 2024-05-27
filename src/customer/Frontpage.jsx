import React, { createContext, useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import Header from "../components/Header";
import Product from "../components/Product";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { PulseLoader } from "react-spinners";
import TopBanner from "../components/TopBanner";

export const CartContext = createContext();

const Frontpage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllProducts = async () => {
      const q = query(collection(db, "products"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newProducts = [];
        querySnapshot.forEach((doc) => {
          newProducts.push(doc.data());
        });
        setAllProducts(newProducts);
        setLoading(false);
      });
    };
    getAllProducts();
  }, []);

  return (
    <PageWrapper>
      {!loading && (
        <>
          <Header />
          <TopBanner />
          <div className="relative flex justify-center items-center bg-[url('/src/assets/banner.webp')] bg-top bg-cover text-white h-[200px] rounded-md mt-4 p-10 text-center">
            <div className="absolute bg-black bg-opacity-30 h-full w-full rounded-md"></div>
            <div className="flex flex-col gap-1 z-10">
              <h2 className="leading-tight font-bold text-[1.8rem]">
                Velkommen til MAULUND.COM
              </h2>
              <p>Her finder du et stort udvalg af tilbehør til din mobil!</p>
            </div>
          </div>
          {loading ? (
            <div className="m-auto mt-14">
              <PulseLoader color="#343434" size={11} />
            </div>
          ) : (
            <>
              <div
                className="mt-10 ml-0 grid grid-cols-2 gap-8 gap-y-12 md:grid-cols-3 
                lg:ml-0 lg:grid-cols-4 lg:gap-y-20 lg:gap-20"
              >
                {allProducts.length != 0 &&
                  allProducts.map((product, key) => {
                    return (
                      <div key={key}>
                        <Product product={product} />
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </>
      )}
    </PageWrapper>
  );
};

export default Frontpage;
