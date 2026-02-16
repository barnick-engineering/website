"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const QuantitySelector = ({
  value,
  onChange,
  min = 100,
  max,
}: QuantitySelectorProps) => {
  const [localValue, setLocalValue] = useState(value.toString());

  const handleDecrease = () => {
    const newValue = Math.max(min, value - 100);
    onChange(newValue);
    setLocalValue(newValue.toString());
  };

  const handleIncrease = () => {
    const newValue = max ? Math.min(max, value + 100) : value + 100;
    onChange(newValue);
    setLocalValue(newValue.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setLocalValue(inputValue);

    if (inputValue === "") return;

    const numValue = parseInt(inputValue, 10);
    if (!isNaN(numValue)) {
      const clampedValue = Math.max(min, max ? Math.min(max, numValue) : numValue);
      // Round to nearest 100
      const roundedValue = Math.round(clampedValue / 100) * 100;
      onChange(Math.max(min, roundedValue));
    }
  };

  const handleBlur = () => {
    const numValue = parseInt(localValue, 10);
    if (isNaN(numValue) || numValue < min) {
      onChange(min);
      setLocalValue(min.toString());
    } else {
      const roundedValue = Math.round(numValue / 100) * 100;
      const finalValue = Math.max(min, max ? Math.min(max, roundedValue) : roundedValue);
      onChange(finalValue);
      setLocalValue(finalValue.toString());
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleDecrease}
        disabled={value <= min}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        value={localValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        min={min}
        max={max}
        className="w-20 text-center"
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleIncrease}
        disabled={max !== undefined && value >= max}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};
