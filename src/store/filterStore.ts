import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type State = { category: string[]; type: string[] };

type Actions = {
  setCategory: (value: string[]) => void;
  setType: (value: string[]) => void;
  clearCategory: () => void;
  clearType: () => void;
};

const initialState: State = {
  category: [],
  type: [],
};

export const useFilterStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,
      setCategory: (value) => set({ category: value }),
      setType: (value) => set({ type: value }),
      clearCategory: () => set({ type: [] }),
      clearType: () => set({ category: [] }),
    })),
    { name: "filter", storage: createJSONStorage(() => sessionStorage) },
  ),
);
