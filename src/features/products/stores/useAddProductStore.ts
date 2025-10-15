"use client";

import { create } from "zustand";
import { nanoid } from "nanoid";

interface AddProductStore {
  products: Product[];
  addProduct: (product: Omit<Product, "id" | "variant.id">) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  resetStore: () => void;
}

export const useAddProductStore = create<AddProductStore>((set) => ({
  products: [],

  addProduct: (product) =>
    set((state) => ({
      products: [
        ...state.products,
        {
          ...product,
          id: nanoid(),
          variant: { ...product.variant, id: nanoid() },
        },
      ],
    })),

  updateProduct: (id, updates) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),

  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  resetStore: () => set({ products: [] }),
}));
