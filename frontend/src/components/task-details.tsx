import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi, Link } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon, ClockIcon, FolderIcon, TagIcon } from "lucide-react";

import { queryTaskOptions } from "@/api/query-task";
import { PriorityCell } from "./tasks-table/priority-cell";
import { TasksTableStatusCell } from "./tasks-table/status-cell";

const routeApi = getRouteApi("/(authenticated)/tasks/$taskId");

export function TaskDetails() {
  const params = routeApi.useParams();
  const { data: task } = useSuspenseQuery(queryTaskOptions(params));

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-semibold text-base-content text-xl">{task.name}</h1>

      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <span className="flex items-center gap-1.5 text-base-content/60">
          <TagIcon className="h-4 w-4 shrink-0" />
          <span>{task.label}</span>
        </span>

        <TasksTableStatusCell status={task.status} />

        <PriorityCell priority={task.priority} />

        <Link
          to="/projects/$projectId"
          params={{ projectId: task.project.id }}
          className="flex items-center gap-1.5 text-base-content/60 hover:text-base-content hover:underline"
        >
          <FolderIcon className="h-4 w-4 shrink-0" />
          <span>{task.project.name}</span>
        </Link>

        <span className="flex items-center gap-1.5 text-base-content/40">
          <CalendarIcon className="h-4 w-4 shrink-0" />
          <span>Created {formatDistanceToNow(task.createdAt)} ago</span>
        </span>

        <span className="flex items-center gap-1.5 text-base-content/40">
          <ClockIcon className="h-4 w-4 shrink-0" />
          <span>Updated {formatDistanceToNow(task.updatedAt)} ago</span>
        </span>
      </div>
    </div>
  );
}
