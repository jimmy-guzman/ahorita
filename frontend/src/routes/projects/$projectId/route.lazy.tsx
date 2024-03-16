import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Outlet, createLazyFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { getRouteApi } from "@tanstack/react-router";
import { EyeIcon, StarIcon, StarOffIcon } from "lucide-react";

import { editGroupOptions } from "@/api/edit-group";
import { groupQueryOptions } from "@/api/query-group";

import { DeleteGroup } from "./-components/delete-group";
import { EditGroup } from "./-components/edit-group";

const routeApi = getRouteApi("/projects/$projectId");

const GroupDetails = () => {
  const { projectId } = routeApi.useParams();
  const { data: group } = useSuspenseQuery(groupQueryOptions(projectId));
  const { mutate: editGroup } = useMutation(editGroupOptions);

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="dsy-card bg-base-200">
        <div className="dsy-card-body">
          <h1 className="dsy-card-title text-secondary">
            {group.icon && <span>{group.icon}</span>} {group.name}
            {group.isFavorite ? (
              <button
                type="button"
                className="dsy-btn dsy-btn-ghost dsy-btn-circle"
                onClick={() =>
                  editGroup({
                    params: { id: projectId },
                    body: { isFavorite: false },
                  })
                }
              >
                <StarIcon />
              </button>
            ) : (
              <button
                type="button"
                className="dsy-btn dsy-btn-ghost dsy-btn-circle"
                onClick={() =>
                  editGroup({
                    params: { id: projectId },
                    body: { isFavorite: true },
                  })
                }
              >
                <StarOffIcon />
              </button>
            )}
          </h1>
          <p>{group.description}</p>
          <div className="dsy-card-actions justify-end">
            <DeleteGroup />
            <EditGroup />
            <Link
              className="dsy-btn dsy-btn-primary dsy-btn-sm"
              to="/projects/$projectId/tasks"
              params={{ projectId }}
              activeOptions={{ exact: true }}
              activeProps={{ className: "dsy-btn-active" }}
            >
              Tasks <EyeIcon />
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </section>
  );
};

export const Route = createLazyFileRoute("/projects/$projectId")({
  component: GroupDetails,
});
