import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { Toaster } from "@/components/ui/sonner";
import { Outlet, ScrollRestoration } from "react-router";

const RootLayout = () => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <ScrollRestoration />
      <Toaster
        position="top-center"
        closeButton
        richColors
        duration={2000}
        expand={true}
      />
      <Header />
      <main className="container grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
