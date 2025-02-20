import LoginForm from "@/components/auth/LoginForm";
import { Icons } from "@/components/icons";
import Banner from "@/data/images/house.webp";
import { Link } from "react-router";

function LoginPage() {
  return (
    <section className="relative">
      <Link
        to={"/"}
        className="text-foreground/80 hover:text-foreground fixed left-8 top-6 flex items-center text-lg font-bold tracking-tight transition-colors"
      >
        <Icons.logo className="mr-2 size-6" aria-hidden="true" />
        <span className="sr-only">Furniture Shop</span>
        <span>Furniture Shop</span>
      </Link>
      <div className="grid min-h-screen px-4 lg:grid-cols-2">
        <div className="flex place-items-center">
          <LoginForm />
        </div>
        <div className="max-lg:hidden">
          <img
            src={Banner}
            alt="furniture shop"
            className="size-full max-h-screen object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
