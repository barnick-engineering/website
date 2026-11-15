"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { ClientLogo } from "./client-logo";
import Marquee from "./ui/marquee";
import { Eyebrow } from "./ui/eyebrow";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";

const clients: Array<{ src: string; alt: string }> = [
  { src: "/clients/navy.png", alt: "বাংলাদেশ নৌবাহিনীর লোগো" },
  { src: "/clients/world-vision.png", alt: "ওয়ার্ল্ড ভিশনের লোগো" },
  { src: "/clients/bd-swimming-fed.png", alt: "বাংলাদেশ সুইমিং ফেডারেশনের লোগো" },
  { src: "/clients/club.png", alt: "ক্লাবের লোগো" },
  { src: "/clients/fvl.jpg", alt: "এফভিএল-এর লোগো" },
  { src: "/clients/clilipos.png", alt: "চিলিপসের লোগো" },
  { src: "/clients/meam.png", alt: "মিয়ামের লোগো" },
  { src: "/clients/medistack.png", alt: "মেডিস্ট্যাকের লোগো" },
  { src: "/clients/Nexus T logo.png", alt: "নেক্সাস টি-এর লোগো" },
  { src: "/clients/cord-e.png", alt: "কর্ড-ই-এর লোগো" },
  { src: "/clients/orange.png", alt: "অরেঞ্জের লোগো" },
  { src: "/clients/Chefs.png", alt: "শেফসের লোগো" },
];

/** Client logo tile — greyscale until hover (client logos only, never /barnick.png). */
function ClientCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className={cn(
        "group/tile flex shrink-0 snap-start items-center justify-center",
        "h-20 w-36 lg:h-24 lg:w-44 bg-card border border-border px-4"
      )}
    >
      <ClientLogo
        src={src}
        alt={alt}
        className="max-h-12 lg:max-h-14 grayscale opacity-80 transition duration-150 group-hover/tile:grayscale-0 group-hover/tile:opacity-100 motion-reduce:transition-none"
      />
    </div>
  );
}

/**
 * Client logos inside the trust strip. Keeps id="clients" and its own
 * section_view name via data-track-section="clients".
 */
function LogoCloud({ className }: { className?: string }) {
  const { t } = useLanguage();
  const [paused, setPaused] = useState(false);

  return (
    <div
      id="clients"
      data-track-section="clients"
      className={cn("mt-10 lg:mt-14", className)}
    >
      <div className="flex items-center justify-between gap-4">
        <Eyebrow>{t("logo.trustedBy")}</Eyebrow>
        {/* WCAG 2.2.2: moving content needs a pause control (desktop marquee only) */}
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? t("logo.play") : t("logo.pause")}
          title={paused ? t("logo.play") : t("logo.pause")}
          className="hidden lg:inline-flex motion-reduce:!hidden h-11 w-11 items-center justify-center border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors duration-150"
        >
          {paused ? <Play className="h-4 w-4" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
        </button>
      </div>

      {/* Mobile & tablet: swipe row */}
      <div className="lg:hidden mt-5">
        <div className="-mx-4 sm:-mx-6 flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 sm:px-6">
          {clients.map((client) => (
            <ClientCard key={client.src} src={client.src} alt={client.alt} />
          ))}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{t("logo.swipeHint")}</p>
      </div>

      {/* Desktop: marquee (CSS swaps it for a static grid under reduced motion — no hydration flip) */}
      <div className="hidden lg:block motion-reduce:!hidden mt-6 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-muted to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-muted to-transparent" />
        <Marquee
          pauseOnHover
          className={cn(
            "!p-0 [--duration:60s] [--gap:1rem]",
            "[&:focus-within>div]:[animation-play-state:paused]",
            paused && "[&>div]:[animation-play-state:paused]"
          )}
        >
          {clients.map((client) => (
            <ClientCard key={client.src} src={client.src} alt={client.alt} />
          ))}
        </Marquee>
      </div>
      <ul className="hidden motion-reduce:lg:flex flex-wrap gap-4 mt-6">
        {clients.map((client) => (
          <li key={client.src}>
            <ClientCard src={client.src} alt={client.alt} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LogoCloud;
