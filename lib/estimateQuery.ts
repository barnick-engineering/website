import {
  STICKER_2X2_PRESET_QUANTITIES,
  VISITING_PRESET_QUANTITIES,
  type ColorCount,
} from "@/lib/calculateEstimate";

export type EstimateProductId = "visiting-card" | "cash-memo" | "round-sticker";

export type VisitingQtyMode = "preset" | "custom";
export type MemoQtyMode = "preset" | "custom";

export type EstimateQueryState = {
  product: EstimateProductId;
  visiting: {
    qtyMode: VisitingQtyMode;
    presetQty: number | null;
    customQty: string;
    bothSides: boolean;
    colors: ColorCount;
  };
  memo: {
    qtyMode: MemoQtyMode;
    presetQty: number | null;
    customQty: string;
    colors: ColorCount;
  };
  sticker: {
    qty: number | null;
  };
};

function parsePositiveInt(value: string | null): number | null {
  if (!value) return null;
  const n = parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function parseColors(value: string | null): ColorCount | null {
  if (value === "1" || value === "2" || value === "4") {
    return Number(value) as ColorCount;
  }
  return null;
}

function parseProduct(value: string | null): EstimateProductId | null {
  if (value === "visiting-card" || value === "cash-memo" || value === "round-sticker") {
    return value;
  }
  return null;
}

function isVisitingPreset(qty: number): boolean {
  return (VISITING_PRESET_QUANTITIES as readonly number[]).includes(qty);
}

function isMemoPreset(qty: number): boolean {
  return qty === 500 || qty === 1000 || qty === 2000 || qty === 5000;
}

function isStickerPreset(qty: number): boolean {
  return (STICKER_2X2_PRESET_QUANTITIES as readonly number[]).includes(qty);
}

/** Reads /?qty=1000&sides=2&colors=4 (and optional product=) for social deep links. */
export function parseEstimateQuery(search: string): Partial<EstimateQueryState> {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const result: Partial<EstimateQueryState> = {};

  const product = parseProduct(params.get("product"));
  if (product) result.product = product;

  const qty = parsePositiveInt(params.get("qty"));
  const colors = parseColors(params.get("colors"));
  const sides = params.get("sides");

  const visiting: EstimateQueryState["visiting"] = {
    qtyMode: "preset",
    presetQty: null,
    customQty: "",
    bothSides: sides === "2",
    colors: colors ?? 1,
  };

  if (qty !== null) {
    if (isVisitingPreset(qty)) {
      visiting.qtyMode = "preset";
      visiting.presetQty = qty;
    } else {
      visiting.qtyMode = "custom";
      visiting.customQty = String(qty);
    }
  }

  const hasVisitingParams = qty !== null || colors !== null || sides === "1" || sides === "2";
  if (hasVisitingParams) result.visiting = visiting;

  if (qty !== null) {
    result.memo = {
      qtyMode: isMemoPreset(qty) ? "preset" : "custom",
      presetQty: isMemoPreset(qty) ? qty : null,
      customQty: isMemoPreset(qty) ? "" : String(qty),
      colors: colors ?? 1,
    };
    result.sticker = {
      qty: isStickerPreset(qty) ? qty : null,
    };
  } else if (colors !== null) {
    result.memo = {
      qtyMode: "preset",
      presetQty: null,
      customQty: "",
      colors,
    };
  }

  return result;
}
