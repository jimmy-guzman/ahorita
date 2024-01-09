import { Table } from '@/components/molecules/Table';
import { useQueryTags } from '@/hooks/api/useQueryTags';

import { columns } from './TagsTable.columns';

export const TagsTable = () => {
  const { data: tags = [] } = useQueryTags();

  return <Table data={tags} columns={columns} />;
};
