import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import ProductLine from "./ProductLine";
import { Link } from "react-router-dom";

const ProductsOverview = () => {
  const [allProducts, setAllProducts] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push(doc.data());
      });
      setAllProducts(products);
    });
  }, []);

  return (
    <div className="mt-8 flex flex-col">
      <div className="flex flex-col gap-2 justify-between md:items-end md:flex-row">
        <p className="font-semibold text-xl">Alle produkter</p>
        <div className="flex gap-2 items-center w-fit bg-customDarkGreen text-white rounded-md px-4 py-2">
          <Link to="/create-product" className="font-medium">
            Tilføj produkt
          </Link>
          <i className="fa-solid fa-pen-to-square text-lg"></i>
        </div>
      </div>
      <hr className="border-b-[1.5px] border-primaryGrey mt-2" />
      <div className="flex flex-col gap-5 mt-5">
        {allProducts?.map((product, key) => {
          return (
            <div key={key}>
              <ProductLine product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsOverview;
