import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AdminsTable from "./AdminsTable";

export default function AdminsTab() {
  const [activeTab, setActiveTab] = useState("all");

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <Card className="pb-0 gap-0">
        <CardHeader className="border-b">
          <CardTitle className="sr-only">Admins</CardTitle>
          <TabsList className="bg-transparent [&>button]:data-[state=active]:bg-primary [&>button]:data-[state=active]:text-primary-foreground [&>button]:h-10">
            <TabsTrigger value="all">
              All Admins <span className="ml-1 text-xs">(5)</span>
            </TabsTrigger>
            <TabsTrigger value="active">
              Active <span className="ml-1 text-xs">(4)</span>
            </TabsTrigger>
            <TabsTrigger value="inactive">
              Inactive <span className="ml-1 text-xs">(1)</span>
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

                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="flex-1 border-0 shadow-none">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Role</SelectItem>
                      <SelectItem value="super">Super Admin</SelectItem>
                      <SelectItem value="ops">Operations Admin</SelectItem>
                      <SelectItem value="support">Support Manager</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={departmentFilter}
                    onValueChange={setDepartmentFilter}
                  >
                    <SelectTrigger className="flex-1 border-0 shadow-none">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Department</SelectItem>
                      <SelectItem value="ops">Operations</SelectItem>
                      <SelectItem value="support">Customer Support</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
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
            <AdminsTable
              filter={
                activeTab === "all"
                  ? undefined
                  : (activeTab as "active" | "inactive")
              }
            />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}
