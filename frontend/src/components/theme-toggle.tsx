import { MoonIcon, SunIcon } from "lucide-react";

import {
  themesByMode,
  useAppActions,
  useAppIsLightMode,
} from "@/hooks/stores/app";

export const ThemeToggle = () => {
  const isLightMode = useAppIsLightMode();
  const { toggleMode } = useAppActions();

  return (
    <label className="dsy-swap dsy-swap-rotate dsy-btn dsy-ghost dsy-btn-circle dsy-btn-xs lg:dsy-btn-sm">
      <span className="sr-only">Toggle theme</span>
      <input
        type="checkbox"
        className="dsy-theme-controller"
        value={themesByMode.light}
        checked={isLightMode}
        onChange={toggleMode}
      />
      <SunIcon className="dsy-swap-on fill-current" />
      <MoonIcon className="dsy-swap-off fill-current" />
    </label>
  );
};
