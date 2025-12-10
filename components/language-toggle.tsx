"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

const LanguageToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="outline" size="icon" />;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
      title={language === "bn" ? "Switch to English" : "বাংলায় পরিবর্তন করুন"}
      className="gap-2"
    >
      <Languages className="h-4 w-4" />
      <span className="text-xs font-medium">
        {language === "bn" ? "BN" : "EN"}
      </span>
    </Button>
  );
};

export default LanguageToggle;

