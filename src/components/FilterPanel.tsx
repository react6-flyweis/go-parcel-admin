import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download } from "lucide-react";

export default function FilterPanel() {
  return (
    <Card className="py-0 rounded-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by patient name, booking ID..."
              className="pl-9 border-0 shadow-none"
            />
          </div>
          <Button variant="outline" className="gap-2 bg-gray-100">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2 bg-gray-100">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
