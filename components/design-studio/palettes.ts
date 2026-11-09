import type { Palette } from "./types";

export { type Palette };

export const PALETTES: Palette[] = [
  { id: "classic", name: "ক্লাসিক",   bg: "#ffffff", primary: "#111111", accent: "#888888", ink: "#444444" },
  { id: "ocean",   name: "সামুদ্রিক",  bg: "#e8f4f8", primary: "#0d3b66", accent: "#5bb3d6", ink: "#1a5278" },
  { id: "forest",  name: "বনভূমি",    bg: "#f0f7f0", primary: "#1a4a2e", accent: "#6cb98a", ink: "#2d6a4f" },
  { id: "sunset",  name: "সূর্যাস্ত",  bg: "#fff5f0", primary: "#8b1a1a", accent: "#e88c6e", ink: "#c0392b" },
  { id: "royal",   name: "রাজকীয়",   bg: "#f0eefa", primary: "#2c1654", accent: "#b28fe8", ink: "#6a3ab2" },
  { id: "golden",  name: "সোনালি",    bg: "#fffbf0", primary: "#5c3d00", accent: "#e8b84c", ink: "#a06a00" },
  { id: "berry",   name: "বেরি",      bg: "#fdf0f7", primary: "#6b0040", accent: "#e87ab5", ink: "#b0105a" },
  { id: "slate",   name: "শ্লেট",     bg: "#f2f4f6", primary: "#1a2332", accent: "#7a90a8", ink: "#3d5068" },
];
