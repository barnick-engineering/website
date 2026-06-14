"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Calculator, ChevronDown, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { facebookInsights } from "@/data/insights";
import { getMessengerUrlWithText } from "@/lib/order";
import { Input } from "@/components/ui/input";
import {
  calculateOffsetMemo,
  calculateVisitingCard,
  VISITING_PRESET_QUANTITIES,
  type ColorCount,
  type EstimateResult,
} from "@/lib/calculateEstimate";
import { cn } from "@/lib/utils";

type ProductId = "visiting-card" | "cash-memo";

type ProductPill =
  | { id: ProductId; labelKey: string; disabled?: false }
  | { id: "coming-soon"; labelKey: string; disabled: true };

const PRODUCT_PILLS: ProductPill[] = [
  { id: "visiting-card", labelKey: "estimate.product.visitingCard" },
  { id: "cash-memo", labelKey: "estimate.product.cashMemo" },
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

function formatPrice(n: number): string {
  return n.toLocaleString("en-BD");
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
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
      <span className="text-sm font-medium text-foreground shrink-0">{label}</span>
      <div className="inline-flex rounded-full border border-foreground/15 bg-muted/30 p-0.5 self-start sm:self-auto">
        {options.map((opt) => (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "min-h-9 rounded-full px-3 text-xs sm:text-sm font-medium transition-colors",
              value === opt.value
                ? "bg-foreground text-background"
                : "text-foreground hover:bg-muted/80"
            )}
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
      <p className="text-sm font-semibold text-foreground mb-2">{t("estimate.visiting.qty")}</p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 sm:gap-2">
        {VISITING_PRESET_QUANTITIES.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onPresetSelect(opt)}
            className={cn(
              "min-h-10 text-sm font-semibold transition-colors",
              qtyMode === "preset" && presetQty === opt
                ? "bg-foreground text-background ring-2 ring-foreground ring-offset-2 ring-offset-background"
                : "border border-foreground/20 bg-background hover:bg-muted"
            )}
          >
            {opt.toLocaleString(locale)}
          </button>
        ))}
        <button
          type="button"
          onClick={onCustomSelect}
          className={cn(
            "min-h-10 text-sm font-semibold transition-colors",
            qtyMode === "custom"
              ? "bg-foreground text-background ring-2 ring-foreground ring-offset-2 ring-offset-background"
              : "border border-foreground/20 bg-background hover:bg-muted"
          )}
        >
          {t("estimate.visiting.custom")}
        </button>
      </div>

      {qtyMode === "custom" && (
        <div className="mt-3">
          <label className="text-sm font-medium text-foreground" htmlFor="visiting-custom-qty">
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
            className="mt-1.5 min-h-11 text-base"
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
      <p className="text-sm font-semibold text-foreground mb-2">{t("estimate.memo.qty")}</p>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-2">
        {MEMO_QTY_OPTIONS.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onPresetSelect(opt)}
            className={cn(
              "min-h-10 text-sm font-semibold transition-colors",
              qtyMode === "preset" && presetQty === opt
                ? "bg-foreground text-background ring-2 ring-foreground ring-offset-2 ring-offset-background"
                : "border border-foreground/20 bg-background hover:bg-muted"
            )}
          >
            {opt.toLocaleString(locale)}
          </button>
        ))}
        <button
          type="button"
          onClick={onCustomSelect}
          className={cn(
            "min-h-10 text-sm font-semibold transition-colors",
            qtyMode === "custom"
              ? "bg-foreground text-background ring-2 ring-foreground ring-offset-2 ring-offset-background"
              : "border border-foreground/20 bg-background hover:bg-muted"
          )}
        >
          {t("estimate.memo.custom")}
        </button>
      </div>

      {qtyMode === "custom" && (
        <div className="mt-3">
          <label className="text-sm font-medium text-foreground" htmlFor="memo-custom-qty">
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
            className="mt-1.5 min-h-11 text-base"
          />
        </div>
      )}
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
}: {
  t: (key: string) => string;
  product: ProductId;
  result: EstimateResult;
  visitingQty: number | null;
  visiting: typeof DEFAULT_VISITING;
  memoQty: number | null;
  memo: typeof DEFAULT_MEMO;
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
  } else if (memoQty) {
    lines.push(`${t("estimate.messenger.item")}: ${t("estimate.product.cashMemo")}`);
    lines.push(`${t("estimate.messenger.qty")}: ${memoQty.toLocaleString("en-BD")}`);
    lines.push(`${t("estimate.messenger.price")}: ${formatEstimatePrice(result)}`);
    lines.push("");
    lines.push(`${t("estimate.memo.size")}: ${t(memo.size === "large" ? "estimate.memo.size.large" : "estimate.memo.size.small")}`);
    lines.push(`${t("estimate.memo.colors")}: ${t(`estimate.memo.colors.${memo.colors}`)}`);
    lines.push(`${t("estimate.memo.binding")}: ${t(memo.binding === "pad" ? "estimate.memo.binding.pad" : "estimate.memo.binding.memo")}`);
  }

  return lines.join("\n");
}

function PricePanel({
  result,
  messengerUrl,
  className,
}: {
  result: EstimateResult | null;
  messengerUrl: string | null;
  className?: string;
}) {
  const { t } = useLanguage();

  return (
    <aside
      className={cn(
        "w-full min-w-0 overflow-hidden rounded-2xl border-2 border-foreground/25 bg-foreground text-background p-4 sm:p-5 lg:sticky lg:top-24",
        className
      )}
    >
      <p className="text-xs font-medium text-background/70">
        {t("estimate.result.total")}
      </p>

      {result ? (
        <div className="mt-2 min-w-0">
          {result.minPrice === result.maxPrice ? (
            <p className="text-xl sm:text-2xl font-bold tabular-nums leading-none">
              ৳ {formatPrice(result.minPrice)}
            </p>
          ) : (
            <div className="flex flex-col gap-0.5">
              <p className="text-xl sm:text-2xl font-bold tabular-nums leading-none">
                ৳ {formatPrice(result.minPrice)}
              </p>
              <p className="text-xs text-background/60 py-0.5">{t("estimate.result.rangeTo")}</p>
              <p className="text-xl sm:text-2xl font-bold tabular-nums leading-none">
                ৳ {formatPrice(result.maxPrice)}
              </p>
            </div>
          )}
          <p className="mt-2 text-xs sm:text-sm text-background/80 break-words">
            {t("estimate.result.perUnit")}: ৳ {formatPrice(result.minUnitPrice)} – ৳{" "}
            {formatPrice(result.maxUnitPrice)}
          </p>
          <p className="mt-3 flex items-start gap-1.5 text-[11px] text-background/50 leading-snug">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5 opacity-70" aria-hidden />
            <span className="min-w-0">{t("estimate.result.disclaimer")}</span>
          </p>
          <a
            href={messengerUrl ?? facebookInsights.messengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full max-w-full min-w-0 items-center justify-center gap-2 rounded-full bg-background px-4 py-3 text-sm font-medium text-foreground hover:bg-background/90 transition-colors text-center leading-snug"
          >
            <MessageCircle className="h-4 w-4 shrink-0" />
            <span className="min-w-0">{t("estimate.ctaShort")}</span>
          </a>
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center text-center py-4 sm:py-6 min-w-0">
          <Calculator className="h-8 w-8 text-background/40 mb-3" strokeWidth={1.5} />
          <p className="text-sm text-background/70 leading-relaxed px-2">
            {t("estimate.selectQty")}
          </p>
        </div>
      )}
    </aside>
  );
}

export function PriceEstimator() {
  const { t, language } = useLanguage();
  const [product, setProduct] = useState<ProductId>("visiting-card");
  const [visiting, setVisiting] = useState(DEFAULT_VISITING);
  const [memo, setMemo] = useState(DEFAULT_MEMO);

  const handleProductChange = (id: ProductId) => {
    setProduct(id);
    setVisiting(DEFAULT_VISITING);
    setMemo(DEFAULT_MEMO);
  };

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
    return calculateOffsetMemo({
      qty: memoQty,
      size: memo.size,
      colors: memo.colors,
      binding: memo.binding,
    });
  }, [product, visiting, visitingQty, memo, memoQty]);

  const hasQty = product === "visiting-card" ? visitingQty !== null : memoQty !== null;
  const stepNums = language === "bn" ? ["১", "২", "৩"] : ["1", "2", "3"];

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
    });
    return getMessengerUrlWithText(message);
  }, [t, product, result, visitingQty, visiting, memoQty, memo]);

  return (
    <section id="estimate" className="px-4 xs:px-6 py-8 sm:py-10 border-y bg-muted/20">
      <div className="max-w-screen-xl mx-auto w-full">
        {/* Header — compact */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold">{t("estimate.title")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("estimate.subtitle")}</p>
        </div>

        <div
          className="mt-4 mx-auto max-w-2xl flex items-start justify-center gap-2 text-left text-[11px] sm:text-xs border border-amber-600/20 bg-amber-500/10 px-3 py-2.5 text-amber-950/90 dark:border-amber-400/12 dark:bg-amber-400/6 dark:text-muted-foreground"
          role="note"
        >
          <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-700/80 dark:text-amber-400/40" aria-hidden />
          <span>{t("estimate.disclaimer")}</span>
        </div>

        {/* Simple 3-step hint */}
        <div className="mt-5 flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {stepNums[0]}. {t("estimate.step1")}
          </span>
          <span aria-hidden>→</span>
          <span className={cn(hasQty && "font-medium text-foreground")}>
            {stepNums[1]}. {t("estimate.step2")}
          </span>
          <span aria-hidden>→</span>
          <span className={cn(result && "font-medium text-foreground")}>
            {stepNums[2]}. {t("estimate.step3")}
          </span>
        </div>

        {/* Product pills — scrollable, scales to many items */}
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {PRODUCT_PILLS.map((p) =>
            p.disabled ? (
              <span
                key={p.id}
                className="shrink-0 min-h-10 rounded-full px-4 sm:px-5 text-sm font-semibold border border-dashed border-foreground/15 text-muted-foreground inline-flex items-center cursor-default"
              >
                {t(p.labelKey)}
              </span>
            ) : (
              <button
                key={p.id}
                type="button"
                onClick={() => handleProductChange(p.id)}
                className={cn(
                  "shrink-0 min-h-10 rounded-full px-4 sm:px-5 text-sm font-semibold transition-colors",
                  product === p.id
                    ? "bg-foreground text-background"
                    : "border border-foreground/20 bg-background hover:bg-muted"
                )}
              >
                {t(p.labelKey)}
              </button>
            )
          )}
        </div>

        {/* Options first on mobile; price panel after all inputs */}
        <div className="mt-5 grid lg:grid-cols-[1fr_minmax(240px,320px)] gap-4 lg:gap-5 items-start min-w-0">
          <div className="rounded-xl border bg-background p-4 sm:p-5 space-y-4">
            {product === "visiting-card" ? (
              <>
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

                <div className="grid sm:grid-cols-2 gap-3 pt-1 border-t border-border/60">
                  <CompactToggle
                    label={t("estimate.visiting.sides")}
                    value={visiting.bothSides}
                    onChange={(bothSides) => setVisiting((s) => ({ ...s, bothSides }))}
                    options={[
                      { value: false, label: t("estimate.visiting.sides.one") },
                      { value: true, label: t("estimate.visiting.sides.both") },
                    ]}
                  />
                  <div className="sm:col-span-2">
                    <p className="text-sm font-medium text-foreground mb-1.5">
                      {t("estimate.visiting.colors")}
                    </p>
                    <div className="inline-flex rounded-full border border-foreground/15 bg-muted/30 p-0.5">
                      {COLOR_OPTIONS.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setVisiting((s) => ({ ...s, colors: c }))}
                          className={cn(
                            "min-h-9 rounded-full px-3 text-xs sm:text-sm font-medium",
                            visiting.colors === c
                              ? "bg-foreground text-background"
                              : "text-foreground"
                          )}
                        >
                          {t(`estimate.visiting.colors.${c}`)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <details className="group border-t border-border/60 pt-3">
                  <summary className="flex cursor-pointer items-center gap-2 text-sm font-medium text-muted-foreground list-none [&::-webkit-details-marker]:hidden">
                    <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    {t("estimate.moreOptions")}
                  </summary>
                  <div className="mt-3 grid sm:grid-cols-2 gap-3">
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

                <p className="text-[11px] text-muted-foreground pt-1">{t("estimate.paperNote")}</p>
              </>
            ) : (
              <>
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
                <div className="grid sm:grid-cols-2 gap-3 pt-1 border-t border-border/60">
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
                  <div className="sm:col-span-2">
                    <p className="text-sm font-medium text-foreground mb-1.5">
                      {t("estimate.memo.colors")}
                    </p>
                    <div className="inline-flex rounded-full border border-foreground/15 bg-muted/30 p-0.5">
                      {COLOR_OPTIONS.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setMemo((s) => ({ ...s, colors: c }))}
                          className={cn(
                            "min-h-9 rounded-full px-3 text-xs sm:text-sm font-medium",
                            memo.colors === c
                              ? "bg-foreground text-background"
                              : "text-foreground"
                          )}
                        >
                          {t(`estimate.memo.colors.${c}`)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <PricePanel result={result} messengerUrl={messengerUrl} />
        </div>
      </div>
    </section>
  );
}
