"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Calculator, ChevronDown, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { facebookInsights } from "@/data/insights";
import {
  calculateOffsetMemo,
  calculateVisitingCard,
  type ColorCount,
  type EstimateResult,
} from "@/lib/calculateEstimate";
import { cn } from "@/lib/utils";

type ProductId = "visiting-card" | "offset-memo";

const ACTIVE_PRODUCTS: { id: ProductId; labelKey: string }[] = [
  { id: "visiting-card", labelKey: "estimate.product.visitingCard" },
  { id: "offset-memo", labelKey: "estimate.product.offsetMemo" },
];

const VISITING_QTY_OPTIONS = [100, 250, 500, 1000, 2000, 5000] as const;
const MEMO_QTY_OPTIONS = [500, 1000, 2000, 5000] as const;
const COLOR_OPTIONS: ColorCount[] = [1, 2, 4];

const DEFAULT_VISITING = {
  qty: null as number | null,
  bothSides: false,
  colors: 1 as ColorCount,
  mattLamination: false,
  spotUV: false,
  dyeCutting: false,
};

const DEFAULT_MEMO = {
  qty: null as number | null,
  size: "large" as "large" | "small",
  colors: 1 as ColorCount,
  binding: "pad" as "pad" | "memo",
};

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

function QtyPicker<T extends number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T | null;
  onChange: (v: T) => void;
}) {
  const { language } = useLanguage();

  return (
    <div>
      <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
      <div className="grid grid-cols-3 xs:grid-cols-6 gap-1.5 sm:gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "min-h-10 rounded-lg text-sm font-semibold transition-colors",
              value === opt
                ? "bg-foreground text-background ring-2 ring-foreground ring-offset-2 ring-offset-background"
                : "border border-foreground/20 bg-background hover:bg-muted"
            )}
          >
            {opt.toLocaleString(language === "bn" ? "bn-BD" : "en-BD")}
          </button>
        ))}
      </div>
    </div>
  );
}

function PricePanel({
  result,
  className,
}: {
  result: EstimateResult | null;
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
          <div className="flex flex-col gap-0.5">
            <p className="text-xl sm:text-2xl font-bold tabular-nums leading-none">
              ৳ {formatPrice(result.minPrice)}
            </p>
            <p className="text-xs text-background/60 py-0.5">{t("estimate.result.rangeTo")}</p>
            <p className="text-xl sm:text-2xl font-bold tabular-nums leading-none">
              ৳ {formatPrice(result.maxPrice)}
            </p>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-background/80 break-words">
            {t("estimate.result.perUnit")}: ৳ {formatPrice(result.minUnitPrice)} – ৳{" "}
            {formatPrice(result.maxUnitPrice)}
          </p>
          <p className="mt-3 flex items-start gap-1.5 text-[11px] text-amber-200 leading-snug">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" aria-hidden />
            <span className="min-w-0">{t("estimate.result.disclaimer")}</span>
          </p>
          <a
            href={facebookInsights.messengerUrl}
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

  const result = useMemo(() => {
    if (product === "visiting-card") return calculateVisitingCard(visiting);
    return calculateOffsetMemo(memo);
  }, [product, visiting, memo]);

  const hasQty = product === "visiting-card" ? visiting.qty !== null : memo.qty !== null;
  const stepNums = language === "bn" ? ["১", "২", "৩"] : ["1", "2", "3"];

  return (
    <section id="estimate" className="px-4 xs:px-6 py-8 sm:py-10 border-y bg-muted/20">
      <div className="max-w-screen-xl mx-auto w-full">
        {/* Header — compact */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold">{t("estimate.title")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("estimate.subtitle")}</p>
        </div>

        <p
          className="mt-4 mx-auto max-w-2xl flex items-center justify-center gap-1.5 text-center text-[11px] sm:text-xs text-amber-800 dark:text-amber-200"
          role="note"
        >
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {t("estimate.disclaimer")}
        </p>

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
          {ACTIVE_PRODUCTS.map((p) => (
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
          ))}
        </div>
        <p className="mt-1.5 text-[11px] text-muted-foreground">{t("estimate.comingSoonList")}</p>

        {/* Two-panel layout: options + always-visible price */}
        <div className="mt-5 grid lg:grid-cols-[1fr_minmax(240px,320px)] gap-4 lg:gap-5 items-start min-w-0">
          <PricePanel result={result} className="order-1 lg:order-2" />

          <div className="order-2 lg:order-1 rounded-xl border bg-background p-4 sm:p-5 space-y-4">
            {product === "visiting-card" ? (
              <>
                <QtyPicker
                  label={t("estimate.visiting.qty")}
                  options={VISITING_QTY_OPTIONS}
                  value={visiting.qty}
                  onChange={(qty) => setVisiting((s) => ({ ...s, qty }))}
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
                <QtyPicker
                  label={t("estimate.memo.qty")}
                  options={MEMO_QTY_OPTIONS}
                  value={memo.qty}
                  onChange={(qty) => setMemo((s) => ({ ...s, qty }))}
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
        </div>
      </div>
    </section>
  );
}
