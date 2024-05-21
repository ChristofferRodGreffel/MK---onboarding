import React from "react";
import { Link } from "react-router-dom";
import noImage from "../assets/no_image.jpg";

const ProductLine = ({ product }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-between items-center border-b-[1px] pb-5 border-gray-400 border-dashed">
      <Link to={`/product/${product.id}`} className="flex items-center">
        <div className="min-w-12 w-12 h-12 rounded-md p-1 mr-5 ">
          <img
            src={product.imageSource}
            onError={(e) => (e.target.src = noImage)}
            alt={`${product.title} lille billede`}
          />
        </div>
        <p className="text-sm">{product.title}</p>
      </Link>
      <Link
        to={`/edit-product/${product.id}`}
        className="flex items-center gap-2 text-md"
      >
        <p>Redigér</p>
        <i className="fa-regular fa-pen-to-square text-lg"></i>
      </Link>
    </div>
  );
};

export default ProductLine;
