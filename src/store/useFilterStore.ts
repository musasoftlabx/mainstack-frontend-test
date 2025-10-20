// * NPM
import { create } from "zustand";

interface useFilterStore {
  activeFilters: any;
  filter: (activeFilters: { activeFilters?: {} }) => void;
}

export const useFilterStore = create<useFilterStore>((set) => ({
  activeFilters: {},
  filter: (activeFilters) => set((state) => ({ ...state, activeFilters })),
}));
