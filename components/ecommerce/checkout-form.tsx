"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/language-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
}

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  orderNotes: string;
  paymentMethod: string;
}

export const CheckoutForm = ({ onSubmit }: CheckoutFormProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    orderNotes: "",
    paymentMethod: "cashOnDelivery",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setShowSuccess(true);
      // Reset form
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        orderNotes: "",
        paymentMethod: "cashOnDelivery",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block">
            {t("checkout.fullName")} *
          </label>
          <Input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className={errors.fullName ? "border-destructive" : ""}
          />
          {errors.fullName && (
            <p className="text-sm text-destructive mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            {t("checkout.phone")} *
          </label>
          <Input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && (
            <p className="text-sm text-destructive mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            {t("checkout.email")} *
          </label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            {t("checkout.address")} *
          </label>
          <Input
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className={errors.address ? "border-destructive" : ""}
          />
          {errors.address && (
            <p className="text-sm text-destructive mt-1">{errors.address}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            {t("checkout.city")} *
          </label>
          <Input
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className={errors.city ? "border-destructive" : ""}
          />
          {errors.city && (
            <p className="text-sm text-destructive mt-1">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            {t("checkout.orderNotes")}
          </label>
          <textarea
            name="orderNotes"
            value={formData.orderNotes}
            onChange={handleChange}
            rows={3}
            className="flex w-full rounded-full border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            {t("checkout.paymentMethod")} *
          </label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full h-9 rounded-full border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="bkash">{t("checkout.payment.bkash")}</option>
            <option value="nagad">{t("checkout.payment.nagad")}</option>
            <option value="bankTransfer">{t("checkout.payment.bankTransfer")}</option>
            <option value="cashOnDelivery">{t("checkout.payment.cashOnDelivery")}</option>
          </select>
        </div>

        <Button type="submit" size="lg" className="w-full">
          {t("checkout.placeOrder")}
        </Button>
      </form>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              {t("checkout.success")}
            </DialogTitle>
          </DialogHeader>
          <p>{t("checkout.successMessage")}</p>
        </DialogContent>
      </Dialog>
    </>
  );
};
