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
import noImage from "../assets/no_image.jpg";
import { calculateDiscount } from "../helperfunctions/CalculateDiscount";
import AddToCartBtn from "../components/AddToCartBtn";

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
                  {product?.discountPrice && (
                    <p className="bg-yellow-300 w-fit px-2 py-1 rounded-full font-semibold">
                      Spar{" "}
                      {calculateDiscount(
                        Number(product.price),
                        Number(product.discountPrice)
                      )}
                      %
                    </p>
                  )}
                  <img
                    loading="lazy"
                    className="w-5/6 md:w-full m-auto"
                    onError={(e) => (e.target.src = noImage)}
                    src={product?.imageSource}
                    alt={product?.title}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <h2 className="font-bold text-lg">{product?.title}</h2>
                  <div>
                    <hr className="border-b-1 border-zinc-400" />
                    {product.discountPrice ? (
                      <div className="flex items-center gap-2">
                        <p className="font-bold py-3 line-through text-sm text-zinc-600">
                          {formatter.format(product.price)}
                        </p>
                        <p className="font-bold text-xl py-3 text-customRed">
                          {formatter.format(product.discountPrice)}
                        </p>
                      </div>
                    ) : (
                      <>
                        <p className="font-semibold text-xl py-3">
                          {formatter.format(product?.price)}
                        </p>
                      </>
                    )}

                    <hr className="border-b-1 border-zinc-400 " />
                    <div className="mt-3 w-1/2">
                      <AddToCartBtn product={product} />
                    </div>
                  </div>
                  <div className="mt-5">
                    <p className="font-medium">Produktbeskrivelse</p>
                    <hr className="border-b-1 border-primaryGrey" />
                    <p className="pt-3 text-sm whitespace-pre-wrap">
                      {product?.description}
                    </p>
                  </div>
                  <div className="text-sm">
                    <hr className="border-b-1 border-primaryGrey mb-5" />
                    <p className="mb-3 capitalize">
                      <b>Farve:</b> {product?.color}
                    </p>
                    <p>
                      <b>SKU:</b> {product?.sku}
                    </p>
                    <p>
                      <b>EAN:</b> {product?.ean}
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
