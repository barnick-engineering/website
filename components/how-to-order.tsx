"use client";

import { MousePointerClick, MessageCircle, Truck } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export function HowToOrder() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: MousePointerClick,
      title: t("howTo.step1.title"),
      desc: t("howTo.step1.desc"),
    },
    {
      icon: MessageCircle,
      title: t("howTo.step2.title"),
      desc: t("howTo.step2.desc"),
    },
    {
      icon: Truck,
      title: t("howTo.step3.title"),
      desc: t("howTo.step3.desc"),
    },
  ];

  return (
    <section className="w-full py-12 xs:py-16 px-6">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-3xl xs:text-4xl font-bold tracking-tight text-center">
          {t("howTo.title")}
        </h2>
        <p className="mt-3 text-center text-muted-foreground max-w-xl mx-auto">
          {t("howTo.subtitle")}
        </p>
        <div className="mt-10 grid sm:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative flex flex-col items-center text-center p-6 rounded-2xl border bg-background"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 h-7 w-7 rounded-full bg-foreground text-background text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div className="mt-4 h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <step.icon className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="mt-4 font-semibold text-lg">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
