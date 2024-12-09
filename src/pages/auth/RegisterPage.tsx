import RegisterForm from "@/components/auth/RegisterForm";
import { Icons } from "@/components/icons";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <section className="flex min-h-screen place-items-center">
      <Link
        to={"/"}
        className="fixed left-8 top-6 flex items-center text-lg font-bold tracking-tight text-foreground/80 transition-colors hover:text-foreground"
      >
        <Icons.logo className="mr-2 size-6" aria-hidden="true" />
        <span className="sr-only">Furniture Shop</span>
        <span>Furniture Shop</span>
      </Link>
      <RegisterForm />
    </section>
  );
}

export default RegisterPage;
