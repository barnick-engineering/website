"use client";

import { Product } from "@/data/products";
import { useLanguage } from "@/contexts/language-context";
import { Upload } from "lucide-react";

interface CustomizationOptionsProps {
  product: Product;
  selectedSize: string;
  selectedPaperType: string;
  selectedFinish: string;
  needDesignHelp: boolean;
  onSizeChange: (size: string) => void;
  onPaperTypeChange: (paperType: string) => void;
  onFinishChange: (finish: string) => void;
  onDesignHelpChange: (needHelp: boolean) => void;
}

export const CustomizationOptions = ({
  product,
  selectedSize,
  selectedPaperType,
  selectedFinish,
  needDesignHelp,
  onSizeChange,
  onPaperTypeChange,
  onFinishChange,
  onDesignHelpChange,
}: CustomizationOptionsProps) => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Size Selection */}
      <div>
        <label className="text-base font-semibold mb-3 block">
          {t("product.size")}
        </label>
        <select
          value={selectedSize}
          onChange={(e) => onSizeChange(e.target.value)}
          className="w-full h-9 rounded-full border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          {product.sizes.map((size) => (
            <option key={size.name[language]} value={size.name[language]}>
              {size.name[language]}
            </option>
          ))}
        </select>
      </div>

      {/* Paper Type Selection */}
      <div>
        <label className="text-base font-semibold mb-3 block">
          {t("product.paperType")}
        </label>
        <select
          value={selectedPaperType}
          onChange={(e) => onPaperTypeChange(e.target.value)}
          className="w-full h-9 rounded-full border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          {product.paperTypes.map((paperType) => (
            <option key={paperType.name[language]} value={paperType.name[language]}>
              {paperType.name[language]}
            </option>
          ))}
        </select>
      </div>

      {/* Finish Selection */}
      <div>
        <label className="text-base font-semibold mb-3 block">
          {t("product.finish")}
        </label>
        <div className="space-y-2">
          {product.finishes.map((finish) => (
            <div key={finish[language]} className="flex items-center space-x-2">
              <input
                type="radio"
                id={`finish-${finish[language]}`}
                name="finish"
                value={finish[language]}
                checked={selectedFinish === finish[language]}
                onChange={() => onFinishChange(finish[language])}
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <label
                htmlFor={`finish-${finish[language]}`}
                className="text-sm font-medium leading-none cursor-pointer"
              >
                {finish[language]}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* File Upload */}
      <div>
        <label className="text-base font-semibold mb-3 block">
          {t("product.uploadFile")}
        </label>
        <div className="border-2 border-dashed border-input rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PNG, JPG, PDF up to 10MB
          </p>
        </div>
      </div>

      {/* Design Help Checkbox */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="design-help"
          checked={needDesignHelp}
          onChange={(e) => onDesignHelpChange(e.target.checked)}
          className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
        />
        <label
          htmlFor="design-help"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          {t("product.needDesignHelp")}
        </label>
      </div>
    </div>
  );
};
