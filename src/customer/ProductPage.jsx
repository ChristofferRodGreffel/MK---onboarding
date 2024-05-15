import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import TopBanner from "../components/TopBanner";
import Header from "../components/Header";
import { PulseLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { formatter } from "../helperfunctions/Formatter";

const ProductPage = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      const docRef = doc(db, "products", productId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct(docSnap.data());
        console.log(docSnap.data());
        setLoading(false);
      } else {
        // docSnap.data() will be undefined in this case
      }
    };
    getProduct();
  }, [productId]);

  return (
    <PageWrapper>
      <>
        <Header />
        <TopBanner />
        {loading ? (
          <div className="m-auto mt-14">
            <PulseLoader color="#343434" size={11} />
          </div>
        ) : (
          <>
            {product !== null && (
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 mt-10 md:mt-20">
                <div>
                  <img
                    loading="lazy"
                    className="w-5/6 md:w-full m-auto"
                    src={product?.imageSource}
                    alt={product?.title}
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <h2 className="font-bold text-lg">{product?.title}</h2>
                  <p className="font-semibold text-xl">
                    {formatter.format(product?.price)}
                  </p>
                  <button
                    onClick={() => handleAddToCart(productId)}
                    className="bg-customGreen text-white font-semibold w-full py-[8px] rounded-sm mt-1 lg:font-bold"
                  >
                    Læg i kurv
                  </button>
                  <p className="pt-5">{product?.description}</p>
                </div>
              </div>
            )}
          </>
        )}
      </>
    </PageWrapper>
  );
};

export default ProductPage;
