"use client";

import {
  Lightbulb,
  Package,
  Palette,
  Printer,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { sectionLabelClass } from "@/lib/typography";
import { cn } from "@/lib/utils";

function StepLabel({ index, title }: { index: number; title: string }) {
  const { language } = useLanguage();

  return (
    <p className={sectionLabelClass(language)}>
      {String(index).padStart(2, "0")} · {title}
    </p>
  );
}

function SideStep({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col justify-center p-5 lg:p-6 h-full min-w-0">
      <StepLabel index={index} title={title} />
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function ProductionStep({ index }: { index: number }) {
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

  return (
    <div className="p-5 lg:p-6 h-full bg-muted/20 min-w-0">
      <StepLabel index={index} title={t("hero.flow.step2.title")} />

      {/* Core workflow — primary focus */}
      <div className="mt-5 grid grid-cols-3 divide-x divide-border/80 rounded-lg border border-border bg-muted/35 shadow-sm">
        {pipeline.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center px-1 sm:px-2 py-5 sm:py-7 text-center min-w-0"
          >
            <Icon className="h-6 w-6 text-foreground mb-3 shrink-0" strokeWidth={1.75} />
            <span
              className={cn(
                "font-bold text-foreground text-center",
                language === "bn"
                  ? "text-xs sm:text-sm leading-normal tracking-normal"
                  : "text-sm sm:text-base leading-tight tracking-tight"
              )}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Printing & Packaging — secondary */}
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {services.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col xs:flex-row items-center justify-center gap-1.5 xs:gap-2 rounded-md border border-border/60 bg-background/80 px-2.5 xs:px-3 py-2.5 sm:py-3 min-w-0 text-center xs:text-left"
          >
            <Icon className="h-4 w-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
            <span
              className={cn(
                "font-semibold text-foreground min-w-0",
                language === "bn"
                  ? "text-xs sm:text-sm leading-snug tracking-normal"
                  : "text-xs sm:text-sm leading-none"
              )}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroProductionFlow() {
  const { t, language } = useLanguage();

  return (
    <div className="w-full min-w-0">
      <p className={cn(sectionLabelClass(language), "mb-3")}>
        {t("hero.flow.title")}
      </p>

      <div className="rounded-xl border bg-background overflow-hidden">
        {/* Mobile: stacked */}
        <div className="divide-y divide-border lg:hidden">
          <SideStep
            index={1}
            title={t("hero.flow.step1.title")}
            description={t("hero.flow.step1.desc")}
          />
          <ProductionStep index={2} />
          <SideStep
            index={3}
            title={t("hero.flow.step3.title")}
            description={t("hero.flow.step3.desc")}
          />
        </div>

        {/* Desktop: unified three-column panel */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_2.5fr_1fr] lg:divide-x divide-border">
          <SideStep
            index={1}
            title={t("hero.flow.step1.title")}
            description={t("hero.flow.step1.desc")}
          />
          <ProductionStep index={2} />
          <SideStep
            index={3}
            title={t("hero.flow.step3.title")}
            description={t("hero.flow.step3.desc")}
          />
        </div>
      </div>
    </div>
  );
}
