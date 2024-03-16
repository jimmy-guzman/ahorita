import { useAppActions, useAppLightMode } from "@/stores/app";
import type { Theme } from "daisyui";
import { MoonIcon, SunIcon } from "lucide-react";

export const ThemeToggle = ({ lightTheme }: { lightTheme: Theme }) => {
  const lightMode = useAppLightMode();
  const { toggleLightMode } = useAppActions();

  return (
    <label className="dsy-swap dsy-swap-rotate dsy-btn dsy-ghost dsy-btn-circle dsy-btn-xs lg:dsy-btn-sm">
      <input
        type="checkbox"
        className="theme-controller"
        aria-label="toggle theme"
        value={lightTheme}
        checked={lightMode}
        onChange={toggleLightMode}
      />
      <SunIcon className="dsy-swap-on fill-current" />
      <MoonIcon className="dsy-swap-off fill-current" />
    </label>
  );
};
