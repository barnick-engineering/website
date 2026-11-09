"use client";

import React, { useCallback, useRef } from "react";
import type {
  StudioEl, RectEl, CircleEl, LineEl, TextEl, LogoEl,
  Product, Palette, BusinessInfo, LogoState,
} from "./types";
import { col, sub } from "./types";

const MAT = 20;

// ── Crop marks ─────────────────────────────────────────────────────────────────
function CropMark({ px, py, dir }: { px: number; py: number; dir: "tl"|"tr"|"bl"|"br" }) {
  const L = 7, gap = 2.5;
  let hx1 = 0, hx2 = 0, vy1 = 0, vy2 = 0;
  if (dir === "tl") { hx1 = px-gap-L; hx2 = px-gap; vy1 = py-gap-L; vy2 = py-gap; }
  else if (dir === "tr") { hx1 = px+gap; hx2 = px+gap+L; vy1 = py-gap-L; vy2 = py-gap; }
  else if (dir === "bl") { hx1 = px-gap-L; hx2 = px-gap; vy1 = py+gap; vy2 = py+gap+L; }
  else { hx1 = px+gap; hx2 = px+gap+L; vy1 = py+gap; vy2 = py+gap+L; }
  return (
    <>
      <line x1={hx1} y1={py} x2={hx2} y2={py} stroke="rgba(255,255,255,0.5)" strokeWidth={0.4} />
      <line x1={px} y1={vy1} x2={px} y2={vy2} stroke="rgba(255,255,255,0.5)" strokeWidth={0.4} />
    </>
  );
}

// ── Delta helper — computes new position patch given dx/dy in mm ───────────────
function moveDelta(el: StudioEl, dx: number, dy: number): Partial<StudioEl> {
  switch (el.type) {
    case "text":
    case "logo":
    case "rect":
      return { x: (el as { x: number }).x + dx, y: (el as { y: number }).y + dy } as Partial<StudioEl>;
    case "circle": {
      const c = el as CircleEl;
      return { cx: c.cx + dx, cy: c.cy + dy } as Partial<StudioEl>;
    }
    case "line": {
      const l = el as LineEl;
      return { x1: l.x1 + dx, y1: l.y1 + dy, x2: l.x2 + dx, y2: l.y2 + dy } as Partial<StudioEl>;
    }
    default:
      return {};
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function anchorToSvg(a?: "start"|"middle"|"end"): "start"|"middle"|"end" {
  return a ?? "start";
}

// ── Element renderer ───────────────────────────────────────────────────────────
function RenderEl({
  el, palette, info, fontFamily, logo, isSelected,
}: {
  el: StudioEl;
  palette: Palette;
  info: BusinessInfo;
  fontFamily: string;
  logo: LogoState;
  isSelected: boolean;
}) {
  const c = (v: string) => col(v, palette);
  const s = (t: string) => sub(t, info);
  const selStroke = { stroke: "#3b82f6", strokeWidth: 0.8, fill: "none", strokeDasharray: "2 1.5" };

  switch (el.type) {
    case "rect": {
      const r = el as RectEl;
      return (
        <>
          <rect
            x={r.x} y={r.y} width={r.w} height={r.h}
            fill={c(r.fill)} rx={r.rx ?? 0}
            stroke={r.stroke ? c(r.stroke) : "none"} strokeWidth={r.strokeW ?? 0}
            style={{ cursor: r.lock ? "default" : "move" }}
          />
          {isSelected && (
            <rect x={r.x} y={r.y} width={r.w} height={r.h}
              {...selStroke} rx={r.rx ?? 0} data-export-hide />
          )}
        </>
      );
    }
    case "circle": {
      const cc = el as CircleEl;
      return (
        <>
          <circle
            cx={cc.cx} cy={cc.cy} r={cc.r}
            fill={c(cc.fill)}
            stroke={cc.stroke ? c(cc.stroke) : "none"} strokeWidth={cc.strokeW ?? 0}
            style={{ cursor: cc.lock ? "default" : "move" }}
          />
          {isSelected && (
            <circle cx={cc.cx} cy={cc.cy} r={cc.r} {...selStroke} data-export-hide />
          )}
        </>
      );
    }
    case "line": {
      const l = el as LineEl;
      return <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={c(l.stroke)} strokeWidth={l.strokeW} />;
    }
    case "path": {
      const p = el as { type: "path"; d: string; stroke: string; strokeW: number; fill?: string; lock?: boolean };
      return (
        <path
          d={p.d}
          fill={p.fill ? c(p.fill) : "none"}
          stroke={p.stroke ? c(p.stroke) : "none"}
          strokeWidth={p.strokeW ?? 0}
          strokeLinecap="round" strokeLinejoin="round"
        />
      );
    }
    case "text": {
      const t = el as TextEl;
      return (
        <text
          x={t.x} y={t.y}
          fontSize={t.fontSize} fontWeight={t.fontWeight ?? "normal"}
          fontFamily={fontFamily}
          textAnchor={anchorToSvg(t.anchor)}
          fill={c(t.fill)}
          dominantBaseline="auto"
          style={{ cursor: t.lock ? "default" : "move" }}
        >
          {s(t.text)}
        </text>
      );
    }
    case "logo": {
      const lg = el as LogoEl;
      const lx = lg.x, ly = lg.y, lw = lg.w, lh = lg.h ?? lg.w;
      const monoFilter =
        lg.mono === "white" ? "brightness(0) invert(1)"
        : lg.mono === "black" ? "brightness(0)"
        : undefined;

      return (
        <>
          {logo.src ? (
            <image
              x={lx} y={ly} width={lw} height={lh}
              href={logo.src}
              preserveAspectRatio="xMidYMid meet"
              style={monoFilter ? { filter: monoFilter, cursor: "move" } : { cursor: "move" }}
            />
          ) : (
            <>
              <rect x={lx} y={ly} width={lw} height={lh}
                fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)"
                strokeWidth={0.5} strokeDasharray="2 1"
                style={{ cursor: "move" }} />
              <text x={lx + lw/2} y={ly + lh/2 + 1}
                fontSize={Math.min(lw, lh) * 0.22} fontFamily={fontFamily}
                textAnchor="middle" dominantBaseline="middle"
                fill="rgba(255,255,255,0.6)">লোগো</text>
            </>
          )}
          {isSelected && (
            <rect x={lx} y={ly} width={lw} height={lh} {...selStroke} data-export-hide />
          )}
        </>
      );
    }
    default:
      return null;
  }
}

// ── Main canvas ────────────────────────────────────────────────────────────────
interface StudioCanvasProps {
  product: Product;
  els: StudioEl[];
  info: BusinessInfo;
  palette: Palette;
  fontFamily: string;
  logo: LogoState;
  selectedElId: string | null;
  onSelectEl: (id: string | null) => void;
  onUpdateEl: (id: string, patch: Partial<StudioEl>) => void;
  canvasRef?: React.RefObject<SVGSVGElement | null>;
}

export function StudioCanvas({
  product, els, info, palette, fontFamily, logo,
  selectedElId, onSelectEl, onUpdateEl,
  canvasRef,
}: StudioCanvasProps) {
  const W = product.widthMm;
  const H = product.heightMm;
  const totalW = W + MAT * 2;
  const totalH = H + MAT * 2;

  const svgRef = useRef<SVGSVGElement | null>(null);
  const ref = (node: SVGSVGElement | null) => {
    svgRef.current = node;
    if (canvasRef) (canvasRef as React.MutableRefObject<SVGSVGElement | null>).current = node;
  };

  const outsideEls = els.filter((e) => (e as { outside?: boolean }).outside);
  const innerEls   = els.filter((e) => !(e as { outside?: boolean }).outside);

  // ── Drag state ─────────────────────────────────────────────────────────────
  const dragRef = useRef<{
    id: string;
    startEl: StudioEl;
    startPt: { x: number; y: number };
  } | null>(null);

  const svgPt = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * (totalW / rect.width)  - MAT,
      y: (clientY - rect.top)  * (totalH / rect.height) - MAT,
    };
  }, [totalW, totalH]);

  // ── Pointer events — all handled on SVG to use setPointerCapture ────────────
  const handlePointerDown = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    const target = (e.target as Element).closest("[data-el-id]");
    if (!target) { onSelectEl(null); return; }

    const elId = target.getAttribute("data-el-id");
    if (!elId) { onSelectEl(null); return; }

    const el = els.find((el) => el.id === elId);
    if (!el || (el as { lock?: boolean }).lock) return;

    e.preventDefault();
    const pt = svgPt(e.clientX, e.clientY);
    if (!pt) return;

    dragRef.current = { id: elId, startEl: { ...el }, startPt: pt };
    e.currentTarget.setPointerCapture(e.pointerId);
    onSelectEl(elId === selectedElId ? null : elId);
  }, [els, svgPt, onSelectEl, selectedElId]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const pt = svgPt(e.clientX, e.clientY);
    if (!pt) return;
    const dx = pt.x - dragRef.current.startPt.x;
    const dy = pt.y - dragRef.current.startPt.y;
    onUpdateEl(dragRef.current.id, moveDelta(dragRef.current.startEl, dx, dy));
  }, [svgPt, onUpdateEl]);

  const handlePointerUp = useCallback(() => { dragRef.current = null; }, []);

  // ── Render ─────────────────────────────────────────────────────────────────
  const isCircle = product.shape === "circle";
  const clipId = `clip-${product.id}`;

  return (
    <div className="w-full select-none" style={{ touchAction: "none" }}>
      <svg
        ref={ref}
        viewBox={`0 0 ${totalW} ${totalH}`}
        style={{ width: "100%", height: "auto", display: "block" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <defs>
          <pattern id="mat-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={0.5} />
          </pattern>
          {isCircle && (
            <clipPath id={clipId}>
              <circle cx={MAT + W/2} cy={MAT + H/2} r={Math.min(W, H) / 2} />
            </clipPath>
          )}
        </defs>

        {/* Mat */}
        <rect width={totalW} height={totalH} fill="#2F4F46" />
        <rect width={totalW} height={totalH} fill="url(#mat-grid)" />

        {/* Crop marks */}
        <CropMark px={MAT}   py={MAT}   dir="tl" />
        <CropMark px={MAT+W} py={MAT}   dir="tr" />
        <CropMark px={MAT}   py={MAT+H} dir="bl" />
        <CropMark px={MAT+W} py={MAT+H} dir="br" />

        {/* Elements */}
        <g transform={`translate(${MAT},${MAT})`}>
          {outsideEls.map((el) => (
            <g key={el.id} data-el-id={el.id}>
              <RenderEl el={el} palette={palette} info={info} fontFamily={fontFamily} logo={logo} isSelected={selectedElId === el.id} />
            </g>
          ))}
          <g clipPath={isCircle ? `url(#${clipId})` : undefined}>
            {innerEls.map((el) => (
              <g key={el.id} data-el-id={el.id}>
                <RenderEl el={el} palette={palette} info={info} fontFamily={fontFamily} logo={logo} isSelected={selectedElId === el.id} />
              </g>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
