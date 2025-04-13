/* eslint-disable react-refresh/only-export-components */
import ProductRootLayout from "@/layouts/ProductRootLayout";
import RootLayout from "@/layouts/RootLayout";
import AboutPage from "@/pages/AboutPage";
import ConfirmPasswordPage from "@/pages/auth/ConfrimPasswordPage";
import ForgetPasswordPage from "@/pages/auth/ForgetPasswordPage";
import NewPasswordPage from "@/pages/auth/NewPasswordPage";
import OtpPage from "@/pages/auth/OtpPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import VerifyOtpPage from "@/pages/auth/VerifyOtpPage";
import ErrorPage from "@/pages/ErrorPage";
import HomePage from "@/pages/HomePage";
import ProductDetailPage from "@/pages/products/ProductDetailPage";
import ProductPage from "@/pages/products/ProductPage";
import SettingPage from "@/pages/SettingPage";
import {
  forgetPasswordAction,
  loginFormAction,
  logoutAction,
  newPasswordAction,
  otpAction,
  registerConfirmPasswordAction,
  registerPhoneAction,
  updatePasswordAction,
  verifyOtpAction,
} from "@/router/action";
import {
  authCheckLoader,
  blogInfiniteLoader,
  confirmPaswordLoader,
  homeLoader,
  newPaswordLoader,
  otpLoader,
  postDetailLoader,
  productDetailLoader,
  productsInfiniteLoader,
  verifyOtpLoader,
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
        path: "setting",
        element: <SettingPage />,
        action: updatePasswordAction,
      },
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
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <ProductRootLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: <ProductPage />,
            loader: productsInfiniteLoader,
          },
          {
            path: ":productId",
            element: <ProductDetailPage />,
            loader: productDetailLoader,
            // action: favoriteAction,
          },
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
        action: otpAction,
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
  {
    path: "/forget-password",
    element: <AuthRootLayout />,
    children: [
      {
        index: true,
        element: <ForgetPasswordPage />,
        action: forgetPasswordAction,
      },
      {
        path: "verify",
        element: <VerifyOtpPage />,
        loader: verifyOtpLoader,
        action: verifyOtpAction,
      },
      {
        path: "new-password",
        element: <NewPasswordPage />,
        loader: newPaswordLoader,
        action: newPasswordAction,
      },
    ],
  },
]);
