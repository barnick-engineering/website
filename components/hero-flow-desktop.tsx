"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Desktop-only: the animated flow is never downloaded or run on phones.
const HeroProductionFlow = dynamic(
  () => import("@/components/hero-production-flow").then((m) => m.HeroProductionFlow),
  { ssr: false, loading: () => null }
);

const DESKTOP_QUERY = "(min-width: 1024px)";

export function HeroFlowDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Wrapper is lg-only with a fixed minimum height, so mounting the flow causes no layout shift.
  return (
    <div className="hidden lg:block crop-marks p-4 xl:p-5 min-h-[26rem]">
      {isDesktop && <HeroProductionFlow />}
    </div>
  );
}
