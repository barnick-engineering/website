"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

const LINKS = [
  { key: "nav.portfolio", href: "/#products" },
  { key: "nav.estimate", href: "/#estimate" },
  { key: "nav.design", href: "/#design" },
  { key: "nav.guide", href: "/guide" },
  { key: "nav.faq", href: "/#faq" },
] as const;

export const NavMenu = ({ className }: { className?: string }) => {
  const { t } = useLanguage();

  return (
    <nav aria-label={t("nav.primaryLabel")} className={className}>
      <ul className="flex items-center gap-5 lg:gap-7">
        {LINKS.map(({ key, href }) => (
          <li key={key}>
            <Link
              href={href}
              className={cn(
                "inline-flex py-3 text-sm font-medium text-foreground whitespace-nowrap",
                "underline-offset-[6px] decoration-primary decoration-1 hover:underline"
              )}
            >
              {t(key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
