import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <Header />
      <main className="container mx-auto mt-16 grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
