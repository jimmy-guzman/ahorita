import { MoonIcon, SunIcon } from "lucide-react";

import { useTheme, useToggleTheme } from "@/hooks/stores/theme";

export const ThemeToggle = () => {
  const theme = useTheme();
  const toggleTheme = useToggleTheme();

  return (
    <label className="dsy-swap dsy-swap-rotate dsy-btn dsy-btn-ghost dsy-btn-square dsy-btn-sm">
      <span className="sr-only">Toggle theme</span>
      <input
        type="checkbox"
        className="dsy-theme-controller"
        checked={theme === "light"}
        onChange={toggleTheme}
      />
      <SunIcon className="dsy-swap-on h-4 w-4 fill-current" />
      <MoonIcon className="dsy-swap-off h-4 w-4 fill-current" />
    </label>
  );
};
