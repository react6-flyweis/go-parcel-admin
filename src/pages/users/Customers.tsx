import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import {
  User,
  Shield,
  Headphones,
  DollarSign,
  FileText,
  Mail,
  Download,
  UserCircle,
} from "lucide-react";
import StatCard from "@/components/ui/stat-card";
import CustomersTab from "@/components/users/CustomersTab";

const statCards = [
  {
    title: "Total Customers",
    value: "4",
    icon: <User className="size-6 text-white" />,
    color: "bg-green-500",
  },
  {
    title: "Active Customers",
    value: "3",
    icon: <Headphones className="size-6 text-white" />,
    color: "bg-emerald-500",
  },
  {
    title: "Total Revenue",
    value: "$14908",
    icon: <FileText className="size-6 text-white" />,
    color: "bg-blue-500",
  },
  {
    title: "Avg Order Value",
    value: "$101",
    icon: <Shield className="size-6 text-white" />,
    color: "bg-orange-500",
  },
];

const segments = [
  {
    name: "Premium Members",
    count: 2,
    icon: <User className="text-white" />,
    color: "bg-violet-500",
  },
  {
    name: "High Value",
    count: 1,
    icon: <DollarSign className="text-white" />,
    color: "bg-green-500",
  },
  {
    name: "Frequent Users",
    count: 1,
    icon: <FileText className="text-white" />,
    color: "bg-blue-500",
  },
  {
    name: "At Risk",
    count: 1,
    icon: <Shield className="text-white" />,
    color: "bg-orange-500",
  },
];

export default function Customers() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Management"
        subtitle="View and manage customer accounts, orders, and activity"
        Icon={<UserCircle className="size-6" />}
        iconColor="bg-green-600"
      >
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Mail />
            Bulk Message
          </Button>

          <Button variant="outline">
            <Download />
            Export Data
          </Button>
        </div>
      </PageHeader>

      {/* Top stat cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <StatCard
            key={s.title}
            title={s.title}
            value={s.value}
            icon={s.icon}
            color={s.color}
          />
        ))}
      </div>

      {/* Customer Segments */}
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Customer Segments</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {segments.map((s) => (
            <div
              key={s.name}
              className="border rounded-lg p-4 flex flex-col items-start gap-3"
            >
              <div className="flex flex-col gap-3">
                <div
                  className={`size-10 rounded-md flex items-center justify-center ${s.color}`}
                >
                  {s.icon}
                </div>
                <div className="text-2xl font-semibold">{s.count}</div>
              </div>
              <div className="text-sm text-muted-foreground">{s.name}</div>
            </div>
          ))}
        </div>
      </div>
      <CustomersTab />
    </div>
  );
}
