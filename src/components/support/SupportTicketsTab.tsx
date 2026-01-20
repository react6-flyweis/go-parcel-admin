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
import SupportTicketsTable from "./SupportTicketsTable";

export default function SupportTicketsTab() {
  const [activeTab, setActiveTab] = useState("all");

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <Card className="pb-0 gap-0">
        <CardHeader className="border-b">
          <CardTitle className="sr-only">Support Tickets</CardTitle>
          <TabsList className="bg-transparent [&>button]:data-[state=active]:bg-primary [&>button]:data-[state=active]:text-primary-foreground [&>button]:h-10">
            <TabsTrigger value="all">
              All Tickets <span className="ml-1 text-xs">(4)</span>
            </TabsTrigger>
            <TabsTrigger value="Open">
              Open <span className="ml-1 text-xs">(2)</span>
            </TabsTrigger>
            <TabsTrigger value="In Progress">
              In Progress <span className="ml-1 text-xs">(1)</span>
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
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="flex-1 border-0 shadow-none">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Status</SelectItem>
                      <SelectItem value="in-transit">In Transit</SelectItem>
                      <SelectItem value="pickup">Pickup</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="pending">Pending Pickup</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="flex-1 border-0 shadow-none">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="same-day">Same-Day</SelectItem>
                      <SelectItem value="grocery">Grocery</SelectItem>
                      <SelectItem value="express">Express</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="flex-1 border-0 shadow-none">
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Date Range</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
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
            <SupportTicketsTable
              filter={activeTab === "all" ? undefined : activeTab}
            />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}
