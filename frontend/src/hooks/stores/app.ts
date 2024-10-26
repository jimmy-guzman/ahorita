import type { Theme } from "daisyui";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Mode = "dark" | "light";

interface AppState {
  actions: {
    toggleMode: () => void;
  };
  mode: Mode;
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      actions: {
        toggleMode: () => {
          set((state) => ({
            mode: state.mode === "dark" ? "light" : "dark",
          }));
        },
      },
      mode: "dark",
    }),
    {
      name: "appStore",
      partialize: (state) => ({
        theme: state.mode,
      }),
    },
  ),
);

export const themesByMode = {
  dark: "synthwave",
  light: "cmyk",
} satisfies Record<Mode, Theme>;

export const useAppActions = () => {
  return useAppStore((state) => state.actions);
};
export const useAppIsLightMode = () => {
  return useAppStore((state) => state.mode === "light");
};
export const useAppTheme = () => {
  return useAppStore((state) => themesByMode[state.mode]);
};
