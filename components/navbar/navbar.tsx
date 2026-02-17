"use client";

import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import ThemeToggle from "../theme-toggle";
import LanguageToggle from "../language-toggle";
import { CartIcon } from "../ecommerce/cart-icon";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 60;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed z-10 top-6 inset-x-4 h-14 xs:h-16 border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full transition-[background-color,box-shadow] duration-200",
        scrolled
          ? "bg-background shadow-md backdrop-blur-sm"
          : "bg-background/50 backdrop-blur-sm"
      )}
    >
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <CartIcon />
          <LanguageToggle />
          <ThemeToggle />

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
