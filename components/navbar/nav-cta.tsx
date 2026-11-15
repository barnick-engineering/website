"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { facebookInsights } from "@/data/insights";

export function NavCta({ className }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <Button size="default" className={className} asChild>
      <a
        href={facebookInsights.messengerUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-track-item="nav_messenger"
      >
        <MessageCircle aria-hidden />
        {t("cta.messenger")}
      </a>
    </Button>
  );
}
