"use client";

import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";
import Image from "next/image";

export const HomePromoBlocks = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full py-12 xs:py-16 px-6">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/shop"
          className="group relative flex flex-col rounded-2xl overflow-hidden border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-shadow"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/testimonials/3.webp"
              alt=""
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-xl font-bold">{t("home.promoLaunchTitle")}</h3>
            <p className="mt-2 text-muted-foreground text-sm flex-1">
              {t("home.promoLaunchSub")}
            </p>
            <span className="mt-4 w-fit inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground h-10 px-4 py-2 ring-offset-background transition-colors hover:bg-primary/90">
              {t("home.promoGetStarted")}
            </span>
          </div>
        </Link>

        <Link
          href="/design-services"
          className="group relative flex flex-col rounded-2xl overflow-hidden border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-shadow"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/testimonials/1.webp"
              alt=""
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-xl font-bold">{t("home.promoDesignTitle")}</h3>
            <p className="mt-2 text-muted-foreground text-sm flex-1">
              {t("home.promoDesignSub")}
            </p>
            <span className="mt-4 w-fit inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background h-10 px-4 py-2 ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground">
              {t("home.promoDesignCta")}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};
