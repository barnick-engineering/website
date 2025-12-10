"use client";

import {
  Blocks,
  Bot,
  ChartPie,
  Film,
  MessageCircle,
  Settings2,
} from "lucide-react";
import React from "react";
import { useLanguage } from "@/contexts/language-context";

const Features = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Settings2,
      title: t("features.1.title"),
      description: t("features.1.desc"),
    },
    {
      icon: Blocks,
      title: t("features.2.title"),
      description: t("features.2.desc"),
    },
    {
      icon: Bot,
      title: t("features.3.title"),
      description: t("features.3.desc"),
    },
    {
      icon: Film,
      title: t("features.4.title"),
      description: t("features.4.desc"),
    },
    {
      icon: ChartPie,
      title: t("features.5.title"),
      description: t("features.5.desc"),
    },
    {
      icon: MessageCircle,
      title: t("features.6.title"),
      description: t("features.6.desc"),
    },
    {
      icon: Bot,
      title: t("features.7.title"),
      description: t("features.7.desc"),
    },
    {
      icon: Blocks,
      title: t("features.8.title"),
      description: t("features.8.desc"),
    },
  ];

  return (
    <div id="features" className="w-full py-8 xs:py-12 px-6">
      <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center">
        {t("features.title")}
      </h2>
      <div className="w-full max-w-screen-lg mx-auto mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col bg-background border rounded-xl py-6 px-5"
          >
            <div className="mb-3 h-10 w-10 flex items-center justify-center bg-muted rounded-full">
              <feature.icon className="h-6 w-6" />
            </div>
            <span className="text-lg font-semibold">{feature.title}</span>
            <p className="mt-1 text-foreground/80 text-[15px]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
