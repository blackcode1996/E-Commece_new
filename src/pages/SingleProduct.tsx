import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { CartContext } from "../context/cartContext";

interface Product {
  id: number | string;
  image: string;
  price: number;
  title: string;
  rating: number;
  description: string;
}

const SingleProduct = () => {
  const data = useLoaderData() as Product;

  const { addToCart, cart, updateQuantity, removeSingleProductFromCart } =useContext(CartContext);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const existingItem = cart.find((el: any) => el.id === data.id);
    setQuantity(existingItem ? existingItem.quantity : 0);
  }, [cart, data]);

  const handleCart = () => {
    const productData = {
      id: data.id,
      image: data.image,
      price: data.price,
      title: data.title,
      rating: data.rating,
    };
    addToCart(productData);
  };

  const incrementQuantity = () => {
    updateQuantity(data.id, "inc");
  };

  const decrementQuantity = () => {
    updateQuantity(data.id, "desc");
  };

  const deleteProductFromCart = () => {
    removeSingleProductFromCart(data.id);
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
              <img
                className="w-full h-full object-cover"
                src={data.image}
                alt="Product Image"
              />
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
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

                    <span className="mx-2 text-lg font-semibold">
                      {quantity}
                    </span>

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
              <div className="w-1/2 px-2">
                <Link to="/">
                  <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-black mb-2">{data.title}</h2>
            <p className="text-gray-600 text-sm mb-4">{data.description}</p>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-black">Price:</span>
                <span className="text-gray-600">${data.price}</span>
              </div>
              <div>
                <span className="font-bold text-black">Availability:</span>
                <span className="text-gray-600">In Stock</span>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-black">Select Color:</span>
              <div className="flex items-center mt-2">
                <button className="w-6 h-6 rounded-full bg-gray-800 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-red-500 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-blue-500 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-yellow-500 mr-2"></button>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-black">Select Size:</span>
              <div className="flex items-center mt-2">
                <button className="bg-gray-300 text-black py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                  S
                </button>
                <button className="bg-gray-300 text-black py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                  M
                </button>
                <button className="bg-gray-300 text-black py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                  L
                </button>
                <button className="bg-gray-300 text-black py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                  XL
                </button>
                <button className="bg-gray-300 text-black py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                  XXL
                </button>
              </div>
            </div>
            <div>
              <span className="font-bold text-black">Product Description:</span>
              <p className="text-gray-600 text-sm mt-2">{data.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
