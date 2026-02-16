"use client";

import { useState } from "react";
import Image from "next/image";
import { Breadcrumb } from "./breadcrumb";
import { CustomizationOptions } from "./customization-options";
import { PriceCalculator, calculatePrice } from "./price-calculator";
import { QuantitySelector } from "./quantity-selector";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Product } from "@/data/products";
import { useLanguage } from "@/contexts/language-context";
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";
import { categories } from "@/data/categories";

interface ProductPageContentProps {
  product: Product;
}

export const ProductPageContent = ({ product }: ProductPageContentProps) => {
  const { t, language } = useLanguage();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const [selectedSize, setSelectedSize] = useState(
    product.sizes[0]?.name[language] || ""
  );
  const [selectedPaperType, setSelectedPaperType] = useState(
    product.paperTypes[0]?.name[language] || ""
  );
  const [selectedFinish, setSelectedFinish] = useState(
    product.finishes[0]?.[language] || ""
  );
  const [quantity, setQuantity] = useState(100);
  const [needDesignHelp, setNeedDesignHelp] = useState(false);

  const category = categories.find((cat) => cat.slug === product.category);

  const breadcrumbItems = [
    { label: t("breadcrumb.home"), href: "/" },
    { label: t("breadcrumb.shop"), href: "/shop" },
    { label: category?.name[language] || "", href: category ? `/category/${category.slug}` : undefined },
    { label: product.name[language] },
  ];

  const handleAddToCart = () => {
    const size = product.sizes.find(
      (s) => s.name[language] === selectedSize || s.name.bn === selectedSize || s.name.en === selectedSize
    );
    const paperType = product.paperTypes.find(
      (p) => p.name[language] === selectedPaperType || p.name.bn === selectedPaperType || p.name.en === selectedPaperType
    );

    if (!size || !paperType) return;

    const price = calculatePrice(
      product.basePrice,
      size.multiplier,
      paperType.multiplier,
      quantity
    );

    addItem({
      productId: product.id,
      productSlug: product.slug,
      name: product.name,
      selectedOptions: {
        size: selectedSize,
        paperType: selectedPaperType,
        finish: selectedFinish,
        needDesignHelp,
      },
      quantity,
      price,
      totalPrice: price * quantity,
      image: product.image,
    });

    router.push("/cart");
  };

  return (
    <div className="max-w-screen-xl mx-auto px-6 xl:px-0 py-8 xs:py-12">
      <Breadcrumb items={breadcrumbItems} />

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative w-full aspect-square rounded-xl overflow-hidden border">
            <Image
              src={product.image}
              alt={product.name[language]}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative aspect-square rounded-lg overflow-hidden border"
              >
                <Image
                  src={product.image}
                  alt={`${product.name[language]} ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl xs:text-4xl font-bold mb-4">
              {product.name[language]}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                (4.5) {t("product.reviews")}
              </span>
            </div>
            <Badge className="bg-primary/10 text-primary border-none">
              {t("product.trustBadge")}
            </Badge>
          </div>

          <div className="border-t pt-6">
            <PriceCalculator
              product={product}
              selectedSize={selectedSize}
              selectedPaperType={selectedPaperType}
              quantity={quantity}
            />
          </div>

          <div className="space-y-6 border-t pt-6">
            <CustomizationOptions
              product={product}
              selectedSize={selectedSize}
              selectedPaperType={selectedPaperType}
              selectedFinish={selectedFinish}
              needDesignHelp={needDesignHelp}
              onSizeChange={setSelectedSize}
              onPaperTypeChange={setSelectedPaperType}
              onFinishChange={setSelectedFinish}
              onDesignHelpChange={setNeedDesignHelp}
            />
          </div>

          <div className="space-y-4 border-t pt-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                {t("product.quantity")}
              </label>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                min={100}
              />
            </div>

            <Button
              size="lg"
              className="w-full sticky bottom-4"
              onClick={handleAddToCart}
            >
              {t("product.addToCart")}
            </Button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="border-t pt-8 mb-12">
        <h2 className="text-2xl font-bold mb-4">{t("product.description")}</h2>
        <p className="text-muted-foreground whitespace-pre-line">
          {product.description[language]}
        </p>
      </div>
    </div>
  );
};
