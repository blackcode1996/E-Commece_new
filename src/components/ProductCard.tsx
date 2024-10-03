import { useContext, useEffect, useState } from "react";
import { trimText } from "../utils/common";
import { CartContext } from "../context/cartContext";

interface ProductCardProps {
  productId: number | string;
  productImage: string;
  productPrice: number;
  productTitle: string;
  productRating: number;
  productActualPrice: number;
}

const ProductCard = ({
  productId,
  productImage,
  productPrice,
  productTitle,
  productRating,
  productActualPrice,
}: ProductCardProps) => {
  
  const fullStars = Math.floor(productRating);
  const hasHalfStar = productRating % 1 >= 0.5;
  const totalStars = 5;

  const starColor =
    productRating >= 4.5
      ? "text-green-500"
      : productRating >= 3.5
      ? "text-yellow-300"
      : productRating >= 2.5
      ? "text-orange-500"
      : "text-red-500";

  const { addToCart, cart, updateQuantity, removeSingleProductFromCart } =
    useContext(CartContext);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const existingItem = cart.find((el: any) => el.id === productId);
    setQuantity(existingItem ? existingItem.quantity : 0);
  }, [cart, productId]);

  const handleCart = () => {
    const productData = {
      id: productId,
      image: productImage,
      price: productPrice,
      title: productTitle,
      rating: productRating,
    };
    addToCart(productData);
  };

  const incrementQuantity = () => {
    updateQuantity(productId, "inc");
  };

  const decrementQuantity = () => {
    updateQuantity(productId, "desc");
  };

  const deleteProductFromCart = () => {
    removeSingleProductFromCart(productId);
  };

  return (
    <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <a
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        href="#"
      >
        <img className="object-cover" src={productImage} alt="product image" />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          {(
            ((productActualPrice - productPrice) / productActualPrice) *
            100
          ).toFixed(1)}
          %
        </span>
      </a>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-xl tracking-tight text-slate-900">
            {trimText(productTitle)}
          </h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              ${productPrice.toFixed(1)}
            </span>
            <span className="text-sm text-slate-900 line-through">
              ${productActualPrice}
            </span>
          </p>
          <div className="flex items-center">
            {Array.from({ length: fullStars }).map((_, index) => (
              <svg
                key={index}
                aria-hidden="true"
                className={`h-5 w-5 ${starColor}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
            {hasHalfStar && (
              <svg
                aria-hidden="true"
                className={`h-5 w-5 ${starColor}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2.5c.375 0 .711.223.848.553l1.08 3.262h3.42c.25 0 .493.125.637.333s.174.487.092.747l-2.873 2.115c-.236.176-.358.467-.299.745l1.08 3.262c.136.426-.092.883-.482.97-.389.086-.773-.153-.956-.537l-2.873-2.115c-.236-.176-.542-.176-.778 0l-2.873 2.115c-.183.384-.566.623-.956.537-.39-.087-.618-.544-.482-.97l1.08-3.262c.059-.278-.063-.569-.299-.745L2.38 6.697c-.082-.26-.043-.548.092-.747s.387-.333.637-.333h3.42l1.08-3.262C9.289 2.723 9.625 2.5 10 2.5z"></path>
              </svg>
            )}
            {Array.from({
              length: totalStars - fullStars - (hasHalfStar ? 1 : 0),
            }).map((_, index) => (
              <svg
                key={index}
                aria-hidden="true"
                className="h-5 w-5 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
              {productRating}
            </span>
          </div>
        </div>
        {quantity === 0 ? (
          <button
            className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 w-full"
            onClick={handleCart}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add to cart
          </button>
        ) : (
          <div className="flex justify-center space-x-2 w-full">
            <button
              onClick={decrementQuantity}
              className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition duration-200"
            >
              <i className="fa-solid fa-minus"></i>
            </button>

            <span className="mx-2 text-lg font-semibold">{quantity}</span>

            <button
              onClick={incrementQuantity}
              className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition duration-200"
            >
              <i className="fa-solid fa-plus"></i>
            </button>

            <button
              onClick={deleteProductFromCart}
              className="flex items-center justify-center w-8 h-8 rounded-md bg-red-500 text-white hover:bg-red-600 transition duration-200"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
