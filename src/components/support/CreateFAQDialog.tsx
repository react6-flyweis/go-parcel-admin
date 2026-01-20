import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HelpCircle, Plus } from "lucide-react";

interface CreateFAQDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categories = [
  { value: "delivery", label: "Delivery" },
  { value: "payment", label: "Payment" },
  { value: "refunds", label: "Refunds" },
  { value: "driver", label: "Driver" },
  { value: "policy", label: "Policy" },
  { value: "support", label: "Support" },
  { value: "nemt", label: "NEMT" },
];

const statuses = [
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
];

const formSchema = z.object({
  question: z.string().min(10, {
    message: "Question must be at least 10 characters.",
  }),
  answer: z.string().min(20, {
    message: "Answer must be at least 20 characters.",
  }),
  category: z.string("Please select a category."),
  status: z.string("Please select a status."),
  tags: z.string().optional(),
  relatedArticles: z.string().optional(),
  displayOrder: z.string().optional(),
});

export default function CreateFAQDialog({
  open,
  onOpenChange,
}: CreateFAQDialogProps) {
  const [relatedArticles, setRelatedArticles] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      answer: "",
      category: "",
      status: "published",
      tags: "",
      relatedArticles: "",
      displayOrder: "1",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>, isDraft = false) => {
    const finalValues = {
      ...values,
      status: isDraft ? "draft" : values.status,
      relatedArticles: relatedArticles,
    };
    console.log("FAQ Data:", finalValues);
    onOpenChange(false);
    form.reset();
    setRelatedArticles([]);
  };

  const handleAddRelatedArticle = () => {
    const article = form.getValues("relatedArticles");
    if (article && article.trim()) {
      setRelatedArticles([...relatedArticles, article.trim()]);
      form.setValue("relatedArticles", "");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto p-0">
        <DialogHeader className="border-b p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <HelpCircle className="h-5 w-5 text-green-600" />
            </div>
            <DialogTitle className="text-xl">Create New FAQ</DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-5 pt-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => onSubmit(values, false))}
              className="space-y-6"
            >
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-base">Basic Information</h3>

                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., How do I track my delivery?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="answer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Answer *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide a clear, detailed answer..."
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.value}
                                value={category.value}
                              >
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {statuses.map((status) => (
                              <SelectItem
                                key={status.value}
                                value={status.value}
                              >
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (comma separated)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., tracking, delivery, gps"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Add relevant keywords to improve searchability
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Related Content */}
              <div className="space-y-4">
                <h3 className="font-semibold text-base">
                  Related Content (Optional)
                </h3>

                <FormField
                  control={form.control}
                  name="relatedArticles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Related Articles</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Add related article titles"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddRelatedArticle}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Related Article
                </Button>

                {relatedArticles.length > 0 && (
                  <div className="space-y-2">
                    {relatedArticles.map((article, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-md border px-3 py-2"
                      >
                        <span className="text-sm">{article}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setRelatedArticles(
                              relatedArticles.filter((_, i) => i !== index),
                            )
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Display Options */}
              <div className="space-y-4">
                <h3 className="font-semibold text-base">Display Options</h3>

                <FormField
                  control={form.control}
                  name="displayOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="1"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Lower numbers appear first
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    form.handleSubmit((values) => onSubmit(values, true))()
                  }
                >
                  Save as Draft
                </Button>
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600"
                >
                  Publish FAQ
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
