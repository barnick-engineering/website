import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SelectedOptions {
  size: string;
  paperType: string;
  finish: string;
  needDesignHelp: boolean;
}

export interface CartItem {
  id: string; // Unique cart item ID
  productId: string;
  productSlug: string;
  name: {
    bn: string;
    en: string;
  };
  selectedOptions: SelectedOptions;
  quantity: number;
  price: number; // Price per unit
  totalPrice: number; // Price * quantity
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getVAT: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

const generateCartItemId = (): string => {
  return `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const newItem: CartItem = {
          ...item,
          id: generateCartItemId(),
        };
        set((state) => ({
          items: [...state.items, newItem],
        }));
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 100) return; // Minimum quantity is 100
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity,
                  totalPrice: item.price * quantity,
                }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.totalPrice, 0);
      },

      getVAT: () => {
        const subtotal = get().getSubtotal();
        return subtotal * 0.15; // 15% VAT
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const vat = get().getVAT();
        return subtotal + vat;
      },

      getItemCount: () => {
        return get().items.length;
      },
    }),
    {
      name: "barnick-cart-storage",
    }
  )
);
