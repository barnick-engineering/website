"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

const HERO_IMAGES = [
  "/testimonials/1.webp",
  "/testimonials/2.webp",
  "/testimonials/3.webp",
  "/testimonials/4.webp",
  "/testimonials/5.webp",
  "/testimonials/6.webp",
];

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center py-16 px-6 overflow-hidden">
      {/* Product collage background */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1">
        {HERO_IMAGES.map((src, i) => (
          <div key={i} className="relative overflow-hidden">
            <Image
              src={src}
              alt=""
              fill
              className="object-cover scale-110"
              sizes="33vw"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-black/60" aria-hidden />

      {/* Centered overlay card */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-background/95 dark:bg-background/90 backdrop-blur-sm border shadow-2xl p-8 md:p-10 text-center">
        <Badge className="mb-4 bg-primary/90 text-primary-foreground border-0 rounded-full px-4 py-1.5 text-sm font-medium">
          {t("hero.badge")}
        </Badge>
        <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold !leading-[1.2] tracking-tight text-foreground">
          {t("hero.title")}
        </h1>
        <p className="mt-4 text-muted-foreground xs:text-lg">
          {t("hero.subtitle")}
        </p>
        <p className="mt-6 text-sm font-medium text-foreground">
          {t("hero.tryTopProductsLine")}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap">
          <Button size="lg" className="w-full sm:w-auto rounded-full" asChild>
            <Link href="/shop">{t("hero.getStarted")}</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto rounded-full"
            asChild
          >
            <Link href="/shop#featured">{t("hero.bestselling")}</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto rounded-full"
            asChild
          >
            <Link href="/design-services">{t("hero.designServices")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
