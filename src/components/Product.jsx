import React from "react";
import { toast } from "react-toastify";
import { DefaultToastifySettings } from "../helperfunctions/DefaultToastSettings";
import localStorageBasket from "../helperfunctions/LocalStorageBasket";

const Product = (props) => {
  const handleAddToCart = (id) => {
    const completeProduct = {
      id: id,
      title: props.productTitle,
      price: props.productPrice,
      src: props.imgSrc,
      amount: 1,
    };

    localStorageBasket(completeProduct);
    toast.success("Tilføjet til kurv!", DefaultToastifySettings);
  };

  const formatter = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  });

  return (
    <div className="w-36 flex flex-col">
      <img src={props.imgSrc} alt={props.altText} className="w-28 aspect-square place-self-center" />
      <p className="text-xs mt-3 line-clamp-4">{props.productTitle}</p>
      <p className="font-bold mt-3">{formatter.format(props.productPrice)}</p>
      <button
        onClick={() => handleAddToCart(props.id)}
        className="bg-customGreen text-white font-bold w-full py-[5px] rounded-sm mt-1"
      >
        Læg i kurv
      </button>
    </div>
  );
};

export default Product;
