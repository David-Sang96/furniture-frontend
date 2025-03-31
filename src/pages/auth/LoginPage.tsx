import LoginForm from "@/components/auth/LoginForm";
import { Icons } from "@/components/icons";
import Banner from "@/data/images/house.webp";
import { Link } from "react-router";

function LoginPage() {
  return (
    <section className="relative">
      <Link
        to={"/"}
        className="fixed left-8 top-6 flex items-center text-lg font-bold tracking-tight text-foreground/80 transition-colors hover:text-foreground"
      >
        <Icons.logo className="mr-2 size-6" aria-hidden="true" />
        <span className="sr-only">Furniture Shop</span>
        <span>Furniture Shop</span>
      </Link>
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="flex place-items-center">
          <LoginForm />
        </div>
        <div className="max-lg:hidden">
          <img
            src={Banner}
            alt="furniture shop"
            className="h-full max-h-screen w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
