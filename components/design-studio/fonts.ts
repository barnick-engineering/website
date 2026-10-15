export const CANVAS_FONTS = [
  { id: "noto-sans", labelBn: "নোটো সান্স", family: "Noto Sans Bengali" },
  { id: "hind-siliguri", labelBn: "হিন্দ সিলিগুড়ি", family: "Hind Siliguri" },
  { id: "noto-serif", labelBn: "নোটো সেরিফ", family: "Noto Serif Bengali" },
  { id: "baloo-da", labelBn: "বালু দা ২", family: "Baloo Da 2" },
  { id: "galada", labelBn: "গালাডা", family: "Galada" },
] as const;

export type FontId = (typeof CANVAS_FONTS)[number]["id"];
