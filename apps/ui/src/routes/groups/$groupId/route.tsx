import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Link, useNavigate } from "@tanstack/react-router";
import { getRouteApi } from "@tanstack/react-router";
import { formatDistanceToNowStrict } from "date-fns";
import { EyeIcon, Trash2Icon } from "lucide-react";

import { deleteGroupMutationOptions } from "@/api/delete-group";
import { groupQueryOptions } from "@/api/query-group";

const routeApi = getRouteApi("/groups/$groupId");

const GroupDetails = () => {
  const { groupId } = routeApi.useParams();
  const { data: group } = useSuspenseQuery(groupQueryOptions(groupId));
  const { mutate, isPending } = useMutation(deleteGroupMutationOptions);
  const navigate = useNavigate();

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="dsy-card bg-base-200">
        <div className="dsy-card-body">
          <h1 className="dsy-card-title text-secondary">{group.name}</h1>
          <p>{group.description}</p>
          <div className="grid justify-items-end text-info italic">
            <span>
              Last updated {formatDistanceToNowStrict(group.createdAt)} ago
            </span>
          </div>
          <div className="dsy-card-actions justify-end">
            <button
              type="button"
              className="dsy-btn dsy-btn-neutral"
              disabled={isPending}
              onClick={() => {
                mutate(groupId, {
                  onSuccess() {
                    return navigate({ to: "/groups/add" });
                  },
                });
              }}
            >
              Delete Group <Trash2Icon />
            </button>
            <Link
              className="dsy-btn dsy-btn-primary"
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
