import { createContext, useState, useEffect, ReactNode } from "react";

export const CartContext = createContext(null);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (data: any) => {
    const existingItemIndex = cart.findIndex((item) => item.id === data.id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      const dataToAdd = {
        ...data,
        quantity: 1,
      };
      setCart((prev) => [...prev, dataToAdd]);
    }
  };

  const removeSingleProductFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const removeAllProductsFromCart = () => {
    setCart([]);
  };

  const updateQuantity = (id: number, type: string) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQuantity =
              type === "inc" ? item.quantity + 1 : item.quantity - 1;
            return newQuantity <= 0 ? null : { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item !== null)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeAllProductsFromCart,
        updateQuantity,
        removeSingleProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
