"use client";

import { useRef } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toBengaliDigits } from "@/lib/formatBn";
import type { LogoState } from "../types";

interface LogoPanelProps {
  logo: LogoState;
  onLogoChange: (logo: LogoState) => void;
  onUpload: (dataUrl: string) => void;
}

export function LogoPanel({ logo, onLogoChange, onUpload }: LogoPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      onUpload(dataUrl);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">লোগো আপলোড করুন ও অবস্থান ঠিক করুন</p>

      {/* Upload button */}
      <div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleFileChange}
          aria-label="লোগো ফাইল বেছে নিন"
        />
        <Button
          type="button"
          variant="outline"
          className="w-full min-h-11"
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="h-4 w-4 mr-2 shrink-0" />
          {logo.dataUrl ? "লোগো পরিবর্তন করুন" : "লোগো আপলোড করুন"}
        </Button>
      </div>

      {logo.dataUrl && (
        <>
          {/* Preview */}
          <div className="border border-border p-3 bg-muted/30 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.dataUrl}
              alt="আপলোড করা লোগো"
              className="h-12 w-12 object-contain"
              style={{
                filter:
                  logo.tint === "white"
                    ? "brightness(0) invert(1)"
                    : logo.tint === "black"
                      ? "brightness(0)"
                      : undefined,
              }}
            />
            <p className="text-xs text-muted-foreground flex-1">ক্যানভাসে লোগো টেনে সরান</p>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={() => onLogoChange({ ...logo, dataUrl: null })}
              aria-label="লোগো সরিয়ে দিন"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Tint */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">রঙ পরিবর্তন</Label>
            <ToggleGroup
              type="single"
              value={logo.tint}
              onValueChange={(v) => v && onLogoChange({ ...logo, tint: v as LogoState["tint"] })}
              className="justify-start gap-2"
            >
              <ToggleGroupItem value="none" className="min-h-11 px-4 text-sm" aria-label="মূল রং">
                মূল রং
              </ToggleGroupItem>
              <ToggleGroupItem value="white" className="min-h-11 px-4 text-sm" aria-label="সাদা">
                সাদা
              </ToggleGroupItem>
              <ToggleGroupItem value="black" className="min-h-11 px-4 text-sm" aria-label="কালো">
                কালো
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Size slider */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              আকার: {toBengaliDigits(Math.round(logo.width))} মিমি
            </Label>
            <Slider
              min={10}
              max={100}
              step={1}
              value={[logo.width]}
              onValueChange={([v]) => onLogoChange({ ...logo, width: v, height: v })}
              aria-label="লোগো আকার"
              className="min-h-11 flex items-center"
            />
          </div>

          {/* Rotation slider */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              ঘূর্ণন: {toBengaliDigits(Math.round(logo.rotation))}°
            </Label>
            <Slider
              min={-180}
              max={180}
              step={1}
              value={[logo.rotation]}
              onValueChange={([v]) => onLogoChange({ ...logo, rotation: v })}
              aria-label="লোগো ঘূর্ণন"
              className="min-h-11 flex items-center"
            />
          </div>
        </>
      )}
    </div>
  );
}
