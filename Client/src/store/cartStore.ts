import { create } from "zustand";

type CartStore = {
  itemCount: number;
  setItemCount: (count: number) => void;
  incrementItemCount: (amount: number) => void;
};

export const cartStore = create<CartStore>((set) => ({
  itemCount: 0,
  setItemCount: (count) => set({ itemCount: count }),
  incrementItemCount: (amount) =>
    set((state) => ({ itemCount: state.itemCount + amount })),
}));
