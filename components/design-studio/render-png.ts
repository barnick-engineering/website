import type { Product } from "./types";

const MAT_MM = 20;
const DPI = 4; // px per mm

export async function renderProductPng(
  svgEl: SVGSVGElement,
  product: Product,
  scale: number = DPI
): Promise<Blob> {
  await document.fonts.ready;

  const svgClone = svgEl.cloneNode(true) as SVGSVGElement;
  svgClone.querySelectorAll("[data-export-hide]").forEach((el) => el.remove());

  const svgString = new XMLSerializer().serializeToString(svgClone);
  const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const svgUrl = URL.createObjectURL(svgBlob);

  const wPx = product.widthMm * scale;
  const hPx = product.heightMm * scale;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(svgUrl);
      const canvas = document.createElement("canvas");
      canvas.width = wPx;
      canvas.height = hPx;
      const ctx = canvas.getContext("2d")!;

      // For bags: draw handles above the canvas before clipping
      if (product.bagHandles) {
        const handleSpan = wPx * 0.2;
        const handleH  = hPx * 0.07;
        const leftCx   = wPx * 0.35;
        const rightCx  = wPx * 0.65;
        ctx.strokeStyle = "#555555";
        ctx.lineWidth   = scale * 2;
        ctx.lineCap     = "round";
        for (const cx of [leftCx, rightCx]) {
          ctx.beginPath();
          ctx.moveTo(cx - handleSpan / 2, 0);
          ctx.bezierCurveTo(
            cx - handleSpan / 2, -handleH,
            cx + handleSpan / 2, -handleH,
            cx + handleSpan / 2, 0
          );
          ctx.stroke();
        }
      }

      // Clip to product shape
      ctx.save();
      ctx.beginPath();
      if (product.shape === "circle") {
        const r = Math.min(wPx, hPx) / 2;
        ctx.arc(wPx / 2, hPx / 2, r, 0, Math.PI * 2);
      } else {
        ctx.rect(0, 0, wPx, hPx);
      }
      ctx.clip();

      // Draw SVG image offset by mat so only the product area shows
      const matPx   = MAT_MM * scale;
      const totalW  = (product.widthMm + MAT_MM * 2) * scale;
      const totalH  = (product.heightMm + MAT_MM * 2) * scale;
      const scaleX  = totalW / svgEl.viewBox.baseVal.width;
      const scaleY  = totalH / svgEl.viewBox.baseVal.height;
      ctx.drawImage(img, -matPx, -matPx, img.naturalWidth * scaleX, img.naturalHeight * scaleY);
      ctx.restore();

      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas toBlob failed"));
      }, "image/png");
    };
    img.onerror = () => {
      URL.revokeObjectURL(svgUrl);
      reject(new Error("Failed to load SVG image"));
    };
    img.src = svgUrl;
  });
}
