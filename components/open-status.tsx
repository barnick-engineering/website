"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { facebookInsights } from "@/data/insights";
import { cn } from "@/lib/utils";

type Status = "open" | "opensToday" | "opensTomorrow" | "opensSaturday";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Current weekday (0–6) and hour (fractional) in Dhaka, whatever the visitor's timezone. */
function dhakaNow(): { day: number; hour: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  return {
    day: WEEKDAYS.indexOf(get("weekday")),
    hour: Number(get("hour")) + Number(get("minute")) / 60,
  };
}

function getStatus(): Status {
  const { days, open, close } = facebookInsights.openingHours;
  const { day, hour } = dhakaNow();
  const openToday = days.includes(day);
  if (openToday && hour >= open && hour < close) return "open";
  if (openToday && hour < open) return "opensToday";
  if (days.includes((day + 1) % 7)) return "opensTomorrow";
  return "opensSaturday"; // only Friday is closed, so the next open day is Saturday
}

/**
 * "Open now · until 6 pm" / "Opens tomorrow at 9 am", from the shop hours in
 * data/insights.ts. Rendered after mount (time-dependent, would mismatch SSR);
 * an invisible placeholder reserves the space so nothing shifts.
 */
export function OpenStatus({ className }: { className?: string }) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    setStatus(getStatus());
    const id = window.setInterval(() => setStatus(getStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const isOpen = status === "open";
  const label = !status
    ? t("hours.openNow")
    : isOpen
      ? `${t("hours.openNow")} · ${t("hours.until")}`
      : t(`hours.${status}`);

  return (
    <span
      role="status"
      className={cn(
        "inline-flex min-h-8 items-center gap-2 border px-3 text-sm",
        isOpen ? "border-primary/40 text-foreground" : "border-border text-ink-2",
        !status && "invisible",
        className
      )}
    >
      <span aria-hidden className="relative flex h-2 w-2">
        {isOpen && (
          <span className="absolute inline-flex h-full w-full bg-primary opacity-60 motion-safe:animate-ping" />
        )}
        <span className={cn("relative inline-flex h-2 w-2", isOpen ? "bg-primary" : "bg-muted-foreground")} />
      </span>
      {label}
    </span>
  );
}
