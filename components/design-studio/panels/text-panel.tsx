import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CANVAS_FONTS, type FontId } from "../fonts";

interface TextPanelProps {
  fontId: FontId;
  onFontChange: (id: FontId) => void;
}

export function TextPanel({ fontId, onFontChange }: TextPanelProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">ক্যানভাসের টেক্সট ফন্ট পরিবর্তন করুন</p>
      <div className="space-y-1.5">
        <Label htmlFor="font-select" className="text-sm font-medium">
          ফন্ট
        </Label>
        <Select value={fontId} onValueChange={(v) => onFontChange(v as FontId)}>
          <SelectTrigger id="font-select" className="min-h-11">
            <SelectValue placeholder="ফন্ট বেছে নিন" />
          </SelectTrigger>
          <SelectContent>
            {CANVAS_FONTS.map((f) => (
              <SelectItem key={f.id} value={f.id} className="min-h-10">
                <span style={{ fontFamily: f.family }}>{f.labelBn}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
