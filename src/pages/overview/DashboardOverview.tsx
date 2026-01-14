import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/overview/StatCard";
import { MetricCard } from "@/components/overview/MetricCard";
import {
  DollarSign,
  ShoppingCart,
  Truck,
  Target,
  Activity,
  Clock,
  XCircle,
  TicketIcon,
  Users,
  Calendar,
  RefreshCw,
  FileDown,
} from "lucide-react";
import { RevenueOrdersChart } from "@/components/overview/RevenueOrdersChart";
import { HourlyActiveOrdersChart } from "@/components/overview/HourlyActiveOrdersChart";
import { RevenueByServiceChart } from "@/components/overview/RevenueByServiceChart";
import { RegionalPerformance } from "@/components/overview/RegionalPerformance";
import { AlertsPanel } from "@/components/overview/AlertsPanel";
import { LiveMap } from "@/components/overview/LiveMap";
import { TopDrivers } from "@/components/overview/TopDrivers";
import { RecentActivity } from "@/components/overview/RecentActivity";
import { RecentOrders } from "@/components/overview/RecentOrders";
import { ServiceBreakdown } from "@/components/overview/ServiceBreakdown";
import { WeeklySummary } from "@/components/overview/WeeklySummary";
import { CustomerInsights } from "@/components/overview/CustomerInsights";

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Real-time insights and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            Today
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button
            size="sm"
            className="gap-2 bg-emerald-500 hover:bg-emerald-600"
          >
            <FileDown className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Main Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$119,800"
          icon={DollarSign}
          trend={{ value: "+24.5%", label: "vs yesterday" }}
          colorClass="bg-gradient-to-br from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="Total Orders"
          value="2,185"
          icon={ShoppingCart}
          trend={{ value: "+18.2%", label: "vs yesterday" }}
          colorClass="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          title="Active Drivers"
          value="245"
          icon={Truck}
          trend={{ value: "+8.1%", label: "vs yesterday" }}
          colorClass="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <StatCard
          title="Completion Rate"
          value="94.2%"
          icon={Target}
          trend={{ value: "+2.3%", label: "vs yesterday" }}
          colorClass="bg-gradient-to-br from-orange-500 to-orange-600"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        <MetricCard
          label="Live Orders"
          value="211"
          icon={Activity}
          iconColor="bg-blue-50 text-blue-600"
        />
        <MetricCard
          label="Pending Approvals"
          value="23"
          icon={Clock}
          iconColor="bg-orange-50 text-orange-600"
        />
        <MetricCard
          label="Failed Orders"
          value="12"
          icon={XCircle}
          iconColor="bg-red-50 text-red-600"
        />
        <MetricCard
          label="Open Tickets"
          value="47"
          icon={TicketIcon}
          iconColor="bg-yellow-50 text-yellow-600"
        />
        <MetricCard
          label="Total Customers"
          value="12,847"
          icon={Users}
          iconColor="bg-emerald-50 text-emerald-600"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <RevenueOrdersChart />
        <HourlyActiveOrdersChart />
      </div>

      {/* Additional Insights */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="">
          <RevenueByServiceChart />
        </div>
        <div className="md:col-span-2">
          <RegionalPerformance />
        </div>
      </div>

      {/* Live Map + Top Drivers */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <LiveMap />
        </div>
        <div>
          <TopDrivers />
        </div>
      </div>

      {/* Recent Activity + Recent Orders */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1">
          <RecentActivity />
        </div>
        <div className="md:col-span-2">
          <RecentOrders />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <ServiceBreakdown />
        <WeeklySummary />
        <CustomerInsights />
      </div>

      {/* Alerts / Action Cards */}
      <AlertsPanel />
    </div>
  );
}
