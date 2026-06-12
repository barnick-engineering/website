"use client";

import Link from "next/link";
import {
  Briefcase,
  Calendar,
  Gift,
  Image,
  Megaphone,
  ShieldCheck,
  Sticker,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { categories } from "@/data/categories";
import { useLanguage } from "@/contexts/language-context";

const categoryIcons: Record<string, LucideIcon> = {
  corporate: Briefcase,
  marketing: Megaphone,
  promotional: Gift,
  labels: Sticker,
  "large-format": Image,
  stationery: FileText,
  event: Calendar,
  security: ShieldCheck,
};

export default function Features() {
  const { t, language } = useLanguage();

  return (
    <div id="features" className="w-full py-12 xs:py-16 px-6">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center">
          {t("features.title")}
        </h2>
        <p className="mt-3 text-center text-muted-foreground max-w-xl mx-auto">
          {t("features.subtitle")}
        </p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.id] ?? Briefcase;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group flex flex-col rounded-2xl border bg-background p-5 hover:shadow-md transition-shadow"
              >
                <div className="h-11 w-11 rounded-full bg-muted flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-sm">{cat.name[language]}</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {cat.description[language]}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
