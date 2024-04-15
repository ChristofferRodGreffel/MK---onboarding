import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import Header from "../components/Header";
import { PulseLoader } from "react-spinners";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import PointsBox from "../components/PointsBox";
import { arrayUnion, doc, increment, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { toast } from "react-toastify";
import { DefaultToastifySettings } from "../helperfunctions/DefaultToastSettings";
import { useGlobalState } from "../components/GlobalStateProvider";

const Cart = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [localStorageBasket, setLocalStorageBasket] = useState();
  const [loading, setLoading] = useState(true);
  const [subTotal, setSubTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { globalState, setGlobalState } = useGlobalState();

  const navigate = useNavigate();

  useEffect(() => {
    updateFromLocalStorage();
  }, []);

  // Funktionen kigger efter "customerCheckout" i localStorage of henter den.
  // Vores states sættes ud fra indholdet af kurven i localStorage.
  const updateFromLocalStorage = () => {
    const basketFromStorage = JSON.parse(localStorage.getItem("customerOrder"));
    setLocalStorageBasket(basketFromStorage);

    if (basketFromStorage) {
      let orderTotal = basketFromStorage.orderTotal;
      let subTotal = 0;
      basketFromStorage.products.forEach((product) => {
        subTotal += product.price;
      });
      setSubTotal(subTotal);

      if (orderTotal < 400) {
        setTotalPrice(orderTotal + 29);
      } else {
        setTotalPrice(orderTotal);
      }

      setAllProducts(basketFromStorage.products);
      setLoading(false);
    }
  };

  // Bruges til at øge antallet af X produkt i kurven. Giver hele product objektet med videre
  // fra CheckoutProduct.jsx og øger værdien med 1. Derefter opdateres localStorage.
  const increaseAmount = (product) => {
    product.amount += 1;
    setGlobalState((prevState) => prevState + 1);
    const newBasket = [...allProducts];
    localStorageBasket.products = newBasket;
    localStorageBasket.orderTotal += product.price;
    localStorage.setItem("customerOrder", JSON.stringify(localStorageBasket));
    setAllProducts(newBasket);
    updateFromLocalStorage();
  };

  // Bruges til at mindske antallet af X produkt i kurven. Giver hele product objektet med videre
  // fra CheckoutProduct.jsx og øger værdien med 1. Derefter opdateres localStorage.
  const decreaseAmount = (product) => {
    let current = product.amount;
    if (current > 1) {
      setGlobalState((prevState) => prevState - 1);
      product.amount -= 1;
      const newBasket = [...allProducts];
      localStorageBasket.products = newBasket;
      localStorageBasket.orderTotal -= product.price;
      localStorage.setItem("customerOrder", JSON.stringify(localStorageBasket));
      setAllProducts(newBasket);
      updateFromLocalStorage();
    }
  };

  const handleDeleteProduct = (index, product) => {
    const newBasket = [...allProducts];
    localStorageBasket.orderTotal -= product.price * product.amount;
    setGlobalState((prevState) => prevState - product.amount);
    newBasket.splice(index, 1);
    localStorageBasket.products = newBasket;

    localStorage.setItem("customerOrder", JSON.stringify(localStorageBasket));
    setAllProducts(newBasket);
    updateFromLocalStorage();

    if (newBasket.length === 0) {
      const reinsertPoints = async (points) => {
        const userRef = doc(db, "users", auth.currentUser.uid);

        await updateDoc(userRef, {
          points: points,
        });
      };
      reinsertPoints(localStorageBasket.pointsUsed);

      localStorage.clear();
    }
  };

  const handleApplyDiscount = async (savingsAmount, remainingPoints, pointsUsed) => {
    if (savingsAmount === 0) {
      toast.error("Du har ingen point", DefaultToastifySettings);
      return;
    }
    if (savingsAmount > totalPrice) {
      setTotalPrice(0);
      localStorageBasket.orderTotal = 0;
    } else {
      setTotalPrice((prevTotalPrice) => prevTotalPrice - savingsAmount);
      localStorageBasket.orderTotal -= savingsAmount;
    }

    const userRef = doc(db, "users", auth.currentUser?.uid);

    await updateDoc(userRef, {
      points: remainingPoints,
    });

    localStorageBasket.discountApplied = true;
    localStorageBasket.discount = savingsAmount;
    localStorageBasket.pointsUsed = pointsUsed;
    localStorage.setItem("customerOrder", JSON.stringify(localStorageBasket));

    updateFromLocalStorage();
  };

  const formatter = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  });

  const handlePlaceOrder = async () => {
    // Do this if the order has an active discount
    if (localStorageBasket.discountApplied) {
      let historyObject = {
        date: Date(),
        type: "used",
        amount: localStorageBasket.pointsUsed,
      };

      const userRef = doc(db, "users", auth.currentUser?.uid);
      let pointsEarned = totalPrice * 0.1;

      await updateDoc(userRef, {
        history: arrayUnion(historyObject),
        points: increment(Math.floor(pointsEarned)),
        memberPoints: increment(Math.floor(totalPrice / 2)),
      });

      localStorage.clear();

      navigate("/");
    }
    // If not then do this
    else {
      const userRef = doc(db, "users", auth.currentUser?.uid);
      let pointsEarned = totalPrice * 0.1;

      await updateDoc(userRef, {
        points: increment(Math.floor(pointsEarned)),
        memberPoints: increment(Math.floor(totalPrice / 2)),
      });

      localStorage.clear();

      navigate("/");
    }
  };

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
                        <img src={product.src} alt={product.title} className="w-16 h-16 aspect-square" loading="lazy" />
                        <p className="text-xs w-1/2 line-clamp-3">{product.title}</p>
                        <div className="flex flex-col">
                          <p>{product.amount} stk.</p>
                          <p className="font-bold">{product.price} kr.</p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex items-center justify-between min-w-[80px] select-none mt-1">
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
                          onClick={() => handleDeleteProduct(key, product)}
                          className="bg-customRed text-white py-1 px-2 text-sm font-medium rounded-sm absolute right-0"
                        >
                          Fjern
                        </button>
                      </div>
                    </div>
                  );
                })}
                <PointsBox
                  orderValue={totalPrice}
                  function={handleApplyDiscount}
                  discountApplied={localStorageBasket?.discountApplied}
                />
                <div>
                  <div className="flex justify-between items-center">
                    <h1 className="font-semibold">Subtotal</h1>
                    <p className="font-medium">{formatter.format(subTotal)}</p>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <h1 className="font-semibold">Fragt</h1>
                    {totalPrice > 400 ? (
                      <div className="flex gap-2 items-center">
                        <p className="font-medium line-through text-sm text-primaryGrey">{formatter.format(29)}</p>
                        <p className="font-medium">{formatter.format(0)}</p>
                      </div>
                    ) : (
                      <p className="font-medium">{formatter.format(29)}</p>
                    )}
                  </div>
                  {subTotal < 400 && (
                    <p className="text-sm text-right">
                      Køb for <b>{formatter.format(400 - subTotal)}</b> mere for gratis fragt!
                    </p>
                  )}
                  {localStorageBasket?.discountApplied && (
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold">Rabat</h1>
                      <p className="font-medium text-customGreen">-{formatter.format(localStorageBasket?.discount)}</p>
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-8 border-b-2 border-primaryGrey">
                    <h1 className="text-xl font-bold">I alt.</h1>
                    <p className="text-xl font-bold">{formatter.format(totalPrice)}</p>
                  </div>
                  <button
                    onClick={handlePlaceOrder}
                    className="bg-customGreen w-full p-2 rounded-md text-white font-bold text-lg mt-10"
                  >
                    Gennemfør ordre
                  </button>
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
