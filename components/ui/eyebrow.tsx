"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/contexts/language-context";
import { padNumber, sectionLabelClass } from "@/lib/typography";
import { cn } from "@/lib/utils";

type Tone = "default" | "onInk" | "onOrange";

/**
 * Section label: optional serif number ("০২"), a short orange rule, then the label.
 * Small orange text uses primary-strong (#A63F14) on cream; on ink the base orange
 * passes (4.71:1); on orange everything is ink.
 */
export function Eyebrow({
  number,
  children,
  className,
  tone = "default",
  leading,
}: {
  number?: number;
  children: ReactNode;
  className?: string;
  tone?: Tone;
  /** Optional element before the label (e.g. <RegMark/>) */
  leading?: ReactNode;
}) {
  const { language } = useLanguage();

  return (
    <p
      className={cn(
        "flex items-center gap-3",
        sectionLabelClass(language),
        tone === "onInk" && "text-primary",
        tone === "onOrange" && "text-foreground",
        className
      )}
    >
      {leading}
      {number !== undefined && (
        <span
          className={cn(
            "font-display text-base font-semibold tabular-nums normal-case tracking-normal",
            tone === "default" && "text-primary-strong",
            tone === "onInk" && "text-primary",
            tone === "onOrange" && "text-foreground"
          )}
        >
          {padNumber(language, number)}
        </span>
      )}
      <span
        aria-hidden
        className={cn("h-px w-6 shrink-0", tone === "onOrange" ? "bg-foreground" : "bg-primary")}
      />
      <span>{children}</span>
    </p>
  );
}
