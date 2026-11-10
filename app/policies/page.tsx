import type { Metadata } from "next";
import { PoliciesContent } from "./policies-content";

export const metadata: Metadata = {
  title: "পেমেন্ট, ডেলিভারি, রিপ্রিন্ট ও গোপনীয়তা নীতি | বর্ণিক প্রচারাণী",
  description:
    "বর্ণিক প্রচারাণীর পেমেন্ট, ডেলিভারি, রিপ্রিন্ট ও গোপনীয়তা নীতি। Payment, delivery, reprint and privacy policies.",
  alternates: { canonical: "/policies" },
};

export default function PoliciesPage() {
  return <PoliciesContent />;
}
