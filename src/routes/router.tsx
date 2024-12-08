/* eslint-disable react-refresh/only-export-components */
import ProductRootLayout from "@/layouts/ProductRootLayout";
import RootLayout from "@/layouts/RootLayout";
import AboutPage from "@/pages/AboutPage";
import ErrorPage from "@/pages/ErrorPage";
import HomePage from "@/pages/HomePage";
import ProductDetailPage from "@/pages/products/ProductDetailPage";
import ProductPage from "@/pages/products/ProductPage";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const BlogRootLayout = lazy(() => import("@/layouts/BlogRootLayout"));
const BlogDetailPage = lazy(() => import("@/pages/blogs/BlogDetailPage"));
const BlogPage = lazy(() => import("@/pages/blogs/BlogPage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));

const SuspenseFallback = () => <div className="text-center">Loading...</div>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      {
        path: "blogs",
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <BlogRootLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<SuspenseFallback />}>
                <BlogPage />
              </Suspense>
            ),
          },
          {
            path: ":postId",
            element: (
              <Suspense fallback={<SuspenseFallback />}>
                <BlogDetailPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "products",
        element: <ProductRootLayout />,
        children: [
          { index: true, element: <ProductPage /> },
          { path: ":productId", element: <ProductDetailPage /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<SuspenseFallback />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<SuspenseFallback />}>
        <RegisterPage />
      </Suspense>
    ),
  },
]);
