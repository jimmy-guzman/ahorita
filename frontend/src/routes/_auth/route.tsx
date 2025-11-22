import { Icon } from "@iconify/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";

import { meQueryOptions } from "@/api/query-me";
import { LogoutButton } from "@/components/logout-button";
import { ThemeToggle } from "@/components/theme-toggle";

function Component() {
  const { data } = useSuspenseQuery(meQueryOptions);

  return (
    <div className="max-w-[100vw] px-6 pb-16 xl:pr-2">
      <nav className="dsy-navbar static w-full lg:sticky lg:top-0 lg:z-30 lg:shadow-sm lg:backdrop-blur">
        <div className="dsy-navbar-start">
          <Link
            to="/"
            className="dsy-btn dsy-btn-ghost bg-gradient-to-r from-primary to-secondary bg-clip-text text-lg text-transparent normal-case md:text-3xl"
          >
            ahorita
          </Link>
        </div>
        <div className="dsy-navbar-end hidden gap-2 sm:flex">
          <a
            className="dsy-btn dsy-btn-ghost dsy-btn-circle dsy-btn-xs lg:dsy-btn-sm"
            href="https://github.com/jimmy-guzman/ahorita"
            target="__blank"
          >
            <Icon icon="simple-icons:github" className="text-xl" />
          </a>
          <a
            className="dsy-btn dsy-btn-ghost dsy-btn-circle dsy-btn-xs lg:dsy-btn-sm"
            href={import.meta.env.VITE_SERVER_DOMAIN}
            target="__blank"
          >
            <span className="sr-only">API Docs</span>
            <Icon icon="simple-icons:swagger" className="text-xl" />
          </a>
          <a
            className="dsy-btn dsy-btn-ghost dsy-btn-circle dsy-btn-xs lg:dsy-btn-sm"
            href={import.meta.env.VITE_OTEL_DASHBOARD}
            target="__blank"
          >
            <Icon icon="simple-icons:opentelemetry" className="text-xl" />
          </a>
          <ThemeToggle />
          <LogoutButton />
        </div>
      </nav>
      <div role="tablist" className="dsy-tabs dsy-tabs-bordered mb-8 w-full">
        <Link
          role="tab"
          className="dsy-tab"
          to="/$username"
          // biome-ignore lint/suspicious/noNonNullAssertedOptionalChain: we know username exists here
          // biome-ignore lint/style/noNonNullAssertion: we know username exists here
          params={{ username: data.user?.username! }}
          activeProps={{ className: "dsy-tab-active" }}
        >
          Dashboard
        </Link>
        <Link
          role="tab"
          className="dsy-tab"
          to="/projects"
          activeProps={{ className: "dsy-tab-active" }}
        >
          Projects
        </Link>
        <Link
          role="tab"
          className="dsy-tab"
          to="/tasks"
          activeProps={{ className: "dsy-tab-active" }}
        >
          Tasks
        </Link>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ location, context }) => {
    const response = await context.queryClient.fetchQuery({
      ...meQueryOptions,
      staleTime: Number.POSITIVE_INFINITY,
    });

    if (!response.user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: Component,
});
