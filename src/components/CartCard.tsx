import React, { useContext } from "react";
import { CartContext } from "../context/cartContext";

const CartCard = ({
  productId,
  productImage,
  productPrice,
  productTitle,
  productQuantity,
}) => {
  const { updateQuantity } = useContext(CartContext);

  return (
    <div
      key={productId}
      className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
    >
      <div className="flex w-2/5">
        <div className="w-20">
          <img className="h-24" src={productImage} alt={productTitle} />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">{productTitle}</span>
          <span className="text-red-500 text-xs">Brand Name</span>
          <a
            href="#"
            className="font-semibold hover:text-red-500 text-gray-500 text-xs"
          >
            Remove
          </a>
        </div>
      </div>
      <div className="flex justify-center w-1/5">
        <button
          className="text-gray-600 w-3"
          onClick={() => updateQuantity(productId, "desc")}
        >
          -
        </button>
        <input
          className="mx-2 border text-center w-8"
          type="text"
          value={productQuantity}
          readOnly
        />
        <button
          className="text-gray-600 w-3"
          onClick={() => updateQuantity(productId, "inc")}
        >
          +
        </button>
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">
        ${productPrice.toFixed(1)}
      </span>
      <span className="text-center w-1/5 font-semibold text-sm">
        ${(productPrice * productQuantity).toFixed(1)}
      </span>
    </div>
  );
};

export default CartCard;
