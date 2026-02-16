"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "./breadcrumb";
import { CartItem } from "./cart-item";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { useLanguage } from "@/contexts/language-context";
import { ShoppingBag } from "lucide-react";

export const CartPageContent = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getVAT = useCartStore((state) => state.getVAT);
  const getTotal = useCartStore((state) => state.getTotal);

  const subtotal = getSubtotal();
  const vat = getVAT();
  const total = getTotal();

  const breadcrumbItems = [
    { label: t("breadcrumb.home"), href: "/" },
    { label: t("breadcrumb.shop"), href: "/shop" },
    { label: t("cart.title") },
  ];

  if (items.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 xl:px-0 py-8 xs:py-12">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center justify-center py-20">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mb-6" />
          <h2 className="text-2xl font-bold mb-2">{t("cart.empty")}</h2>
          <p className="text-muted-foreground mb-8">{t("cart.emptyDescription")}</p>
          <Button asChild>
            <Link href="/shop">{t("cart.continueShopping")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 xl:px-0 py-8 xs:py-12">
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="text-3xl xs:text-4xl font-bold mb-8">{t("cart.title")}</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 border rounded-xl p-6 bg-background space-y-4">
            <h2 className="text-xl font-bold">{t("checkout.orderSummary")}</h2>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                <span className="font-semibold">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("cart.vat")}</span>
                <span className="font-semibold">৳{vat.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg">
                <span className="font-bold">{t("cart.total")}</span>
                <span className="font-bold">৳{total.toLocaleString()}</span>
              </div>
            </div>
            <Button
              size="lg"
              className="w-full"
              onClick={() => router.push("/checkout")}
            >
              {t("cart.proceedToCheckout")}
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/shop">{t("cart.continueShopping")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
