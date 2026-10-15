export interface BusinessInfo {
  name: string;
  phone: string;
  address: string;
  email: string;
  website: string;
  tagline: string;
}

export interface LogoState {
  dataUrl: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  tint: "none" | "white" | "black";
}

export interface StudioState {
  productId: string;
  info: BusinessInfo;
  paletteId: string;
  fontId: string;
  logo: LogoState;
  selectedElementId: string | null;
  qty: number;
  note: string;
}

export const DEFAULT_INFO: BusinessInfo = {
  name: "আপনার প্রতিষ্ঠানের নাম",
  phone: "+880 1XXX-XXXXXX",
  address: "ঠিকানা লিখুন",
  email: "email@example.com",
  website: "www.example.com",
  tagline: "আপনার ট্যাগলাইন",
};

export const DEFAULT_LOGO: LogoState = {
  dataUrl: null,
  x: 10,
  y: 10,
  width: 20,
  height: 20,
  rotation: 0,
  tint: "none",
};
