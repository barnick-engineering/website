"use client";

import { MessageCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toBengaliDigits } from "@/lib/formatBn";
import type { Product } from "../products";

interface OrderPanelProps {
  product: Product;
  qty: number;
  note: string;
  onQtyChange: (qty: number) => void;
  onNoteChange: (note: string) => void;
  onSend: () => void;
  onDownload: () => void;
  sending: boolean;
}

export function OrderPanel({
  product,
  qty,
  note,
  onQtyChange,
  onNoteChange,
  onSend,
  onDownload,
  sending,
}: OrderPanelProps) {
  return (
    <div className="space-y-5">
      <div className="border border-border bg-muted/30 px-4 py-3">
        <p className="text-xs text-muted-foreground">নির্বাচিত পণ্য</p>
        <p className="mt-0.5 font-semibold text-foreground">{product.labelBn}</p>
        <p className="text-sm text-muted-foreground">
          পরিমাণ: {toBengaliDigits(qty)} পিস
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="order-qty" className="text-sm font-medium">
          পরিমাণ (পিস)
        </Label>
        <Input
          id="order-qty"
          type="number"
          inputMode="numeric"
          min={1}
          value={qty}
          onChange={(e) => {
            const n = parseInt(e.target.value, 10);
            if (n > 0) onQtyChange(n);
          }}
          className="min-h-11"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="order-note" className="text-sm font-medium">
          বিশেষ নির্দেশনা (ঐচ্ছিক)
        </Label>
        <Textarea
          id="order-note"
          placeholder="কাগজের ধরন, ফিনিশিং বা অন্য কোনো তথ্য..."
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          rows={3}
          className="resize-none"
        />
      </div>

      <div className="space-y-2">
        <Button
          type="button"
          className="w-full min-h-12 text-base"
          onClick={onSend}
          disabled={sending}
        >
          <MessageCircle className="h-5 w-5 mr-2 shrink-0" />
          {sending ? "পাঠানো হচ্ছে..." : "মেসেঞ্জারে পাঠান"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full min-h-11"
          onClick={onDownload}
          disabled={sending}
        >
          <Download className="h-4 w-4 mr-2 shrink-0" />
          PNG ডাউনলোড করুন
        </Button>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        মেসেঞ্জারে পাঠালে আপনার ডিজাইনের ছবি ও অর্ডারের বিস্তারিত পাঠানো হবে।
        ৫০% অগ্রিমের পর কাজ শুরু হয়।
      </p>
    </div>
  );
}
