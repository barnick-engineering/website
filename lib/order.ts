import { facebookInsights } from "@/data/insights";

export function getMessengerOrderUrl(productName: string): string {
  const text = encodeURIComponent(`Hi Barnick! I want to order: ${productName}`);
  return `${facebookInsights.messengerUrl}?text=${text}`;
}

export function getPhoneUrl(): string {
  return `tel:${facebookInsights.phone}`;
}

export function getFacebookPageUrl(): string {
  return facebookInsights.pageUrl;
}
