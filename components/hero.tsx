"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center py-16 px-6 overflow-hidden bg-background">
      {/* Centered card */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-background border shadow-2xl p-8 md:p-10 text-center">
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
