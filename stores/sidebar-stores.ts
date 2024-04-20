import { create } from "zustand";

export interface SidebarState {
  isOpen: boolean;
  isMinimal: boolean;
  hendleOpenOrClose: () => void;
  hendleClose: () => void;
  hendleChangeSideBar: () => void;
}

export const useSidebarStore = create<SidebarState>()((set) => ({
  isOpen: false,
  isMinimal: false,
  hendleOpenOrClose: () =>
    set((state) => ({ ...state, isOpen: !state.isOpen })),
  hendleClose: () => set((state) => ({ ...state, isOpen: false })),
  hendleChangeSideBar: () =>
    set((state) => ({ ...state, isMinimal: !state.isMinimal })),
}));
