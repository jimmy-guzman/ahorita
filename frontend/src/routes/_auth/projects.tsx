import { Icon } from "@iconify/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { FolderPlusIcon, LayoutDashboardIcon, MenuIcon } from "lucide-react";

import { projectsQueryOptions } from "@/api/query-projects";
import { LogoutButton } from "@/components/logout-button";
import { ProjectsMenuItem } from "@/components/projects-menu-item";
import { ThemeToggle } from "@/components/theme-toggle";

function Projects() {
  const { data: projects } = useSuspenseQuery(projectsQueryOptions);

  return (
    <div className="dsy-drawer lg:dsy-drawer-open">
      <input id="my-drawer-3" type="checkbox" className="dsy-drawer-toggle" />
      <div className="dsy-drawer-content flex flex-col">
        <div className="max-w-[100vw] px-6 pb-16 xl:pr-2">
          <nav className="dsy-navbar static w-full lg:sticky lg:top-0 lg:z-30 lg:shadow-sm lg:backdrop-blur">
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
              className="dsy-btn dsy-btn-ghost bg-gradient-to-r from-primary to-secondary bg-clip-text text-lg text-transparent normal-case md:text-3xl lg:hidden"
            >
              ahorita
            </Link>
            <div className="dsy-navbar-start" />
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
              <ThemeToggle lightTheme="cmyk" />
              <LogoutButton />
            </div>
          </nav>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
      <aside className="dsy-drawer-side z-30">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="dsy-drawer-overlay"
        />
        <div className="bg-base-100">
          <Link
            to="/"
            className="dsy-btn dsy-btn-ghost dsy-btn-lg hidden bg-gradient-to-r from-primary to-secondary bg-clip-text text-lg text-transparent normal-case md:text-3xl lg:flex"
          >
            ahorita
          </Link>
          <ul className="dsy-menu min-h-screen w-56 bg-base-100">
            <li>
              <Link
                to="/projects"
                activeOptions={{ exact: true }}
                activeProps={{ className: "dsy-active" }}
              >
                Dashboard <LayoutDashboardIcon className="h-5 w-5 text-info" />
              </Link>
            </li>
            <li>
              <Link
                to="/projects/new"
                activeProps={{ className: "dsy-active" }}
              >
                New Project <FolderPlusIcon className="h-5 w-5 text-accent" />
              </Link>
            </li>
            <li className="dsy-menu-title text-secondary uppercase">
              Favorites
            </li>
            {projects
              .filter((project) => project.isFavorite)
              .map(({ id: projectId, name, isDone }) => (
                <li key={projectId}>
                  <ProjectsMenuItem
                    projectId={projectId}
                    name={name}
                    isDone={isDone}
                  />
                </li>
              ))}
            <li className="dsy-menu-title text-secondary uppercase">More</li>
            {projects
              .filter((project) => !project.isFavorite)
              .map(({ id: projectId, name, isDone }) => (
                <li key={projectId}>
                  <ProjectsMenuItem
                    projectId={projectId}
                    name={name}
                    isDone={isDone}
                  />
                </li>
              ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

export const Route = createFileRoute("/_auth/projects")({
  loader: async ({ context }) => {
    // TODO: remove context null check when issue of being undefined is addressed
    if (context) {
      await context.queryClient.ensureQueryData(projectsQueryOptions);
    }
  },
  component: Projects,
});
