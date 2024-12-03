import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto mt-16 grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
