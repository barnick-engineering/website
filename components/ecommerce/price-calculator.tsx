"use client";

import { Product } from "@/data/products";
import { useLanguage } from "@/contexts/language-context";
import { useMemo } from "react";

interface PriceCalculatorProps {
  product: Product;
  selectedSize: string;
  selectedPaperType: string;
  quantity: number;
}

export const calculatePrice = (
  basePrice: number,
  sizeMultiplier: number,
  paperMultiplier: number,
  quantity: number
): number => {
  // Calculate base price with multipliers
  let price = basePrice * sizeMultiplier * paperMultiplier;

  // Apply quantity discounts
  let discount = 0;
  if (quantity >= 1000) {
    discount = 0.1; // 10% discount
  } else if (quantity >= 500) {
    discount = 0.05; // 5% discount
  }

  price = price * (1 - discount);

  return Math.round(price);
};

export const PriceCalculator = ({
  product,
  selectedSize,
  selectedPaperType,
  quantity,
}: PriceCalculatorProps) => {
  const { t, language } = useLanguage();

  const calculatedPrice = useMemo(() => {
    const size = product.sizes.find(
      (s) => s.name[language] === selectedSize || s.name.bn === selectedSize || s.name.en === selectedSize
    );
    const paperType = product.paperTypes.find(
      (p) => p.name[language] === selectedPaperType || p.name.bn === selectedPaperType || p.name.en === selectedPaperType
    );

    if (!size || !paperType) {
      return product.basePrice;
    }

    return calculatePrice(
      product.basePrice,
      size.multiplier,
      paperType.multiplier,
      quantity
    );
  }, [product, selectedSize, selectedPaperType, quantity, language]);

  const totalPrice = calculatedPrice * quantity;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">{t("product.estimatedPrice")}:</span>
        <span className="text-2xl font-bold">৳{totalPrice.toLocaleString()}</span>
      </div>
      <p className="text-xs text-muted-foreground">
        {t("product.startingFrom")} ৳{calculatedPrice} per {quantity} pcs
      </p>
    </div>
  );
};
