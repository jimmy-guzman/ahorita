import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi, Link } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";

import { queryTaskOptions } from "@/api/query-task";

const routeApi = getRouteApi("/(authenticated)/tasks/$taskId");

export function TaskDetails() {
  const params = routeApi.useParams();
  const { data: task } = useSuspenseQuery(queryTaskOptions(params));

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="dsy-card bg-base-200">
        <div className="dsy-card-body">
          <h1 className="dsy-card-title flex justify-between text-2xl sm:text-3xl">
            {task.name}
          </h1>
          <p>
            This{" "}
            <span className="dsy-badge dsy-badge-neutral">{task.label}</span>{" "}
            currently has as status of{" "}
            <span className="dsy-badge dsy-badge-neutral">{task.status}</span>{" "}
            with a priority of{" "}
            <span className="dsy-badge dsy-badge-neutral">{task.priority}</span>
            . It's part of the{" "}
            <Link
              to="/projects/$projectId"
              params={{ projectId: task.project.id }}
              className="dsy-link dsy-link-secondary"
            >
              {task.project.name}
            </Link>{" "}
            project. It was{" "}
            <strong>created {formatDistanceToNow(task.createdAt)} ago</strong>{" "}
            and{" "}
            <strong>
              last updated {formatDistanceToNow(task.updatedAt)} ago
            </strong>
            .
          </p>
          <div className="dsy-card-actions justify-end" />
        </div>
      </div>
    </section>
  );
}
