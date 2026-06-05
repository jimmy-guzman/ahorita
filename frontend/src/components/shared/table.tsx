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
  CheckIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import { type JSX, useState } from "react";

import { fuzzyFilter } from "./fuzzy-filter";

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
    defaultColumn: {
      cell: (info) => {
        if (typeof info.getValue() === "boolean") {
          return info.getValue() ? (
            <CheckIcon className="h-4 w-4" />
          ) : (
            <XIcon className="h-4 w-4" />
          );
        }

        return info.getValue();
      },
    },
  });

  return (
    <div className="flex flex-col gap-4">
      {enableGlobalFiltering && (
        <div className="flex gap-2">
          <label className="dsy-input dsy-input-sm flex items-center gap-2 sm:w-1/2 xl:w-1/4">
            <input
              type="text"
              className="grow"
              placeholder={globalFilterPlaceholder}
              value={globalFilter}
              onChange={(event) => setGlobalFilter(String(event?.target.value))}
            />
            <SearchIcon className="h-4 w-4 opacity-50" />
          </label>
          {globalFilter && (
            <button
              type="button"
              className="dsy-btn dsy-btn-ghost dsy-btn-sm"
              onClick={() => setGlobalFilter("")}
            >
              Reset <XIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="dsy-table dsy-table-pin-rows md:dsy-table-md dsy-table-xs">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sort = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      className="text-base-content/50 text-xs uppercase tracking-wider"
                    >
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
                            <ArrowUpWideNarrowIcon className="ml-1 inline h-3.5 w-3.5" />
                          ) : (
                            <ArrowDownWideNarrowIcon className="ml-1 inline h-3.5 w-3.5" />
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
          <tbody className="divide-y divide-base-300">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={table.getVisibleLeafColumns().length}>
                  <div role="alert" className="dsy-alert dsy-alert-soft">
                    <span>No results.</span>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-base-200"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
