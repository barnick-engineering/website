/**
 * Lets other homepage sections (Shop by need) preselect a product in the price
 * estimator without a reload. The estimator is dynamically imported, so a tap
 * can happen before it has mounted: the pending value covers that race and is
 * consumed by the estimator's mount effect.
 */
export const ESTIMATE_PRODUCT_EVENT = "barnick:estimate-product";

export const ESTIMATE_PRODUCT_IDS = ["visiting-card", "cash-memo", "round-sticker"] as const;
export type EstimateProductId = (typeof ESTIMATE_PRODUCT_IDS)[number];

export function isEstimateProductId(value: unknown): value is EstimateProductId {
  return (
    typeof value === "string" &&
    (ESTIMATE_PRODUCT_IDS as readonly string[]).includes(value)
  );
}

let pendingProduct: EstimateProductId | null = null;

export function setPendingEstimateProduct(id: EstimateProductId) {
  pendingProduct = id;
}

/** Returns the pending product (if any) and clears it. */
export function consumePendingEstimateProduct(): EstimateProductId | null {
  const id = pendingProduct;
  pendingProduct = null;
  return id;
}

/** Ask the estimator to switch product (and remember it if it hasn't mounted yet). */
export function requestEstimateProduct(id: EstimateProductId) {
  setPendingEstimateProduct(id);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(ESTIMATE_PRODUCT_EVENT, { detail: id }));
  }
}
