import BlogRootLayout from "@/layouts/BlogRootLayout";
import ProductRootLayout from "@/layouts/ProductRootLayout";
import RootLayout from "@/layouts/RootLayout";
import AboutPage from "@/pages/AboutPage";
import BlogDetailPage from "@/pages/blogs/BlogDetailPage";
import BlogPage from "@/pages/blogs/BlogPage";
import ErrorPage from "@/pages/ErrorPage";
import HomePage from "@/pages/HomePage";
import ProductDetailPage from "@/pages/products/ProductDetailPage";
import ProductPage from "@/pages/products/ProductPage";
import { createBrowserRouter } from "react-router-dom";

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
        element: <BlogRootLayout />,
        children: [
          { index: true, element: <BlogPage /> },
          { path: ":postId", element: <BlogDetailPage /> },
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
]);
