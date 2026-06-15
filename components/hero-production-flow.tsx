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
  useProcessAnimation,
  type ProcessStep,
  type ProcessSubStep,
} from "@/hooks/use-process-step-animation";
import { sectionLabelClass } from "@/lib/typography";
import { cn } from "@/lib/utils";

function StepLabel({
  index,
  title,
  pop,
  isActive,
}: {
  index: number;
  title: string;
  pop: boolean;
  isActive: boolean;
}) {
  const { language } = useLanguage();
  const stepNum = String(index).padStart(2, "0");

  return (
    <p
      className={cn(
        sectionLabelClass(language),
        isActive && "text-foreground font-semibold"
      )}
    >
      <motion.span
        className="inline-block origin-left"
        initial={false}
        animate={pop ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {stepNum}
      </motion.span>
      {" · "}
      {title}
    </p>
  );
}

function BouncyIcon({
  icon: Icon,
  bounce,
  className,
  strokeWidth = 1.75,
}: {
  icon: typeof Lightbulb;
  bounce: boolean;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <motion.div
      initial={false}
      animate={bounce ? { y: [0, -6, 0] } : { y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="shrink-0"
    >
      <Icon className={className} strokeWidth={strokeWidth} />
    </motion.div>
  );
}

function AnimatedColumn({
  revealed,
  isLooping,
  isActive,
  prefersReducedMotion,
  children,
  className,
}: {
  revealed: boolean;
  isLooping: boolean;
  isActive: boolean;
  prefersReducedMotion: boolean;
  children: ReactNode;
  className?: string;
}) {
  const showRevealed = prefersReducedMotion || revealed;

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: showRevealed ? 1 : 0,
        y: showRevealed ? 0 : 16,
        backgroundColor:
          isLooping && isActive
            ? "hsl(var(--foreground) / 0.05)"
            : "hsl(var(--background) / 0)",
        boxShadow:
          isLooping && isActive
            ? "0 4px 20px rgba(0, 0, 0, 0.06)"
            : "0 0 0 rgba(0, 0, 0, 0)",
      }}
      transition={{
        opacity: { duration: 0.35, ease: "easeInOut" },
        y: { duration: 0.45, ease: "easeOut" },
        backgroundColor: { duration: 0.45, ease: "easeInOut" },
        boxShadow: { duration: 0.45, ease: "easeInOut" },
      }}
      className={cn(
        "h-full min-w-0 relative",
        isLooping && isActive && "ring-1 ring-foreground/20",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

function SideStep({
  index,
  title,
  description,
  revealed,
  isActive,
}: {
  index: number;
  title: string;
  description: string;
  revealed: boolean;
  isActive: boolean;
}) {
  return (
    <div className="flex flex-col justify-center p-5 lg:p-6 h-full min-w-0">
      <StepLabel index={index} title={title} pop={revealed} isActive={isActive} />
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function SubItem({
  icon: Icon,
  label,
  revealed,
  highlighted,
  isLooping,
  language,
  variant,
}: {
  icon: typeof Lightbulb;
  label: string;
  revealed: boolean;
  highlighted: boolean;
  isLooping: boolean;
  language: string;
  variant: "pipeline" | "service";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{
        opacity: revealed ? 1 : 0,
        x: revealed ? 0 : -10,
        backgroundColor:
          isLooping && highlighted
            ? "hsl(var(--foreground) / 0.06)"
            : variant === "service"
              ? "hsl(var(--background) / 0.8)"
              : "transparent",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={cn(
        variant === "pipeline"
          ? "flex flex-col items-center justify-center px-1 sm:px-2 py-5 sm:py-7 text-center min-w-0"
          : "flex flex-col xs:flex-row items-center justify-center gap-1.5 xs:gap-2 border border-border/60 bg-background/80 px-2.5 xs:px-3 py-2.5 sm:py-3 min-w-0 text-center xs:text-left",
        isLooping && highlighted && "ring-1 ring-foreground/25",
        isLooping && highlighted && variant === "pipeline" && "bg-foreground/5"
      )}
    >
      <BouncyIcon
        icon={Icon}
        bounce={revealed && highlighted && !isLooping}
        className={cn(
          variant === "pipeline" ? "h-6 w-6 mb-3" : "h-4 w-4",
          highlighted ? "text-foreground" : "text-muted-foreground"
        )}
        strokeWidth={variant === "pipeline" ? 1.75 : 1.5}
      />
      <span
        className={cn(
          "font-semibold text-foreground min-w-0 text-center",
          variant === "pipeline" && "font-bold",
          isLooping && !highlighted && "text-foreground/75",
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
  revealed,
  revealedSubSteps,
  isStepActive,
  isLooping,
  activeSubStep,
}: {
  index: number;
  revealed: boolean;
  revealedSubSteps: number;
  isStepActive: boolean;
  isLooping: boolean;
  activeSubStep: ProcessSubStep;
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

  const subRevealed = (subIndex: number) => revealedSubSteps > subIndex;

  const subHighlighted = (subIndex: ProcessSubStep) => {
    if (!isLooping || !isStepActive) return subRevealed(subIndex);
    return activeSubStep === subIndex;
  };

  return (
    <div className="p-5 lg:p-6 h-full bg-muted/20 min-w-0">
      <StepLabel
        index={index}
        title={t("hero.flow.step2.title")}
        pop={revealed}
        isActive={isStepActive}
      />

      <div className="mt-5 grid grid-cols-3 divide-x divide-border/80 border border-border bg-muted/35 shadow-sm">
        {pipeline.map(({ icon, label }, i) => (
          <SubItem
            key={label}
            icon={icon}
            label={label}
            revealed={subRevealed(i)}
            highlighted={subHighlighted(i as ProcessSubStep)}
            isLooping={isLooping && isStepActive}
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
            revealed={subRevealed(i + 3)}
            highlighted={subHighlighted((i + 3) as ProcessSubStep)}
            isLooping={isLooping && isStepActive}
            language={language}
            variant="service"
          />
        ))}
      </div>
    </div>
  );
}

function ProcessSteps({
  revealedColumns,
  revealedSubSteps,
  activeStep,
  activeSubStep,
  isLooping,
  prefersReducedMotion,
  layout,
}: {
  revealedColumns: [boolean, boolean, boolean];
  revealedSubSteps: number;
  activeStep: ProcessStep;
  activeSubStep: ProcessSubStep;
  isLooping: boolean;
  prefersReducedMotion: boolean;
  layout: "mobile" | "desktop";
}) {
  const { t } = useLanguage();

  const columnProps = (step: ProcessStep) => {
    const isActive = !isLooping || activeStep === step;
    return {
      revealed: revealedColumns[step - 1],
      isLooping,
      isActive,
      prefersReducedMotion,
    };
  };

  const steps = (
    <>
      <AnimatedColumn {...columnProps(1)}>
        <SideStep
          index={1}
          title={t("hero.flow.step1.title")}
          description={t("hero.flow.step1.desc")}
          revealed={revealedColumns[0]}
          isActive={!isLooping || activeStep === 1}
        />
      </AnimatedColumn>

      <AnimatedColumn {...columnProps(2)} className="bg-muted/20">
        <ProductionStep
          index={2}
          revealed={revealedColumns[1]}
          revealedSubSteps={revealedSubSteps}
          isStepActive={!isLooping || activeStep === 2}
          isLooping={isLooping}
          activeSubStep={activeSubStep}
        />
      </AnimatedColumn>

      <AnimatedColumn {...columnProps(3)}>
        <SideStep
          index={3}
          title={t("hero.flow.step3.title")}
          description={t("hero.flow.step3.desc")}
          revealed={revealedColumns[2]}
          isActive={!isLooping || activeStep === 3}
        />
      </AnimatedColumn>
    </>
  );

  if (layout === "mobile") {
    return <div className="divide-y divide-border lg:hidden">{steps}</div>;
  }

  return (
    <div className="hidden lg:grid lg:grid-cols-[1fr_2.5fr_1fr] lg:divide-x divide-border relative">
      {steps}
    </div>
  );
}

export function HeroProductionFlow() {
  const { t, language } = useLanguage();
  const {
    containerRef,
    prefersReducedMotion,
    revealedColumns,
    revealedSubSteps,
    activeStep,
    activeSubStep,
    isLooping,
  } = useProcessAnimation();

  return (
    <div ref={containerRef} className="w-full min-w-0">
      <p className={cn(sectionLabelClass(language), "mb-3")}>
        {t("hero.flow.title")}
      </p>

      <div className="border bg-background overflow-hidden">
        <ProcessSteps
          revealedColumns={revealedColumns}
          revealedSubSteps={revealedSubSteps}
          activeStep={activeStep}
          activeSubStep={activeSubStep}
          isLooping={isLooping}
          prefersReducedMotion={prefersReducedMotion}
          layout="mobile"
        />
        <ProcessSteps
          revealedColumns={revealedColumns}
          revealedSubSteps={revealedSubSteps}
          activeStep={activeStep}
          activeSubStep={activeSubStep}
          isLooping={isLooping}
          prefersReducedMotion={prefersReducedMotion}
          layout="desktop"
        />
      </div>
    </div>
  );
}
