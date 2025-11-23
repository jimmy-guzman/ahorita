import { MoonIcon, SunIcon } from "lucide-react";

import { useTheme, useToggleTheme } from "@/hooks/stores/theme";

export const ThemeToggle = () => {
  const theme = useTheme();
  const toggleTheme = useToggleTheme();

  return (
    <label className="dsy-swap dsy-swap-rotate dsy-btn dsy-ghost dsy-btn-circle dsy-btn-xs lg:dsy-btn-sm">
      <span className="sr-only">Toggle theme</span>
      <input
        type="checkbox"
        className="dsy-theme-controller"
        checked={theme === "light"}
        onChange={toggleTheme}
      />
      <SunIcon className="dsy-swap-on fill-current" />
      <MoonIcon className="dsy-swap-off fill-current" />
    </label>
  );
};
