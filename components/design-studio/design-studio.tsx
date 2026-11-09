"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { PRODUCTS, PRODUCT_ID_MAP } from "./products";
import { PALETTES } from "./palettes";
import { CANVAS_FONTS, type FontId } from "./fonts";
import { StudioCanvas } from "./studio-canvas";
import { sendToMessenger, downloadDesign, fireStudioEvent } from "./send";
import { DEFAULT_INFO, DEFAULT_LOGO, INFO_FIELDS, type BusinessInfo, type LogoState, type Palette, type Product, type LogoMono, type StudioEl } from "./types";
import { Send, Download, Upload, X } from "lucide-react";

interface DesignStudioProps {
  initialProductId?: string;
  uploadEndpoint: string | null;
  fontFamilies: Record<string, string>;
}

interface StudioState {
  productId: string;
  info: BusinessInfo;
  paletteId: string;
  fontId: FontId;
  logo: LogoState;
  logoX: number; logoY: number; logoW: number; logoH: number;
  logoMono: LogoMono;
  selectedElId: string | null;
  qty: number;
  note: string;
}

function getDefaultLogoPos(product: Product) {
  const els = product.build();
  const logoEl = els.find((e) => e.type === "logo") as { x: number; y: number; w: number; h: number } | undefined;
  return logoEl
    ? { logoX: logoEl.x, logoY: logoEl.y, logoW: logoEl.w, logoH: logoEl.h }
    : { logoX: 5, logoY: 5, logoW: 20, logoH: 20 };
}

const DEFAULT_PRODUCT = PRODUCTS[0];
const DEFAULT_LOGO_POS = getDefaultLogoPos(DEFAULT_PRODUCT);

const INITIAL_STATE: StudioState = {
  productId: DEFAULT_PRODUCT.id,
  info: DEFAULT_INFO,
  paletteId: "classic",
  fontId: "noto-sans",
  logo: DEFAULT_LOGO,
  ...DEFAULT_LOGO_POS,
  logoMono: "none",
  selectedElId: null,
  qty: 100,
  note: "",
};

// ── Color swatches ────────────────────────────────────────────────────────────
function PaletteCard({ palette, selected, onSelect }: { palette: Palette; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      title={palette.name}
      className={`w-full flex items-center gap-2 p-2 border transition-all ${selected ? "border-foreground bg-muted" : "border-border hover:border-foreground/50"}`}
    >
      <div className="flex gap-0.5 shrink-0">
        {([palette.bg, palette.primary, palette.accent, palette.ink] as string[]).map((c, i) => (
          <span key={i} className="w-4 h-4 rounded-full border border-black/10" style={{ background: c }} />
        ))}
      </div>
      <span className="text-xs truncate">{palette.name}</span>
    </button>
  );
}

// ── Design Studio ─────────────────────────────────────────────────────────────
export function DesignStudio({ initialProductId, uploadEndpoint, fontFamilies }: DesignStudioProps) {
  const [state, setState] = useState<StudioState>(() => {
    const pid = initialProductId && PRODUCT_ID_MAP[initialProductId]
      ? PRODUCT_ID_MAP[initialProductId]
      : DEFAULT_PRODUCT.id;
    const product = PRODUCTS.find((p) => p.id === pid) ?? DEFAULT_PRODUCT;
    return { ...INITIAL_STATE, productId: pid, ...getDefaultLogoPos(product) };
  });
  const [sending, setSending] = useState(false);
  const [elPatches, setElPatches] = useState<Record<string, Partial<StudioEl>>>({});
  const svgRef = useRef<SVGSVGElement | null>(null);

  const product = PRODUCTS.find((p) => p.id === state.productId) ?? DEFAULT_PRODUCT;
  const palette = PALETTES.find((p) => p.id === state.paletteId) ?? PALETTES[0];
  const fontEntry = CANVAS_FONTS.find((f) => f.id === state.fontId) ?? CANVAS_FONTS[0];
  const fontFamily = fontFamilies[state.fontId] ?? fontEntry.family;

  // Merge product template with logo position, logoMono, and any element patches from drag
  const els = useMemo(() => {
    const base = product.build();
    return base.map((el) => {
      if (el.type === "logo" && el.id === "logo") {
        const logoBase = { ...el, x: state.logoX, y: state.logoY, w: state.logoW, h: state.logoH, mono: state.logoMono };
        const patch = elPatches[el.id];
        return patch ? ({ ...logoBase, ...patch } as StudioEl) : (logoBase as StudioEl);
      }
      const patch = elPatches[el.id];
      return patch ? ({ ...el, ...patch } as StudioEl) : el;
    });
  }, [product, state.logoX, state.logoY, state.logoW, state.logoH, state.logoMono, elPatches]);

  useEffect(() => {
    fireStudioEvent("design_studio_open", { product: state.productId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = useCallback(<K extends keyof StudioState>(key: K, val: StudioState[K]) => {
    setState((s) => ({ ...s, [key]: val }));
  }, []);

  const handleProductSelect = useCallback((id: string) => {
    const p = PRODUCTS.find((pr) => pr.id === id) ?? DEFAULT_PRODUCT;
    setState((s) => ({ ...s, productId: id, selectedElId: null, ...getDefaultLogoPos(p) }));
    setElPatches({});
  }, []);

  const handleInfoChange = useCallback((key: keyof BusinessInfo, val: string) => {
    setState((s) => ({ ...s, info: { ...s.info, [key]: val } }));
  }, []);

  const handleLogoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      const img = new Image();
      img.onload = () => {
        const aspect = img.width / img.height;
        setState((s) => ({ ...s, logo: { src, aspect } }));
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
    fireStudioEvent("design_logo_upload", { product: state.productId });
    e.target.value = "";
  }, [state.productId]);

  const handleLogoRemove = useCallback(() => {
    setState((s) => ({ ...s, logo: DEFAULT_LOGO }));
  }, []);

  const handleUpdateEl = useCallback((id: string, patch: Partial<StudioEl>) => {
    if (id === "logo") {
      const p = patch as { x?: number; y?: number };
      setState((s) => ({ ...s, logoX: p.x ?? s.logoX, logoY: p.y ?? s.logoY }));
      return;
    }
    setElPatches((prev) => ({ ...prev, [id]: { ...(prev[id] ?? {}), ...patch } }));
  }, []);

  const handleSend = useCallback(async () => {
    if (!svgRef.current) return;
    setSending(true);
    try {
      await sendToMessenger(svgRef.current, product, state.info, state.qty, state.note, uploadEndpoint);
    } finally {
      setSending(false);
    }
  }, [product, state.info, state.qty, state.note, uploadEndpoint]);

  const handleDownload = useCallback(async () => {
    if (!svgRef.current) return;
    setSending(true);
    try {
      await downloadDesign(svgRef.current, product);
    } finally {
      setSending(false);
    }
  }, [product]);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section className="px-4 xs:px-6 py-8 sm:py-10 max-w-screen-xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">ডিজাইন স্টুডিও</h1>
        <p className="mt-1 text-sm text-muted-foreground">নিজের ডিজাইন তৈরি করুন — মেসেঞ্জারে পাঠান</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        {/* Canvas — sticky on desktop */}
        <div className="w-full lg:flex-1 lg:sticky lg:top-24">
          <StudioCanvas
            product={product}
            els={els}
            info={state.info}
            palette={palette}
            fontFamily={fontFamily}
            logo={state.logo}
            selectedElId={state.selectedElId}
            onSelectEl={(id) => set("selectedElId", id)}
            onUpdateEl={handleUpdateEl}
            canvasRef={svgRef}
          />
          <p className="mt-2 text-xs text-muted-foreground text-center">
            লোগো টেনে সরান · ট্যাপ করে নির্বাচন করুন
          </p>
        </div>

        {/* Panels */}
        <div className="w-full lg:w-[360px] shrink-0">
          <Tabs defaultValue="product">
            <TabsList className="w-full grid grid-cols-6 h-auto">
              {["পণ্য","তথ্য","রং","লোগো","লেখা","অর্ডার"].map((label, i) => (
                <TabsTrigger
                  key={i}
                  value={["product","info","color","logo","text","order"][i]}
                  className="text-xs py-2 px-1 min-h-10"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-4 border border-border bg-background p-4 sm:p-5">

              {/* ── Product panel ── */}
              <TabsContent value="product" className="mt-0">
                <p className="text-sm font-semibold mb-3">পণ্য বেছে নিন</p>
                <div className="grid grid-cols-2 gap-2">
                  {PRODUCTS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleProductSelect(p.id)}
                      className={`text-left p-3 border text-xs transition-all ${
                        state.productId === p.id
                          ? "border-foreground bg-muted font-semibold"
                          : "border-border hover:border-foreground/50"
                      }`}
                    >
                      <div className="font-medium mb-0.5">{p.labelBn}</div>
                      <div className="text-muted-foreground">
                        {p.widthMm}×{p.heightMm}mm
                        {p.shape === "circle" ? " (গোল)" : ""}
                      </div>
                    </button>
                  ))}
                </div>
              </TabsContent>

              {/* ── Info panel ── */}
              <TabsContent value="info" className="mt-0 space-y-3">
                <p className="text-sm font-semibold">ব্যবসার তথ্য</p>
                {INFO_FIELDS.map((f) => (
                  <div key={f.key}>
                    <Label className="text-xs mb-1 block">{f.labelBn}</Label>
                    <Input
                      value={state.info[f.key]}
                      onChange={(e) => handleInfoChange(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      className="text-sm h-9"
                    />
                  </div>
                ))}
              </TabsContent>

              {/* ── Color panel ── */}
              <TabsContent value="color" className="mt-0">
                <p className="text-sm font-semibold mb-3">রঙের থিম</p>
                <div className="space-y-1.5">
                  {PALETTES.map((p) => (
                    <PaletteCard
                      key={p.id}
                      palette={p}
                      selected={state.paletteId === p.id}
                      onSelect={() => set("paletteId", p.id)}
                    />
                  ))}
                </div>
              </TabsContent>

              {/* ── Logo panel ── */}
              <TabsContent value="logo" className="mt-0 space-y-4">
                <p className="text-sm font-semibold">লোগো</p>
                {state.logo.src ? (
                  <div className="space-y-3">
                    {/* Preview */}
                    <div className="border border-border p-2 flex items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={state.logo.src} alt="লোগো" className="h-12 w-auto object-contain" />
                      <button
                        type="button"
                        onClick={handleLogoRemove}
                        className="ml-auto p-1 hover:bg-muted rounded"
                        title="সরিয়ে দিন"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    {/* Mono toggle */}
                    <div>
                      <Label className="text-xs mb-1.5 block">লোগোর রং</Label>
                      <div className="flex gap-2">
                        {(["none","white","black"] as LogoMono[]).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => set("logoMono", m)}
                            className={`flex-1 py-1.5 text-xs border transition-all ${
                              state.logoMono === m ? "border-foreground bg-muted" : "border-border"
                            }`}
                          >
                            {m === "none" ? "মূল" : m === "white" ? "সাদা" : "কালো"}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Size */}
                    <div>
                      <Label className="text-xs mb-1.5 block">আকার ({Math.round(state.logoW)}mm)</Label>
                      <Slider
                        min={5} max={80} step={1}
                        value={[state.logoW]}
                        onValueChange={([w]) => {
                          const h = state.logo.aspect > 0 ? w / state.logo.aspect : w;
                          setState((s) => ({ ...s, logoW: w, logoH: h }));
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center gap-2 p-6 border border-dashed border-border cursor-pointer hover:border-foreground/50 transition-colors">
                    <Upload size={20} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">লোগো আপলোড করুন</span>
                    <span className="text-xs text-muted-foreground">PNG, SVG, JPG</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                  </label>
                )}
              </TabsContent>

              {/* ── Text panel ── */}
              <TabsContent value="text" className="mt-0 space-y-3">
                <p className="text-sm font-semibold">লেখার ফন্ট</p>
                {CANVAS_FONTS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => set("fontId", f.id as FontId)}
                    className={`w-full text-left p-3 border transition-all ${
                      state.fontId === f.id
                        ? "border-foreground bg-muted"
                        : "border-border hover:border-foreground/50"
                    }`}
                  >
                    <span className="text-xs text-muted-foreground block mb-1">{f.labelBn}</span>
                    <span style={{ fontFamily: fontFamilies[f.id] ?? f.family }} className="text-sm">
                      বর্ণিক প্রচারণী
                    </span>
                  </button>
                ))}
              </TabsContent>

              {/* ── Order panel ── */}
              <TabsContent value="order" className="mt-0 space-y-4">
                <p className="text-sm font-semibold">অর্ডার তথ্য</p>

                <div>
                  <Label className="text-xs mb-1.5 block">পরিমাণ: {state.qty} পিস</Label>
                  <Slider
                    min={100} max={5000} step={100}
                    value={[state.qty]}
                    onValueChange={([v]) => set("qty", v)}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>১০০</span><span>৫,০০০</span>
                  </div>
                </div>

                <div>
                  <Label className="text-xs mb-1.5 block">বিশেষ নির্দেশনা (ঐচ্ছিক)</Label>
                  <Textarea
                    value={state.note}
                    onChange={(e) => set("note", e.target.value)}
                    placeholder="কোনো বিশেষ চাহিদা থাকলে লিখুন..."
                    className="text-sm resize-none h-24"
                  />
                </div>

                <div className="space-y-2 pt-1">
                  <Button
                    onClick={handleSend}
                    disabled={sending}
                    className="w-full gap-2"
                  >
                    <Send size={15} />
                    {sending ? "পাঠানো হচ্ছে..." : "মেসেঞ্জারে পাঠান"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDownload}
                    disabled={sending}
                    className="w-full gap-2"
                  >
                    <Download size={15} />
                    ডিজাইন ডাউনলোড
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                  ডিজাইনটি PNG হিসেবে তৈরি হবে এবং মেসেঞ্জারে পাঠানো হবে।
                  আমরা দাম ও ডেলিভারি নিয়ে যোগাযোগ করব।
                </p>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
