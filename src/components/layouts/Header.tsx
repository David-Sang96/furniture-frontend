import { siteConfig } from "@/config/site";
import { ModeToggle } from "../mode-toggle";
import MainNavigation from "./MainNavigation";
import MobileNavigation from "./MobileNavigation";

const Header = () => {
  return (
    <header className="w-full border-b">
      <nav className="container mx-auto flex h-16 items-center justify-between">
        <MainNavigation items={siteConfig.mainNav} />
        <MobileNavigation items={siteConfig.mainNav} />

        <div className="flex items-center space-x-4 max-lg:mr-8">
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
