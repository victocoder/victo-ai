// store/useStore.ts
import { create } from 'zustand';

interface SidebarState {
  isOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const useStore = create<SidebarState>((set) => ({
  isOpen: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  closeSidebar: () => set({ isOpen: false }),
}));

export default useStore;