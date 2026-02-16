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
import PageHeader from "@/components/PageHeader";
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
    <div className="space-y-6 min-h-0">
      {/* Header */}
      <PageHeader
        title="Dashboard Overview"
        subtitle="Real-time insights and performance metrics"
      >
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
      </PageHeader>

      {/* Main Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 min-h-0">
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
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5 min-h-0">
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
      <div className="grid gap-4 md:grid-cols-2 min-h-0">
        <div className="min-h-0 overflow-hidden">
          <RevenueOrdersChart />
        </div>
        <div className="min-h-0 overflow-hidden">
          <HourlyActiveOrdersChart />
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid gap-4 md:grid-cols-3 min-h-0">
        <div className="min-h-0 overflow-hidden">
          <RevenueByServiceChart />
        </div>

        <div className="md:col-span-2 min-h-0 overflow-hidden">
          <RegionalPerformance />
        </div>
      </div>

      {/* Live Map + Top Drivers */}
      <div className="grid gap-4 md:grid-cols-3 min-h-0">
        <div className="md:col-span-2 min-h-0 overflow-hidden">
          <LiveMap />
        </div>
        <div className="min-h-0 overflow-hidden">
          <TopDrivers />
        </div>
      </div>

      {/* Recent Activity + Recent Orders */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 min-h-0">
        <div className="md:col-span-1 min-h-0 overflow-hidden">
          <RecentActivity />
        </div>
        <div className="md:col-span-2 min-h-0 overflow-hidden">
          <RecentOrders />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3 min-h-0">
        <div className="min-h-0 overflow-hidden">
          <ServiceBreakdown />
        </div>
        <div className="min-h-0 overflow-hidden">
          <WeeklySummary />
        </div>
        <div className="min-h-0 overflow-hidden">
          <CustomerInsights />
        </div>
      </div>

      {/* Alerts / Action Cards */}
      <AlertsPanel />
    </div>
  );
}
