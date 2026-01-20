import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  LayoutList,
  LayoutGrid,
  ChevronDown,
  ExternalLink,
  Trash2,
  Eye,
  ThumbsUp,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  categoryColor: string;
  views: number;
  helpfulPercentage: number;
  lastUpdated: string;
  status: "Published" | "Draft";
}

const faqs: FAQ[] = [
  {
    id: "1",
    question: "How do I track my delivery?",
    answer:
      "You can track your delivery in real-time using the tracking link sent to your email or by logging into your account and navigating to the 'My Deliveries' section.",
    category: "Delivery",
    categoryColor: "bg-blue-500",
    views: 2487,
    helpfulPercentage: 95,
    lastUpdated: "2024-12-20",
    status: "Published",
  },
  {
    id: "2",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, PayPal, and digital wallets including Apple Pay and Google Pay.",
    category: "Payment",
    categoryColor: "bg-purple-500",
    views: 1903,
    helpfulPercentage: 98,
    lastUpdated: "2024-12-18",
    status: "Published",
  },
  {
    id: "3",
    question: "How do I request a refund?",
    answer:
      "To request a refund, go to your order history, select the order you want to refund, and click the 'Request Refund' button. Our team will review your request within 24-48 hours.",
    category: "Refunds",
    categoryColor: "bg-green-500",
    views: 3471,
    helpfulPercentage: 87,
    lastUpdated: "2024-12-22",
    status: "Published",
  },
  {
    id: "4",
    question: "Can I schedule a delivery for later?",
    answer:
      "Yes, you can schedule deliveries up to 30 days in advance. Simply select your preferred date and time during the checkout process.",
    category: "Delivery",
    categoryColor: "bg-blue-500",
    views: 1854,
    helpfulPercentage: 97,
    lastUpdated: "2024-12-15",
    status: "Published",
  },
  {
    id: "5",
    question: "How do I become a driver?",
    answer:
      "To become a driver, visit our careers page, fill out the application form, and submit the required documents. Our team will contact you within 3-5 business days.",
    category: "Driver",
    categoryColor: "bg-orange-500",
    views: 4521,
    helpfulPercentage: 94,
    lastUpdated: "2024-12-10",
    status: "Published",
  },
  {
    id: "6",
    question: "What is your cancellation policy?",
    answer:
      "Orders can be cancelled free of charge up to 30 minutes after placement. After that, a cancellation fee may apply depending on the order status.",
    category: "Policy",
    categoryColor: "bg-red-500",
    views: 2156,
    helpfulPercentage: 89,
    lastUpdated: "2024-12-12",
    status: "Published",
  },
];

interface FAQListProps {
  selectedCategory: string;
}

export default function FAQList({ selectedCategory }: FAQListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "all" ||
      faq.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search FAQs by question, answer, or tags..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className={
                viewMode === "list" ? "bg-green-500 hover:bg-green-600" : ""
              }
            >
              <LayoutList className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className={
                viewMode === "grid" ? "bg-green-500 hover:bg-green-600" : ""
              }
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <Collapsible
              key={faq.id}
              open={expandedFAQ === faq.id}
              onOpenChange={(open) => setExpandedFAQ(open ? faq.id : null)}
            >
              <Card className="border shadow-sm hover:shadow-md transition-shadow">
                <CollapsibleTrigger asChild>
                  <div className="p-4 cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-base">
                            {faq.question}
                          </h3>
                          <Badge className={`${faq.categoryColor} text-white`}>
                            {faq.status}
                          </Badge>
                          <Badge variant="outline">{faq.category}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{faq.views.toLocaleString()} views</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{faq.helpfulPercentage}% helpful</span>
                          </div>
                          <span>Updated {faq.lastUpdated}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle edit
                          }}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle delete
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <ChevronDown
                          className={`h-5 w-5 text-muted-foreground transition-transform ${
                            expandedFAQ === faq.id ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-4 pb-4 border-t pt-4">
                    <p className="text-sm text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No FAQs found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
