import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Link, Outlet, redirect } from "@tanstack/react-router";
import { ExternalLinkIcon, ListPlusIcon, MenuIcon } from "lucide-react";

import { api } from "@/api/client";
import { tagsQueryOptions } from "@/api/query-tags";
import { Logout } from "@/components/logout";

const Tags = () => {
  const { data: tags } = useSuspenseQuery(tagsQueryOptions);

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
                href={`${import.meta.env.VITE_AHORITA_API_ORIGIN}/docs`}
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
            <li className="dsy-menu-title text-primary uppercase">All</li>
            <li>
              <Link to="/tags/add" activeProps={{ className: "dsy-active" }}>
                Add New <ListPlusIcon className="h-5 w-5 text-accent" />
              </Link>
            </li>
            {tags.map(({ id: tagId, name }) => (
              <li key={tagId}>
                <Link
                  to="/tags/$tagId"
                  params={{ tagId }}
                  activeProps={{ className: "dsy-active" }}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export const Route = createFileRoute("/tags")({
  component: Tags,
  beforeLoad: async ({ location, context }) => {
    const response = await context.queryClient.fetchQuery({
      queryKey: ["users", "me"],
      queryFn: async () => api.users.me.get(),
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
    await queryClient.ensureQueryData(tagsQueryOptions);
  },
});
