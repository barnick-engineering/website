"use client";

import type { ReactNode } from "react";

import {
  Lightbulb,
  Package,
  Palette,
  Printer,
} from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "@/contexts/language-context";
import {
  useProcessStepAnimation,
  type ProcessStep,
  type ProcessSubStep,
} from "@/hooks/use-process-step-animation";
import { sectionLabelClass } from "@/lib/typography";
import { cn } from "@/lib/utils";

function stepHighlightClass(isActive: boolean, isAnimating: boolean) {
  return cn(
    "h-full min-w-0",
    isAnimating && !isActive && "opacity-55",
    isAnimating && isActive && "ring-2 ring-inset ring-foreground/25 shadow-sm"
  );
}

function StepLabel({
  index,
  title,
  isActive,
}: {
  index: number;
  title: string;
  isActive: boolean;
}) {
  const { language } = useLanguage();

  return (
    <p
      className={cn(
        sectionLabelClass(language),
        isActive && "text-foreground font-semibold"
      )}
    >
      {String(index).padStart(2, "0")} · {title}
    </p>
  );
}

function AnimatedStepShell({
  stepIndex,
  activeStep,
  isAnimating,
  children,
  className,
}: {
  stepIndex: ProcessStep;
  activeStep: ProcessStep;
  isAnimating: boolean;
  children: ReactNode;
  className?: string;
}) {
  const isActive = !isAnimating || activeStep === stepIndex;

  return (
    <motion.div
      animate={{
        opacity: isActive ? 1 : 0.55,
        backgroundColor: isActive
          ? "hsl(var(--foreground) / 0.04)"
          : "hsl(var(--background) / 0)",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={cn(stepHighlightClass(isActive, isAnimating), className)}
    >
      {children}
    </motion.div>
  );
}

function SideStep({
  index,
  title,
  description,
  isActive,
}: {
  index: number;
  title: string;
  description: string;
  isActive: boolean;
}) {
  return (
    <div className="flex flex-col justify-center p-5 lg:p-6 h-full min-w-0">
      <StepLabel index={index} title={title} isActive={isActive} />
      <p
        className={cn(
          "mt-4 text-sm leading-relaxed",
          isActive ? "text-foreground/80" : "text-muted-foreground"
        )}
      >
        {description}
      </p>
    </div>
  );
}

function SubItem({
  icon: Icon,
  label,
  isActive,
  language,
  variant,
}: {
  icon: typeof Lightbulb;
  label: string;
  isActive: boolean;
  language: string;
  variant: "pipeline" | "service";
}) {
  return (
    <motion.div
      animate={{
        opacity: isActive ? 1 : 0.45,
        backgroundColor: isActive
          ? "hsl(var(--foreground) / 0.06)"
          : variant === "pipeline"
            ? "transparent"
            : "hsl(var(--background) / 0.8)",
      }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        variant === "pipeline"
          ? "flex flex-col items-center justify-center px-1 sm:px-2 py-5 sm:py-7 text-center min-w-0"
          : "flex flex-col xs:flex-row items-center justify-center gap-1.5 xs:gap-2 border border-border/60 px-2.5 xs:px-3 py-2.5 sm:py-3 min-w-0 text-center xs:text-left",
        isActive && variant === "service" && "ring-1 ring-foreground/20"
      )}
    >
      <Icon
        className={cn(
          "shrink-0",
          variant === "pipeline" ? "h-6 w-6 mb-3" : "h-4 w-4",
          isActive ? "text-foreground" : "text-muted-foreground"
        )}
        strokeWidth={variant === "pipeline" ? 1.75 : 1.5}
      />
      <span
        className={cn(
          "font-semibold text-foreground min-w-0 text-center",
          variant === "pipeline" && "font-bold",
          language === "bn"
            ? "text-xs sm:text-sm leading-snug tracking-normal"
            : variant === "pipeline"
              ? "text-sm sm:text-base leading-tight tracking-tight"
              : "text-xs sm:text-sm leading-none"
        )}
      >
        {label}
      </span>
    </motion.div>
  );
}

function ProductionStep({
  index,
  activeSubStep,
  isStepActive,
  isAnimating,
}: {
  index: number;
  activeSubStep: ProcessSubStep;
  isStepActive: boolean;
  isAnimating: boolean;
}) {
  const { t, language } = useLanguage();

  const pipeline = [
    { icon: Lightbulb, label: t("hero.flow.pipeline.idea") },
    { icon: Palette, label: t("hero.flow.pipeline.design") },
    { icon: Printer, label: t("hero.flow.pipeline.print") },
  ];

  const services = [
    { icon: Printer, label: t("hero.flow.step2.printLabel") },
    { icon: Package, label: t("hero.flow.step2.packagingLabel") },
  ];

  const subActive = (subIndex: ProcessSubStep) =>
    !isAnimating || !isStepActive || activeSubStep === subIndex;

  return (
    <div className="p-5 lg:p-6 h-full bg-muted/20 min-w-0">
      <StepLabel index={index} title={t("hero.flow.step2.title")} isActive={isStepActive} />

      <div className="mt-5 grid grid-cols-3 divide-x divide-border/80 border border-border bg-muted/35 shadow-sm">
        {pipeline.map(({ icon, label }, i) => (
          <SubItem
            key={label}
            icon={icon}
            label={label}
            isActive={subActive(i as ProcessSubStep)}
            language={language}
            variant="pipeline"
          />
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {services.map(({ icon, label }, i) => (
          <SubItem
            key={label}
            icon={icon}
            label={label}
            isActive={subActive((i + 3) as ProcessSubStep)}
            language={language}
            variant="service"
          />
        ))}
      </div>
    </div>
  );
}

function ProcessProgressRail({
  activeStep,
  isAnimating,
}: {
  activeStep: ProcessStep;
  isAnimating: boolean;
}) {
  return (
    <div
      aria-hidden
      className="hidden lg:grid lg:grid-cols-[1fr_2.5fr_1fr] gap-0 px-6 pt-4 pb-2 border-b border-border/60"
    >
      {([1, 2, 3] as const).map((step) => (
        <div key={step} className="flex items-center justify-center">
          <div className="relative flex items-center w-full max-w-[120px]">
            <motion.div
              animate={{
                scale: isAnimating && activeStep === step ? 1.2 : 1,
                backgroundColor:
                  !isAnimating || activeStep === step
                    ? "hsl(var(--foreground))"
                    : "hsl(var(--border))",
              }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="h-2 w-2 rounded-full shrink-0"
            />
            {step < 3 && (
              <div className="flex-1 h-px mx-2 bg-border relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-foreground"
                  animate={{
                    width:
                      !isAnimating || activeStep > step
                        ? "100%"
                        : activeStep === step
                          ? "50%"
                          : "0%",
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProcessSteps({
  activeStep,
  activeSubStep,
  isAnimating,
  layout,
}: {
  activeStep: ProcessStep;
  activeSubStep: ProcessSubStep;
  isAnimating: boolean;
  layout: "mobile" | "desktop";
}) {
  const { t } = useLanguage();

  const steps = (
    <>
      <AnimatedStepShell
        stepIndex={1}
        activeStep={activeStep}
        isAnimating={isAnimating}
      >
        <SideStep
          index={1}
          title={t("hero.flow.step1.title")}
          description={t("hero.flow.step1.desc")}
          isActive={!isAnimating || activeStep === 1}
        />
      </AnimatedStepShell>

      <AnimatedStepShell
        stepIndex={2}
        activeStep={activeStep}
        isAnimating={isAnimating}
        className="bg-muted/20"
      >
        <ProductionStep
          index={2}
          activeSubStep={activeSubStep}
          isStepActive={!isAnimating || activeStep === 2}
          isAnimating={isAnimating}
        />
      </AnimatedStepShell>

      <AnimatedStepShell
        stepIndex={3}
        activeStep={activeStep}
        isAnimating={isAnimating}
      >
        <SideStep
          index={3}
          title={t("hero.flow.step3.title")}
          description={t("hero.flow.step3.desc")}
          isActive={!isAnimating || activeStep === 3}
        />
      </AnimatedStepShell>
    </>
  );

  if (layout === "mobile") {
    return <div className="divide-y divide-border lg:hidden">{steps}</div>;
  }

  return (
    <div className="hidden lg:grid lg:grid-cols-[1fr_2.5fr_1fr] lg:divide-x divide-border">
      {steps}
    </div>
  );
}

export function HeroProductionFlow() {
  const { t, language } = useLanguage();
  const { containerRef, activeStep, activeSubStep, isAnimating } =
    useProcessStepAnimation();

  return (
    <div ref={containerRef} className="w-full min-w-0">
      <p className={cn(sectionLabelClass(language), "mb-3")}>
        {t("hero.flow.title")}
      </p>

      <div className="border bg-background overflow-hidden">
        <ProcessProgressRail activeStep={activeStep} isAnimating={isAnimating} />

        <ProcessSteps
          activeStep={activeStep}
          activeSubStep={activeSubStep}
          isAnimating={isAnimating}
          layout="mobile"
        />
        <ProcessSteps
          activeStep={activeStep}
          activeSubStep={activeSubStep}
          isAnimating={isAnimating}
          layout="desktop"
        />
      </div>
    </div>
  );
}
