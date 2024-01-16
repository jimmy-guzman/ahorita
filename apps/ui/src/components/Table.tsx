import type { ColumnDef, SortingState } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDownWideNarrowIcon, ArrowUpWideNarrowIcon } from 'lucide-react';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, max-lines-per-function
export const Table = <TData, TColumns extends ColumnDef<TData, any>[]>({
  data,
  columns,
}: {
  data: TData[];
  columns: TColumns;
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className='h-screen overflow-x-auto'>
      <table className='dsy-table dsy-table-pin-rows md:dsy-table-md dsy-table-xs'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sort = header.column.getIsSorted();

                return (
                  <th key={header.id} className='uppercase'>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                        aria-hidden='true'
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {
                          // eslint-disable-next-line no-nested-ternary
                          sort === false ? null : sort === 'asc' ? (
                            <ArrowUpWideNarrowIcon className='inline h-4 w-4' />
                          ) : (
                            <ArrowDownWideNarrowIcon className='inline h-4 w-4' />
                          )
                        }
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};
