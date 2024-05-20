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
      <div className="flex flex-col-reverse gap-5 justify-between md:items-end md:flex-row md:gap-2">
        <p className="font-semibold text-xl">Alle produkter</p>
        <Link
          to="/create-product"
          className="flex gap-2 items-center w-fit bg-customDarkGreen text-white rounded-md px-4 py-2"
        >
          <p className="font-medium">Tilføj produkt</p>
          <i className="fa-solid fa-pen-to-square text-lg"></i>
        </Link>
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
