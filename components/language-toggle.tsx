"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Shows the language you can switch TO ("English" in bn mode, "বাংলা" in en mode). */
const LanguageToggle = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const base = cn("h-11 min-w-[84px] px-3 border border-input text-foreground", className);

  if (!mounted) {
    // Same box as the real button, so nothing shifts after hydration (CLS)
    return <span aria-hidden className={cn("inline-block", base)} />;
  }

  return (
    <Button
      variant="ghost"
      onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
      title={t("lang.switchTitle")}
      aria-label={t("lang.switchTitle")}
      lang={language === "bn" ? "en" : "bn"}
      className={base}
    >
      <Languages className="hidden sm:inline" aria-hidden />
      <span className="text-sm font-semibold">{t("lang.switchTo")}</span>
    </Button>
  );
};

export default LanguageToggle;
