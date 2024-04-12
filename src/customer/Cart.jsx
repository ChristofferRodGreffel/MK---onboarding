import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import Header from "../components/Header";
import { PulseLoader } from "react-spinners";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceFromBasket, setPriceFromBasket] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    updateFromLocalStorage();
  }, []);

  // Funktionen kigger efter "customerCheckout" i localStorage of henter den.
  // Vores states sættes ud fra indholdet af kurven i localStorage.
  const updateFromLocalStorage = () => {
    const basketFromStorage = JSON.parse(localStorage.getItem("customerCheckout"));

    if (basketFromStorage) {
      let totalPriceFromBasket = 0;
      let totalAmountFromBasket = 0;

      basketFromStorage.forEach((subData) => (totalPriceFromBasket += subData.price * subData.amount));
      basketFromStorage.forEach((subData) => (totalAmountFromBasket += subData.amount));

      console.log(totalPriceFromBasket);
      if (totalPriceFromBasket > 200) {
        totalPriceFromBasket - 39;
      }

      setAllProducts(basketFromStorage);
      setPriceFromBasket(totalPriceFromBasket);
      setLoading(false);
    }
  };

  // Bruges til at øge antallet af X produkt i kurven. Giver hele product objektet med videre
  // fra CheckoutProduct.jsx og øger værdien med 1. Derefter opdateres localStorage.
  const increaseAmount = (product) => {
    product.amount += 1;
    const newBasket = [...allProducts];
    localStorage.setItem("customerCheckout", JSON.stringify(newBasket));
    setAllProducts(newBasket);
    updateFromLocalStorage();
  };

  // Bruges til at mindske antallet af X produkt i kurven. Giver hele product objektet med videre
  // fra CheckoutProduct.jsx og øger værdien med 1. Derefter opdateres localStorage.
  const decreaseAmount = (product) => {
    let current = product.amount;
    if (current > 1) {
      product.amount -= 1;
      const newBasket = [...allProducts];
      localStorage.setItem("customerCheckout", JSON.stringify(newBasket));
      setAllProducts(newBasket);
      updateFromLocalStorage();
    }
  };

  const handleDeleteProduct = (index) => {
    const newBasket = [...allProducts];
    newBasket.splice(index, 1);
    localStorage.setItem("customerCheckout", JSON.stringify(newBasket));
    setAllProducts(newBasket);
    updateFromLocalStorage();
  };

  const formatter = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  });

  return (
    <PageWrapper>
      <Header />
      <h1 className="font-bold text-xl mt-10">Din kurv</h1>

      <div className="mt-5 flex flex-col justify-center gap-10">
        {allProducts && allProducts.length != 0 ? (
          <>
            {loading ? (
              <div className="m-auto">
                <PulseLoader color="#343434" size={11} />
              </div>
            ) : (
              <>
                {allProducts.map((product, key) => {
                  return (
                    <div key={key} className="relative">
                      <div className="flex justify-between items-center">
                        <img src={product.src} alt={product.title} className="w-16 h-16 aspect-square" />
                        <p className="text-xs w-1/2 line-clamp-3">{product.title}</p>
                        <div className="flex flex-col">
                          <p>{product.amount} stk.</p>
                          <p className="font-bold">{product.price} kr.</p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex items-center justify-between min-w-[95px] select-none mt-1">
                          <i
                            onClick={() => decreaseAmount(product)}
                            className={`fa-solid fa-circle-minus text-primaryGrey text-lg cursor-pointer ${
                              product.amount === 1 && `text-zinc-500`
                            }`}
                          ></i>
                          <p className="font-bold text-xl text-primaryGrey">{product.amount}</p>
                          <i
                            onClick={() => increaseAmount(product)}
                            className="fa-solid fa-circle-plus text-lg text-primaryGrey cursor-pointer"
                          ></i>
                        </div>
                        <button
                          onClick={() => handleDeleteProduct(key)}
                          className="bg-customRed text-white py-1 px-2 text-sm font-medium rounded-sm absolute right-0"
                        >
                          Fjern
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div>
                  <div className="flex justify-between items-center">
                    <h1 className="font-semibold">Subtotal</h1>
                    <p className="font-medium">{formatter.format(priceFromBasket)}</p>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <h1 className="font-semibold">Fragt</h1>
                    {priceFromBasket > 400 ? (
                      <div className="flex gap-2 items-center">
                        <p className="font-medium line-through text-sm text-primaryGrey">{formatter.format(39)}</p>
                        <p className="font-medium">{formatter.format(0)}</p>
                      </div>
                    ) : (
                      <p className="font-medium">{formatter.format(29)}</p>
                    )}
                  </div>
                  {priceFromBasket < 400 && (
                    <p className="text-sm text-right">
                      Køb for <b>{formatter.format(400 - priceFromBasket)}</b> mere for gratis fragt!
                    </p>
                  )}
                  <div className="flex justify-between items-center mt-8 border-b-2 border-primaryGrey">
                    <h1 className="text-xl font-bold">I alt.</h1>
                    {priceFromBasket > 400 ? (
                      <p className="text-xl font-bold">{formatter.format(priceFromBasket)}</p>
                    ) : (
                      <p className="text-xl font-bold">{formatter.format(priceFromBasket + 29)}</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <div>
            <p className="my-5">Ingen varer i kurven...</p>
            <CustomButton title="Shop videre" function={() => navigate("/")} customWidth="w-full" />
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Cart;
