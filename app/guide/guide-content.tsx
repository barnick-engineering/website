"use client";

import { ContentPage } from "@/components/content-page";
import { guidePage } from "@/data/guide";

export function GuideContent() {
  return <ContentPage {...guidePage} ctaSource="guide" />;
}
