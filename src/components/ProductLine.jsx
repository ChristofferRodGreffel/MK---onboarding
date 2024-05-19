import React from "react";
import { Link } from "react-router-dom";

const ProductLine = ({ product }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-between items-center border-b-[1px] pb-5 border-gray-400 border-dashed">
      <Link to={`/product/${product.id}`} className="flex items-center">
        <div className="min-w-12 w-12 h-12 border-[1px] rounded-md p-1 mr-5 border-gray-400">
          <img src={product.imageSource} alt={`${product.title} lille billede`} />
        </div>
        <p className="text-sm">{product.title}</p>
      </Link>
      <div className="flex items-center gap-2 text-md">
        <Link to={`/edit-product/${product.id}`}>Redigér</Link>
        <i className="fa-regular fa-pen-to-square text-lg"></i>
      </div>
    </div>
  );
};

export default ProductLine;
