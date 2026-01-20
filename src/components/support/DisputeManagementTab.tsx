import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";
import { Button } from "../ui/button";
import { Download, Filter, Search } from "lucide-react";
import { Input } from "../ui/input";
import DisputeManagementTable from "./DisputeManagementTable";

export default function DisputeManagementTab() {
  const [activeTab, setActiveTab] = useState("all");

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <Card className="pb-0 gap-0">
        <CardHeader className="border-b">
          <CardTitle className="sr-only">Disputes</CardTitle>
          <TabsList className="bg-transparent [&>button]:data-[state=active]:bg-primary [&>button]:data-[state=active]:text-primary-foreground [&>button]:h-10">
            <TabsTrigger value="all">
              All Disputes <span className="ml-1 text-xs">(4)</span>
            </TabsTrigger>
            <TabsTrigger value="Open">
              Open <span className="ml-1 text-xs">(2)</span>
            </TabsTrigger>
            <TabsTrigger value="Under Review">
              Under Review <span className="ml-1 text-xs">(1)</span>
            </TabsTrigger>
            <TabsTrigger value="Resolved">
              Resolved <span className="ml-1 text-xs">(1)</span>
            </TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4">
            {/* Filters and Search */}
            <Card>
              <CardContent className="flex flex-col gap-5">
                <div className="flex gap-5">
                  {/* Search Bar */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by ID, name, phone..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-0 shadow-none"
                    />
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="flex-1 border-0 shadow-none">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Type</SelectItem>
                      <SelectItem value="refund">Refund Request</SelectItem>
                      <SelectItem value="damage">Damage Claim</SelectItem>
                      <SelectItem value="service">Service Quality</SelectItem>
                      <SelectItem value="overcharge">Overcharge</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={priorityFilter}
                    onValueChange={setPriorityFilter}
                  >
                    <SelectTrigger className="flex-1 border-0 shadow-none">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Priority</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger className="flex-1 border-0 shadow-none">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Category</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="delivery">Delivery</SelectItem>
                      <SelectItem value="damage">Damage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Filter Row */}
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="outline" className="bg-gray-100">
                    <Filter className="" />
                    More Filters
                  </Button>

                  <Button className=" bg-green-500 hover:bg-green-600">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <TabsContent value={activeTab} className="space-y-4">
            <DisputeManagementTable
              filter={activeTab === "all" ? undefined : activeTab}
            />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}
