import { create } from "zustand";
import { persist } from "zustand/middleware";

const themes = {
  dark: "coffee",
  light: "lemonade",
} as const;

interface ThemeState {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const themeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "dark",
      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === "dark" ? "light" : "dark",
        }));
      },
    }),
    {
      name: "theme",
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);

if (typeof window !== "undefined") {
  document.documentElement.setAttribute(
    "data-theme",
    themes[themeStore.getState().theme],
  );

  themeStore.subscribe((state) => {
    document.documentElement.setAttribute("data-theme", themes[state.theme]);
  });
}

export const useTheme = () => {
  return themeStore((state) => state.theme);
};

export const useToggleTheme = () => {
  return themeStore((state) => state.toggleTheme);
};
