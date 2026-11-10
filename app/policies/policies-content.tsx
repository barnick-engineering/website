"use client";

import { ContentPage } from "@/components/content-page";
import { policiesPage } from "@/data/policies";

export function PoliciesContent() {
  return <ContentPage {...policiesPage} ctaSource="policies" />;
}
