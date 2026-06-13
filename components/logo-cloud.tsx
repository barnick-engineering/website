"use client";

import { HTMLAttributes } from "react";
import { ClientLogo } from "./client-logo";
import Marquee from "./ui/marquee";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";

const clients: Array<{ src: string; alt: string }> = [
  { src: "/clients/navy.png", alt: "Bangladesh Navy" },
  { src: "/clients/world-vision.png", alt: "World Vision" },
  { src: "/clients/bd-swimming-fed.png", alt: "Bangladesh Swimming Federation" },
  { src: "/clients/club.png", alt: "Club" },
  { src: "/clients/fvl.jpg", alt: "FVL" },
  { src: "/clients/clilipos.png", alt: "Clilipos" },
  { src: "/clients/meam.png", alt: "MEAM" },
  { src: "/clients/medistack.png", alt: "Medistack" },
  { src: "/clients/Nexus T logo.png", alt: "Nexus T" },
  { src: "/clients/cord-e.png", alt: "Cord-E" },
  { src: "/clients/orange.png", alt: "Orange" },
  { src: "/clients/Chefs.png", alt: "Chefs" },
];

interface LogoCloudProps extends HTMLAttributes<HTMLDivElement> {
  showTitle?: boolean;
}

function ClientCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className={cn(
        "flex shrink-0 snap-center items-center justify-center",
        "h-24 w-40 xs:h-28 xs:w-44 sm:h-32 sm:w-48",
        "rounded-2xl border bg-background px-5 py-4 shadow-sm"
      )}
      title={alt}
    >
      <ClientLogo src={src} alt={alt} className="max-h-14 xs:max-h-16 sm:max-h-[4.5rem]" />
    </div>
  );
}

function SwipeRow({ items }: { items: typeof clients }) {
  return (
    <div className="flex gap-3 xs:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-6">
      {items.map((client) => (
        <ClientCard key={client.alt} src={client.src} alt={client.alt} />
      ))}
    </div>
  );
}

function LogoCloud({ className, showTitle = false, ...props }: LogoCloudProps) {
  const { t } = useLanguage();

  return (
    <section
      id="clients"
      {...props}
      className={cn(
        "w-full border-y bg-muted/25",
        "min-h-[62vh] sm:min-h-[66vh]",
        "flex flex-col justify-center py-10 sm:py-12",
        className
      )}
    >
      <div className="max-w-screen-xl mx-auto w-full">
        {showTitle && (
          <div className="text-center mb-8 sm:mb-10 px-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {t("logo.trustedBy")}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              {t("logo.subtitle")}
            </p>
          </div>
        )}

        {/* Mobile & tablet: single swipe row */}
        <div className="md:hidden flex flex-col justify-center flex-1">
          <SwipeRow items={clients} />
          <p className="mt-4 text-center text-xs text-muted-foreground px-6">
            {t("logo.swipeHint")}
          </p>
        </div>

        {/* Desktop: single marquee row */}
        <div className="hidden md:block px-6 flex-1">
          <div className="relative rounded-2xl border bg-background/60 py-10 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background/80 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background/80 to-transparent" />
            <Marquee pauseOnHover className="[--duration:50s] [--gap:1.25rem]">
              {clients.map((client) => (
                <ClientCard key={client.alt} src={client.src} alt={client.alt} />
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LogoCloud;
