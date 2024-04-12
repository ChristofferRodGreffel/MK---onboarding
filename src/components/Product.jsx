import React from "react";

const Product = (props) => {
  return (
    <div className="w-32">
      <img src={props.imgSrc} alt={props.altText} className="w-full aspect-square" />
      <p className="text-sm mt-3 line-clamp-3">{props.productTitle}</p>
      <p className="font-bold mt-1">{props.productPrice},00 kr.</p>
      <button className="bg-customGreen text-white font-bold w-full py-1.5 rounded-md mt-2">Læg i kurv</button>
    </div>
  );
};

export default Product;
