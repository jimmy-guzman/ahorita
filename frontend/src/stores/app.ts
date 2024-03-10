import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  lightMode: boolean;
  actions: {
    toggleLightMode: () => void;
  };
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      lightMode: false,
      actions: {
        toggleLightMode: () => {
          set((state) => ({ lightMode: !state.lightMode }));
        },
      },
    }),
    {
      name: "appStore",
      partialize: (state) => ({ lightMode: state.lightMode }),
    },
  ),
);

export const useAppActions = () => useAppStore((state) => state.actions);
export const useAppLightMode = () => useAppStore((state) => state.lightMode);
