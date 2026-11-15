"use client";

import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

/** "Masthead rule" section header: ink top rule, eyebrow, display h2, optional lead. Left-aligned. */
export function SectionHeader({
  id,
  number,
  eyebrow,
  title,
  lead,
  tone = "default",
  className,
  children,
}: {
  id: string;
  number?: number;
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: "default" | "onInk";
  className?: string;
  children?: ReactNode;
}) {
  const { language } = useLanguage();
  const onInk = tone === "onInk";

  return (
    <div
      className={cn(
        "border-t pt-6",
        onInk ? "border-on-ink/30" : "border-foreground",
        className
      )}
    >
      <Eyebrow number={number} tone={onInk ? "onInk" : "default"}>
        {eyebrow}
      </Eyebrow>
      <h2
        id={id}
        className={cn(
          "mt-3 font-display text-display-l font-semibold max-w-[24ch]",
          language === "bn" && "tracking-normal",
          onInk ? "text-on-ink" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-4 text-lead max-w-[56ch]",
            onInk ? "text-on-ink-muted" : "text-ink-2"
          )}
        >
          {lead}
        </p>
      )}
      {children}
    </div>
  );
}
