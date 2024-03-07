import type { ColumnDef, SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDownWideNarrowIcon, ArrowUpWideNarrowIcon } from "lucide-react";
import { useState } from "react";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
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
    <div className="h-svh overflow-x-auto">
      <table className="dsy-table dsy-table-pin-rows md:dsy-table-md dsy-table-xs">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sort = header.column.getIsSorted();

                return (
                  <th key={header.id} className="uppercase">
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <button
                        type="button"
                        className="uppercase"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                        {sort === false ? null : sort === "asc" ? (
                          <ArrowUpWideNarrowIcon className="inline h-4 w-4" />
                        ) : (
                          <ArrowDownWideNarrowIcon className="inline h-4 w-4" />
                        )}
                      </button>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
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
      </table>
    </div>
  );
};
