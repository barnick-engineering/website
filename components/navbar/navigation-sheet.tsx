"use client";

import Link from "next/link";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/language-context";
import { facebookInsights } from "@/data/insights";
import { getPhoneUrl } from "@/lib/order";
import LanguageToggle from "../language-toggle";
import { Logo } from "./logo";

const LINKS = [
  { key: "nav.portfolio", href: "/#products" },
  { key: "nav.estimate", href: "/#estimate" },
  { key: "nav.design", href: "/#design" },
  { key: "nav.guide", href: "/guide" },
  { key: "nav.faq", href: "/#faq" },
  { key: "nav.contact", href: "/#contact" },
  { key: "nav.policies", href: "/policies" },
] as const;

export const NavigationSheet = () => {
  const { t } = useLanguage();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label={t("nav.menuOpen")}>
          <Menu aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        hideClose
        aria-describedby={undefined}
        className="bg-card w-[86vw] max-w-sm p-0 shadow-paper flex flex-col overflow-y-auto"
      >
        <div data-track-source="nav_menu" className="flex min-h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-5 h-16">
            <SheetTitle className="sr-only">{t("nav.primaryLabel")}</SheetTitle>
            <Logo />
            <SheetClose asChild>
              <Button variant="ghost" size="icon" aria-label={t("nav.menuClose")}>
                <X aria-hidden />
              </Button>
            </SheetClose>
          </div>

          <nav aria-label={t("nav.primaryLabel")}>
            <ul>
              {LINKS.map(({ key, href }) => (
                <li key={key}>
                  <SheetClose asChild>
                    <Link
                      href={href}
                      className="min-h-14 border-b border-border px-5 flex items-center font-display text-xl hover:bg-muted"
                    >
                      {t(key)}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto p-5 space-y-3">
            <Button size="lg" className="w-full" asChild>
              <a
                href={facebookInsights.messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track-item="menu_messenger"
              >
                <MessageCircle aria-hidden />
                {t("cta.messenger")}
              </a>
            </Button>
            <Button variant="outline" size="lg" className="w-full" asChild>
              <a href={getPhoneUrl()} data-track-item="menu_call">
                <Phone aria-hidden />
                {t("cta.call")}
              </a>
            </Button>
            <LanguageToggle className="w-full" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
