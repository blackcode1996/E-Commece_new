import { Key, SetStateAction, useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cartContext";
import CartCard from "../components/CartCard";
import { Link } from "react-router-dom";
import { fetchConversionRate } from "../utils/common";

const Cart = () => {
  const { cart } = useContext(CartContext);
  const [currency, setCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalItems = cart.length;
  const totalCostInUSD = cart
    .reduce((acc: number, product: { price: number; quantity: number; }) => acc + product.price * product.quantity, 0)
    .toFixed(1);

  useEffect(() => {
    const getConversionRate = async () => {
      setLoading(true); 
      setError(""); 
      try {
        const rate = await fetchConversionRate(currency, totalCostInUSD);
        if (typeof rate === "number") {
          setConversionRate(rate);
        } else {
          throw new Error(rate); 
        }
      } catch (error) {
        setError("Failed to fetch conversion rate. Please try again later."); 
      } finally {
        setLoading(false); 
      }
    };

    getConversionRate();
  }, [currency, totalCostInUSD]);

  const handleCurrencyChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setCurrency(event.target.value);
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{totalItems} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Quantity
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Price
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Total
            </h3>
          </div>

          {/* Product Rows */}
          {cart.map((product: { id: Key | null | undefined; image: any; price: number; title: any; quantity: any; }) => (
            <CartCard
              key={product.id}
              productId={product.id}
              productImage={product.image}
              productPrice={product.price * conversionRate}
              productTitle={product.title}
              productQuantity={product.quantity}
            />
          ))}

          <Link
            to="/products"
            className="flex font-semibold text-indigo-600 text-sm mt-10"
          >
            Continue Shopping
          </Link>
        </div>

        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              Items {totalItems}
            </span>
            <span className="font-semibold text-sm">
              ${(totalCostInUSD * conversionRate).toFixed(2)}
            </span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">
              Change Currency
            </label>
            <select
              value={currency}
              onChange={handleCurrencyChange}
              className="block p-2 text-gray-600 w-full text-sm"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="AUD">AUD</option>
              <option value="IND">INR</option>
            </select>
          </div>
          <div className="border-t mt-8">
            {loading ? (
              <div className="flex justify-center py-6 text-sm">
                Loading conversion rate...
              </div>
            ) : error ? (
              <div className="flex justify-center py-6 text-sm text-red-600">
                {error}
              </div>
            ) : (
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>
                  {currency} {(totalCostInUSD * conversionRate).toFixed(2)}
                </span>
              </div>
            )}
            <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
