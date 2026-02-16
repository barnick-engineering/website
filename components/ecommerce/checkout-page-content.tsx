"use client";

import { Breadcrumb } from "./breadcrumb";
import { CheckoutForm, CheckoutFormData } from "./checkout-form";
import { CartItem } from "./cart-item";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { useLanguage } from "@/contexts/language-context";

export const CheckoutPageContent = () => {
  const { t } = useLanguage();
  const items = useCartStore((state) => state.items);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getVAT = useCartStore((state) => state.getVAT);
  const getTotal = useCartStore((state) => state.getTotal);
  const clearCart = useCartStore((state) => state.clearCart);

  const subtotal = getSubtotal();
  const vat = getVAT();
  const total = getTotal();

  const breadcrumbItems = [
    { label: t("breadcrumb.home"), href: "/" },
    { label: t("breadcrumb.shop"), href: "/shop" },
    { label: t("cart.title"), href: "/cart" },
    { label: t("checkout.title") },
  ];

  const handleSubmit = (data: CheckoutFormData) => {
    console.log("Order submitted:", {
      ...data,
      items,
      subtotal,
      vat,
      total,
    });
    // In a real app, this would send to backend
    clearCart();
  };

  return (
    <div className="max-w-screen-xl mx-auto px-6 xl:px-0 py-8 xs:py-12">
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="text-3xl xs:text-4xl font-bold mb-8">{t("checkout.title")}</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm onSubmit={handleSubmit} />
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 border rounded-xl p-6 bg-background space-y-4">
            <h2 className="text-xl font-bold">{t("checkout.orderSummary")}</h2>
            <Separator />
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};
