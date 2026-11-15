import { cn } from "@/lib/utils";

/** Press colour-control strip — palette tints only (decorative) */
const SEGMENTS = [
  "#111111",
  "#3D3A35",
  "#5E584E",
  "#8A8378",
  "#D6CEBD",
  "#F3EEE3",
  "#F6DDCF",
  "#E8774A",
  "#D9541E",
  "#A63F14",
] as const;

export function ColorBar({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("flex h-1.5 w-full", className)}>
      {SEGMENTS.map((c) => (
        <span
          key={c}
          className="flex-1"
          style={{
            backgroundColor: c,
            boxShadow: c === "#F3EEE3" ? "inset 0 0 0 1px #D6CEBD" : undefined,
          }}
        />
      ))}
    </div>
  );
}
