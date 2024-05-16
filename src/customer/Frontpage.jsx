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
          {/* <h1 className="mt-8 text-xl font-semibold">
            Se vores store udvalg af mobiltilbehør herunder!
          </h1>
          <hr className="border-b-[1.5px] mt-1 border-primaryGrey" /> */}
          {loading ? (
            <div className="m-auto mt-14">
              <PulseLoader color="#343434" size={11} />
            </div>
          ) : (
            <>
              <div
                className="mt-10 ml-0 grid grid-cols-2 gap-10 gap-y-12 md:grid-cols-3 
                lg:ml-0 lg:grid-cols-4 lg:gap-y-20 lg:gap-20"
              >
                {allProducts.length != 0 &&
                  allProducts.map((product, key) => {
                    return (
                      <div key={key}>
                        <Product product={product} productPrice={product.price.toLocaleString("da-DK")} />
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
