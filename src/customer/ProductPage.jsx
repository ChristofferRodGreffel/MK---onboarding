import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import TopBanner from "../components/TopBanner";
import Header from "../components/Header";
import { PulseLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { formatter } from "../helperfunctions/Formatter";
import useAddToCart from "../helperfunctions/AddToCart";

const ProductPage = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const addToCart = useAddToCart();
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
                <div className="flex flex-col gap-4">
                  <h2 className="font-bold text-lg">{product?.title}</h2>
                  <div>
                    <p className="font-semibold text-2xl mb-1">{formatter.format(product?.price)}</p>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-customGreen text-white font-semibold w-full py-[8px] rounded-sm mt-1 lg:font-bold hover:bg-customDarkGreen transition-colors"
                    >
                      Læg i kurv
                    </button>
                  </div>
                  <div>
                    <p className="font-medium">Produktbeskrivelse</p>
                    <hr className="border-b-1 border-primaryGrey" />
                    <p className="pt-3 text-sm">{product?.description}</p>
                  </div>
                  <div>
                    <hr className="border-b-1 border-primaryGrey mb-5" />
                    <p>
                      <b>SKU:</b> 1233462346
                    </p>
                  </div>
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
