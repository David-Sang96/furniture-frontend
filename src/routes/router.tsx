import BlogRootLayout from "@/layouts/BlogRootLayout";
import RootLayout from "@/layouts/RootLayout";
import AboutPage from "@/pages/AboutPage";
import BlogDetailPage from "@/pages/blogs/BlogDetailPage";
import BlogPage from "@/pages/blogs/BlogPage";
import ErrorPage from "@/pages/ErrorPage";
import HomePage from "@/pages/HomePage";
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
    ],
  },
]);
