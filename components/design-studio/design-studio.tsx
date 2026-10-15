"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PRODUCTS, PRODUCT_ID_MAP, type Product } from "./products";
import { PALETTES, type Palette } from "./palettes";
import { CANVAS_FONTS, type FontId } from "./fonts";
import { StudioCanvas } from "./studio-canvas";
import { ProductPanel } from "./panels/product-panel";
import { InfoPanel } from "./panels/info-panel";
import { ColorPanel } from "./panels/color-panel";
import { LogoPanel } from "./panels/logo-panel";
import { TextPanel } from "./panels/text-panel";
import { OrderPanel } from "./panels/order-panel";
import { sendToMessenger, downloadDesign, fireStudioEvent } from "./send";
import type { BusinessInfo, LogoState, StudioState } from "./types";
import { DEFAULT_INFO, DEFAULT_LOGO } from "./types";

interface DesignStudioProps {
  initialProductId?: string;
  uploadEndpoint: string | null;
  fontFamilies: Record<string, string>;
}

const DEFAULT_STATE: StudioState = {
  productId: "card",
  info: DEFAULT_INFO,
  paletteId: "classic",
  fontId: "noto-sans",
  logo: DEFAULT_LOGO,
  selectedElementId: null,
  qty: 100,
  note: "",
};

export function DesignStudio({ initialProductId, uploadEndpoint, fontFamilies }: DesignStudioProps) {
  const [state, setState] = useState<StudioState>(() => {
    const pid = initialProductId && PRODUCT_ID_MAP[initialProductId] ? PRODUCT_ID_MAP[initialProductId] : "card";
    return { ...DEFAULT_STATE, productId: pid };
  });
  const [sending, setSending] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const product: Product = PRODUCTS.find((p) => p.id === state.productId) ?? PRODUCTS[0];
  const palette: Palette = PALETTES.find((p) => p.id === state.paletteId) ?? PALETTES[0];
  const fontEntry = CANVAS_FONTS.find((f) => f.id === state.fontId) ?? CANVAS_FONTS[0];
  const fontFamily = fontFamilies[state.fontId] ?? fontEntry.family;

  useEffect(() => {
    fireStudioEvent("design_studio_open", { product: state.productId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setInfo = useCallback((info: BusinessInfo) => setState((s) => ({ ...s, info })), []);
  const setPaletteId = useCallback((paletteId: string) => setState((s) => ({ ...s, paletteId })), []);
  const setFontId = useCallback((fontId: FontId) => setState((s) => ({ ...s, fontId })), []);
  const setLogo = useCallback((logo: LogoState) => setState((s) => ({ ...s, logo })), []);
  const setSelectedEl = useCallback((id: string | null) => setState((s) => ({ ...s, selectedElementId: id })), []);
  const setQty = useCallback((qty: number) => setState((s) => ({ ...s, qty })), []);
  const setNote = useCallback((note: string) => setState((s) => ({ ...s, note })), []);

  const handleProductSelect = useCallback((id: Product["id"]) => {
    setState((s) => ({ ...s, productId: id, selectedElementId: null }));
  }, []);

  const handleLogoMove = useCallback((x: number, y: number) => {
    setState((s) => ({ ...s, logo: { ...s.logo, x, y } }));
  }, []);

  const handleLogoUpload = useCallback(
    (dataUrl: string) => {
      setState((s) => ({
        ...s,
        logo: { ...s.logo, dataUrl, x: 5, y: 5, width: 20, height: 20 },
      }));
      fireStudioEvent("design_logo_upload", { product: state.productId });
    },
    [state.productId]
  );

  const handleSend = useCallback(async () => {
    if (!svgRef.current) return;
    setSending(true);
    try {
      await sendToMessenger(svgRef.current, product, state.info, state.qty, state.note, uploadEndpoint);
    } catch {
      // errors handled inside sendToMessenger
    } finally {
      setSending(false);
    }
  }, [product, state.info, state.qty, state.note, uploadEndpoint]);

  const handleDownload = useCallback(async () => {
    if (!svgRef.current) return;
    setSending(true);
    try {
      await downloadDesign(svgRef.current, product);
    } catch {
      // ignore
    } finally {
      setSending(false);
    }
  }, [product]);

  const TABS = [
    { value: "product", label: "পণ্য" },
    { value: "info", label: "তথ্য" },
    { value: "color", label: "রং" },
    { value: "logo", label: "লোগো" },
    { value: "text", label: "লেখা" },
    { value: "order", label: "অর্ডার" },
  ];

  return (
    <section className="px-4 xs:px-6 py-8 sm:py-10 max-w-screen-xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">ডিজাইন স্টুডিও</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          নিজের ডিজাইন তৈরি করুন — মেসেঞ্জারে পাঠান
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        {/* Canvas — sticky on desktop */}
        <div className="w-full lg:flex-1 lg:sticky lg:top-24">
          <StudioCanvas
            product={product}
            info={state.info}
            palette={palette}
            fontFamily={fontFamily}
            logo={state.logo}
            selectedElementId={state.selectedElementId}
            onSelectElement={setSelectedEl}
            onLogoMove={handleLogoMove}
            canvasRef={svgRef}
          />
          <p className="mt-2 text-xs text-muted-foreground text-center">
            লোগো টেনে সরান · কীবোর্ড তীর দিয়ে নাড়ুন · Shift = বড় ধাপ
          </p>
        </div>

        {/* Panel */}
        <div className="w-full lg:w-[360px] shrink-0">
          <Tabs defaultValue="product">
            <TabsList className="w-full grid grid-cols-6 h-auto">
              {TABS.map((t) => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="text-xs py-2 px-1 min-h-10"
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-4 border border-border bg-background p-4 sm:p-5">
              <TabsContent value="product" className="mt-0">
                <ProductPanel selectedId={state.productId} onSelect={handleProductSelect} />
              </TabsContent>

              <TabsContent value="info" className="mt-0">
                <InfoPanel info={state.info} onInfoChange={setInfo} />
              </TabsContent>

              <TabsContent value="color" className="mt-0">
                <ColorPanel selectedId={state.paletteId} onPaletteChange={setPaletteId} />
              </TabsContent>

              <TabsContent value="logo" className="mt-0">
                <LogoPanel
                  logo={state.logo}
                  onLogoChange={setLogo}
                  onUpload={handleLogoUpload}
                />
              </TabsContent>

              <TabsContent value="text" className="mt-0">
                <TextPanel fontId={state.fontId as FontId} onFontChange={setFontId} />
              </TabsContent>

              <TabsContent value="order" className="mt-0">
                <OrderPanel
                  product={product}
                  qty={state.qty}
                  note={state.note}
                  onQtyChange={setQty}
                  onNoteChange={setNote}
                  onSend={handleSend}
                  onDownload={handleDownload}
                  sending={sending}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
