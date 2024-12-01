import MainNavigation from "./MainNavigation";

const Header = () => {
  return (
    <header className="w-full border-b">
      <nav className="flex h-16 items-center">
        <MainNavigation />
      </nav>
    </header>
  );
};

export default Header;
