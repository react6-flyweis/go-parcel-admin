import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  count: number;
}

const categories: Category[] = [
  { id: "all", name: "All Categories", count: 8 },
  { id: "delivery", name: "Delivery", count: 2 },
  { id: "payment", name: "Payment", count: 1 },
  { id: "refunds", name: "Refunds", count: 1 },
  { id: "driver", name: "Driver", count: 1 },
  { id: "policy", name: "Policy", count: 1 },
  { id: "support", name: "Support", count: 1 },
  { id: "nemt", name: "NEMT", count: 1 },
];

const quickStats = [
  { label: "Published", value: 7 },
  { label: "Draft", value: 1 },
  { label: "Most Viewed", value: "3.6K" },
];

interface FAQCategoriesPanelProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FAQCategoriesPanel({
  selectedCategory,
  onCategoryChange,
}: FAQCategoriesPanelProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Categories
            </CardTitle>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-1 px-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              className={`w-full justify-between h-9 `}
              onClick={() => onCategoryChange(category.id)}
            >
              <span className="text-sm">{category.name}</span>
              <Badge
                variant={
                  selectedCategory === category.id ? "secondary" : "outline"
                }
                className={cn("ml-auto rounded-md ", {
                  "text-white": selectedCategory === category.id,
                })}
              >
                {category.count}
              </Badge>
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
              <div className="flex items-center gap-2">
                {stat.label === "Most Viewed" && (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm font-semibold">{stat.value}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
