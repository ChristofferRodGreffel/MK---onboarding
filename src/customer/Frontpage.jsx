import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import Header from "../components/Header";
import Product from "../components/Product";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { PulseLoader } from "react-spinners";

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

  console.log(allProducts);

  return (
    <PageWrapper>
      <Header />
      <h1 className="mt-8 text-lg">Se vores store udvalg af mobiltilbehør herunder!</h1>
      <div className="mt-10 flex justify-center gap-12 flex-wrap">
        {loading ? (
          <div className="m-auto">
            <PulseLoader color="#343434" size={11} />
          </div>
        ) : (
          <>
            {allProducts.length != 0 &&
              allProducts.map((product, key) => {
                return (
                  <Product
                    key={key}
                    productTitle={product.title}
                    imgSrc={product.imageSource}
                    altText={product.title}
                    productPrice={product.price}
                  />
                );
              })}
          </>
        )}
      </div>
    </PageWrapper>
  );
};

export default Frontpage;
