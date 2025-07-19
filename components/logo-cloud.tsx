"use client";

import { HTMLAttributes, useState, useEffect } from "react";
import { ClientLogo } from "./client-logo";
import Marquee from "./ui/marquee";
import { cn } from "@/lib/utils";

const clients: Array<{ src: string; alt: string }> = [
  { src: "/clients/navy.png", alt: "Bangladesh Navy" },
  { src: "/clients/world-vision.png", alt: "World Vision" },
  {
    src: "/clients/bd-swimming-fed.png",
    alt: "Bangladesh Swimming Federation",
  },
  { src: "/clients/club.png", alt: "club" },
  { src: "/clients/fvl.jpg", alt: "FVL" },
  { src: "/clients/clilipos.png", alt: "clilipos" },
  { src: "/clients/meam.png", alt: "meam" },
  { src: "/clients/medistack.png", alt: "Medistack" },
  { src: "/clients/Nexus T logo.png", alt: "Nexus T" },
  { src: "/clients/cord-e.png", alt: "cord-e" },
  { src: "/clients/orange.png", alt: "Orange" },
  { src: "/clients/Chefs.png", alt: "Chefs" },
];

function LogoCloud({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640); // sm breakpoint
      setIsTablet(width >= 640 && width < 1024); // sm to lg breakpoint
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      id="testimonials"
      {...props}
      className={cn(
        // Mobile-first responsive padding and spacing
        "w-full flex justify-center items-center",
        "py-4 px-3", // Mobile: smaller padding
        "sm:py-6 sm:px-4", // Small screens
        "md:py-8 md:px-6", // Medium screens
        "lg:py-12 lg:px-8", // Large screens
        "xl:py-16 xl:px-4", // Extra large screens
        className
      )}
    >
      <div className="w-full max-w-full mx-auto">
        {/* Responsive text sizing and spacing */}
        <p
          className={cn(
            "text-center font-medium text-muted-foreground",
            // Mobile text sizing
            "text-[10px] mb-2", // Very small mobile
            "xs:text-xs xs:mb-3", // Small mobile (375px+)
            "sm:text-sm sm:mb-4", // Small screens (640px+)
            "md:text-base md:mb-5", // Medium screens (768px+)
            "lg:text-lg lg:mb-6" // Large screens (1024px+)
          )}
        >
          Trusted by clients
        </p>

        <div className="relative w-full">
          {/* Responsive gradient overlays - completely hidden on mobile */}
          <div
            className={cn(
              "absolute left-0 inset-y-0 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none",
              "hidden", // Hidden on mobile
              "sm:block sm:w-6", // Small screens
              "md:w-8", // Medium screens
              "lg:w-12", // Large screens
              "xl:w-16" // Extra large screens
            )}
          />

          <div
            className={cn(
              "absolute right-0 inset-y-0 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none",
              "hidden", // Hidden on mobile
              "sm:block sm:w-6", // Small screens
              "md:w-8", // Medium screens
              "lg:w-12", // Large screens
              "xl:w-16" // Extra large screens
            )}
          />

          {/* Responsive marquee container */}
          <div
            className={cn(
              "overflow-hidden",
              "py-4", // Mobile padding
              "sm:py-5", // Small screens
              "md:py-6", // Medium screens
              "lg:py-8", // Large screens
              "xl:py-10" // Extra large - generous padding
            )}
          >
            <Marquee
              pauseOnHover={!isMobile} // Disable on mobile
              className={cn(
                // Slower animation speed and tighter spacing
                isMobile
                  ? "[--duration:40s] [--gap:0.75rem]" // Much slower on mobile, tight spacing
                  : isTablet
                  ? "[--duration:40s] [--gap:1rem]" // Slower on tablet
                  : "[--duration:40s] [--gap:1.25rem]", // Slower on desktop, less spacing
                // Performance optimizations
                "will-change-transform transform-gpu"
              )}
              style={{
                // Force hardware acceleration on all devices
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              {clients.map((client, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex-shrink-0 flex items-center justify-center",
                    // Generous container height to prevent clipping, minimal width constraints
                    "h-12 w-auto", // Mobile: generous height, auto width
                    "sm:h-14 sm:w-auto", // Small screens
                    "md:h-16 md:w-auto", // Medium screens
                    "lg:h-18 lg:w-auto", // Large screens
                    "xl:h-20 xl:w-auto" // Extra large screens
                  )}
                  style={{
                    // Individual logo performance optimization
                    transform: "translateZ(0)",
                  }}
                >
                  <ClientLogo src={client.src} alt={client.alt} />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoCloud;
