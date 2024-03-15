import { useSuspenseQuery } from "@tanstack/react-query";

import { meQueryOptions } from "@/api/query-me";
import { Logout } from "@/components/logout";
import { ThemeToggle } from "@/components/theme-toggle";

export const ProfileDropdown = () => {
  const { data: me } = useSuspenseQuery(meQueryOptions);

  return (
    <div className="dsy-dropdown dsy-dropdown-end">
      <div tabIndex={0} role="button" className="dsy-btn dsy-btn-ghost">
        Profile
      </div>
      <ul
        // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
        tabIndex={0}
        className="dsy-menu dsy-menu-sm dsy-dropdown-content z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
      >
        <li className="dsy-menu-title">{me.data?.user?.username}</li>
        <li>
          <ThemeToggle lightTheme="cmyk" />
        </li>
        <div className="dsy-divider my-1" />
        <li>
          <Logout />
        </li>
      </ul>
    </div>
  );
};
