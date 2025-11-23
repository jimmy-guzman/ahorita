import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi, Link } from "@tanstack/react-router";
import { intlFormat } from "date-fns";
import { CircleCheckIcon, CircleIcon } from "lucide-react";

import { queryTasksOptions } from "@/api/query-tasks";
import { getTasksByCreatedAt } from "@/utils/select";

const routeApi = getRouteApi("/_auth/projects/$projectId");

export const TasksHistory = () => {
  const params = routeApi.useParams();
  const { data: tasks } = useSuspenseQuery({
    ...queryTasksOptions(params),
    select: getTasksByCreatedAt,
  });

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="dsy-card bg-base-200">
        <div className="dsy-card-body">
          <h2 className="dsy-card-title flex justify-between text-2xl sm:text-3xl">
            History
          </h2>
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
                    to="/tasks/$taskId"
                    className="dsy-link dsy-timeline-end dsy-timeline-box dsy-link-hover"
                    params={{ taskId: id }}
                  >
                    {name}
                  </Link>
                  {tasks.length - 1 !== index && <hr />}
                </li>
              );
            })}
          </ul>
          <div className="dsy-card-actions justify-end" />
        </div>
      </div>
    </section>
  );
};
