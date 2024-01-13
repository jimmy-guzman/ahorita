import { useSuspenseQuery } from '@tanstack/react-query';

import { TasksTable } from '@/components/organisms/TasksTable';
import { tasksByTagQueryOptions } from '@/hooks/api/useTasksByTag';
import { tasksByTagRoute } from '@/routes/tagsRoute';

export default function TasksByTag() {
  const { tagId } = tasksByTagRoute.useParams();
  const { data: tasks } = useSuspenseQuery(tasksByTagQueryOptions(tagId));

  return <TasksTable tasks={tasks} />;
}
