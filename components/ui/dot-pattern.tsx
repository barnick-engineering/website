import { cn } from "@/lib/utils";

type DotPatternProps = {
  className?: string;
  /** Dot grid spacing in pixels */
  size?: number;
};

export function DotPattern({ className, size = 24 }: DotPatternProps) {
  const fadeMask =
    "radial-gradient(ellipse 90% 75% at 50% 40%, black 15%, transparent 100%)";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0",
        "bg-[radial-gradient(circle,hsl(var(--foreground)/0.14)_1px,transparent_1px)]",
        className
      )}
      style={{
        backgroundSize: `${size}px ${size}px`,
        maskImage: fadeMask,
        WebkitMaskImage: fadeMask,
      }}
    />
  );
}
