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
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { ArrowRight } from "lucide-react";

const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Settings2,
      title: t("features.1.title"),
      description: t("features.1.desc"),
      href: "/category/business-essentials",
    },
    {
      icon: Blocks,
      title: t("features.2.title"),
      description: t("features.2.desc"),
      href: "/category/marketing-materials",
    },
    {
      icon: Bot,
      title: t("features.3.title"),
      description: t("features.3.desc"),
      href: "/category/promotional-products",
    },
    {
      icon: Film,
      title: t("features.4.title"),
      description: t("features.4.desc"),
      href: "/category/stickers-labels",
    },
    {
      icon: ChartPie,
      title: t("features.5.title"),
      description: t("features.5.desc"),
      href: "/category/signs-banners-posters",
    },
    {
      icon: MessageCircle,
      title: t("features.6.title"),
      description: t("features.6.desc"),
      href: "/category/event-personal",
    },
    {
      icon: Bot,
      title: t("features.7.title"),
      description: t("features.7.desc"),
      href: "/category/event-personal",
    },
    {
      icon: Blocks,
      title: t("features.8.title"),
      description: t("features.8.desc"),
      href: "/design-services",
    },
  ];

  return (
    <div id="features" className="w-full py-8 xs:py-12 px-6">
      <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center">
        {t("features.title")}
      </h2>
      <div className="w-full max-w-screen-lg mx-auto mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Link
            key={feature.title}
            href={feature.href}
            className="group flex flex-col bg-background border rounded-xl py-6 px-5 hover:shadow-lg hover:border-primary/30 transition-all"
          >
            <div className="mb-3 h-10 w-10 flex items-center justify-center bg-muted rounded-full group-hover:bg-primary/10 transition-colors">
              <feature.icon className="h-6 w-6" />
            </div>
            <span className="text-lg font-semibold">{feature.title}</span>
            <p className="mt-1 text-foreground/80 text-[15px] flex-1">
              {feature.description}
            </p>
            <span className="mt-3 inline-flex items-center text-sm font-medium text-primary">
              {t("shop.explore")} <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Features;
