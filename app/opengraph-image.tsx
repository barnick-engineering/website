import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "বর্ণিক প্রচারাণী — প্রিন্টিং ও প্যাকেজিং";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          BARNICK PRACHARANI
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.15 }}>
            প্রিন্টিং, প্যাকেজিং ও ব্রান্ডিং
          </div>
          <div style={{ fontSize: 28, opacity: 0.8, lineHeight: 1.4 }}>
            সহজ, দ্রুত, নির্ভরযোগ্য · ১৯৮৯ সাল থেকে ঢাকায়
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, opacity: 0.55 }}>
          barnickpracharani.com
        </div>
      </div>
    ),
    { ...size }
  );
}
