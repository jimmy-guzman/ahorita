import { useSuspenseQuery } from '@tanstack/react-query';

import { Table } from '@/components/molecules/Table';
import { tagsQueryOptions } from '@/hooks/api/useQueryTags';

import { columns } from './TagsTable.columns';

export const TagsTable = () => {
  const { data } = useSuspenseQuery(tagsQueryOptions);

  return <Table data={data} columns={columns} />;
};
