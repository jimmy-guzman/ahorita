import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Link, Outlet, redirect } from "@tanstack/react-router";
import { ExternalLinkIcon, ListPlusIcon, MenuIcon } from "lucide-react";

import { groupsQueryOptions } from "@/api/query-groups";
import { meQueryOptions } from "@/api/query-me";
import { Logout } from "@/components/logout";
import { GroupsMenuItem } from "./-components/groups-menu-item";

const Groups = () => {
  const { data: groups } = useSuspenseQuery(groupsQueryOptions);

  return (
    <div className="dsy-drawer lg:dsy-drawer-open">
      <input id="my-drawer-3" type="checkbox" className="dsy-drawer-toggle" />
      <div className="dsy-drawer-content flex flex-col">
        <div className="max-w-[100vw] px-6 pb-16 xl:pr-2">
          <nav className="dsy-navbar w-full">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="dsy-btn dsy-btn-square dsy-btn-ghost"
              >
                <MenuIcon className="inline-block h-6 w-6 stroke-current" />
              </label>
            </div>
            <Link
              to="/"
              className="dsy-btn dsy-btn-ghost bg-gradient-to-r from-primary to-secondary bg-clip-text text-lg text-transparent normal-case lg:hidden md:text-3xl"
            >
              ahorita
            </Link>
            <div className="dsy-navbar-start" />
            <div className="dsy-navbar-end">
              <a
                className="dsy-btn dsy-btn-ghost dsy-btn-xs lg:dsy-btn-md"
                href={`${import.meta.env.VITE_SERVER_DOMAIN}/docs`}
                target="__blank"
              >
                API Docs <ExternalLinkIcon className="h-4 w-4" />
              </a>
              <Logout />
            </div>
          </nav>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
      <aside className="dsy-drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="dsy-drawer-overlay"
        />
        <div className="bg-base-100">
          <Link
            to="/"
            className="dsy-btn dsy-btn-ghost dsy-btn-lg hidden bg-gradient-to-r from-primary to-secondary bg-clip-text text-lg text-transparent normal-case lg:flex md:text-3xl"
          >
            ahorita
          </Link>
          <ul className="dsy-menu min-h-screen w-56 bg-base-100">
            <li>
              <Link to="/groups/new" activeProps={{ className: "dsy-active" }}>
                New Group <ListPlusIcon className="h-5 w-5 text-accent" />
              </Link>
            </li>
            <li className="dsy-menu-title text-primary uppercase">Favorites</li>
            {groups
              .filter((group) => group.isFavorite)
              .map(({ id: groupId, name, icon }) => (
                <li key={groupId}>
                  <GroupsMenuItem groupId={groupId} name={name} icon={icon} />
                </li>
              ))}
            <li className="dsy-menu-title text-primary uppercase">More</li>
            {groups
              .filter((group) => !group.isFavorite)
              .map(({ id: groupId, name, icon }) => (
                <li key={groupId}>
                  <GroupsMenuItem groupId={groupId} name={name} icon={icon} />
                </li>
              ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export const Route = createFileRoute("/groups")({
  component: Groups,
  beforeLoad: async ({ location, context }) => {
    const response = await context.queryClient.fetchQuery({
      ...meQueryOptions,
      staleTime: Infinity,
    });

    if (!response.data?.user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(groupsQueryOptions);
  },
});
