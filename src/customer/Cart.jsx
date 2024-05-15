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
import { formatter } from "../helperfunctions/Formatter";
import CountdownTimer from "../components/CountdownTimer";

const Cart = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [localStorageBasket, setLocalStorageBasket] = useState();
  const [loading, setLoading] = useState(true);
  const [subTotal, setSubTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [savingsAmount, setSavingsAmount] = useState();
  const { globalState, setGlobalState } = useGlobalState();
  const { adminValues } = useGlobalState();

  const navigate = useNavigate();

  useEffect(() => {
    updateFromLocalStorage();
  }, []);

  // Fetches the cart from localStorage and updates states.
  // The funciton is called when changes are made to the cart (increase, decrease, discount, delete).
  const updateFromLocalStorage = () => {
    const basketFromStorage = JSON.parse(localStorage.getItem("customerOrder"));
    setLocalStorageBasket(basketFromStorage);

    if (basketFromStorage) {
      let orderTotal = basketFromStorage.orderTotal;
      let subTotal = 0;
      basketFromStorage.products.forEach((product) => {
        subTotal += product.price * product.amount;
      });
      setSubTotal(subTotal);

      if (subTotal < 400 && !basketFromStorage.discountApplied) {
        setTotalPrice(orderTotal + 29);
      } else {
        setTotalPrice(orderTotal);
      }

      if (basketFromStorage.discountApplied) {
        setSavingsAmount(basketFromStorage.discount);
        if (subTotal < 400) {
          setTotalPrice(
            (totalPrice) => totalPrice - basketFromStorage.discount + 29
          );
        } else {
          setTotalPrice(
            (totalPrice) => totalPrice - basketFromStorage.discount
          );
        }
      }

      setAllProducts(basketFromStorage.products);
      setLoading(false);
    }
  };

  // Increase product amount using localStorage
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

  // Decrease product amount using localStorage
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

  // This functions runs when deleting a product
  const handleDeleteProduct = (index, product) => {
    const newBasket = [...allProducts];
    localStorageBasket.orderTotal -= product.price * product.amount;
    setGlobalState((prevState) => prevState - product.amount);
    newBasket.splice(index, 1);
    localStorageBasket.products = newBasket;

    localStorage.setItem("customerOrder", JSON.stringify(localStorageBasket));
    setAllProducts(newBasket);
    updateFromLocalStorage();

    // If the last items is deleted, the used points are reinstated
    if (newBasket.length === 0) {
      if (localStorageBasket.discountApplied) {
        reinsertPoints(localStorageBasket.pointsUsed);
      }

      localStorage.clear();
    }
  };

  // Apply discount to order
  const handleApplyDiscount = async (
    savingsAmount,
    remainingPoints,
    pointsUsed
  ) => {
    setSavingsAmount(savingsAmount);
    if (savingsAmount === 0) {
      toast.error("Du har ingen point", DefaultToastifySettings);
      return;
    }
    if (savingsAmount > totalPrice) {
      setTotalPrice(0);
      setSavingsAmount(localStorageBasket.orderTotal);
      localStorageBasket.discount = localStorageBasket.orderTotal;
    } else {
      setTotalPrice((prevTotalPrice) => prevTotalPrice - savingsAmount);
      localStorageBasket.discount = savingsAmount;
    }

    const userRef = doc(db, "users", auth.currentUser?.uid);

    await updateDoc(userRef, {
      points: remainingPoints,
    });

    localStorageBasket.discountApplied = true;
    localStorageBasket.pointsUsed = pointsUsed;
    localStorage.setItem("customerOrder", JSON.stringify(localStorageBasket));

    updateFromLocalStorage();
  };

  // Function to reinsert points in the users account
  const reinsertPoints = async (points) => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    let pointsUsed = localStorageBasket.pointsUsed;

    if (points) {
      await updateDoc(userRef, {
        points: increment(Math.round(points)),
      });
    } else {
      await updateDoc(userRef, {
        points: increment(Math.round(pointsUsed)),
      });
    }

    if (localStorageBasket.products.length !== 0) {
      localStorageBasket.discountApplied = false;
      localStorage.setItem("customerOrder", JSON.stringify(localStorageBasket));
      updateFromLocalStorage();
    }
  };

  // Function runs when customer places order, and updates firestore accordingly
  const handlePlaceOrder = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser?.uid);
      let pointsEarned = totalPrice * adminValues.earnRate;

      // If discount is applied add object to history
      if (localStorageBasket.discountApplied) {
        let historyObject = {
          date: new Date(),
          type: "used",
          amount: localStorageBasket.pointsUsed,
          amountSaved: savingsAmount,
        };

        await updateDoc(userRef, {
          history: arrayUnion(historyObject),
        });
      }

      let historyObject = {
        date: new Date(),
        type: "earned",
        amount: Math.floor(pointsEarned),
      };

      navigate(
        `/orderrecieved/${Math.floor(pointsEarned)}/${Math.floor(
          totalPrice / 2
        )}`
      );

      await updateDoc(userRef, {
        history: arrayUnion(historyObject),
        points: increment(Math.floor(pointsEarned)),
        memberPoints: increment(Math.floor(totalPrice / 2)),
      });
    } else {
      navigate(`/orderrecieved`);
    }
    setGlobalState(0);
    localStorage.clear();
  };

  return (
    <PageWrapper>
      <Header />
      <h1 className="font-bold text-xl mt-10">Din kurv</h1>
      <hr className="border-b-[1.5px] border-primaryGrey rounded-sm mt-1.5" />
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
                        <img
                          src={product.src}
                          alt={product.title}
                          className="w-16 h-16 aspect-square lg:w-20 lg:h-20"
                          loading="lazy"
                        />
                        <p className="text-xs w-1/2 line-clamp-3 lg:text-sm lg:w-fit">
                          {product.title}
                        </p>
                        <div className="flex flex-col">
                          <p className="lg:text-lg">{product.amount} stk.</p>
                          <p className="font-bold lg:text-lg">
                            {product.price} kr.
                          </p>
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
                          <p className="font-bold text-xl text-primaryGrey">
                            {product.amount}
                          </p>
                          <i
                            onClick={() => increaseAmount(product)}
                            className="fa-solid fa-circle-plus text-lg text-primaryGrey cursor-pointer"
                          ></i>
                        </div>
                        <button
                          onClick={() => handleDeleteProduct(key, product)}
                          className="bg-customRed text-white py-1 px-2 text-sm font-medium rounded-sm absolute right-0 lg:py-1.5 lg:px-5 lg:font-semibold"
                        >
                          Fjern
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div>
                  <p className="font-bold">Dine maulund point</p>
                  <PointsBox
                    orderValue={totalPrice}
                    function={handleApplyDiscount}
                    discountApplied={localStorageBasket?.discountApplied}
                    buttonActive={true}
                    reinsertPoints={reinsertPoints}
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <h1 className="font-semibold">Subtotal</h1>
                    <p className="font-medium">{formatter.format(subTotal)}</p>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <h1 className="font-semibold">Fragt</h1>
                    {subTotal > 400 ? (
                      <div className="flex gap-2 items-center">
                        <p className="font-medium line-through text-sm text-primaryGrey">
                          {formatter.format(29)}
                        </p>
                        <p className="font-medium">{formatter.format(0)}</p>
                      </div>
                    ) : (
                      <p className="font-medium">{formatter.format(29)}</p>
                    )}
                  </div>
                  {(subTotal < 400 ||
                    (subTotal < 400 &&
                      !localStorageBasket.discountApplied)) && (
                    <p className="text-sm text-right">
                      Køb for <b>{formatter.format(400 - subTotal)}</b> mere for
                      gratis fragt!
                    </p>
                  )}
                  {localStorageBasket?.discountApplied && (
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold">Rabat</h1>
                      <p className="font-medium text-customGreen">
                        -{formatter.format(savingsAmount)}
                      </p>
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-8 border-b-2 border-primaryGrey">
                    <h1 className="text-xl font-bold">I alt.</h1>
                    <p className="text-xl font-bold">
                      {formatter.format(totalPrice)}
                    </p>
                  </div>
                  {auth.currentUser && (
                    <>
                      {Math.floor(totalPrice * 0.1) > 0 ? (
                        <p className="text-sm mt-2 text-right">
                          (Optjen{" "}
                          <b>
                            {Math.floor(totalPrice * adminValues.earnRate)}{" "}
                            point
                          </b>{" "}
                          på denne ordre)
                        </p>
                      ) : (
                        <p className="text-sm mt-2 text-right">
                          (Du optjener ikke point på denne ordre)
                        </p>
                      )}
                    </>
                  )}
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
            <CustomButton
              title="Shop videre"
              function={() => navigate("/")}
              customWidth="w-full"
            />
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Cart;
