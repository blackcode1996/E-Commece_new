import { createContext, useEffect, useState } from "react";
import { fetchData } from "../utils/common";

export interface ProductContextType {
  products: any; 
  loading: boolean;
  error: string | null;
}


export const productContext = createContext<ProductContextType | null>(null);

export const ProductContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const BASE_URL = import.meta.env.VITE_BASE_PRODUCTS_API;

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const data = await fetchData(BASE_URL);
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, []);

  return (
    <productContext.Provider value={{ products, loading, error }}>
      {children}
    </productContext.Provider>
  );
};
