/* eslint-disable react-refresh/only-export-components */
import ProductRootLayout from "@/layouts/ProductRootLayout";
import RootLayout from "@/layouts/RootLayout";
import AboutPage from "@/pages/AboutPage";
import ConfirmPasswordPage from "@/pages/auth/ConfrimPasswordPage";
import OtpPage from "@/pages/auth/OtpPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import ErrorPage from "@/pages/ErrorPage";
import HomePage from "@/pages/HomePage";
import ProductDetailPage from "@/pages/products/ProductDetailPage";
import ProductPage from "@/pages/products/ProductPage";
import {
  loginFormAction,
  logoutAction,
  registerConfirmPasswordAction,
  registerOTPAction,
  registerPhoneAction,
} from "@/router/action";
import {
  authCheckLoader,
  blogInfiniteLoader,
  confirmPaswordLoader,
  homeLoader,
  otpLoader,
  postDetailLoader,
} from "@/router/loader";
import { lazy, Suspense } from "react";
import { createBrowserRouter, redirect } from "react-router";

const BlogRootLayout = lazy(() => import("@/layouts/BlogRootLayout"));
const BlogDetailPage = lazy(() => import("@/pages/blogs/BlogDetailPage"));
const BlogPage = lazy(() => import("@/pages/blogs/BlogPage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const AuthRootLayout = lazy(() => import("@/pages/auth/AuthRootLayout"));

const SuspenseFallback = () => <div className="text-center">Loading...</div>;

export const routerActionLoader = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, loader: homeLoader },
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
            loader: blogInfiniteLoader,
          },
          {
            path: ":postId",
            element: (
              <Suspense fallback={<SuspenseFallback />}>
                <BlogDetailPage />
              </Suspense>
            ),
            loader: postDetailLoader,
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
    action: loginFormAction,
    loader: authCheckLoader,
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<SuspenseFallback />}>
        <AuthRootLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <SignUpPage />,
        action: registerPhoneAction,
        loader: authCheckLoader,
      },
      {
        path: "otp",
        element: <OtpPage />,
        loader: otpLoader,
        action: registerOTPAction,
      },
      {
        path: "confirm-password",
        element: <ConfirmPasswordPage />,
        loader: confirmPaswordLoader,
        action: registerConfirmPasswordAction,
      },
    ],
  },
  { path: "/logout", action: logoutAction, loader: () => redirect("/") },
]);
