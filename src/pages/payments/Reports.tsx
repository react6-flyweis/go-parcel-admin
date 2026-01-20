import { Download, Calendar, FileText, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import StatCard from "@/components/ui/stat-card";
import PageHeader from "@/components/PageHeader";
import RevenueProfitTrendChart from "@/components/charts/RevenueProfitTrendChart";
import DailyRevenueChart from "@/components/charts/DailyRevenueChart";
import { RevenueByServiceChart } from "@/components/overview/RevenueByServiceChart";

const statCards = [
  {
    title: "Total Revenue",
    value: "$225,000",
    subtitle: (
      <span>
        <span className="text-green-500">+13.5% </span>
        <span className="text-muted-foreground">This Month</span>
      </span>
    ),
    color: "bg-white",
    icon: <></>,
  },
  {
    title: "Total Expenses",
    value: "$62,000",
    subtitle: (
      <span>
        <span className="text-green-500">+6.9% </span>
        <span className="text-muted-foreground">This Month</span>
      </span>
    ),
    color: "bg-white",
    icon: <></>,
  },
  {
    title: "Net Profit",
    value: "$163,000",
    subtitle: (
      <span>
        <span className="text-green-500">+16.4% </span>
        <span className="text-muted-foreground">This Month</span>
      </span>
    ),
    color: "bg-white",
    icon: <></>,
  },
  {
    title: "Profit Margin",
    value: "72.4%",
    subtitle: (
      <span>
        <span className="text-green-500">+2.1% </span>
        <span className="text-muted-foreground">This Month</span>
      </span>
    ),
    color: "bg-white",
    icon: <></>,
  },
];

export default function AllTransactions() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Financial Reports"
        subtitle="Comprehensive financial analytics and reporting"
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
          <Button className="bg-green-500 hover:bg-green-600">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </PageHeader>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            color={stat.color}
            subtitle={stat.subtitle}
            icon={stat.icon}
            iconDirection="right"
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent>
            <h3 className="mb-4 text-lg font-medium">
              Revenue vs Profit Trend
            </h3>
            <RevenueProfitTrendChart height={300} />
          </CardContent>
        </Card>

        <RevenueByServiceChart height={300} showLegend={false} />
      </div>

      <Card>
        <CardContent>
          <h3 className="mb-4 text-lg font-medium">
            Daily Revenue (This Week)
          </h3>
          <DailyRevenueChart height={300} />
        </CardContent>
      </Card>

      {/* Quick Reports */}
      <Card>
        <CardContent>
          <h3 className="mb-4 text-lg font-medium">Quick Reports</h3>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Monthly Revenue Report",
                subtitle: "Comprehensive monthly revenue breakdown",
                icon: <FileText />,
              },
              {
                title: "Driver Earnings Report",
                subtitle: "Detailed driver earnings and payouts",
                icon: <DollarSign />,
              },
              {
                title: "Tax Summary Report",
                subtitle: "Tax-ready financial summary",
                icon: <FileText />,
              },
              {
                title: "Transaction History",
                subtitle: "Complete transaction logs",
                icon: <FileText />,
              },
            ].map((r) => (
              <div
                key={r.title}
                className="flex flex-col  justify-between p-4 rounded-lg bg-white border border-slate-100 shadow-sm"
              >
                <div className="flex gap-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-green-50 text-green-600">
                    {r.icon}
                  </div>

                  <div className="space-y-4">
                    <div className="mb-1 font-medium">{r.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {r.subtitle}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 bg-slate-50 border-slate-200"
                    >
                      <Download className="h-4 w-4" />
                      Generate
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary mini-cards */}
      <div className="grid gap-4 md:grid-cols-1">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent>
              <h4 className="mb-3 font-medium">Top Revenue Sources</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Airport Transfers</span>
                  <span className="text-green-600">$45,000</span>
                </li>
                <li className="flex justify-between">
                  <span>Downtown Routes</span>
                  <span className="text-green-600">$38,000</span>
                </li>
                <li className="flex justify-between">
                  <span>Long Distance</span>
                  <span className="text-green-600">$28,000</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h4 className="mb-3 font-medium">Top Expenses</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Driver Payouts</span>
                  <span className="text-red-600">$42,000</span>
                </li>
                <li className="flex justify-between">
                  <span>Platform Fees</span>
                  <span className="text-red-600">$12,000</span>
                </li>
                <li className="flex justify-between">
                  <span>Marketing</span>
                  <span className="text-red-600">$8,000</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h4 className="mb-3 font-medium">Growth Metrics</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>MoM Revenue Growth</span>
                  <span className="text-green-600">+13.5%</span>
                </li>
                <li className="flex justify-between">
                  <span>Customer Acquisition</span>
                  <span className="text-green-600">+245</span>
                </li>
                <li className="flex justify-between">
                  <span>Churn Rate</span>
                  <span className="text-red-600">-2.1%</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
