import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, getRouteApi } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeftIcon, SquareCheckIcon, SquareIcon } from "lucide-react";

import { queryTaskOptions } from "@/api/query-task";

const routeApi = getRouteApi("/_auth/projects/$projectId/tasks/$taskId");

export function TaskDetails() {
  const params = routeApi.useParams();
  const { data: task } = useSuspenseQuery(queryTaskOptions(params));

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="dsy-card">
        <div className="dsy-card-body">
          <h1 className="dsy-card-title flex justify-between text-2xl sm:text-3xl">
            <span>
              {task.status === "Done" ? (
                <SquareCheckIcon className="inline" />
              ) : (
                <SquareIcon className="inline" />
              )}{" "}
              {task.name}
            </span>
          </h1>
          <p>
            This{" "}
            <span className="dsy-badge dsy-badge-neutral">{task.label}</span>{" "}
            currently has as status of{" "}
            <span className="dsy-badge dsy-badge-neutral">{task.status}</span>{" "}
            with a priority of{" "}
            <span className="dsy-badge dsy-badge-neutral">{task.priority}</span>
            . It was{" "}
            <strong>created {formatDistanceToNow(task.createdAt)} ago</strong>{" "}
            and{" "}
            <strong>
              last updated {formatDistanceToNow(task.updatedAt)} ago
            </strong>
            .
          </p>
          <div className="dsy-card-actions justify-end">
            <Link className="dsy-btn dsy-btn-link" to="..">
              <ArrowLeftIcon />
              <span className="hidden sm:inline">Back to Tasks</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
