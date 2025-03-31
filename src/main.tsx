import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { queryClient } from "./api/query";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";
import { routerActionLoader } from "./routes/routerActionLoader";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={routerActionLoader} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
