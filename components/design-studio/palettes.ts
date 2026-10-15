export interface Palette {
  id: string;
  labelBn: string;
  bg: string;
  primary: string;
  secondary: string;
  accent: string;
}

export const PALETTES: Palette[] = [
  { id: "classic", labelBn: "ক্লাসিক", bg: "#ffffff", primary: "#000000", secondary: "#444444", accent: "#888888" },
  { id: "ocean", labelBn: "সামুদ্রিক", bg: "#e8f4f8", primary: "#0d3b66", secondary: "#1a6b9a", accent: "#5bb3d6" },
  { id: "forest", labelBn: "বনভূমি", bg: "#f0f7f0", primary: "#1a4a2e", secondary: "#2d7a4b", accent: "#6cb98a" },
  { id: "sunset", labelBn: "সূর্যাস্ত", bg: "#fff5f0", primary: "#8b1a1a", secondary: "#c0392b", accent: "#e88c6e" },
  { id: "royal", labelBn: "রাজকীয়", bg: "#f0eefa", primary: "#2c1654", secondary: "#6a3ab2", accent: "#b28fe8" },
  { id: "golden", labelBn: "সোনালি", bg: "#fffbf0", primary: "#5c3d00", secondary: "#a06a00", accent: "#e8b84c" },
  { id: "berry", labelBn: "বেরি", bg: "#fdf0f7", primary: "#6b0040", secondary: "#b0105a", accent: "#e87ab5" },
  { id: "slate", labelBn: "শ্লেট", bg: "#f2f4f6", primary: "#1a2332", secondary: "#3d5068", accent: "#7a90a8" },
];
