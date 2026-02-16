"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/store/cart-store";
import { QuantitySelector } from "./quantity-selector";
import { useCartStore } from "@/store/cart-store";
import { useLanguage } from "@/contexts/language-context";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { t, language } = useLanguage();
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleQuantityChange = (quantity: number) => {
    updateQuantity(item.id, quantity);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-xl bg-background">
      <div className="relative w-full sm:w-24 h-24 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name[language]}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{item.name[language]}</h3>
          <div className="text-sm text-muted-foreground mt-1">
            <p>
              {t("product.size")}: {item.selectedOptions.size}
            </p>
            <p>
              {t("product.paperType")}: {item.selectedOptions.paperType}
            </p>
            <p>
              {t("product.finish")}: {item.selectedOptions.finish}
            </p>
            {item.selectedOptions.needDesignHelp && (
              <p className="text-primary">{t("product.needDesignHelp")}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <QuantitySelector
              value={item.quantity}
              onChange={handleQuantityChange}
              min={100}
            />
            <div className="text-right">
              <p className="font-semibold text-lg">
                ৳{item.totalPrice.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">
                ৳{item.price} per unit
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
