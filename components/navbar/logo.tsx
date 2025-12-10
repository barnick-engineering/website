"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

export const Logo = () => {
  const { t } = useLanguage();

  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/barnick.png"
        alt="barnick Logo"
        width={32}
        height={32}
        className="h-8 w-8"
      />
      <span className="text-lg font-semibold">{t("logo.name")}</span>
    </Link>
  );
};
