import { Suspense } from "react";
import {
  createHashRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import LoginPage from "./components/LoginPage/LoginPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import Layout from "./Layout/Layout";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Loading from "./components/Loading/Loading";
import ProtectedRoute from "./components/ProtectedRoute";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import OtherPage from "./pages/OtherPage/OtherPage";
import CategoriesPage from "./pages/OtherPage/CategoriesPage";
import BrandsPage from "./pages/OtherPage/BrandsPage";
import BannersPage from "./pages/OtherPage/BannersPage";
import AddProductPage from "./pages/AddProductPage/AddProductPage";

export default function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Navigate to="/admin-login" replace />,
    },

    // ADMIN LOGIN
    {
      path: "/admin-login",
      element: (
        <Suspense fallback={<Loading />}>
          <LoginPage />
        </Suspense>
      ),
    },

    // ADMIN PANEL
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <AdminPage />
            </Suspense>
          ),
        },
        {
          path: "orders",
          element: (
            <Suspense fallback={<Loading />}>
              <OrdersPage />
            </Suspense>
          ),
        },
        {
          path: "products",
          element: (
            <Suspense fallback={<Loading />}>
              <ProductsPage />
            </Suspense>
          ),
        },
        {
          path: "products/add",
          element: (
            <Suspense fallback={<Loading />}>
              <AddProductPage />
            </Suspense>
          ),
        },
        {
          path: "users",
          element: (
            <Suspense fallback={<Loading />}>
              <UsersPage />
            </Suspense>
          ),
        },
        {
          path: "other",
          element: (
            <Suspense fallback={<Loading />}>
              <OtherPage />
            </Suspense>
          ),
          children: [
            {
              index: true,
              element: <Navigate to="categories" replace />,
            },
            {
              path: "categories",
              element: (
                <Suspense fallback={<Loading />}>
                  <CategoriesPage />
                </Suspense>
              ),
            },
            {
              path: "brands",
              element: (
                <Suspense fallback={<Loading />}>
                  <BrandsPage />
                </Suspense>
              ),
            },
            {
              path: "banners",
              element: (
                <Suspense fallback={<Loading />}>
                  <BannersPage />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}