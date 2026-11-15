"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

export const Logo = () => {
  const { t } = useLanguage();

  return (
    <Link
      href="/"
      aria-label={t("logo.name")}
      className="flex min-h-11 items-center gap-2.5"
    >
      {/* Brand mark: same /barnick.png, rendered larger only — no filter, crop or background */}
      <Image
        src="/barnick.png"
        alt={t("logo.name")}
        width={40}
        height={40}
        className="h-9 w-9 lg:h-10 lg:w-10"
      />
      {/* Under 375px the name wraps to two lines so the menu button never gets pushed off-screen */}
      <span className="font-display text-[15px] leading-tight max-w-[6.5rem] xs:max-w-none xs:text-lg xs:leading-none lg:text-xl font-semibold xs:whitespace-nowrap">
        {t("logo.name")}
      </span>
    </Link>
  );
};
