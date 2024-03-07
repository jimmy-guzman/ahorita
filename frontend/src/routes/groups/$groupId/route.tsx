import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Link, useNavigate } from "@tanstack/react-router";
import { getRouteApi } from "@tanstack/react-router";
import { formatDistanceToNowStrict } from "date-fns";
import { EyeIcon, StarIcon, StarOffIcon, Trash2Icon } from "lucide-react";

import { deleteGroupOptions } from "@/api/delete-group";
import { editGroupOptions } from "@/api/edit-group";
import { groupQueryOptions } from "@/api/query-group";

const routeApi = getRouteApi("/groups/$groupId");

const GroupDetails = () => {
  const { groupId } = routeApi.useParams();
  const { data: group } = useSuspenseQuery(groupQueryOptions(groupId));
  const { mutate: deleteGroup, isPending } = useMutation(deleteGroupOptions);
  const { mutate: editGroup } = useMutation(editGroupOptions);
  const navigate = useNavigate();

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
                    params: { id: groupId },
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
                    params: { id: groupId },
                    body: { isFavorite: true },
                  })
                }
              >
                <StarOffIcon />
              </button>
            )}
          </h1>
          <p>{group.description}</p>
          <div className="grid justify-items-end text-info italic">
            <span>
              Last updated {formatDistanceToNowStrict(group.createdAt)} ago
            </span>
          </div>
          <div className="dsy-card-actions justify-end">
            <button
              type="button"
              className="dsy-btn dsy-btn-neutral dsy-btn-sm"
              disabled={isPending}
              onClick={() => {
                deleteGroup(groupId, {
                  onSuccess() {
                    return navigate({ to: "/groups/new" });
                  },
                });
              }}
            >
              Delete Group <Trash2Icon />
            </button>
            <Link
              className="dsy-btn dsy-btn-primary dsy-btn-sm"
              to="/groups/$groupId/tasks"
              params={{ groupId }}
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

export const Route = createFileRoute("/groups/$groupId")({
  component: GroupDetails,
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(groupQueryOptions(params.groupId));
  },
});
