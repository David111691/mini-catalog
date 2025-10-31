import { createBrowserRouter, Navigate } from "react-router";
import App from "./App";
import ProductsList from "./pages/ProductsList";
import ProductDetails from "./pages/ProductDetails";
import CreateProduct from "./pages/CreateProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/products" replace />,
      },
      {
        path: "products",
        element: <ProductsList />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/create-product",
        element: <CreateProduct />,
      },
    ],
  },
]);

export default router;
