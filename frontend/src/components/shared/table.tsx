import type { ColumnDef, SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDownWideNarrowIcon,
  ArrowUpWideNarrowIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";

import { fuzzyFilter } from "./table.filters";

// biome-ignore lint/suspicious/noExplicitAny: unknown does not work with @tanstack/react-table
export function Table<TData, TColumns extends ColumnDef<TData, any>[]>(props: {
  data: TData[];
  columns: TColumns;
  globalFilterPlaceholder?: string;
  enableGlobalFiltering: boolean;
}): JSX.Element;
// biome-ignore lint/suspicious/noExplicitAny: unknown does not work with @tanstack/react-table
export function Table<TData, TColumns extends ColumnDef<TData, any>[]>(props: {
  data: TData[];
  columns: TColumns;
}): JSX.Element;
// biome-ignore lint/suspicious/noExplicitAny: unknown does not work with @tanstack/react-table
export function Table<TData, TColumns extends ColumnDef<TData, any>[]>({
  data,
  columns,
  globalFilterPlaceholder,
  enableGlobalFiltering = false,
}: {
  data: TData[];
  columns: TColumns;
  globalFilterPlaceholder?: string;
  enableGlobalFiltering?: boolean;
}) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
  });

  return (
    <div className="flex flex-col gap-4">
      {enableGlobalFiltering && (
        <div className="flex gap-2">
          <label className="dsy-input dsy-input-sm flex w-full items-center gap-2 sm:w-1/2 lg:w-1/2 xl:w-1/4">
            <input
              type="text"
              className="grow"
              placeholder={globalFilterPlaceholder}
              value={globalFilter}
              onChange={(event) => setGlobalFilter(String(event?.target.value))}
            />
            <SearchIcon className="h-4 w-4 opacity-70" />
          </label>
          {globalFilter && (
            <button
              type="button"
              className="dsy-btn dsy-btn-neutral dsy-btn-sm"
              onClick={() => setGlobalFilter("")}
            >
              Reset <XIcon />
            </button>
          )}
        </div>
      )}
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
    </div>
  );
}
