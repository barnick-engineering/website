export type PaletteToken = "bg" | "primary" | "accent" | "ink";
export type ColorValue = PaletteToken | string;
export type TextAnchor = "start" | "middle" | "end";
export type LogoMono = "none" | "white" | "black";

export interface RectEl {
  id: string; type: "rect";
  x: number; y: number; w: number; h: number;
  fill: ColorValue; stroke?: ColorValue; strokeW?: number; rx?: number;
  lock?: boolean; base?: boolean; outside?: boolean;
}
export interface CircleEl {
  id: string; type: "circle";
  cx: number; cy: number; r: number;
  fill: ColorValue; stroke?: ColorValue; strokeW?: number;
  lock?: boolean; base?: boolean; outside?: boolean;
}
export interface LineEl {
  id: string; type: "line";
  x1: number; y1: number; x2: number; y2: number;
  stroke: ColorValue; strokeW: number;
  lock?: boolean; outside?: boolean;
}
export interface PathEl {
  id: string; type: "path";
  d: string;
  fill?: ColorValue; stroke?: ColorValue; strokeW?: number;
  lock?: boolean; base?: boolean; outside?: boolean;
}
export interface TextEl {
  id: string; type: "text";
  x: number; y: number;
  text: string;
  fontSize: number; fontWeight?: "normal" | "bold";
  anchor?: TextAnchor;
  fill: ColorValue;
  lock?: boolean;
}
export interface LogoEl {
  id: string; type: "logo";
  x: number; y: number; w: number; h: number;
  mono?: LogoMono;
}

export type StudioEl = RectEl | CircleEl | LineEl | PathEl | TextEl | LogoEl;

export interface Palette {
  id: string;
  name: string;
  bg: string; primary: string; accent: string; ink: string;
}

export interface BusinessInfo {
  name: string; tag: string; person: string; role: string;
  phone: string; addr: string; web: string;
}

export interface LogoState { src: string | null; aspect: number; }

export interface Product {
  id: string; labelBn: string;
  widthMm: number; heightMm: number;
  shape: "rect" | "circle";
  bagHandles?: boolean;
  build: () => StudioEl[];
}

/** Resolve a ColorValue (palette token or raw hex) against a palette. */
export function col(v: ColorValue, p: Palette): string {
  if (v === "bg") return p.bg;
  if (v === "primary") return p.primary;
  if (v === "accent") return p.accent;
  if (v === "ink") return p.ink;
  return v;
}

/** Substitute {token} placeholders with BusinessInfo values. */
export function sub(s: string, info: BusinessInfo): string {
  return s
    .replace(/\{name\}/g, info.name)
    .replace(/\{tag\}/g, info.tag)
    .replace(/\{person\}/g, info.person)
    .replace(/\{role\}/g, info.role)
    .replace(/\{phone\}/g, info.phone)
    .replace(/\{addr\}/g, info.addr)
    .replace(/\{web\}/g, info.web);
}

export const INFO_FIELDS: Array<{ key: keyof BusinessInfo; labelBn: string; placeholder: string }> = [
  { key: "name",   labelBn: "প্রতিষ্ঠানের নাম", placeholder: "আপনার ব্যবসার নাম" },
  { key: "tag",    labelBn: "ট্যাগলাইন",         placeholder: "মানসম্পন্ন সেবা সবসময়" },
  { key: "person", labelBn: "নাম (ব্যক্তি)",      placeholder: "আপনার পূর্ণ নাম" },
  { key: "role",   labelBn: "পদবি",               placeholder: "মালিক / ম্যানেজার" },
  { key: "phone",  labelBn: "ফোন নম্বর",           placeholder: "+880 1XXX-XXXXXX" },
  { key: "addr",   labelBn: "ঠিকানা",              placeholder: "শহর, জেলা" },
  { key: "web",    labelBn: "ওয়েবসাইট",            placeholder: "www.example.com" },
];

export const DEFAULT_INFO: BusinessInfo = {
  name:   "আপনার প্রতিষ্ঠান",
  tag:    "মানসম্পন্ন সেবা সবসময়",
  person: "মোঃ আব্দুল্লাহ",
  role:   "স্বত্বাধিকারী",
  phone:  "+880 1712-345678",
  addr:   "ঢাকা, বাংলাদেশ",
  web:    "www.example.com",
};

export const DEFAULT_LOGO: LogoState = { src: null, aspect: 1 };
