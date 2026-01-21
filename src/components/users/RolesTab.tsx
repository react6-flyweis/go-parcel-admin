import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Shield, Eye, Edit, Trash, Users } from "lucide-react";
import PermissionMatrix from "./PermissionMatrix";

const roles = [
  {
    title: "Super Admin",
    description: "Full system access with no restrictions",
    color: "bg-red-500",
    users: 1,
    modules: 17,
    counts: { view: 17, create: 17, edit: 17, delete: 17 },
  },
  {
    title: "Operations Admin",
    description:
      "Manage day-to-day operations including parcels, rides, and drivers",
    color: "bg-blue-500",
    users: 1,
    modules: 14,
    counts: { view: 14, create: 7, edit: 9, delete: 2 },
  },
  {
    title: "Support Manager",
    description: "Handle customer support, tickets, live chat, and FAQs",
    color: "bg-green-500",
    users: 1,
    modules: 13,
    counts: { view: 13, create: 4, edit: 4, delete: 2 },
  },
  {
    title: "Finance Admin",
    description: "Manage billing, payments, refunds, and financial reports",
    color: "bg-purple-500",
    users: 1,
    modules: 13,
    counts: { view: 13, create: 2, edit: 2, delete: 1 },
  },
  {
    title: "Content Manager",
    description: "Manage FAQs, notifications, and marketing content",
    color: "bg-orange-400",
    users: 1,
    modules: 5,
    counts: { view: 5, create: 1, edit: 1, delete: 1 },
  },
];

export default function RolesTab() {
  return (
    <Tabs defaultValue="roles" className="space-y-6">
      <Card className="pb-0 gap-0">
        <CardHeader className="border-b">
          <CardTitle className="sr-only">Roles</CardTitle>
          <TabsList className="bg-transparent [&>button]:data-[state=active]:bg-primary [&>button]:data-[state=active]:text-primary-foreground [&>button]:h-10">
            <TabsTrigger value="roles">
              Roles <span className="ml-1 text-xs">(5)</span>
            </TabsTrigger>
            <TabsTrigger value="matrix">Permission Matrix</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent className="p-5">
          <TabsContent value="roles">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {roles.map((r) => (
                <Card key={r.title} className="rounded-lg shadow-sm">
                  <CardContent>
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col  gap-4">
                        <div className="">
                          <div
                            className={`size-10 flex justify-center items-center rounded-md ${r.color}`}
                          >
                            <Shield className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold">{r.title}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {r.description}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="h-8 w-8 rounded-md flex items-center justify-center text-muted-foreground hover:bg-muted">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="h-8 w-8 rounded-md flex items-center justify-center text-red-500 hover:bg-red-50">
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 text-sm text-muted-foreground grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <div>{r.users} user</div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block border rounded-full px-2 py-0.5 text-xs text-muted-foreground">
                          {r.modules} modules
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-muted-foreground">
                      <div className="grid grid-cols-2 gap-2">
                        <div>View</div>
                        <div className="text-right">{r.counts.view}</div>
                        <div>Create</div>
                        <div className="text-right">{r.counts.create}</div>
                        <div>Edit</div>
                        <div className="text-right">{r.counts.edit}</div>
                        <div>Delete</div>
                        <div className="text-right">{r.counts.delete}</div>
                      </div>
                    </div>

                    <hr className="my-4 border-muted-foreground/20" />

                    <div>
                      <Button
                        variant="outline"
                        className="w-full justify-center"
                      >
                        <Eye className="mr-2 h-4 w-4" /> View Permissions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="matrix">
            <PermissionMatrix roles={roles} />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}
