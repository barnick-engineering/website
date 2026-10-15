"use client";

import React, { useCallback, useRef, useState } from "react";
import type { Product, TemplateTextEl } from "./products";
import type { Palette } from "./palettes";
import type { BusinessInfo, LogoState } from "./types";

const MAT_MM = 20; // padding around product on the mat

function resolveToken(token: string, info: BusinessInfo): string {
  return token
    .replace("{name}", info.name)
    .replace("{phone}", info.phone)
    .replace("{address}", info.address)
    .replace("{email}", info.email)
    .replace("{website}", info.website)
    .replace("{tagline}", info.tagline);
}

function CropMark({ x, y, dir }: { x: number; y: number; dir: "tl" | "tr" | "bl" | "br" }) {
  const L = 8;
  const gap = 3;
  let hx1: number, hx2: number, vy1: number, vy2: number;
  if (dir === "tl") {
    hx1 = x - gap - L; hx2 = x - gap; vy1 = y - gap - L; vy2 = y - gap;
  } else if (dir === "tr") {
    hx1 = x + gap; hx2 = x + gap + L; vy1 = y - gap - L; vy2 = y - gap;
  } else if (dir === "bl") {
    hx1 = x - gap - L; hx2 = x - gap; vy1 = y + gap; vy2 = y + gap + L;
  } else {
    hx1 = x + gap; hx2 = x + gap + L; vy1 = y + gap; vy2 = y + gap + L;
  }
  return (
    <>
      <line x1={hx1} y1={y} x2={hx2} y2={y} stroke="#999" strokeWidth={0.3} />
      <line x1={x} y1={vy1} x2={x} y2={vy2} stroke="#999" strokeWidth={0.3} />
    </>
  );
}

interface StudioCanvasProps {
  product: Product;
  info: BusinessInfo;
  palette: Palette;
  fontFamily: string;
  logo: LogoState;
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onLogoMove: (x: number, y: number) => void;
  onLogoResize?: (width: number, height: number) => void;
  canvasRef?: React.RefObject<SVGSVGElement | null>;
}

export function StudioCanvas({
  product,
  info,
  palette,
  fontFamily,
  logo,
  selectedElementId,
  onSelectElement,
  onLogoMove,
  canvasRef,
}: StudioCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const resolvedRef = (canvasRef as React.RefObject<SVGSVGElement | null>) ?? svgRef;

  const [snapGuide, setSnapGuide] = useState<{ h: boolean; v: boolean }>({ h: false, v: false });
  const dragStart = useRef<{ mx: number; my: number; lx: number; ly: number } | null>(null);

  const vbW = product.widthMm + MAT_MM * 2;
  const vbH = product.heightMm + MAT_MM * 2;
  const ox = MAT_MM; // product origin x in viewBox coords
  const oy = MAT_MM; // product origin y in viewBox coords

  const SNAP_THRESHOLD = 5; // mm

  const handleLogoPointerDown = useCallback(
    (e: React.PointerEvent<SVGElement>) => {
      e.stopPropagation();
      onSelectElement("logo");
      const svg = resolvedRef.current;
      if (!svg) return;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const svgPt = pt.matrixTransform(svg.getScreenCTM()!.inverse());
      dragStart.current = { mx: svgPt.x, my: svgPt.y, lx: logo.x, ly: logo.y };
      (e.currentTarget as SVGElement).setPointerCapture(e.pointerId);
    },
    [logo.x, logo.y, onSelectElement, resolvedRef]
  );

  const handleLogoPointerMove = useCallback(
    (e: React.PointerEvent<SVGElement>) => {
      if (!dragStart.current) return;
      const svg = resolvedRef.current;
      if (!svg) return;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const svgPt = pt.matrixTransform(svg.getScreenCTM()!.inverse());
      const dx = svgPt.x - dragStart.current.mx;
      const dy = svgPt.y - dragStart.current.my;
      let newX = dragStart.current.lx + dx;
      let newY = dragStart.current.ly + dy;

      // Center snap
      const cx = product.widthMm / 2;
      const cy = product.heightMm / 2;
      const logoCx = newX + logo.width / 2;
      const logoCy = newY + logo.height / 2;
      const snapH = Math.abs(logoCy - cy) < SNAP_THRESHOLD;
      const snapV = Math.abs(logoCx - cx) < SNAP_THRESHOLD;
      if (snapH) newY = cy - logo.height / 2;
      if (snapV) newX = cx - logo.width / 2;
      setSnapGuide({ h: snapH, v: snapV });

      onLogoMove(newX, newY);
    },
    [logo.width, logo.height, onLogoMove, product.widthMm, product.heightMm, resolvedRef]
  );

  const handleLogoPointerUp = useCallback(() => {
    dragStart.current = null;
    setSnapGuide({ h: false, v: false });
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<SVGSVGElement>) => {
      if (selectedElementId !== "logo") return;
      const step = e.shiftKey ? 5 : 1;
      if (e.key === "ArrowLeft") { e.preventDefault(); onLogoMove(logo.x - step, logo.y); }
      if (e.key === "ArrowRight") { e.preventDefault(); onLogoMove(logo.x + step, logo.y); }
      if (e.key === "ArrowUp") { e.preventDefault(); onLogoMove(logo.x, logo.y - step); }
      if (e.key === "ArrowDown") { e.preventDefault(); onLogoMove(logo.x, logo.y + step); }
      if (e.key === "Escape" || e.key === "Delete") { e.preventDefault(); onSelectElement(null); }
    },
    [selectedElementId, logo.x, logo.y, onLogoMove, onSelectElement]
  );

  const clipId = `product-clip-${product.id}`;
  const gridId = `grid-${product.id}`;

  return (
    <div
      className="w-full bg-muted flex items-center justify-center p-2"
      style={{ aspectRatio: `${vbW} / ${vbH}` }}
    >
      <svg
        ref={resolvedRef as React.RefObject<SVGSVGElement>}
        viewBox={`0 0 ${vbW} ${vbH}`}
        width="100%"
        style={{ display: "block", maxHeight: "100%", outline: "none" }}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={(e) => {
          if ((e.target as SVGElement).tagName === "svg") onSelectElement(null);
        }}
        aria-label={`${product.labelBn} ক্যানভাস`}
      >
        <defs>
          {/* Dot grid pattern */}
          <pattern id={gridId} x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
            <circle cx="0.5" cy="0.5" r="0.3" fill="#cccccc" opacity="0.5" />
          </pattern>
          {/* Product clip */}
          <clipPath id={clipId}>
            {product.shape === "circle" ? (
              <circle
                cx={ox + product.widthMm / 2}
                cy={oy + product.heightMm / 2}
                r={Math.min(product.widthMm, product.heightMm) / 2}
              />
            ) : (
              <rect x={ox} y={oy} width={product.widthMm} height={product.heightMm} />
            )}
          </clipPath>
          {/* Logo tint filter */}
          {logo.tint === "white" && (
            <filter id="tint-white" colorInterpolationFilters="sRGB">
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncR type="linear" slope="0" intercept="1" />
                <feFuncG type="linear" slope="0" intercept="1" />
                <feFuncB type="linear" slope="0" intercept="1" />
              </feComponentTransfer>
            </filter>
          )}
          {logo.tint === "black" && (
            <filter id="tint-black" colorInterpolationFilters="sRGB">
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncR type="linear" slope="0" intercept="0" />
                <feFuncG type="linear" slope="0" intercept="0" />
                <feFuncB type="linear" slope="0" intercept="0" />
              </feComponentTransfer>
            </filter>
          )}
        </defs>

        {/* Mat background */}
        <rect x="0" y="0" width={vbW} height={vbH} fill="url(#grid-pattern)" />
        <rect x="0" y="0" width={vbW} height={vbH} fill="hsl(0 0% 96.1%)" />
        {/* Grid overlay on mat */}
        <rect x="0" y="0" width={vbW} height={vbH} fill={`url(#${gridId})`} />

        {/* Bag handles (drawn before clip) */}
        {product.bagHandles && (
          <g>
            <path
              d={`M ${ox + product.widthMm * 0.2} ${oy} Q ${ox + product.widthMm * 0.25} ${oy - 15} ${ox + product.widthMm * 0.35} ${oy}`}
              fill="none"
              stroke="#888"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
            <path
              d={`M ${ox + product.widthMm * 0.65} ${oy} Q ${ox + product.widthMm * 0.75} ${oy - 15} ${ox + product.widthMm * 0.8} ${oy}`}
              fill="none"
              stroke="#888"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Crop marks */}
        <CropMark x={ox} y={oy} dir="tl" />
        <CropMark x={ox + product.widthMm} y={oy} dir="tr" />
        <CropMark x={ox} y={oy + product.heightMm} dir="bl" />
        <CropMark x={ox + product.widthMm} y={oy + product.heightMm} dir="br" />

        {/* Product content (clipped) */}
        <g clipPath={`url(#${clipId})`}>
          {/* Background fill */}
          {product.shape === "circle" ? (
            <circle
              cx={ox + product.widthMm / 2}
              cy={oy + product.heightMm / 2}
              r={Math.min(product.widthMm, product.heightMm) / 2}
              fill={palette.bg}
            />
          ) : (
            <rect x={ox} y={oy} width={product.widthMm} height={product.heightMm} fill={palette.bg} />
          )}

          {/* Logo */}
          {logo.dataUrl && (
            <image
              href={logo.dataUrl}
              x={ox + logo.x}
              y={oy + logo.y}
              width={logo.width}
              height={logo.height}
              style={{ cursor: "move" } as React.CSSProperties}
              transform={`rotate(${logo.rotation}, ${ox + logo.x + logo.width / 2}, ${oy + logo.y + logo.height / 2})`}
              filter={logo.tint === "white" ? "url(#tint-white)" : logo.tint === "black" ? "url(#tint-black)" : undefined}
              onPointerDown={handleLogoPointerDown}
              onPointerMove={handleLogoPointerMove}
              onPointerUp={handleLogoPointerUp}
              preserveAspectRatio="xMidYMid meet"
            />
          )}

          {/* Text elements */}
          {product.elements.map((el: TemplateTextEl) => {
            const text = resolveToken(el.token, info);
            if (!text) return null;
            const textColor = el.color === "primary" ? palette.primary : palette.secondary;
            let anchor: "start" | "middle" | "end" = "start";
            if (el.align === "center") anchor = "middle";
            if (el.align === "right") anchor = "end";
            return (
              <text
                key={el.id}
                x={ox + el.x}
                y={oy + el.y}
                fontSize={el.fontSize}
                fontWeight={el.fontWeight}
                fontFamily={fontFamily}
                fill={textColor}
                textAnchor={anchor}
                dominantBaseline="middle"
              >
                {text}
              </text>
            );
          })}
        </g>

        {/* Selection outline (not clipped) */}
        {selectedElementId === "logo" && logo.dataUrl && (
          <rect
            data-export-hide="1"
            x={ox + logo.x - 0.5}
            y={oy + logo.y - 0.5}
            width={logo.width + 1}
            height={logo.height + 1}
            fill="none"
            stroke="hsl(0 0% 9%)"
            strokeWidth={0.5}
            strokeDasharray="2 1.5"
          />
        )}

        {/* Center snap guides */}
        {snapGuide.h && (
          <line
            data-export-hide="1"
            x1={ox}
            y1={oy + product.heightMm / 2}
            x2={ox + product.widthMm}
            y2={oy + product.heightMm / 2}
            stroke="hsl(217 91% 60%)"
            strokeWidth={0.4}
            strokeDasharray="2 1"
          />
        )}
        {snapGuide.v && (
          <line
            data-export-hide="1"
            x1={ox + product.widthMm / 2}
            y1={oy}
            x2={ox + product.widthMm / 2}
            y2={oy + product.heightMm}
            stroke="hsl(217 91% 60%)"
            strokeWidth={0.4}
            strokeDasharray="2 1"
          />
        )}

        {/* Product border */}
        {product.shape === "circle" ? (
          <circle
            cx={ox + product.widthMm / 2}
            cy={oy + product.heightMm / 2}
            r={Math.min(product.widthMm, product.heightMm) / 2}
            fill="none"
            stroke="#ccc"
            strokeWidth={0.3}
          />
        ) : (
          <rect
            x={ox}
            y={oy}
            width={product.widthMm}
            height={product.heightMm}
            fill="none"
            stroke="#ccc"
            strokeWidth={0.3}
          />
        )}
      </svg>
    </div>
  );
}
