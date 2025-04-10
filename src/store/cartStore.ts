import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type CartType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type Actions = {
  getTotalItems: () => number;
  getTotalPrices: () => number;
  addItem: (item: CartType) => void;
  updateItem: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
};

interface CartState {
  carts: CartType[];
}

const initialState: CartState = {
  carts: [],
};

export const useCartStore = create<CartState & Actions>()(
  persist(
    immer((set, get) => ({
      ...initialState,
      getTotalItems: () => {
        const { carts } = get();
        return carts.reduce((total, product) => total + product.quantity, 0);
      },
      getTotalPrices: () => {
        const { carts } = get();
        return carts.reduce(
          (total, product) => total + product.price * product.quantity,
          0,
        );
      },
      addItem: (item) =>
        set((state) => {
          const existingItem = state.carts.find((cart) => cart.id === item.id);
          if (existingItem) existingItem.quantity = item.quantity || 1;
          else state.carts.push({ ...item, quantity: item.quantity || 1 });
        }),
      updateItem: (id, quantity) =>
        set((state) => {
          const existingItem = state.carts.find((cart) => cart.id === id);
          if (existingItem) existingItem.quantity += quantity;
        }),
      removeItem: (id) =>
        set((state) => {
          state.carts.filter((cart) => cart.id !== id);
        }),
      clearCart: () => set(initialState),
    })),
    { name: "cart-storage", storage: createJSONStorage(() => localStorage) },
  ),
);
