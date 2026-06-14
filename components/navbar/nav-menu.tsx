"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

export const NavMenu = (props: NavigationMenuProps) => {
  const { t } = useLanguage();

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/#products" className="text-sm font-medium text-foreground hover:text-foreground/80 transition-colors">
              {t("nav.portfolio")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/#estimate" className="text-sm font-medium text-foreground hover:text-foreground/80 transition-colors">
              {t("nav.estimate")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/#faq" className="text-sm font-medium text-foreground hover:text-foreground/80 transition-colors">
              {t("nav.faq")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/#contact" className="text-sm font-medium text-foreground hover:text-foreground/80 transition-colors">
              {t("nav.contact")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
