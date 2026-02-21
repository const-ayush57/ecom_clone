import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

export type CartItem = {
    id: number;
    name: string;
    price: number;
    image: string;
    itemCode: string;
    quantity: number;
};

type CartStore = {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (id: number) => void;
    updateQty: (id: number, qty: number) => void;
    clearCart: () => void;
    totalItems: () => number;
    totalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product: Product) => {
                const existing = get().items.find((i) => i.id === product.id);
                if (existing) {
                    set((state) => ({
                        items: state.items.map((i) =>
                            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                        ),
                    }));
                } else {
                    set((state) => ({
                        items: [
                            ...state.items,
                            {
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.images[0],
                                itemCode: product.itemCode,
                                quantity: 1,
                            },
                        ],
                    }));
                }
            },

            removeItem: (id: number) => {
                set((state) => ({
                    items: state.items.filter((i) => i.id !== id),
                }));
            },

            updateQty: (id: number, qty: number) => {
                if (qty <= 0) {
                    get().removeItem(id);
                    return;
                }
                set((state) => ({
                    items: state.items.map((i) =>
                        i.id === id ? { ...i, quantity: qty } : i
                    ),
                }));
            },

            clearCart: () => set({ items: [] }),

            totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

            totalPrice: () =>
                get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        }),
        { name: "wholeseller-cart" }
    )
);
