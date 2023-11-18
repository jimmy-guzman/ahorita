import { createColumnHelper } from '@tanstack/react-table';

import type { Tag } from '@/lib/api';
import { formatDate } from '@/lib/formatters';

const columnHelper = createColumnHelper<Tag>();

export const columns = [
  columnHelper.accessor('name', {
    header: 'Tag',
    cell: (info) => (
      <span className='dsy-badge dsy-badge-outline'>{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('_count.tasks', {
    header: '# of Tasks',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created At',
    cell: (info) => formatDate(info.getValue()),
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Updated At',
    cell: (info) => formatDate(info.getValue()),
  }),
];
