"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type ProcessStep = 1 | 2 | 3;

/** 0–2: pipeline; 3–4: services */
export type ProcessSubStep = 0 | 1 | 2 | 3 | 4;

const COLUMN_DELAYS_DESKTOP: Record<ProcessStep, number> = {
  1: 0,
  2: 600,
  3: 1200,
};
const COLUMN_DELAYS_MOBILE: Record<ProcessStep, number> = {
  1: 0,
  2: 300,
  3: 600,
};
const REVEAL_COMPLETE_DELAY_DESKTOP = 1800;
const REVEAL_SUB_STEP_STAGGER = 100;
const SUB_STEP_COUNT = 5;

const LOOP_STEP_DURATIONS: Record<ProcessStep, number> = {
  1: 2000,
  2: 3000,
  3: 2000,
};
const LOOP_SUB_STEP_DURATION = 600;

function getIsDesktop() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(min-width: 768px)").matches;
}

function isElementInView(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1;
}

export function useProcessAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<number[]>([]);
  const hasTriggeredRef = useRef(false);
  const revealStartedRef = useRef(false);

  const [hasTriggered, setHasTriggered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const [revealedColumns, setRevealedColumns] = useState<[boolean, boolean, boolean]>([
    false,
    false,
    false,
  ]);
  const [revealedSubSteps, setRevealedSubSteps] = useState(0);
  const [revealComplete, setRevealComplete] = useState(false);

  const [activeStep, setActiveStep] = useState<ProcessStep>(1);
  const [activeSubStep, setActiveSubStep] = useState<ProcessSubStep>(0);

  const isLooping = revealComplete && isInView && !prefersReducedMotion;

  const clearRevealTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay);
    timeoutsRef.current.push(id);
  }, []);

  const triggerReveal = useCallback(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    setHasTriggered(true);
  }, []);

  const revealAllImmediately = useCallback(() => {
    setRevealedColumns([true, true, true]);
    setRevealedSubSteps(SUB_STEP_COUNT);
    setRevealComplete(true);
    setActiveStep(1);
  }, []);

  const startRevealSequence = useCallback(() => {
    if (revealStartedRef.current) return;
    revealStartedRef.current = true;

    clearRevealTimeouts();
    const desktop = getIsDesktop();
    setIsDesktop(desktop);

    if (prefersReducedMotion) {
      revealAllImmediately();
      return;
    }

    const columnDelays = desktop ? COLUMN_DELAYS_DESKTOP : COLUMN_DELAYS_MOBILE;

    ([1, 2, 3] as const).forEach((step) => {
      schedule(() => {
        setRevealedColumns((prev) => {
          const next = [...prev] as [boolean, boolean, boolean];
          next[step - 1] = true;
          return next;
        });

        if (step === 2) {
          for (let i = 0; i < SUB_STEP_COUNT; i++) {
            schedule(() => setRevealedSubSteps(i + 1), i * REVEAL_SUB_STEP_STAGGER);
          }
        }
      }, columnDelays[step]);
    });

    if (desktop) {
      schedule(() => {
        setRevealComplete(true);
        setActiveStep(1);
      }, REVEAL_COMPLETE_DELAY_DESKTOP);
    } else {
      schedule(() => {
        setRevealComplete(true);
        setActiveStep(1);
      }, columnDelays[3] + 400);
    }
  }, [clearRevealTimeouts, prefersReducedMotion, revealAllImmediately, schedule]);

  useEffect(() => {
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopMedia = window.matchMedia("(min-width: 768px)");

    const updateMotion = () => setPrefersReducedMotion(motionMedia.matches);
    const updateDesktop = () => setIsDesktop(desktopMedia.matches);

    updateMotion();
    updateDesktop();

    motionMedia.addEventListener("change", updateMotion);
    desktopMedia.addEventListener("change", updateDesktop);

    return () => {
      motionMedia.removeEventListener("change", updateMotion);
      desktopMedia.removeEventListener("change", updateDesktop);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      revealStartedRef.current = true;
      hasTriggeredRef.current = true;
      setHasTriggered(true);
      revealAllImmediately();
    }
  }, [prefersReducedMotion, revealAllImmediately]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkInView = () => {
      const inView = isElementInView(el);
      setIsInView(inView);
      if (inView) triggerReveal();
    };

    checkInView();

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);
        if (inView) triggerReveal();
      },
      { threshold: [0, 0.15, 0.3] }
    );

    observer.observe(el);

    const fallback = window.setTimeout(checkInView, 100);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [triggerReveal]);

  useEffect(() => {
    if (!hasTriggered) return;
    startRevealSequence();
  }, [hasTriggered, startRevealSequence]);

  useEffect(() => {
    if (!isLooping) return;

    const timeout = window.setTimeout(() => {
      setActiveStep((step) => (step === 3 ? 1 : ((step + 1) as ProcessStep)));
    }, LOOP_STEP_DURATIONS[activeStep]);

    return () => window.clearTimeout(timeout);
  }, [activeStep, isLooping]);

  useEffect(() => {
    if (!isLooping || activeStep !== 2) {
      setActiveSubStep(0);
      return;
    }

    const timeout = window.setTimeout(() => {
      setActiveSubStep((sub) => (sub >= 4 ? 0 : ((sub + 1) as ProcessSubStep)));
    }, LOOP_SUB_STEP_DURATION);

    return () => window.clearTimeout(timeout);
  }, [activeStep, activeSubStep, isLooping]);

  useEffect(() => () => clearRevealTimeouts(), [clearRevealTimeouts]);

  return {
    containerRef,
    prefersReducedMotion,
    isDesktop,
    isInView,
    revealedColumns,
    revealedSubSteps,
    revealComplete,
    activeStep,
    activeSubStep,
    isLooping,
  };
}
