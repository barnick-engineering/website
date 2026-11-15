import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { NavCta } from "./nav-cta";
import LanguageToggle from "../language-toggle";

const Navbar = () => {
  return (
    <>
      <header
        data-track-source="navbar"
        className="fixed inset-x-0 top-0 z-40 h-16 lg:h-[72px] border-b border-border bg-background/90 backdrop-blur-sm"
      >
        <div className="h-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-[75rem] mx-auto h-full flex items-center justify-between gap-2 sm:gap-4">
            <Logo />

            {/* Desktop menu */}
            <NavMenu className="hidden lg:block" />

            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageToggle />
              <NavCta className="hidden md:inline-flex" />

              {/* Mobile + tablet menu */}
              <div className="lg:hidden">
                <NavigationSheet />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
