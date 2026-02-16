import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
  type VisibilityState,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type Table as TableType,
} from "@tanstack/react-table";
import { forwardRef, useImperativeHandle, useState } from "react";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchColumn?: string;
  title?: string;
  searchPlaceholder?: string;
  onExport?: () => void;
};

export type DataTableRef<TData> = {
  resetFilters: () => void;
  resetSorting: () => void;
  resetColumnVisibility: () => void;
  resetAll: () => void;
  getTable: () => TableType<TData>;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
};

const DataTableInner = forwardRef(function DataTableInner<TData, TValue>(
  { columns, data }: DataTableProps<TData, TValue>,
  ref: React.Ref<DataTableRef<TData>>,
) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  useImperativeHandle(ref, () => ({
    resetFilters: () => setColumnFilters([]),
    resetSorting: () => setSorting([]),
    resetColumnVisibility: () => setColumnVisibility({}),
    resetAll: () => {
      setColumnFilters([]);
      setSorting([]);
      setColumnVisibility({});
    },
    getTable: () => table,
    setPageIndex: (index: number) => table.setPageIndex(index),
    setPageSize: (size: number) => table.setPageSize(size),
  }));

  return (
    <div className="overflow-x-auto rounded-md border">
      <div className="overflow-y-auto [&_td]:py-2 sm:[&_td]:py-4">
        <Table className="min-w-full text-sm sm:text-base">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
                <TableHead className="w-12 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="p-1">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                          return (
                            <DropdownMenuCheckboxItem
                              key={column.id}
                              className="capitalize"
                              checked={column.getIsVisible()}
                              onCheckedChange={(value) =>
                                column.toggleVisibility(!!value)
                              }
                            >
                              {column.id}
                            </DropdownMenuCheckboxItem>
                          );
                        })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                  <TableCell />
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
});

const DataTable = forwardRef(function DataTable<TData, TValue>(
  props: DataTableProps<TData, TValue>,
  ref: React.Ref<DataTableRef<TData>>,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <DataTableInner {...(props as any)} ref={ref as any} />;
}) as <TData, TValue>(
  props: DataTableProps<TData, TValue> & {
    ref?: React.Ref<DataTableRef<TData>>;
  },
) => React.ReactElement;

export default DataTable;
