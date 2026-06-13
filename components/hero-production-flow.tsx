"use client";

import {
  Lightbulb,
  Package,
  Palette,
  Printer,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

function StepLabel({ index, title }: { index: number; title: string }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
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
    <div className="flex flex-col justify-center p-5 lg:p-6 h-full">
      <StepLabel index={index} title={title} />
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function ProductionStep({ index }: { index: number }) {
  const { t } = useLanguage();

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
    <div className="p-5 lg:p-6 h-full bg-muted/20">
      <StepLabel index={index} title={t("hero.flow.step2.title")} />

      {/* Core workflow — primary focus */}
      <div className="mt-5 grid grid-cols-3 divide-x divide-border/80 rounded-lg border border-border bg-muted/35 shadow-sm">
        {pipeline.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center px-2 py-6 sm:py-7 text-center"
          >
            <Icon className="h-6 w-6 text-foreground mb-3.5" strokeWidth={1.75} />
            <span className="text-base sm:text-lg font-bold text-foreground leading-none tracking-tight">
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
            className="flex items-center justify-center gap-2 rounded-md border border-border/60 bg-background/80 px-3 py-2.5 sm:py-3"
          >
            <Icon className="h-4 w-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
            <span className="text-xs sm:text-sm font-semibold text-foreground leading-none">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroProductionFlow() {
  const { t } = useLanguage();

  return (
    <div className="w-full">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground mb-3">
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
