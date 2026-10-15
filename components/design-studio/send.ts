import { facebookInsights } from "@/data/insights";
import { getMessengerUrlWithText } from "@/lib/order";
import type { Product } from "./products";
import type { BusinessInfo } from "./types";
import { renderProductPng } from "./render-png";

export function fireStudioEvent(name: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && "gtag" in window) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag("event", name, params);
  }
}

function buildMessage(product: Product, qty: number, note: string): string {
  const lines = ["আমি ডিজাইন স্টুডিও থেকে অর্ডার করতে চাই:", `পণ্য: ${product.labelBn}`, `পরিমাণ: ${qty}`];
  if (note.trim()) lines.push(`নির্দেশনা: ${note.trim()}`);
  return lines.join("\n");
}

export async function sendToMessenger(
  svgEl: SVGSVGElement,
  product: Product,
  info: BusinessInfo,
  qty: number,
  note: string,
  uploadEndpoint: string | null
): Promise<void> {
  const message = buildMessage(product, qty, note);
  const messengerUrl = getMessengerUrlWithText(message);

  // Open popup synchronously BEFORE any await so browsers don't block it
  const popup = window.open(messengerUrl, "_blank");

  try {
    const blob = await renderProductPng(svgEl, product, 4);
    const file = new File([blob], `barnick-design-${product.id}.png`, { type: "image/png" });

    if (uploadEndpoint) {
      try {
        const form = new FormData();
        form.append("file", file);
        form.append("product", product.id);
        form.append("qty", String(qty));
        form.append("note", note);
        const res = await fetch(uploadEndpoint, { method: "POST", body: form });
        if (res.ok) {
          const { url } = (await res.json()) as { url: string };
          const msgWithUrl = message + `\nডিজাইন: ${url}`;
          if (popup && !popup.closed) popup.location.href = getMessengerUrlWithText(msgWithUrl);
          else window.open(getMessengerUrlWithText(msgWithUrl), "_blank");
          fireStudioEvent("design_send_messenger", { product: product.id });
          return;
        }
      } catch {
        // fall through to share/download
      }
    }

    // Try Web Share API
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: `বর্ণিক প্রচারণী ডিজাইন — ${product.labelBn}`, text: message });
      fireStudioEvent("design_send_messenger", { product: product.id });
      return;
    }

    // Fallback: download + clipboard + ensure popup open
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `barnick-design-${product.id}.png`;
    a.click();
    URL.revokeObjectURL(url);
    try { await navigator.clipboard.writeText(message); } catch { /* ignore */ }
    if (!popup || popup.closed) window.open(messengerUrl, "_blank");
    fireStudioEvent("design_send_messenger", { product: product.id });
  } catch {
    fireStudioEvent("design_send_messenger", { product: product.id });
  }
}

export async function downloadDesign(svgEl: SVGSVGElement, product: Product): Promise<void> {
  const blob = await renderProductPng(svgEl, product, 4);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `barnick-design-${product.id}.png`;
  a.click();
  URL.revokeObjectURL(url);
  fireStudioEvent("design_download", { product: product.id });
}

export { facebookInsights };
