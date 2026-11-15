import { type Language } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

/** Section label (eyebrow) style — uppercase tracking only for English; Bengali never below 14px */
export function sectionLabelClass(language: Language, className?: string) {
  return cn(
    "font-semibold text-ink-2",
    language === "bn"
      ? "text-sm tracking-normal normal-case leading-snug"
      : "text-xs uppercase tracking-[0.14em] leading-snug",
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

/** Display heading token plus language-safe tracking */
export function displayClass(
  language: Language,
  size: "xl" | "l" | "m" = "l",
  className?: string
) {
  return cn(
    "font-display",
    size === "xl" && "text-display-xl",
    size === "l" && "text-display-l",
    size === "m" && "text-display-m",
    language === "bn" && "!tracking-normal",
    className
  );
}

/** Locale for Intl number formatting (Bengali digits in bn) */
export function numberLocale(language: Language) {
  return language === "bn" ? "bn-BD" : "en-BD";
}

/** Two-digit plate/section number, e.g. "০২" (bn) or "02" (en) */
export function padNumber(language: Language, n: number) {
  const s = String(n).padStart(2, "0");
  if (language !== "bn") return s;
  const digits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return s.replace(/\d/g, (d) => digits[Number(d)]);
}
