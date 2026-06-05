import { Icon } from "@iconify/react";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { FolderIcon, LayoutDashboardIcon, ListTodoIcon } from "lucide-react";
import { type ReactNode, Suspense } from "react";

import { meQueryOptions } from "@/api/query-me";
import { LogoutButton } from "@/components/logout-button";
import { RouteErrorComponent } from "@/components/shared/route-error";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavItemProps {
  to: string;
  icon: ReactNode;
  label: string;
}

function NavItem({ to, icon, label }: NavItemProps) {
  return (
    <div className="dsy-tooltip dsy-tooltip-right" data-tip={label}>
      <Link
        to={to}
        className="dsy-btn dsy-btn-ghost dsy-btn-square dsy-btn-sm"
        activeProps={{ className: "bg-base-300" }}
      >
        {icon}
        <span className="sr-only">{label}</span>
      </Link>
    </div>
  );
}

function Component() {
  return (
    <div className="flex h-screen overflow-hidden bg-base-100">
      {/* Icon rail */}
      <aside className="flex w-13 shrink-0 flex-col items-center gap-1 border-base-300 border-r bg-base-200 py-3">
        {/* Logo */}
        <div className="dsy-tooltip dsy-tooltip-right" data-tip="ahorita">
          <Link
            to="/"
            className="dsy-btn dsy-btn-ghost dsy-btn-square dsy-btn-sm font-bold text-base"
          >
            <span aria-hidden="true">A</span>
            <span className="sr-only">ahorita home</span>
          </Link>
        </div>

        <div className="my-1 h-px w-8 bg-base-300" />

        {/* Primary nav */}
        <nav className="flex flex-1 flex-col items-center gap-1 pt-1">
          <NavItem
            to="/dashboard"
            icon={<LayoutDashboardIcon className="h-4 w-4" />}
            label="Dashboard"
          />
          <NavItem
            to="/projects"
            icon={<FolderIcon className="h-4 w-4" />}
            label="Projects"
          />
          <NavItem
            to="/tasks"
            icon={<ListTodoIcon className="h-4 w-4" />}
            label="Tasks"
          />
        </nav>

        {/* Dev links */}
        <div className="flex flex-col items-center gap-1 opacity-40 transition-opacity hover:opacity-80">
          <div className="dsy-tooltip dsy-tooltip-right" data-tip="GitHub">
            <a
              className="dsy-btn dsy-btn-ghost dsy-btn-square dsy-btn-xs"
              href="https://github.com/jimmy-guzman/ahorita"
              target="_blank"
              rel="noreferrer"
            >
              <Icon icon="simple-icons:github" className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="dsy-tooltip dsy-tooltip-right" data-tip="API Docs">
            <a
              className="dsy-btn dsy-btn-ghost dsy-btn-square dsy-btn-xs"
              href={import.meta.env.VITE_SERVER_DOMAIN}
              target="_blank"
              rel="noreferrer"
            >
              <Icon icon="simple-icons:scalar" className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="dsy-tooltip dsy-tooltip-right" data-tip="Telemetry">
            <a
              className="dsy-btn dsy-btn-ghost dsy-btn-square dsy-btn-xs"
              href={import.meta.env.VITE_OTEL_DASHBOARD}
              target="_blank"
              rel="noreferrer"
            >
              <Icon icon="simple-icons:opentelemetry" className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="my-1 h-px w-8 bg-base-300" />

        {/* Bottom actions */}
        <div className="dsy-tooltip dsy-tooltip-right" data-tip="Toggle theme">
          <ThemeToggle />
        </div>
        <div className="dsy-tooltip dsy-tooltip-right" data-tip="Log out">
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <main className="p-6">
          <Suspense>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/(authenticated)")({
  beforeLoad: async ({ location, context }) => {
    const response = await context.queryClient.ensureQueryData({
      ...meQueryOptions,
      revalidateIfStale: true,
    });
    if (!response.user) {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
    return { user: response.user };
  },
  component: Component,
  errorComponent: RouteErrorComponent,
});
