import type { ColumnDef } from "@tanstack/react-table";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import FilterPanel from "./FilterPanel";
import { exportTableToCSV } from "@/lib/exportTable";
import DataTable, { type DataTableRef } from "./DataTable";
import { useRef } from "react";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchColumn?: string;
  title?: string;
  searchPlaceholder?: string;
  onExport?: () => void;
};

export default function DataTableWithSearch<TData, TValue>({
  columns,
  data,
  searchColumn = "name",
  title = "Data Table",
  searchPlaceholder = "Search...",
}: DataTableProps<TData, TValue>) {
  const tableRef = useRef<DataTableRef<TData>>(null);

  const handleExport = () => {
    const tableInstance = tableRef.current?.getTable();
    if (tableInstance) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      exportTableToCSV(tableInstance as any, title);
    }
  };

  return (
    <div className="space-y-6">
      <FilterPanel
        // onchange
        onExportClick={handleExport}
        searchPlaceholder={searchPlaceholder}
      />

      <Card className="pb-0">
        <CardHeader className="border-b">
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            ref={tableRef}
            columns={columns}
            data={data}
            searchColumn={searchColumn}
          />
        </CardContent>
      </Card>
    </div>
  );
}
