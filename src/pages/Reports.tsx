import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import {
  DollarSign,
  ShoppingCart,
  Truck,
  Target,
  Calendar,
  FileDown,
} from "lucide-react";
import { RevenueByServiceChart } from "@/components/overview/RevenueByServiceChart";
import WeeklyOrderBreakdownChart from "@/components/overview/WeeklyOrderBreakdownChart";
import DriverUtilizationChart from "@/components/overview/DriverUtilizationChart";
import TopPerformingZones from "@/components/overview/TopPerformingZones";
import ServiceLevelPerformance from "@/components/overview/ServiceLevelPerformance";

export default function Reports() {
  const stats = [
    {
      id: "revenue",
      title: "Total Revenue",
      value: "$934,300",
      trendValue: "+24%",
      trendLabel: "from last month",
      icon: DollarSign,
      iconClass: "text-emerald-600",
    },
    {
      id: "orders",
      title: "Total Orders",
      value: "12,485",
      trendValue: "+18%",
      trendLabel: "from last month",
      icon: ShoppingCart,
      iconClass: "text-blue-600",
    },
    {
      id: "avg",
      title: "Avg Order Value",
      value: "$74.83",
      trendValue: "+5%",
      trendLabel: "from last month",
      icon: Truck,
      iconClass: "text-purple-600",
    },
    {
      id: "success",
      title: "Success Rate",
      value: "94.7%",
      trendValue: "+2.3%",
      trendLabel: "from last month",
      icon: Target,
      iconClass: "text-orange-600",
    },
  ];
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics & Reports"
        subtitle="Comprehensive insights and performance metrics"
      >
        <Button variant="outline" size="sm" className="gap-2">
          <Calendar className="h-4 w-4" />
          Last 30 Days
        </Button>
        <Button size="sm" className="gap-2 bg-emerald-500 hover:bg-emerald-600">
          <FileDown className="h-4 w-4" />
          Export Report
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-white rounded-xl border border-gray-100 p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <div className="mt-2">
                    <span className="text-2xl md:text-3xl font-semibold">
                      {stat.value}
                    </span>
                  </div>
                  <p className={`mt-2 text-sm text-green-600`}>
                    {stat.trendValue}{" "}
                    <span className="text-xs ">{stat.trendLabel}</span>
                  </p>
                </div>

                <div
                  className={`h-8 w-8 rounded flex items-center justify-center bg-linear-to-br ${stat.iconClass}`}
                >
                  <Icon className="size-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <RevenueByServiceChart showLegend={false} />
        <WeeklyOrderBreakdownChart />
      </div>
      <DriverUtilizationChart />

      <div className="grid gap-4 md:grid-cols-2">
        <TopPerformingZones />
        <ServiceLevelPerformance />
      </div>
    </div>
  );
}
