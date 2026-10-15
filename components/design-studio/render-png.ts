import type { Product } from "./products";

export async function renderProductPng(
  svgEl: SVGSVGElement,
  product: Product,
  scaleForExport: number = 4
): Promise<Blob> {
  await document.fonts.ready;

  const svgClone = svgEl.cloneNode(true) as SVGSVGElement;
  // Remove selection overlays from export
  svgClone.querySelectorAll("[data-export-hide]").forEach((el) => el.remove());

  const svgString = new XMLSerializer().serializeToString(svgClone);
  const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const svgUrl = URL.createObjectURL(svgBlob);

  const wPx = product.widthMm * scaleForExport;
  const hPx = product.heightMm * scaleForExport;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(svgUrl);
      const canvas = document.createElement("canvas");
      canvas.width = wPx;
      canvas.height = hPx;
      const ctx = canvas.getContext("2d")!;

      // For bag handles: draw them before clipping
      if (product.bagHandles) {
        const handleW = wPx * 0.25;
        const handleH = hPx * 0.1;
        const handleY = -handleH * 0.5;
        ctx.strokeStyle = "#888888";
        ctx.lineWidth = scaleForExport * 1.5;
        ctx.lineCap = "round";
        // Left handle
        ctx.beginPath();
        ctx.moveTo(wPx * 0.25 - handleW / 2, 0);
        ctx.bezierCurveTo(wPx * 0.25 - handleW / 2, handleY, wPx * 0.25 + handleW / 2, handleY, wPx * 0.25 + handleW / 2, 0);
        ctx.stroke();
        // Right handle
        ctx.beginPath();
        ctx.moveTo(wPx * 0.75 - handleW / 2, 0);
        ctx.bezierCurveTo(wPx * 0.75 - handleW / 2, handleY, wPx * 0.75 + handleW / 2, handleY, wPx * 0.75 + handleW / 2, 0);
        ctx.stroke();
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

      // Draw the SVG image, offset to show only the product area (skip mat)
      // The SVG viewBox includes mat padding (20mm each side)
      const matPx = 20 * scaleForExport;
      const totalW = (product.widthMm + 40) * scaleForExport;
      const totalH = (product.heightMm + 40) * scaleForExport;
      const scaleX = totalW / svgEl.viewBox.baseVal.width;
      const scaleY = totalH / svgEl.viewBox.baseVal.height;
      const drawW = img.naturalWidth * scaleX;
      const drawH = img.naturalHeight * scaleY;
      ctx.drawImage(img, -matPx, -matPx, drawW, drawH);
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
