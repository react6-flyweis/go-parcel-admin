import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download } from "lucide-react";
import React, { type PropsWithChildren } from "react";
import { useSearchParams } from "react-router";

interface FilterPanelProps {
  value?: string;
  onFilterClick?: () => void;
  onExportClick?: () => void;
  searchPlaceholder?: string;
}

export default function FilterPanel({
  onFilterClick,
  onExportClick,
  searchPlaceholder = "Search...",
  children,
}: PropsWithChildren<FilterPanelProps>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get("q") ?? "";
  const [value, setValue] = React.useState(initial);

  React.useEffect(() => {
    setValue(initial);
  }, [initial]);

  React.useEffect(() => {
    const id = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (value && value.trim() !== "") {
        params.set("q", value.trim());
      } else {
        params.delete("q");
      }
      setSearchParams(params);
    }, 300);

    return () => clearTimeout(id);
  }, [value, setSearchParams]);

  return (
    <Card className="py-0 rounded-lg">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              className="pl-9 border-0 shadow-none"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          {children}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 gap-2 bg-gray-100"
              onClick={onFilterClick}
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-2 bg-gray-100"
              onClick={onExportClick}
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
