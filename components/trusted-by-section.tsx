"use client";

import { useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";
import { clientLogos } from "@/components/logo-cloud";
import { ClientLogo } from "@/components/client-logo";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SCROLL_AMOUNT = 200;
const AUTO_SCROLL_INTERVAL_MS = 3000;

// Three copies for long scroll; auto-slide resets after one set for endless feel
const repeatedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

function LogoCard({ client }: { client: (typeof clientLogos)[0] }) {
  return (
    <div className="flex-shrink-0 w-[140px] sm:w-[160px] flex flex-col items-center gap-3">
      <div className="relative w-full aspect-square rounded-full overflow-hidden border-2 border-muted bg-muted/30 flex items-center justify-center p-4">
        <ClientLogo
          src={client.src}
          alt={client.alt}
          width={120}
          height={120}
        />
      </div>
      <span className="text-sm font-medium text-center text-muted-foreground line-clamp-2">
        {client.alt}
      </span>
    </div>
  );
}

export function TrustedBySection() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  // Auto-slide: scroll right periodically, loop after one set for endless feel
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const tick = () => {
      if (pausedRef.current) return;
      const { scrollLeft, scrollWidth } = el;
      const oneSetWidth = scrollWidth / 3;
      if (scrollLeft >= oneSetWidth) {
        el.scrollLeft = 0;
      } else {
        el.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
      }
    };

    const id = setInterval(tick, AUTO_SCROLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="trusted-by-clients"
      aria-labelledby="trusted-by-heading"
      className="w-full py-12 xs:py-16 px-6"
    >
      <div className="max-w-screen-xl mx-auto">
        <h2
          id="trusted-by-heading"
          className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center mb-10"
        >
          {t("home.trustedByClients")}
        </h2>
        <div className="relative w-full overflow-hidden group">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/90 dark:bg-background/80 border shadow-md flex items-center justify-center hover:bg-background transition-colors -translate-x-1"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/90 dark:bg-background/80 border shadow-md flex items-center justify-center hover:bg-background transition-colors translate-x-1"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div
            ref={scrollRef}
            onMouseEnter={() => (pausedRef.current = true)}
            onMouseLeave={() => (pausedRef.current = false)}
            className="w-full overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide py-4 px-2 cursor-grab active:cursor-grabbing touch-pan-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex gap-6 w-max min-w-full">
              {repeatedLogos.map((client, index) => (
                <LogoCard
                  key={`${client.alt}-${index}`}
                  client={client}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
