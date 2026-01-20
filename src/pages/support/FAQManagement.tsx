import { useState } from "react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import { HelpCircle, PlusIcon, Eye, ThumbsUp, Target } from "lucide-react";
import StatCard from "@/components/ui/stat-card";
import FAQList from "@/components/support/FAQList";
import FAQCategoriesPanel from "@/components/support/FAQCategoriesPanel";
import CreateFAQDialog from "@/components/support/CreateFAQDialog";

const statCards = [
  {
    title: "Total FAQs",
    value: "8",
    icon: <HelpCircle className="size-6 text-white" />,
    color: "bg-green-500",
  },
  {
    title: "Total Views",
    value: "22.1k",
    icon: <Eye className="size-6 text-white" />,
    color: "bg-blue-500",
  },
  {
    title: "Helpful Rating",
    value: "92%",
    icon: <ThumbsUp className="size-6 text-white" />,
    color: "bg-green-500",
  },
  {
    title: "Avg Resolution",
    value: "78%",
    icon: <Target className="size-6 text-white" />,
    color: "bg-orange-500",
  },
];

export default function FAQManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="space-y-6">
      <PageHeader
        title="FAQ Management"
        subtitle="Manage frequently asked questions, improve self-service, and reduce support tickets"
        Icon={<HelpCircle className="size-6" />}
        iconColor="bg-purple-600"
      >
        <Button
          className="bg-green-500 hover:bg-green-600 flex items-center gap-2"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <PlusIcon className="size-4" />
          Add New FAQ
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <FAQCategoriesPanel
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <FAQList selectedCategory={selectedCategory} />
      </div>

      <CreateFAQDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
