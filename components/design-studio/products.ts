type Mm = number;

export interface TemplateTextEl {
  id: string;
  type: "text";
  token: string;
  x: Mm;
  y: Mm;
  fontSize: number;
  fontWeight: "normal" | "bold";
  align: "left" | "center" | "right";
  color: "primary" | "secondary";
  maxWidth?: Mm;
}

export interface Product {
  id: "card" | "memo" | "bag" | "letterhead" | "envelope" | "sticker" | "label" | "flyer" | "invite" | "idcard";
  labelBn: string;
  widthMm: Mm;
  heightMm: Mm;
  shape: "rect" | "circle";
  elements: TemplateTextEl[];
  bagHandles?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "card",
    labelBn: "ভিজিটিং কার্ড",
    widthMm: 90,
    heightMm: 54,
    shape: "rect",
    elements: [
      { id: "tagline", type: "text", token: "{tagline}", x: 8, y: 10, fontSize: 2.5, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 74 },
      { id: "name", type: "text", token: "{name}", x: 8, y: 18, fontSize: 4.5, fontWeight: "bold", align: "left", color: "primary", maxWidth: 74 },
      { id: "phone", type: "text", token: "{phone}", x: 8, y: 28, fontSize: 3, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 74 },
      { id: "address", type: "text", token: "{address}", x: 8, y: 36, fontSize: 2.8, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 74 },
      { id: "email", type: "text", token: "{email}", x: 8, y: 43, fontSize: 2.8, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 74 },
      { id: "website", type: "text", token: "{website}", x: 8, y: 50, fontSize: 2.8, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 74 },
    ],
  },
  {
    id: "memo",
    labelBn: "ক্যাশ মেমো",
    widthMm: 216,
    heightMm: 140,
    shape: "rect",
    elements: [
      { id: "name", type: "text", token: "{name}", x: 10, y: 12, fontSize: 6, fontWeight: "bold", align: "left", color: "primary", maxWidth: 196 },
      { id: "tagline", type: "text", token: "{tagline}", x: 10, y: 22, fontSize: 3, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 196 },
      { id: "phone", type: "text", token: "{phone}", x: 10, y: 30, fontSize: 3, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 196 },
      { id: "address", type: "text", token: "{address}", x: 10, y: 38, fontSize: 3, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 196 },
      { id: "website", type: "text", token: "{website}", x: 10, y: 46, fontSize: 3, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 196 },
    ],
  },
  {
    id: "bag",
    labelBn: "পেপার ব্যাগ",
    widthMm: 200,
    heightMm: 280,
    shape: "rect",
    bagHandles: true,
    elements: [
      { id: "name", type: "text", token: "{name}", x: 100, y: 100, fontSize: 8, fontWeight: "bold", align: "center", color: "primary", maxWidth: 160 },
      { id: "tagline", type: "text", token: "{tagline}", x: 100, y: 120, fontSize: 3.5, fontWeight: "normal", align: "center", color: "secondary", maxWidth: 160 },
      { id: "phone", type: "text", token: "{phone}", x: 100, y: 140, fontSize: 3.5, fontWeight: "normal", align: "center", color: "secondary", maxWidth: 160 },
      { id: "website", type: "text", token: "{website}", x: 100, y: 160, fontSize: 3.5, fontWeight: "normal", align: "center", color: "secondary", maxWidth: 160 },
    ],
  },
  {
    id: "letterhead",
    labelBn: "লেটারহেড প্যাড",
    widthMm: 210,
    heightMm: 297,
    shape: "rect",
    elements: [
      { id: "name", type: "text", token: "{name}", x: 20, y: 25, fontSize: 7, fontWeight: "bold", align: "left", color: "primary", maxWidth: 170 },
      { id: "tagline", type: "text", token: "{tagline}", x: 20, y: 35, fontSize: 3, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 170 },
      { id: "phone", type: "text", token: "{phone}", x: 20, y: 45, fontSize: 3, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 170 },
      { id: "address", type: "text", token: "{address}", x: 20, y: 55, fontSize: 3, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 170 },
      { id: "email", type: "text", token: "{email}", x: 20, y: 63, fontSize: 3, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 170 },
      { id: "website", type: "text", token: "{website}", x: 20, y: 71, fontSize: 3, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 170 },
    ],
  },
  {
    id: "envelope",
    labelBn: "খাম",
    widthMm: 220,
    heightMm: 110,
    shape: "rect",
    elements: [
      { id: "name", type: "text", token: "{name}", x: 15, y: 20, fontSize: 5, fontWeight: "bold", align: "left", color: "primary", maxWidth: 190 },
      { id: "phone", type: "text", token: "{phone}", x: 15, y: 32, fontSize: 3, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 190 },
      { id: "address", type: "text", token: "{address}", x: 15, y: 44, fontSize: 3, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 190 },
      { id: "website", type: "text", token: "{website}", x: 15, y: 56, fontSize: 3, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 190 },
    ],
  },
  {
    id: "sticker",
    labelBn: "রাউন্ড স্টিকার",
    widthMm: 50,
    heightMm: 50,
    shape: "circle",
    elements: [
      { id: "tagline", type: "text", token: "{tagline}", x: 25, y: 14, fontSize: 2.5, fontWeight: "normal", align: "center", color: "secondary", maxWidth: 38 },
      { id: "name", type: "text", token: "{name}", x: 25, y: 22, fontSize: 4, fontWeight: "bold", align: "center", color: "primary", maxWidth: 38 },
      { id: "phone", type: "text", token: "{phone}", x: 25, y: 32, fontSize: 2.8, fontWeight: "normal", align: "center", color: "secondary", maxWidth: 38 },
    ],
  },
  {
    id: "label",
    labelBn: "প্রোডাক্ট লেবেল",
    widthMm: 100,
    heightMm: 60,
    shape: "rect",
    elements: [
      { id: "name", type: "text", token: "{name}", x: 8, y: 15, fontSize: 5, fontWeight: "bold", align: "left", color: "primary", maxWidth: 84 },
      { id: "tagline", type: "text", token: "{tagline}", x: 8, y: 25, fontSize: 3, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 84 },
      { id: "phone", type: "text", token: "{phone}", x: 8, y: 35, fontSize: 3, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 84 },
      { id: "website", type: "text", token: "{website}", x: 8, y: 45, fontSize: 3, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 84 },
    ],
  },
  {
    id: "flyer",
    labelBn: "ফ্লায়ার",
    widthMm: 148,
    heightMm: 210,
    shape: "rect",
    elements: [
      { id: "name", type: "text", token: "{name}", x: 20, y: 30, fontSize: 8, fontWeight: "bold", align: "left", color: "primary", maxWidth: 108 },
      { id: "tagline", type: "text", token: "{tagline}", x: 20, y: 50, fontSize: 4, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 108 },
      { id: "phone", type: "text", token: "{phone}", x: 20, y: 60, fontSize: 3.5, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 108 },
      { id: "address", type: "text", token: "{address}", x: 20, y: 70, fontSize: 3, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 108 },
      { id: "email", type: "text", token: "{email}", x: 20, y: 80, fontSize: 3, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 108 },
      { id: "website", type: "text", token: "{website}", x: 20, y: 90, fontSize: 3, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 108 },
    ],
  },
  {
    id: "invite",
    labelBn: "ইনভাইটেশন কার্ড",
    widthMm: 130,
    heightMm: 185,
    shape: "rect",
    elements: [
      { id: "name", type: "text", token: "{name}", x: 65, y: 40, fontSize: 6, fontWeight: "bold", align: "center", color: "primary", maxWidth: 110 },
      { id: "tagline", type: "text", token: "{tagline}", x: 65, y: 55, fontSize: 3.5, fontWeight: "normal", align: "center", color: "secondary", maxWidth: 110 },
      { id: "phone", type: "text", token: "{phone}", x: 65, y: 65, fontSize: 3.5, fontWeight: "normal", align: "center", color: "secondary", maxWidth: 110 },
      { id: "address", type: "text", token: "{address}", x: 65, y: 75, fontSize: 3, fontWeight: "normal", align: "center", color: "secondary", maxWidth: 110 },
    ],
  },
  {
    id: "idcard",
    labelBn: "আইডি কার্ড",
    widthMm: 86,
    heightMm: 54,
    shape: "rect",
    elements: [
      { id: "name", type: "text", token: "{name}", x: 8, y: 18, fontSize: 4.5, fontWeight: "bold", align: "left", color: "primary", maxWidth: 70 },
      { id: "tagline", type: "text", token: "{tagline}", x: 8, y: 28, fontSize: 2.8, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 70 },
      { id: "phone", type: "text", token: "{phone}", x: 8, y: 38, fontSize: 2.8, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 70 },
      { id: "address", type: "text", token: "{address}", x: 8, y: 46, fontSize: 2.5, fontWeight: "normal", align: "left", color: "secondary", maxWidth: 70 },
    ],
  },
];

export const PRODUCT_ID_MAP: Record<string, Product["id"]> = {
  card: "card",
  memo: "memo",
  bag: "bag",
  letterhead: "letterhead",
  envelope: "envelope",
  sticker: "sticker",
  label: "label",
  flyer: "flyer",
  invite: "invite",
  idcard: "idcard",
};
