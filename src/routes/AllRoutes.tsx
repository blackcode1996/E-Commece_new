import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import SingleProduct from "../pages/SingleProduct";
import { fetchData } from "../utils/common";
import Blog from "../pages/Blog";
import SingleBlog from "../pages/SingleBlog";

const PRODUCTS_BASE_URL = import.meta.env.VITE_BASE_PRODUCTS_API;
const POSTS_BASE_URL = import.meta.env.VITE_BASE_POSTS_API;
const page = 1

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <Products />,
        path: "/products",
      },
      {
        element: <Cart />,
        path: "/cart",
      },
      {
        element: <SingleProduct />,
        path: "/products/:id",
        loader: (e) => fetchData(`${PRODUCTS_BASE_URL}/${e.params.id}`),
      },
      {
        element: <Blog />,
        path: "/blog",
        loader: () => fetchData(POSTS_BASE_URL),
      },
      {
        element: <SingleBlog />,
        path: "/blog/:id",
        loader: (e) => fetchData(`${POSTS_BASE_URL}/${e.params.id}`),
      },
      {
        path:"*",
        element:<h1>Not found</h1>
      }
    ],
  },
]);

export const Allroutes = () => {
  return <RouterProvider router={router} />;
};
