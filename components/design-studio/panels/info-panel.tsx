import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { BusinessInfo } from "../types";

interface InfoPanelProps {
  info: BusinessInfo;
  onInfoChange: (info: BusinessInfo) => void;
}

const FIELDS: { key: keyof BusinessInfo; labelBn: string; placeholder: string; type?: string }[] = [
  { key: "name", labelBn: "প্রতিষ্ঠানের নাম", placeholder: "আপনার ব্যবসার নাম" },
  { key: "phone", labelBn: "ফোন নম্বর", placeholder: "+880 1XXX-XXXXXX", type: "tel" },
  { key: "address", labelBn: "ঠিকানা", placeholder: "আপনার সম্পূর্ণ ঠিকানা" },
  { key: "email", labelBn: "ইমেইল", placeholder: "email@example.com", type: "email" },
  { key: "website", labelBn: "ওয়েবসাইট", placeholder: "www.example.com" },
  { key: "tagline", labelBn: "ট্যাগলাইন", placeholder: "ছোট্ট একটি বাক্য" },
];

export function InfoPanel({ info, onInfoChange }: InfoPanelProps) {
  const handleChange = (key: keyof BusinessInfo, value: string) => {
    onInfoChange({ ...info, [key]: value });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">ব্যবসার তথ্য দিন — ক্যানভাসে সরাসরি দেখাবে</p>
      {FIELDS.map(({ key, labelBn, placeholder, type }) => (
        <div key={key} className="space-y-1.5">
          <Label htmlFor={`info-${key}`} className="text-sm font-medium">
            {labelBn}
          </Label>
          <Input
            id={`info-${key}`}
            type={type ?? "text"}
            value={info[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            placeholder={placeholder}
            className="min-h-11"
          />
        </div>
      ))}
    </div>
  );
}
