import { siteConfig } from "@/config/site";
import { User } from "@/data/user";
import { ModeToggle } from "../mode-toggle";
import AuthDropDown from "./AuthDropDown";
import CartSheet from "./CartSheet";
import MainNavigation from "./MainNavigation";
import MobileNavigation from "./MobileNavigation";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <nav className="container flex h-16 items-center justify-between">
        <MainNavigation items={siteConfig.mainNav} />
        <MobileNavigation items={siteConfig.mainNav} />

        <div className="flex items-center space-x-4 max-lg:mr-8">
          <CartSheet />
          <ModeToggle />
          <AuthDropDown user={User} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
