import type { Table } from "@tanstack/react-table";

export function exportTableToCSV<T extends Record<string, unknown>>(
  table: Table<T>,
  fileName = "export",
) {
  type ColumnDefWithAccessor = {
    accessorKey?: string;
    accessorFn?: (row: T) => unknown;
    header?: unknown;
  };
  const cols = table.getAllColumns().filter((c) => {
    const def = c.columnDef || {};
    const d = def as ColumnDefWithAccessor;
    return d.accessorKey || d.accessorFn;
  });

  const headers = cols.map((c) => {
    const def = c.columnDef || {};
    const d = def as ColumnDefWithAccessor;
    return def.header && typeof def.header === "string"
      ? def.header
      : d.accessorKey || c.id;
  });

  const escapeCell = (v: string | null) => {
    const s = v == null ? "" : String(v);
    return `"${s.replace(/"/g, '""')}"`;
  };

  const rows = table.getRowModel().rows.map((row) =>
    headers
      .map((h: string) => {
        // Prefer original value by accessor key
        const val = row.original?.[h];
        return escapeCell(
          val != null ? String(val) : (row.getValue(h) as string),
        );
      })
      .join(","),
  );

  const headerLine = headers.map((h: string) => escapeCell(h)).join(",");
  const csvContent = [headerLine, ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName.replace(/\s+/g, "_")}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
}

export default exportTableToCSV;
