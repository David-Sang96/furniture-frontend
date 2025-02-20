import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { Outlet, ScrollRestoration } from "react-router";

const RootLayout = () => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <ScrollRestoration />
      <Header />
      <main className="container grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
