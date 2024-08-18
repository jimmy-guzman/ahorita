import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, getRouteApi } from "@tanstack/react-router";
import { intlFormat } from "date-fns";
import { CircleCheckIcon, CircleIcon, HistoryIcon } from "lucide-react";

import { queryTasksOptions } from "@/api/query-tasks";
import { sortTasksByCreatedAt } from "@/utils/select";

const routeApi = getRouteApi("/_auth/projects/$projectId/");

export const TasksHistory = () => {
  const params = routeApi.useParams();
  const { data: tasks } = useSuspenseQuery({
    ...queryTasksOptions(params),
    select: sortTasksByCreatedAt,
  });

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="prose dsy-prose">
        <h2 className="flex items-center gap-1">
          <HistoryIcon />
          <span>History</span>
        </h2>
      </div>
      {tasks.length > 0 ? (
        <ul className="dsy-timeline dsy-timeline-vertical sm:dsy-timeline-horizontal">
          {tasks.map(({ id, createdAt, name, status }, index) => {
            return (
              <li key={id}>
                {index !== 0 && <hr />}
                <div className="dsy-timeline-start">
                  {intlFormat(createdAt)}
                </div>
                <div className="dsy-timeline-middle">
                  {status === "Done" ? <CircleCheckIcon /> : <CircleIcon />}
                </div>
                <Link
                  to="/projects/$projectId/tasks/$taskId"
                  className="dsy-link dsy-timeline-end dsy-timeline-box dsy-link-hover"
                  params={{ projectId: params.projectId, taskId: id }}
                >
                  {name}
                </Link>
                {tasks.length - 1 !== index && <hr />}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>
          This project does have not tasks created.{" "}
          <Link
            className="dsy-link dsy-link-accent"
            to="/projects/$projectId/tasks/new"
            params={params}
          >
            Create a task
          </Link>{" "}
          to see history.
        </p>
      )}
    </section>
  );
};
