import React, { useState } from "react";
import { PulseLoader } from "react-spinners";
import useAddToCart from "../helperfunctions/AddToCart";

const AddToCartBtn = (props) => {
  const [adding, setAdding] = useState("default");
  const addToCart = useAddToCart();

  return (
    <button
      onClick={() => addToCart(props.product, setAdding)}
      className="bg-customGreen text-white font-semibold w-full py-[5px] rounded-sm mt-1 lg:font-bold hover:bg-customDarkGreen transition-colors"
    >
      {adding === "default" && <>Læg i kurv</>}
      {adding === "processing" && (
        <>
          <PulseLoader color="#FFFFFF" size={8} />
        </>
      )}
      {adding === "completed" && <>Tilføjet!</>}
    </button>
  );
};

export default AddToCartBtn;
