"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AlertTriangle, Calculator, ChevronDown, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { facebookInsights } from "@/data/insights";
import { getMessengerUrlWithText } from "@/lib/order";
import { trackEvent } from "@/lib/analytics";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/section-header";
import {
  calculateOffsetMemo,
  calculateRoundSticker,
  calculateVisitingCard,
  STICKER_2X2_FIXED_TIER_PRICES,
  STICKER_2X2_PRESET_QUANTITIES,
  VISITING_FIXED_TIER_PRICES,
  VISITING_PRESET_QUANTITIES,
  type ColorCount,
  type EstimateResult,
} from "@/lib/calculateEstimate";
import { parseEstimateQuery } from "@/lib/estimateQuery";
import {
  consumePendingEstimateProduct,
  ESTIMATE_PRODUCT_EVENT,
  isEstimateProductId,
} from "@/lib/estimateEvents";
import { numberLocale, padNumber } from "@/lib/typography";
import { cn } from "@/lib/utils";

type ProductId = "visiting-card" | "cash-memo" | "round-sticker";

type ProductPill =
  | { id: ProductId; labelKey: string; disabled?: false }
  | { id: "coming-soon"; labelKey: string; disabled: true };

const PRODUCT_PILLS: ProductPill[] = [
  { id: "visiting-card", labelKey: "estimate.product.visitingCard" },
  { id: "cash-memo", labelKey: "estimate.product.cashMemo" },
  { id: "round-sticker", labelKey: "estimate.product.roundSticker" },
  { id: "coming-soon", labelKey: "estimate.comingSoon", disabled: true },
];

const MEMO_QTY_OPTIONS = [500, 1000, 2000, 5000] as const;
const COLOR_OPTIONS: ColorCount[] = [1, 2, 4];

type VisitingQtyMode = "preset" | "custom";

const DEFAULT_VISITING = {
  qtyMode: "preset" as VisitingQtyMode,
  presetQty: null as number | null,
  customQty: "",
  bothSides: false,
  colors: 1 as ColorCount,
  mattLamination: true,
  spotUV: true,
  dyeCutting: true,
};

function resolveVisitingQty(state: typeof DEFAULT_VISITING): number | null {
  if (state.qtyMode === "custom") {
    const n = parseInt(state.customQty.trim(), 10);
    return Number.isFinite(n) && n > 0 ? n : null;
  }
  return state.presetQty;
}

type MemoQtyMode = "preset" | "custom";

const DEFAULT_MEMO = {
  qtyMode: "preset" as MemoQtyMode,
  presetQty: null as number | null,
  customQty: "",
  size: "large" as "large" | "small",
  colors: 1 as ColorCount,
  binding: "pad" as "pad" | "memo",
};

function resolveMemoQty(state: typeof DEFAULT_MEMO): number | null {
  if (state.qtyMode === "custom") {
    const n = parseInt(state.customQty.trim(), 10);
    return Number.isFinite(n) && n > 0 ? n : null;
  }
  return state.presetQty;
}

const DEFAULT_STICKER = {
  qty: null as number | null,
};

function formatPrice(n: number): string {
  return n.toLocaleString("en-BD");
}

/* ------------------------------------------------------------------ */
/* Presentational helpers (restyle only — no pricing logic here)        */
/* ------------------------------------------------------------------ */

function tileClass(selected: boolean) {
  return cn(
    "min-h-14 px-2 py-2 flex flex-col items-center justify-center border text-base font-semibold tabular-nums transition-colors duration-150 motion-reduce:transition-none",
    selected
      ? "bg-foreground text-background border-foreground"
      : "bg-background border-input text-foreground hover:border-foreground"
  );
}

function segmentClass(selected: boolean) {
  return cn(
    "min-h-11 px-4 text-sm font-medium transition-colors duration-150 motion-reduce:transition-none",
    selected ? "bg-foreground text-background" : "text-foreground hover:bg-muted"
  );
}

/** Per-piece hint under a fixed-tier quantity tile, in the visitor's digits */
function PerPieceHint({ total, qty, selected }: { total: number; qty: number; selected: boolean }) {
  const { t, language } = useLanguage();
  const perPiece = (total / qty).toLocaleString(numberLocale(language), {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (
    <span
      className={cn(
        "mt-0.5 font-normal",
        language === "bn" ? "text-sm" : "text-xs",
        selected ? "text-background/80" : "text-muted-foreground"
      )}
    >
      ৳{perPiece}
      {t("estimate.perPiece")}
    </span>
  );
}

function CompactToggle<T extends string | boolean>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
      <span className="text-sm font-semibold text-foreground shrink-0">{label}</span>
      <div role="group" aria-label={label} className="inline-flex flex-wrap border border-input bg-background self-start sm:self-auto">
        {options.map((opt) => (
          <button
            key={String(opt.value)}
            type="button"
            aria-pressed={value === opt.value}
            onClick={() => onChange(opt.value)}
            className={segmentClass(value === opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function VisitingQtySelector({
  qtyMode,
  presetQty,
  customQty,
  onPresetSelect,
  onCustomSelect,
  onCustomQtyChange,
}: {
  qtyMode: VisitingQtyMode;
  presetQty: number | null;
  customQty: string;
  onPresetSelect: (qty: number) => void;
  onCustomSelect: () => void;
  onCustomQtyChange: (value: string) => void;
}) {
  const { t, language } = useLanguage();
  const locale = language === "bn" ? "bn-BD" : "en-BD";

  return (
    <div>
      <p className="text-sm font-semibold text-ink-2 mb-3">{t("estimate.visiting.qty")}</p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {VISITING_PRESET_QUANTITIES.map((opt) => {
          const selected = qtyMode === "preset" && presetQty === opt;
          // 5000 is formula-priced — no per-piece hint
          const tier = opt !== 5000 ? VISITING_FIXED_TIER_PRICES[opt] : undefined;
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={selected}
              onClick={() => onPresetSelect(opt)}
              className={tileClass(selected)}
            >
              {opt.toLocaleString(locale)}
              {tier !== undefined && <PerPieceHint total={tier} qty={opt} selected={selected} />}
            </button>
          );
        })}
        <button
          type="button"
          aria-pressed={qtyMode === "custom"}
          onClick={onCustomSelect}
          className={tileClass(qtyMode === "custom")}
        >
          {t("estimate.visiting.custom")}
        </button>
      </div>

      {qtyMode === "custom" && (
        <div className="mt-4">
          <label className="text-sm font-semibold text-foreground" htmlFor="visiting-custom-qty">
            {t("estimate.visiting.customLabel")}
          </label>
          <Input
            id="visiting-custom-qty"
            type="number"
            inputMode="numeric"
            min={1}
            placeholder={t("estimate.visiting.customPlaceholder")}
            value={customQty}
            onChange={(e) => onCustomQtyChange(e.target.value)}
            className="mt-2 min-h-12 text-base md:text-base border-input bg-background shadow-none"
          />
        </div>
      )}
    </div>
  );
}

function MemoQtySelector({
  qtyMode,
  presetQty,
  customQty,
  onPresetSelect,
  onCustomSelect,
  onCustomQtyChange,
}: {
  qtyMode: MemoQtyMode;
  presetQty: number | null;
  customQty: string;
  onPresetSelect: (qty: number) => void;
  onCustomSelect: () => void;
  onCustomQtyChange: (value: string) => void;
}) {
  const { t, language } = useLanguage();
  const locale = language === "bn" ? "bn-BD" : "en-BD";

  return (
    <div>
      <p className="text-sm font-semibold text-ink-2 mb-3">{t("estimate.memo.qty")}</p>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {MEMO_QTY_OPTIONS.map((opt) => {
          const selected = qtyMode === "preset" && presetQty === opt;
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={selected}
              onClick={() => onPresetSelect(opt)}
              className={tileClass(selected)}
            >
              {opt.toLocaleString(locale)}
            </button>
          );
        })}
        <button
          type="button"
          aria-pressed={qtyMode === "custom"}
          onClick={onCustomSelect}
          className={tileClass(qtyMode === "custom")}
        >
          {t("estimate.memo.custom")}
        </button>
      </div>

      {qtyMode === "custom" && (
        <div className="mt-4">
          <label className="text-sm font-semibold text-foreground" htmlFor="memo-custom-qty">
            {t("estimate.memo.customLabel")}
          </label>
          <Input
            id="memo-custom-qty"
            type="number"
            inputMode="numeric"
            min={1}
            placeholder={t("estimate.memo.customPlaceholder")}
            value={customQty}
            onChange={(e) => onCustomQtyChange(e.target.value)}
            className="mt-2 min-h-12 text-base md:text-base border-input bg-background shadow-none"
          />
        </div>
      )}
    </div>
  );
}

function RoundStickerQty({
  qty,
  onQtyChange,
}: {
  qty: number | null;
  onQtyChange: (qty: number) => void;
}) {
  const { t, language } = useLanguage();
  const locale = language === "bn" ? "bn-BD" : "en-BD";

  return (
    <div>
      <p className="text-sm font-semibold text-ink-2 mb-3">{t("estimate.sticker.qty")}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {STICKER_2X2_PRESET_QUANTITIES.map((opt) => {
          const selected = qty === opt;
          const tier = STICKER_2X2_FIXED_TIER_PRICES[opt];
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={selected}
              onClick={() => onQtyChange(opt)}
              className={tileClass(selected)}
            >
              {opt.toLocaleString(locale)}
              {tier !== undefined && <PerPieceHint total={tier} qty={opt} selected={selected} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RoundStickerSize() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
      <span className="text-sm font-semibold text-foreground">{t("estimate.sticker.size")}</span>
      <span
        aria-current="true"
        className="min-h-11 px-4 text-sm font-semibold bg-foreground text-background inline-flex items-center self-start"
      >
        {t("estimate.sticker.size.2")}
      </span>
    </div>
  );
}

/** Numbered field group: serif number + h3 label */
function FieldGroup({
  number,
  label,
  children,
}: {
  number: number;
  label: string;
  children: ReactNode;
}) {
  const { language } = useLanguage();
  return (
    <div className="p-5 lg:p-8 border-b border-border last:border-b-0">
      <h3 className="flex items-baseline gap-3 text-lg lg:text-xl font-semibold text-foreground">
        <span className="font-display text-primary-strong tabular-nums">{padNumber(language, number)}</span>
        {label}
      </h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function formatEstimatePrice(result: EstimateResult): string {
  if (result.minPrice === result.maxPrice) {
    return `৳ ${formatPrice(result.minPrice)}`;
  }
  return `৳ ${formatPrice(result.minPrice)} – ৳ ${formatPrice(result.maxPrice)}`;
}

function buildEstimateMessengerMessage({
  t,
  product,
  result,
  visitingQty,
  visiting,
  memoQty,
  memo,
  sticker,
}: {
  t: (key: string) => string;
  product: ProductId;
  result: EstimateResult;
  visitingQty: number | null;
  visiting: typeof DEFAULT_VISITING;
  memoQty: number | null;
  memo: typeof DEFAULT_MEMO;
  sticker: typeof DEFAULT_STICKER;
}): string {
  const lines = [t("estimate.messenger.intro"), ""];

  if (product === "visiting-card" && visitingQty) {
    lines.push(`${t("estimate.messenger.item")}: ${t("estimate.product.visitingCard")}`);
    lines.push(`${t("estimate.messenger.qty")}: ${visitingQty.toLocaleString("en-BD")}`);
    lines.push(`${t("estimate.messenger.price")}: ${formatEstimatePrice(result)}`);
    lines.push("");
    lines.push(`${t("estimate.visiting.sides")}: ${t(visiting.bothSides ? "estimate.visiting.sides.both" : "estimate.visiting.sides.one")}`);
    lines.push(`${t("estimate.visiting.colors")}: ${t(`estimate.visiting.colors.${visiting.colors}`)}`);
    lines.push(`${t("estimate.visiting.matt")}: ${t(visiting.mattLamination ? "estimate.visiting.matt.on" : "estimate.visiting.matt.off")}`);
    lines.push(`${t("estimate.visiting.spot")}: ${t(visiting.spotUV ? "estimate.visiting.spot.on" : "estimate.visiting.spot.off")}`);
    lines.push(`${t("estimate.visiting.cutting")}: ${t(visiting.dyeCutting ? "estimate.visiting.cutting.dye" : "estimate.visiting.cutting.regular")}`);
    lines.push(t("estimate.paperNote"));
  } else if (product === "cash-memo" && memoQty) {
    lines.push(`${t("estimate.messenger.item")}: ${t("estimate.product.cashMemo")}`);
    lines.push(`${t("estimate.messenger.qty")}: ${memoQty.toLocaleString("en-BD")}`);
    lines.push(`${t("estimate.messenger.price")}: ${formatEstimatePrice(result)}`);
    lines.push("");
    lines.push(`${t("estimate.memo.size")}: ${t(memo.size === "large" ? "estimate.memo.size.large" : "estimate.memo.size.small")}`);
    lines.push(`${t("estimate.memo.colors")}: ${t(`estimate.memo.colors.${memo.colors}`)}`);
    lines.push(`${t("estimate.memo.binding")}: ${t(memo.binding === "pad" ? "estimate.memo.binding.pad" : "estimate.memo.binding.memo")}`);
  } else if (product === "round-sticker" && sticker.qty) {
    lines.push(`${t("estimate.messenger.item")}: ${t("estimate.product.roundSticker")}`);
    lines.push(`${t("estimate.sticker.size")}: ${t("estimate.sticker.size.2")}`);
    lines.push(`${t("estimate.messenger.qty")}: ${sticker.qty.toLocaleString("en-BD")}`);
    lines.push(`${t("estimate.messenger.price")}: ${formatEstimatePrice(result)}`);
  }

  return lines.join("\n");
}

function PricePanel({
  result,
  messengerUrl,
  product,
  className,
}: {
  result: EstimateResult | null;
  messengerUrl: string | null;
  product: ProductId;
  className?: string;
}) {
  const { t } = useLanguage();

  return (
    <div className={cn("crop-marks p-3 lg:sticky lg:top-28", className)}>
      <aside
        id="estimate-result"
        data-surface="ink"
        aria-labelledby="estimate-result-label"
        className="w-full min-w-0 bg-surface-ink text-on-ink p-6 lg:p-8 border-t-4 border-primary"
      >
        <p id="estimate-result-label" className="text-sm font-semibold text-on-ink-muted">
          {t("estimate.result.total")}
        </p>

        {result ? (
          <div className="mt-3 min-w-0">
            <div aria-live="polite">
              {result.minPrice === result.maxPrice ? (
                <p className="font-display text-price tabular-nums">
                  ৳ {formatPrice(result.minPrice)}
                </p>
              ) : (
                <div className="flex flex-col gap-1">
                  <p className="font-display text-price tabular-nums">
                    ৳ {formatPrice(result.minPrice)}
                  </p>
                  <p className="text-sm text-on-ink-muted">{t("estimate.result.rangeTo")}</p>
                  <p className="font-display text-price tabular-nums">
                    ৳ {formatPrice(result.maxPrice)}
                  </p>
                </div>
              )}
            </div>
            <p className="mt-3 text-sm text-on-ink-muted break-words">
              {t("estimate.result.perUnit")}: ৳ {formatPrice(result.minUnitPrice)} – ৳{" "}
              {formatPrice(result.maxUnitPrice)}
            </p>
            <p className="mt-4 flex items-start gap-2 text-sm text-on-ink-muted">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-primary" aria-hidden />
              <span className="min-w-0">{t("estimate.result.disclaimer")}</span>
            </p>
            <a
              href={messengerUrl ?? facebookInsights.messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track-item={product}
              data-track-value={result.minPrice}
              className="mt-6 flex w-full min-h-12 min-w-0 items-center justify-center gap-2 bg-primary px-4 py-3 text-base font-semibold text-primary-foreground hover:bg-primary-hover transition-colors duration-150 text-center"
            >
              <MessageCircle className="h-[18px] w-[18px] shrink-0" aria-hidden />
              <span className="min-w-0">{t("estimate.ctaShort")}</span>
            </a>
            <p className="mt-4 text-sm text-on-ink-muted">{t("estimate.trustNote")}</p>
          </div>
        ) : (
          <div className="mt-4 flex flex-col items-center text-center py-4 sm:py-6 min-w-0">
            <Calculator className="h-8 w-8 text-on-ink/40 mb-3" strokeWidth={1.5} aria-hidden />
            <p className="text-base text-on-ink-muted px-2">{t("estimate.selectQty")}</p>
          </div>
        )}
      </aside>
    </div>
  );
}

/** Read-only mobile mirror of the panel total, shown right under the quantity tiles */
function MobileLiveTotal({ result }: { result: EstimateResult | null }) {
  const { t } = useLanguage();
  return (
    <div className="lg:hidden mt-5 border-t border-border pt-3">
      <p aria-live="polite" className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-semibold text-ink-2">{t("estimate.result.total")}</span>
        {result ? (
          <span className="font-display text-2xl font-semibold tabular-nums text-foreground text-right">
            ৳ {formatPrice(result.minPrice)}
            {result.maxPrice !== result.minPrice && <> –৳{formatPrice(result.maxPrice)}</>}
          </span>
        ) : (
          <span className="text-sm text-muted-foreground text-right">{t("estimate.selectQty")}</span>
        )}
      </p>
      {result && (
        <a
          href="#estimate-result"
          className="mt-1 inline-flex min-h-11 items-center text-sm font-semibold text-primary-strong underline underline-offset-4"
        >
          {t("estimate.seeOrder")}
        </a>
      )}
    </div>
  );
}

export function PriceEstimator() {
  const { t } = useLanguage();
  const [product, setProduct] = useState<ProductId>("visiting-card");
  const [visiting, setVisiting] = useState(DEFAULT_VISITING);
  const [memo, setMemo] = useState(DEFAULT_MEMO);
  const [sticker, setSticker] = useState(DEFAULT_STICKER);
  const productChangeRef = useRef<(id: ProductId) => void>(() => {});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const parsed = parseEstimateQuery(window.location.search);
    if (parsed.product) {
      setProduct(parsed.product);
      trackEvent("estimate_link_open", { product: parsed.product });
    }
    if (parsed.visiting) {
      setVisiting((s) => ({
        ...s,
        ...parsed.visiting,
      }));
    }
    if (parsed.memo) {
      setMemo((s) => ({
        ...s,
        ...parsed.memo,
      }));
    }
    if (parsed.sticker) {
      setSticker((s) => ({
        ...s,
        ...parsed.sticker,
      }));
    }
    // A "Shop by need" tap that happened before this (dynamic) section mounted
    const pending = consumePendingEstimateProduct();
    if (pending) productChangeRef.current(pending);
  }, []);

  const handleProductChange = (id: ProductId) => {
    if (id !== product) trackEvent("estimate_product_select", { product: id });
    setProduct(id);
    setVisiting(DEFAULT_VISITING);
    setMemo(DEFAULT_MEMO);
    setSticker(DEFAULT_STICKER);
  };

  // Shop-by-need preselect: keep the latest handler in a ref (so `product` is never
  // stale) and register the window listener once.
  productChangeRef.current = handleProductChange;
  useEffect(() => {
    const onSelect = (event: Event) => {
      const detail = (event as CustomEvent<unknown>).detail;
      consumePendingEstimateProduct();
      if (isEstimateProductId(detail)) productChangeRef.current(detail);
    };
    window.addEventListener(ESTIMATE_PRODUCT_EVENT, onSelect);
    return () => window.removeEventListener(ESTIMATE_PRODUCT_EVENT, onSelect);
  }, []);

  const visitingQty = useMemo(() => resolveVisitingQty(visiting), [visiting]);
  const memoQty = useMemo(() => resolveMemoQty(memo), [memo]);

  const result = useMemo(() => {
    if (product === "visiting-card") {
      return calculateVisitingCard({
        qty: visitingQty,
        bothSides: visiting.bothSides,
        colors: visiting.colors,
        mattLamination: visiting.mattLamination,
        spotUV: visiting.spotUV,
        dyeCutting: visiting.dyeCutting,
      });
    }
    if (product === "cash-memo") {
      return calculateOffsetMemo({
        qty: memoQty,
        size: memo.size,
        colors: memo.colors,
        binding: memo.binding,
      });
    }
    return calculateRoundSticker("2", sticker.qty);
  }, [product, visiting, visitingQty, memo, memoQty, sticker]);


  const messengerUrl = useMemo(() => {
    if (!result) return null;
    const message = buildEstimateMessengerMessage({
      t,
      product,
      result,
      visitingQty,
      visiting,
      memoQty,
      memo,
      sticker,
    });
    return getMessengerUrlWithText(message);
  }, [t, product, result, visitingQty, visiting, memoQty, memo, sticker]);

  // Only report estimates the visitor built themselves (not defaults or a shared link).
  const interactedRef = useRef(false);
  const markInteracted = () => {
    interactedRef.current = true;
  };

  const estimateQty =
    product === "visiting-card" ? visitingQty : product === "cash-memo" ? memoQty : sticker.qty;
  const estimateConfig =
    product === "visiting-card"
      ? [
          visiting.bothSides ? "both_sides" : "one_side",
          `${visiting.colors}_color`,
          visiting.mattLamination && "matt_lamination",
          visiting.spotUV && "spot_uv",
          visiting.dyeCutting && "dye_cutting",
        ]
          .filter(Boolean)
          .join(",")
      : product === "cash-memo"
        ? [memo.size, memo.binding, `${memo.colors}_color`].join(",")
        : "2in_round";

  // Debounced so tapping through options sends one event, not ten.
  useEffect(() => {
    if (!interactedRef.current || !result || !estimateQty) return;
    const timer = window.setTimeout(() => {
      trackEvent("estimate_update", {
        product,
        qty: estimateQty,
        config: estimateConfig,
        value: result.minPrice,
        value_max: result.maxPrice,
        currency: "BDT",
      });
    }, 1500);
    return () => window.clearTimeout(timer);
  }, [product, estimateQty, estimateConfig, result]);

  return (
    <section
      id="estimate"
      aria-labelledby="estimate-heading"
      className="px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
      onClickCapture={markInteracted}
      onChangeCapture={markInteracted}
    >
      <div className="max-w-[75rem] mx-auto w-full">
        <SectionHeader
          id="estimate-heading"
          number={2}
          eyebrow={t("estimate.eyebrow")}
          title={t("estimate.title")}
          lead={t("estimate.subtitle")}
        >
          <p
            role="note"
            className="mt-4 flex gap-2 text-sm text-ink-2 border-l-2 border-primary pl-3 max-w-[60ch]"
          >
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-primary-strong" aria-hidden />
            <span>{t("estimate.disclaimer")}</span>
          </p>
        </SectionHeader>

        <div className="mt-10 grid lg:grid-cols-12 gap-6 lg:gap-8 items-start min-w-0">
          <div className="lg:col-span-8 min-w-0 bg-card border border-border shadow-paper">
            {/* 01 — product */}
            <FieldGroup number={1} label={t("estimate.step1")}>
              <div role="group" aria-label={t("estimate.step1")} className="grid grid-cols-3 gap-2">
                {PRODUCT_PILLS.map((p) =>
                  p.disabled ? null : (
                    <button
                      key={p.id}
                      type="button"
                      aria-pressed={product === p.id}
                      onClick={() => handleProductChange(p.id)}
                      className={cn(
                        "min-h-12 px-2 text-sm sm:text-base font-semibold border leading-snug transition-colors duration-150 motion-reduce:transition-none",
                        product === p.id
                          ? "bg-foreground text-background border-foreground"
                          : "bg-background border-input text-foreground hover:border-foreground"
                      )}
                    >
                      {t(p.labelKey)}
                    </button>
                  )
                )}
              </div>
              {PRODUCT_PILLS.filter((p) => p.disabled).map((p) => (
                <p key={p.id} className="mt-3 text-sm text-muted-foreground">
                  {t("estimate.comingSoon")} ·{" "}
                  <a
                    href={getMessengerUrlWithText(t("estimate.comingSoonMessenger"))}
                    data-track-item={`notify_${p.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-strong font-semibold underline underline-offset-4 min-h-11 inline-flex items-center"
                  >
                    {t("estimate.comingSoonNotify")}
                  </a>
                </p>
              ))}
            </FieldGroup>

            {/* 02 — quantity (+ mobile live total) */}
            <FieldGroup number={2} label={t("estimate.step2")}>
              {product === "visiting-card" ? (
                <VisitingQtySelector
                  qtyMode={visiting.qtyMode}
                  presetQty={visiting.presetQty}
                  customQty={visiting.customQty}
                  onPresetSelect={(qty) =>
                    setVisiting((s) => ({ ...s, qtyMode: "preset", presetQty: qty }))
                  }
                  onCustomSelect={() =>
                    setVisiting((s) => ({ ...s, qtyMode: "custom", presetQty: null }))
                  }
                  onCustomQtyChange={(customQty) =>
                    setVisiting((s) => ({ ...s, qtyMode: "custom", customQty }))
                  }
                />
              ) : product === "cash-memo" ? (
                <MemoQtySelector
                  qtyMode={memo.qtyMode}
                  presetQty={memo.presetQty}
                  customQty={memo.customQty}
                  onPresetSelect={(qty) =>
                    setMemo((s) => ({ ...s, qtyMode: "preset", presetQty: qty }))
                  }
                  onCustomSelect={() =>
                    setMemo((s) => ({ ...s, qtyMode: "custom", presetQty: null }))
                  }
                  onCustomQtyChange={(customQty) =>
                    setMemo((s) => ({ ...s, qtyMode: "custom", customQty }))
                  }
                />
              ) : (
                <RoundStickerQty qty={sticker.qty} onQtyChange={(qty) => setSticker({ qty })} />
              )}
              <MobileLiveTotal result={result} />
            </FieldGroup>

            {/* 03 — options */}
            <FieldGroup number={3} label={t("estimate.options")}>
              {product === "visiting-card" ? (
                <div className="space-y-5">
                  <CompactToggle
                    label={t("estimate.visiting.sides")}
                    value={visiting.bothSides}
                    onChange={(bothSides) => setVisiting((s) => ({ ...s, bothSides }))}
                    options={[
                      { value: false, label: t("estimate.visiting.sides.one") },
                      { value: true, label: t("estimate.visiting.sides.both") },
                    ]}
                  />
                  <CompactToggle
                    label={t("estimate.visiting.colors")}
                    value={String(visiting.colors)}
                    onChange={(c) =>
                      setVisiting((s) => ({ ...s, colors: Number(c) as ColorCount }))
                    }
                    options={COLOR_OPTIONS.map((c) => ({
                      value: String(c),
                      label: t(`estimate.visiting.colors.${c}`),
                    }))}
                  />

                  <details className="group border-t border-border pt-2">
                    <summary className="flex min-h-11 cursor-pointer items-center gap-2 text-sm font-semibold text-foreground list-none [&::-webkit-details-marker]:hidden">
                      <ChevronDown
                        className="h-4 w-4 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                        aria-hidden
                      />
                      {t("estimate.moreOptions")}
                    </summary>
                    <div className="mt-3 space-y-5">
                      <CompactToggle
                        label={t("estimate.visiting.matt")}
                        value={visiting.mattLamination}
                        onChange={(v) => setVisiting((s) => ({ ...s, mattLamination: v }))}
                        options={[
                          { value: false, label: t("estimate.visiting.matt.off") },
                          { value: true, label: t("estimate.visiting.matt.on") },
                        ]}
                      />
                      <CompactToggle
                        label={t("estimate.visiting.spot")}
                        value={visiting.spotUV}
                        onChange={(v) => setVisiting((s) => ({ ...s, spotUV: v }))}
                        options={[
                          { value: false, label: t("estimate.visiting.spot.off") },
                          { value: true, label: t("estimate.visiting.spot.on") },
                        ]}
                      />
                      <CompactToggle
                        label={t("estimate.visiting.cutting")}
                        value={visiting.dyeCutting}
                        onChange={(v) => setVisiting((s) => ({ ...s, dyeCutting: v }))}
                        options={[
                          { value: false, label: t("estimate.visiting.cutting.regular") },
                          { value: true, label: t("estimate.visiting.cutting.dye") },
                        ]}
                      />
                    </div>
                  </details>

                  <p className="text-sm text-muted-foreground">{t("estimate.paperNote")}</p>
                </div>
              ) : product === "cash-memo" ? (
                <div className="space-y-5">
                  <CompactToggle
                    label={t("estimate.memo.size")}
                    value={memo.size}
                    onChange={(size) => setMemo((s) => ({ ...s, size }))}
                    options={[
                      { value: "large", label: t("estimate.memo.size.large") },
                      { value: "small", label: t("estimate.memo.size.small") },
                    ]}
                  />
                  <CompactToggle
                    label={t("estimate.memo.binding")}
                    value={memo.binding}
                    onChange={(binding) => setMemo((s) => ({ ...s, binding }))}
                    options={[
                      { value: "pad", label: t("estimate.memo.binding.pad") },
                      { value: "memo", label: t("estimate.memo.binding.memo") },
                    ]}
                  />
                  <CompactToggle
                    label={t("estimate.memo.colors")}
                    value={String(memo.colors)}
                    onChange={(c) => setMemo((s) => ({ ...s, colors: Number(c) as ColorCount }))}
                    options={COLOR_OPTIONS.map((c) => ({
                      value: String(c),
                      label: t(`estimate.memo.colors.${c}`),
                    }))}
                  />
                </div>
              ) : (
                <RoundStickerSize />
              )}
            </FieldGroup>
          </div>

          <PricePanel
            result={result}
            messengerUrl={messengerUrl}
            product={product}
            className="lg:col-span-4"
          />
        </div>
      </div>
    </section>
  );
}
