import { type Language } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

/** Section label style — uppercase tracking only for English */
export function sectionLabelClass(language: Language, className?: string) {
  return cn(
    "font-medium text-muted-foreground",
    language === "bn"
      ? "text-sm tracking-normal normal-case leading-snug"
      : "text-[11px] uppercase tracking-[0.14em]",
    className
  );
}

/** Heading tracking — tight tracking breaks Bengali glyphs on mobile */
export function headingClass(language: Language, className?: string) {
  return cn(
    language === "bn" ? "tracking-normal" : "tracking-tight",
    className
  );
}
