import { cn } from "@/lib/utils";

/** Printer's registration mark (decorative) */
export function RegMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      width={16}
      height={16}
      className={cn("shrink-0 text-primary", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
    >
      <circle cx="8" cy="8" r="5" />
      <path d="M8 0.5v15M0.5 8h15" />
    </svg>
  );
}
