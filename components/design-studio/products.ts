import type { Product, StudioEl } from "./types";

// ── Visiting Card ──────────────────────────────────────────── 90×54 mm ──
const card: Product = {
  id: "card", labelBn: "ভিজিটিং কার্ড",
  widthMm: 90, heightMm: 54, shape: "rect",
  build: (): StudioEl[] => [
    { id: "bg",    type: "rect",   x: 0,  y: 0,    w: 90, h: 54,  fill: "bg",      lock: true, base: true },
    { id: "hdr",   type: "rect",   x: 0,  y: 0,    w: 90, h: 11,  fill: "primary", lock: true },
    { id: "bot",   type: "rect",   x: 0,  y: 51,   w: 90, h: 3,   fill: "accent",  lock: true },
    { id: "logo",  type: "logo",   x: 2,  y: 1.5,  w: 8,  h: 8 },
    { id: "nm",    type: "text",   x: 13, y: 8.5,  text: "{name}",   fontSize: 5,   fontWeight: "bold",   anchor: "start", fill: "bg" },
    { id: "tag",   type: "text",   x: 4,  y: 17,   text: "{tag}",    fontSize: 2.8, fontWeight: "normal", anchor: "start", fill: "ink" },
    { id: "div",   type: "line",   x1: 4, y1: 19.5, x2: 86, y2: 19.5, stroke: "accent", strokeW: 0.4, lock: true },
    { id: "per",   type: "text",   x: 4,  y: 26,   text: "{person}", fontSize: 3.8, fontWeight: "bold",   anchor: "start", fill: "primary" },
    { id: "rol",   type: "text",   x: 4,  y: 31,   text: "{role}",   fontSize: 2.8, fontWeight: "normal", anchor: "start", fill: "ink" },
    { id: "ph",    type: "text",   x: 4,  y: 38,   text: "{phone}",  fontSize: 2.8, fontWeight: "normal", anchor: "start", fill: "ink" },
    { id: "ad",    type: "text",   x: 4,  y: 43,   text: "{addr}",   fontSize: 2.5, fontWeight: "normal", anchor: "start", fill: "ink" },
    { id: "wb",    type: "text",   x: 4,  y: 48,   text: "{web}",    fontSize: 2.5, fontWeight: "normal", anchor: "start", fill: "ink" },
  ],
};

// ── Cash Memo ──────────────────────────────────────────────── 216×140 mm ──
const memo: Product = {
  id: "memo", labelBn: "ক্যাশ মেমো",
  widthMm: 140, heightMm: 216, shape: "rect",
  build: (): StudioEl[] => {
    // Portrait A5 cash memo — 11 data rows between header and footer
    const rowYs = [52, 66, 80, 94, 108, 122, 136, 150, 164, 178, 192];
    const rowLines: StudioEl[] = rowYs.map((y, i): StudioEl => ({
      id: `row${i}`, type: "line", x1: 4, y1: y, x2: 136, y2: y,
      stroke: "accent", strokeW: 0.3, lock: true,
    }));
    return [
      { id: "bg",    type: "rect",   x: 0,   y: 0,   w: 140, h: 216, fill: "bg",      lock: true, base: true },
      { id: "hdr",   type: "rect",   x: 0,   y: 0,   w: 140, h: 27,  fill: "primary", lock: true },
      { id: "ftr",   type: "rect",   x: 0,   y: 208, w: 140, h: 8,   fill: "accent",  lock: true },
      { id: "logo",  type: "logo",   x: 3,   y: 3,   w: 21,  h: 21,  mono: "white" },
      { id: "nm",    type: "text",   x: 28,  y: 12,  text: "{name}",   fontSize: 6,   fontWeight: "bold",   anchor: "start", fill: "bg" },
      { id: "tag",   type: "text",   x: 28,  y: 20,  text: "{tag}",    fontSize: 2.8, fontWeight: "normal", anchor: "start", fill: "bg" },
      { id: "ph",    type: "text",   x: 136, y: 8,   text: "{phone}",  fontSize: 2.8, fontWeight: "normal", anchor: "end",   fill: "bg" },
      { id: "ad",    type: "text",   x: 136, y: 13,  text: "{addr}",   fontSize: 2.8, fontWeight: "normal", anchor: "end",   fill: "bg" },
      { id: "wb",    type: "text",   x: 136, y: 18,  text: "{web}",    fontSize: 2.8, fontWeight: "normal", anchor: "end",   fill: "bg" },
      { id: "thdr",  type: "rect",   x: 4,   y: 28,  w: 132, h: 10,  fill: "accent",  lock: true },
      { id: "th1",   type: "text",   x: 8,   y: 35.5, text: "ক্রমিক",          fontSize: 2.8, fontWeight: "bold", anchor: "start", fill: "bg", lock: true },
      { id: "th2",   type: "text",   x: 40,  y: 35.5, text: "পণ্য / সেবার বিবরণ", fontSize: 2.8, fontWeight: "bold", anchor: "start", fill: "bg", lock: true },
      { id: "th3",   type: "text",   x: 100, y: 35.5, text: "পরিমাণ",          fontSize: 2.8, fontWeight: "bold", anchor: "start", fill: "bg", lock: true },
      { id: "th4",   type: "text",   x: 118, y: 35.5, text: "মূল্য",           fontSize: 2.8, fontWeight: "bold", anchor: "start", fill: "bg", lock: true },
      { id: "v1",    type: "line",   x1: 35,  y1: 28, x2: 35,  y2: 196, stroke: "accent", strokeW: 0.3, lock: true },
      { id: "v2",    type: "line",   x1: 97,  y1: 28, x2: 97,  y2: 196, stroke: "accent", strokeW: 0.3, lock: true },
      { id: "v3",    type: "line",   x1: 116, y1: 28, x2: 116, y2: 196, stroke: "accent", strokeW: 0.3, lock: true },
      ...rowLines,
      { id: "totBg", type: "rect",   x: 4,   y: 194, w: 132, h: 11,  fill: "bg",      stroke: "accent", strokeW: 0.4, lock: true },
      { id: "totLb", type: "text",   x: 100, y: 202, text: "মোট টাকা",  fontSize: 2.8, fontWeight: "bold", anchor: "start", fill: "primary", lock: true },
      { id: "tnk",   type: "text",   x: 70,  y: 213, text: "ধন্যবাদ আপনার ক্রয়ের জন্য", fontSize: 2.8, fontWeight: "normal", anchor: "middle", fill: "bg", lock: true },
    ];
  },
};

// ── Paper Bag ──────────────────────────────────────────────── 200×280 mm ──
const bag: Product = {
  id: "bag", labelBn: "পেপার ব্যাগ",
  widthMm: 200, heightMm: 280, shape: "rect", bagHandles: true,
  build: (): StudioEl[] => [
    { id: "bg",    type: "rect",   x: 0,   y: 0,   w: 200, h: 280, fill: "bg",      lock: true, base: true },
    { id: "bot",   type: "rect",   x: 0,   y: 255, w: 200, h: 25,  fill: "primary", lock: true },
    { id: "accL",  type: "rect",   x: 0,   y: 0,   w: 8,   h: 280, fill: "accent",  lock: true },
    { id: "accR",  type: "rect",   x: 192, y: 0,   w: 8,   h: 280, fill: "accent",  lock: true },
    // Handles outside product area (drawn above top edge)
    { id: "hL",    type: "path",   d: "M 50 0 C 50 -18 90 -18 90 0",    stroke: "primary", strokeW: 3, fill: "bg", outside: true, lock: true },
    { id: "hR",    type: "path",   d: "M 110 0 C 110 -18 150 -18 150 0", stroke: "primary", strokeW: 3, fill: "bg", outside: true, lock: true },
    { id: "logo",  type: "logo",   x: 75,  y: 60,  w: 50,  h: 50 },
    { id: "nm",    type: "text",   x: 100, y: 140, text: "{name}",   fontSize: 10,  fontWeight: "bold",   anchor: "middle", fill: "primary" },
    { id: "tag",   type: "text",   x: 100, y: 153, text: "{tag}",    fontSize: 4.5, fontWeight: "normal", anchor: "middle", fill: "ink" },
    { id: "div",   type: "line",   x1: 20, y1: 157, x2: 180, y2: 157, stroke: "accent", strokeW: 0.5, lock: true },
    { id: "ph",    type: "text",   x: 100, y: 165, text: "{phone}",  fontSize: 4,   fontWeight: "normal", anchor: "middle", fill: "ink" },
    { id: "wb",    type: "text",   x: 100, y: 173, text: "{web}",    fontSize: 3.5, fontWeight: "normal", anchor: "middle", fill: "ink" },
    { id: "btxt",  type: "text",   x: 100, y: 268, text: "{name}",   fontSize: 4,   fontWeight: "bold",   anchor: "middle", fill: "bg",     lock: true },
  ],
};

// ── Letterhead ─────────────────────────────────────────────── 210×297 mm ──
const letterhead: Product = {
  id: "letterhead", labelBn: "লেটারহেড প্যাড",
  widthMm: 210, heightMm: 297, shape: "rect",
  build: (): StudioEl[] => [
    { id: "bg",    type: "rect",   x: 0,   y: 0,   w: 210, h: 297, fill: "bg",      lock: true, base: true },
    { id: "hdr",   type: "rect",   x: 0,   y: 0,   w: 210, h: 32,  fill: "primary", lock: true },
    { id: "ftr",   type: "rect",   x: 0,   y: 288, w: 210, h: 9,   fill: "accent",  lock: true },
    { id: "accV",  type: "rect",   x: 0,   y: 0,   w: 6,   h: 32,  fill: "accent",  lock: true },
    { id: "logo",  type: "logo",   x: 9,   y: 5,   w: 22,  h: 22,  mono: "white" },
    { id: "nm",    type: "text",   x: 35,  y: 15,  text: "{name}",   fontSize: 8,   fontWeight: "bold",   anchor: "start", fill: "bg" },
    { id: "tag",   type: "text",   x: 35,  y: 23,  text: "{tag}",    fontSize: 3.2, fontWeight: "normal", anchor: "start", fill: "bg" },
    { id: "ph",    type: "text",   x: 205, y: 10,  text: "{phone}",  fontSize: 3,   fontWeight: "normal", anchor: "end",   fill: "bg" },
    { id: "ad",    type: "text",   x: 205, y: 15,  text: "{addr}",   fontSize: 3,   fontWeight: "normal", anchor: "end",   fill: "bg" },
    { id: "wb",    type: "text",   x: 205, y: 20,  text: "{web}",    fontSize: 3,   fontWeight: "normal", anchor: "end",   fill: "bg" },
    ...Array.from({ length: 18 }, (_, i): StudioEl => ({
      id: `ln${i}`, type: "line",
      x1: 15, y1: 50 + i * 13, x2: 195, y2: 50 + i * 13,
      stroke: "accent", strokeW: 0.25, lock: true,
    })),
    { id: "fph",   type: "text",   x: 15,  y: 293, text: "{phone}",  fontSize: 2.8, fontWeight: "normal", anchor: "start", fill: "bg",     lock: true },
    { id: "fwb",   type: "text",   x: 195, y: 293, text: "{web}",    fontSize: 2.8, fontWeight: "normal", anchor: "end",   fill: "bg",     lock: true },
  ],
};

// ── Envelope ───────────────────────────────────────────────── 220×110 mm ──
const envelope: Product = {
  id: "envelope", labelBn: "খাম",
  widthMm: 220, heightMm: 110, shape: "rect",
  build: (): StudioEl[] => [
    { id: "bg",    type: "rect",   x: 0,   y: 0,   w: 220, h: 110, fill: "bg",      lock: true, base: true },
    { id: "left",  type: "rect",   x: 0,   y: 0,   w: 75,  h: 110, fill: "primary", lock: true },
    { id: "topBar",type: "rect",   x: 0,   y: 0,   w: 220, h: 2,   fill: "accent",  lock: true },
    { id: "botBar",type: "rect",   x: 0,   y: 108, w: 220, h: 2,   fill: "accent",  lock: true },
    { id: "logo",  type: "logo",   x: 5,   y: 30,  w: 30,  h: 30,  mono: "white" },
    { id: "nm",    type: "text",   x: 37,  y: 60,  text: "{name}",   fontSize: 4.5, fontWeight: "bold",   anchor: "middle", fill: "bg" },
    { id: "tag",   type: "text",   x: 37,  y: 67,  text: "{tag}",    fontSize: 2.5, fontWeight: "normal", anchor: "middle", fill: "bg" },
    { id: "div",   type: "line",   x1: 78, y1: 5,  x2: 78, y2: 105, stroke: "accent", strokeW: 0.5, lock: true },
    { id: "rNm",   type: "text",   x: 84,  y: 25,  text: "{name}",   fontSize: 6,   fontWeight: "bold",   anchor: "start", fill: "primary" },
    { id: "rPh",   type: "text",   x: 84,  y: 34,  text: "{phone}",  fontSize: 3.2, fontWeight: "normal", anchor: "start", fill: "ink" },
    { id: "rAd",   type: "text",   x: 84,  y: 41,  text: "{addr}",   fontSize: 3,   fontWeight: "normal", anchor: "start", fill: "ink" },
    { id: "rWb",   type: "text",   x: 84,  y: 48,  text: "{web}",    fontSize: 3,   fontWeight: "normal", anchor: "start", fill: "ink" },
    { id: "stamp", type: "rect",   x: 190, y: 8,   w: 26,  h: 34,  fill: "bg",      stroke: "ink", strokeW: 0.4, lock: true },
    { id: "retLb", type: "text",   x: 84,  y: 88,  text: "প্রাপকের নাম ও ঠিকানা", fontSize: 2.5, fontWeight: "normal", anchor: "start", fill: "accent", lock: true },
    { id: "retL1", type: "line",   x1: 84, y1: 92, x2: 183, y2: 92,  stroke: "accent", strokeW: 0.3, lock: true },
    { id: "retL2", type: "line",   x1: 84, y1: 99, x2: 183, y2: 99,  stroke: "accent", strokeW: 0.3, lock: true },
    { id: "retL3", type: "line",   x1: 84, y1: 106,x2: 183, y2: 106, stroke: "accent", strokeW: 0.3, lock: true },
  ],
};

// ── Round Sticker ──────────────────────────────────────────── ⌀50 mm ──
const sticker: Product = {
  id: "sticker", labelBn: "রাউন্ড স্টিকার",
  widthMm: 50, heightMm: 50, shape: "circle",
  build: (): StudioEl[] => [
    { id: "outer", type: "circle",  cx: 25, cy: 25, r: 25,  fill: "primary", lock: true, base: true },
    { id: "ring",  type: "circle",  cx: 25, cy: 25, r: 22.5,fill: "accent",  lock: true },
    { id: "inner", type: "circle",  cx: 25, cy: 25, r: 20,  fill: "bg",      lock: true },
    { id: "logo",  type: "logo",    x: 15,  y: 10,  w: 20,  h: 12 },
    { id: "nm",    type: "text",    x: 25,  y: 30,  text: "{name}",   fontSize: 4.5, fontWeight: "bold",   anchor: "middle", fill: "primary" },
    { id: "tag",   type: "text",    x: 25,  y: 36.5,text: "{tag}",    fontSize: 2.5, fontWeight: "normal", anchor: "middle", fill: "ink" },
    { id: "ph",    type: "text",    x: 25,  y: 42,  text: "{phone}",  fontSize: 2.2, fontWeight: "normal", anchor: "middle", fill: "ink" },
  ],
};

// ── Product Label ──────────────────────────────────────────── 100×60 mm ──
const label: Product = {
  id: "label", labelBn: "প্রোডাক্ট লেবেল",
  widthMm: 100, heightMm: 60, shape: "rect",
  build: (): StudioEl[] => [
    { id: "bg",    type: "rect",   x: 0,  y: 0,  w: 100, h: 60,  fill: "bg",      lock: true, base: true },
    { id: "top",   type: "rect",   x: 0,  y: 0,  w: 100, h: 14,  fill: "primary", lock: true },
    { id: "bot",   type: "rect",   x: 0,  y: 57, w: 100, h: 3,   fill: "accent",  lock: true },
    { id: "accV",  type: "rect",   x: 0,  y: 14, w: 3,   h: 43,  fill: "accent",  lock: true },
    { id: "logo",  type: "logo",   x: 2,  y: 1.5,w: 11,  h: 11,  mono: "white" },
    { id: "nm",    type: "text",   x: 15, y: 10, text: "{name}",   fontSize: 5.5, fontWeight: "bold",   anchor: "start", fill: "bg" },
    { id: "tag",   type: "text",   x: 6,  y: 21, text: "{tag}",    fontSize: 3,   fontWeight: "normal", anchor: "start", fill: "primary" },
    { id: "div",   type: "line",   x1: 5, y1: 24, x2: 95, y2: 24, stroke: "accent", strokeW: 0.35, lock: true },
    { id: "per",   type: "text",   x: 6,  y: 31, text: "{person}", fontSize: 3.2, fontWeight: "bold",   anchor: "start", fill: "primary" },
    { id: "rol",   type: "text",   x: 6,  y: 36, text: "{role}",   fontSize: 2.8, fontWeight: "normal", anchor: "start", fill: "ink" },
    { id: "ph",    type: "text",   x: 6,  y: 43, text: "{phone}",  fontSize: 2.8, fontWeight: "normal", anchor: "start", fill: "ink" },
    { id: "wb",    type: "text",   x: 6,  y: 49, text: "{web}",    fontSize: 2.8, fontWeight: "normal", anchor: "start", fill: "ink" },
  ],
};

// ── Flyer ──────────────────────────────────────────────────── 148×210 mm ──
const flyer: Product = {
  id: "flyer", labelBn: "ফ্লায়ার",
  widthMm: 148, heightMm: 210, shape: "rect",
  build: (): StudioEl[] => [
    { id: "bg",    type: "rect",   x: 0,   y: 0,   w: 148, h: 210, fill: "bg",      lock: true, base: true },
    { id: "top",   type: "rect",   x: 0,   y: 0,   w: 148, h: 70,  fill: "primary", lock: true },
    { id: "bot",   type: "rect",   x: 0,   y: 200, w: 148, h: 10,  fill: "accent",  lock: true },
    { id: "dec",   type: "circle", cx: 120, cy: 35, r: 40,  fill: "accent",  lock: true },
    { id: "dec2",  type: "circle", cx: 120, cy: 35, r: 32,  fill: "primary", lock: true },
    { id: "logo",  type: "logo",   x: 10,  y: 8,   w: 25,  h: 25,  mono: "white" },
    { id: "nm",    type: "text",   x: 10,  y: 48,  text: "{name}",   fontSize: 9,   fontWeight: "bold",   anchor: "start", fill: "bg" },
    { id: "tag",   type: "text",   x: 10,  y: 58,  text: "{tag}",    fontSize: 4,   fontWeight: "normal", anchor: "start", fill: "bg" },
    { id: "div",   type: "line",   x1: 10, y1: 85, x2: 138, y2: 85, stroke: "accent", strokeW: 0.5, lock: true },
    { id: "per",   type: "text",   x: 10,  y: 100, text: "{person}", fontSize: 5,   fontWeight: "bold",   anchor: "start", fill: "primary" },
    { id: "rol",   type: "text",   x: 10,  y: 108, text: "{role}",   fontSize: 3.2, fontWeight: "normal", anchor: "start", fill: "ink" },
    { id: "ph",    type: "text",   x: 10,  y: 125, text: "{phone}",  fontSize: 3.5, fontWeight: "normal", anchor: "start", fill: "ink" },
    { id: "ad",    type: "text",   x: 10,  y: 133, text: "{addr}",   fontSize: 3.2, fontWeight: "normal", anchor: "start", fill: "ink" },
    { id: "wb",    type: "text",   x: 10,  y: 141, text: "{web}",    fontSize: 3.2, fontWeight: "normal", anchor: "start", fill: "ink" },
  ],
};

// ── Invitation Card ────────────────────────────────────────── 130×185 mm ──
const invite: Product = {
  id: "invite", labelBn: "ইনভাইটেশন কার্ড",
  widthMm: 130, heightMm: 185, shape: "rect",
  build: (): StudioEl[] => [
    { id: "bg",    type: "rect",   x: 0,   y: 0,   w: 130, h: 185, fill: "bg",      lock: true, base: true },
    { id: "brd",   type: "rect",   x: 4,   y: 4,   w: 122, h: 177, fill: "bg",      stroke: "accent", strokeW: 0.5, lock: true },
    { id: "brd2",  type: "rect",   x: 7,   y: 7,   w: 116, h: 171, fill: "bg",      stroke: "accent", strokeW: 0.2, lock: true },
    { id: "ctl",   type: "circle", cx: 4,  cy: 4,  r: 2.5, fill: "accent", lock: true },
    { id: "ctr",   type: "circle", cx: 126,cy: 4,  r: 2.5, fill: "accent", lock: true },
    { id: "cbl",   type: "circle", cx: 4,  cy: 181,r: 2.5, fill: "accent", lock: true },
    { id: "cbr",   type: "circle", cx: 126,cy: 181,r: 2.5, fill: "accent", lock: true },
    { id: "hdr",   type: "rect",   x: 7,   y: 7,   w: 116, h: 40,  fill: "primary", lock: true },
    { id: "logo",  type: "logo",   x: 42,  y: 10,  w: 46,  h: 24,  mono: "white" },
    { id: "nm",    type: "text",   x: 65,  y: 65,  text: "{name}",   fontSize: 7,   fontWeight: "bold",   anchor: "middle", fill: "primary" },
    { id: "tag",   type: "text",   x: 65,  y: 74,  text: "{tag}",    fontSize: 3.2, fontWeight: "normal", anchor: "middle", fill: "ink" },
    { id: "div",   type: "line",   x1: 20, y1: 78, x2: 110, y2: 78, stroke: "accent", strokeW: 0.5, lock: true },
    { id: "per",   type: "text",   x: 65,  y: 92,  text: "{person}", fontSize: 5,   fontWeight: "bold",   anchor: "middle", fill: "primary" },
    { id: "rol",   type: "text",   x: 65,  y: 100, text: "{role}",   fontSize: 3.2, fontWeight: "normal", anchor: "middle", fill: "ink" },
    { id: "ph",    type: "text",   x: 65,  y: 115, text: "{phone}",  fontSize: 3.2, fontWeight: "normal", anchor: "middle", fill: "ink" },
    { id: "ad",    type: "text",   x: 65,  y: 122, text: "{addr}",   fontSize: 3,   fontWeight: "normal", anchor: "middle", fill: "ink" },
    { id: "wb",    type: "text",   x: 65,  y: 129, text: "{web}",    fontSize: 3,   fontWeight: "normal", anchor: "middle", fill: "ink" },
  ],
};

// ── ID Card ────────────────────────────────────────────────── 86×54 mm ──
const idcard: Product = {
  id: "idcard", labelBn: "আইডি কার্ড",
  widthMm: 86, heightMm: 54, shape: "rect",
  build: (): StudioEl[] => [
    { id: "bg",    type: "rect",   x: 0,  y: 0,  w: 86, h: 54,  fill: "bg",      lock: true, base: true },
    { id: "hdr",   type: "rect",   x: 0,  y: 0,  w: 86, h: 12,  fill: "primary", lock: true },
    { id: "bot",   type: "rect",   x: 0,  y: 50, w: 86, h: 4,   fill: "accent",  lock: true },
    { id: "logo",  type: "logo",   x: 2,  y: 1.5,w: 9,  h: 9,   mono: "white" },
    { id: "orgNm", type: "text",   x: 14, y: 9,  text: "{name}",   fontSize: 4.5, fontWeight: "bold",   anchor: "start", fill: "bg" },
    { id: "photo", type: "rect",   x: 62, y: 14, w: 20,  h: 26,  fill: "bg",      stroke: "accent", strokeW: 0.4, rx: 1 },
    { id: "photoT",type: "text",   x: 72, y: 29, text: "ছবি",     fontSize: 3,   fontWeight: "normal", anchor: "middle", fill: "accent", lock: true },
    { id: "per",   type: "text",   x: 3,  y: 22, text: "{person}", fontSize: 4,   fontWeight: "bold",   anchor: "start", fill: "primary" },
    { id: "rol",   type: "text",   x: 3,  y: 28, text: "{role}",   fontSize: 3,   fontWeight: "normal", anchor: "start", fill: "ink" },
    { id: "div",   type: "line",   x1: 3, y1: 30.5, x2: 58, y2: 30.5, stroke: "accent", strokeW: 0.3, lock: true },
    { id: "ph",    type: "text",   x: 3,  y: 37, text: "{phone}",  fontSize: 2.8, fontWeight: "normal", anchor: "start", fill: "ink" },
    { id: "ad",    type: "text",   x: 3,  y: 42, text: "{addr}",   fontSize: 2.5, fontWeight: "normal", anchor: "start", fill: "ink" },
    { id: "wb",    type: "text",   x: 3,  y: 47, text: "{web}",    fontSize: 2.5, fontWeight: "normal", anchor: "start", fill: "ink" },
  ],
};

// ── Doorhanger ─────────────────────────────────────────────── 90×215 mm ──
const doorhanger: Product = {
  id: "doorhanger", labelBn: "ডোরহ্যাঙ্গার",
  widthMm: 90, heightMm: 215, shape: "rect",
  build: (): StudioEl[] => [
    { id: "bg",    type: "rect",   x: 0,  y: 0,   w: 90, h: 215, fill: "bg",      lock: true, base: true },
    { id: "holeBg",type: "circle", cx: 45, cy: 20, r: 9,  fill: "primary", lock: true },
    { id: "hole",  type: "circle", cx: 45, cy: 20, r: 7,  fill: "bg",      lock: true },
    { id: "holeRg",type: "circle", cx: 45, cy: 20, r: 7,  fill: "bg",      stroke: "accent", strokeW: 0.4, lock: true },
    { id: "hdr",   type: "rect",   x: 0,  y: 38,  w: 90, h: 2,   fill: "primary", lock: true },
    { id: "ftr",   type: "rect",   x: 0,  y: 210, w: 90, h: 5,   fill: "primary", lock: true },
    { id: "logo",  type: "logo",   x: 20, y: 45,  w: 50, h: 35 },
    { id: "nm",    type: "text",   x: 45, y: 97,  text: "{name}",   fontSize: 6,   fontWeight: "bold",   anchor: "middle", fill: "primary" },
    { id: "tag",   type: "text",   x: 45, y: 106, text: "{tag}",    fontSize: 3.2, fontWeight: "normal", anchor: "middle", fill: "ink" },
    { id: "div",   type: "line",   x1: 8, y1: 109, x2: 82, y2: 109, stroke: "accent", strokeW: 0.4, lock: true },
    { id: "per",   type: "text",   x: 45, y: 122, text: "{person}", fontSize: 4.5, fontWeight: "bold",   anchor: "middle", fill: "primary" },
    { id: "rol",   type: "text",   x: 45, y: 130, text: "{role}",   fontSize: 3,   fontWeight: "normal", anchor: "middle", fill: "ink" },
    { id: "ph",    type: "text",   x: 45, y: 145, text: "{phone}",  fontSize: 3.2, fontWeight: "normal", anchor: "middle", fill: "ink" },
    { id: "ad",    type: "text",   x: 45, y: 153, text: "{addr}",   fontSize: 3,   fontWeight: "normal", anchor: "middle", fill: "ink" },
    { id: "wb",    type: "text",   x: 45, y: 161, text: "{web}",    fontSize: 3,   fontWeight: "normal", anchor: "middle", fill: "ink" },
    { id: "dnd",   type: "text",   x: 45, y: 207, text: "{name}",   fontSize: 2.8, fontWeight: "normal", anchor: "middle", fill: "bg",     lock: true },
  ],
};

export const PRODUCTS: Product[] = [
  card, memo, bag, letterhead, envelope, sticker, label, flyer, invite, idcard, doorhanger,
];

export const PRODUCT_ID_MAP: Record<string, string> = Object.fromEntries(
  PRODUCTS.map((p) => [p.id, p.id])
);

export type { Product };
