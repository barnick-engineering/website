export type ColorCount = 1 | 2 | 4;

export type EstimateResult = {
  minPrice: number;
  maxPrice: number;
  minUnitPrice: number;
  maxUnitPrice: number;
};

export type VisitingCardInput = {
  qty: number | null;
  bothSides: boolean;
  colors: ColorCount;
  mattLamination: boolean;
  spotUV: boolean;
  dyeCutting: boolean;
};

export type OffsetMemoInput = {
  qty: number | null;
  size: "large" | "small";
  colors: ColorCount;
  binding: "pad" | "memo";
};

const VISITING_CARD = {
  cardsPerSheet: 80,
  sheetUnitPrice: 12,
  plateCostPerColor: 120,
  printingCostPerColor: 300,
  mattRate: 0.006,
  mattWidth: 11,
  mattHeight: 14,
  mattMin: 300,
  spotRate: 0.007,
  spotWidth: 11,
  spotHeight: 14,
  spotMin: 300,
  filmCost: 350,
  cuttingRate: { regular: 25, dye: 50 },
  packagingRate: 5,
  wastageByColors: { 1: 5, 2: 10, 4: 20 } as const,
};

const OFFSET_MEMO = {
  perSheetPrice: 7,
  plateCostPerColor: 120,
  printingCostPerColor: 300,
  piecesPerSheet: { large: 8, small: 16 },
  bindingRate: { pad: 15, memo: 50 },
  packagingCost: 50,
};

function toRange(total: number, qty: number): EstimateResult {
  const minPrice = Math.round(total * 0.9);
  const maxPrice = Math.round(total * 1.1);
  return {
    minPrice,
    maxPrice,
    minUnitPrice: Math.round(minPrice / qty),
    maxUnitPrice: Math.round(maxPrice / qty),
  };
}

export function calculateVisitingCard(input: VisitingCardInput): EstimateResult | null {
  if (input.qty === null) return null;

  const { qty, bothSides, colors, mattLamination, spotUV, dyeCutting } = input;
  const c = VISITING_CARD;

  const sheetsRequired = Math.ceil(qty / c.cardsPerSheet);
  const wastageSheets = Math.ceil(c.wastageByColors[colors] / 4);
  const totalSheets = sheetsRequired + wastageSheets;
  const sheetCost = totalSheets * c.sheetUnitPrice;
  const plateCost = colors * c.plateCostPerColor;
  const printingCost = colors * c.printingCostPerColor;

  const sideMultiplier = bothSides ? 2 : 1;
  const mattCost = mattLamination
    ? Math.max(
        c.mattWidth * c.mattHeight * c.mattRate * sheetsRequired * sideMultiplier,
        c.mattMin
      )
    : 0;
  const spotCost = spotUV
    ? Math.max(
        c.spotWidth * c.spotHeight * c.spotRate * sheetsRequired * sideMultiplier,
        c.spotMin
      )
    : 0;
  const filmCost = spotUV ? c.filmCost : 0;
  const cuttingCost = (qty / 1000) * (dyeCutting ? c.cuttingRate.dye : c.cuttingRate.regular);
  const packagingCost = (qty / 100) * c.packagingRate;

  const total =
    sheetCost +
    plateCost +
    printingCost +
    mattCost +
    spotCost +
    filmCost +
    cuttingCost +
    packagingCost;

  return toRange(total, qty);
}

export function calculateOffsetMemo(input: OffsetMemoInput): EstimateResult | null {
  if (input.qty === null) return null;

  const { qty, size, colors, binding } = input;
  const c = OFFSET_MEMO;

  const piecesPerSheet = c.piecesPerSheet[size];
  const totalSheets = Math.ceil(qty / piecesPerSheet);
  const sheetCost = totalSheets * c.perSheetPrice;
  const plateCost = colors * c.plateCostPerColor;
  const printingCost = colors * c.printingCostPerColor;
  const bindingCost = Math.ceil(qty / 100) * c.bindingRate[binding];
  const packagingCost = c.packagingCost;

  const total = sheetCost + plateCost + printingCost + bindingCost + packagingCost;

  return toRange(total, qty);
}
