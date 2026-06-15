"use client";

import { useEffect, useRef, useState } from "react";

export type ProcessStep = 1 | 2 | 3;

/** 0–2: pipeline (idea, design, print); 3–4: services (printing, packaging) */
export type ProcessSubStep = 0 | 1 | 2 | 3 | 4;

const STEP_DURATIONS: Record<ProcessStep, number> = {
  1: 2000,
  2: 3000,
  3: 2000,
};

const SUB_STEP_DURATION = 600;

export function useProcessStepAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<ProcessStep>(1);
  const [activeSubStep, setActiveSubStep] = useState<ProcessSubStep>(0);
  const [isInView, setIsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const isAnimating = isInView && !prefersReducedMotion;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting && entry.intersectionRatio >= 0.3),
      { threshold: [0, 0.3, 0.5, 1] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isAnimating) return;

    const timeout = window.setTimeout(() => {
      setActiveStep((step) => (step === 3 ? 1 : ((step + 1) as ProcessStep)));
    }, STEP_DURATIONS[activeStep]);

    return () => window.clearTimeout(timeout);
  }, [activeStep, isAnimating]);

  useEffect(() => {
    if (activeStep !== 2) {
      setActiveSubStep(0);
      return;
    }

    if (!isAnimating) return;

    const timeout = window.setTimeout(() => {
      setActiveSubStep((sub) => (sub >= 4 ? 0 : ((sub + 1) as ProcessSubStep)));
    }, SUB_STEP_DURATION);

    return () => window.clearTimeout(timeout);
  }, [activeStep, activeSubStep, isAnimating]);

  return {
    containerRef,
    activeStep,
    activeSubStep,
    isAnimating,
    prefersReducedMotion,
  };
}
