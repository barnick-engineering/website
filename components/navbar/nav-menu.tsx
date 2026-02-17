"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { categories } from "@/data/categories";

export const NavMenu = (props: NavigationMenuProps) => {
  const { t, language } = useLanguage();

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-1 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-[orientation=vertical]:gap-4">
        <NavigationMenuItem>
          <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
            {t("nav.shop")}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[280px] gap-1 p-3 md:w-[320px] md:grid-cols-1">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="/shop"
                    className="block select-none rounded-md py-2 px-3 text-sm font-medium leading-none no-underline outline-none hover:bg-accent hover:text-accent-foreground"
                  >
                    {t("nav.shopAll")}
                  </Link>
                </NavigationMenuLink>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={cat.href ?? `/category/${cat.slug}`}
                      className="block select-none rounded-md py-2 px-3 text-sm leading-none no-underline outline-none hover:bg-accent hover:text-accent-foreground"
                    >
                      {cat.name[language]}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/deals" className={navigationMenuTriggerStyle()}>
              {t("nav.deals")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/design-services" className={navigationMenuTriggerStyle()}>
              {t("nav.services")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/#contact" className={navigationMenuTriggerStyle()}>
              {t("nav.contact")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="data-[orientation=vertical]:block md:hidden">
          <NavigationMenuLink asChild>
            <Link href="/#about" className={navigationMenuTriggerStyle()}>
              {t("nav.about")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="data-[orientation=vertical]:block md:hidden">
          <NavigationMenuLink asChild>
            <Link href="/#faq" className={navigationMenuTriggerStyle()}>
              {t("nav.faq")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
