import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Cart from "../pages/Cart";

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        element:<Products/>,
        path: "/products"
      },
      {
        element: <Cart/>,
        path: "/cart"
      }
    ],
  },
]);

export const Allroutes = () => {
  return <RouterProvider router={router} />;
};
