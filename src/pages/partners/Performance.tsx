import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FilterPanel from "@/components/FilterPanel";
import PageHeader from "@/components/PageHeader";
import {
  Star,
  DollarSign,
  User,
  CheckCircle,
  Navigation,
  Clock,
  TrendingUp,
} from "lucide-react";
import StatCard2 from "@/components/StatCard2";
import WeeklyRevenuePerformanceChart from "@/components/charts/WeeklyRevenuePerformanceChart";
import RatingDistributionChart from "@/components/charts/RatingDistributionChart";
import PerformanceLeaderboadTable from "@/components/partners/PerformanceLeaderboadTable";
import TopPerformers from "@/components/partners/TopPerformers";

const statCards = [
  {
    title: "Avg Rating",
    value: "4.8",
    subtitle: "Across all users",
    Icon: <Star className="h-8 w-8 text-white fill-gray-100" />,
    className: "text-white bg-green-600",
  },
  {
    title: "Total Trips",
    value: "6,044",
    subtitle: (
      <span className="text-xs text-green-600 flex items-center gap-1">
        <TrendingUp className="size-3 text-green-600" />
        +18% vs last month
      </span>
    ),
    Icon: <Navigation className="h-8 w-8 text-green-500" />,
  },
  {
    title: "On-Time Rate",
    value: "93%",

    subtitle: (
      <span className="text-xs text-green-600 flex items-center gap-1">
        <CheckCircle className="h-3 w-3 text-green-600" />
        Excellent
      </span>
    ),
    Icon: <Clock className="h-8 w-8 text-sky-400" />,
  },
  {
    title: "Total Revenue",
    value: "$242K",
    subtitle: <span className="text-xs text-green-600">$ This month</span>,
    Icon: <DollarSign className="h-8 w-8 text-green-500" />,
  },
];

const topPerformers = [
  {
    rank: 1,
    name: "Michael Johnson",
    role: "Driver",
    tier: "Gold",
    rating: "4.9",
    trips: "1220",
    color: "bg-amber-400",
  },
  {
    rank: 2,
    name: "Express Delivery LLC",
    role: "Partner",
    tier: "Platinum",
    rating: "4.8",
    trips: "2290",
    color: "bg-slate-400",
  },
  {
    rank: 3,
    name: "Sarah Williams",
    role: "Driver",
    tier: "Silver",
    rating: "4.7",
    trips: "870",
    color: "bg-orange-500",
  },
];
export default function DriverManagement() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance Analytics"
        subtitle="Track and analyze driver and partner performance metrics"
        Icon={<User className="size-6" />}
        iconColor="bg-green-600"
      >
        <div className="flex items-center gap-2">
          <Button variant="outline">Last 30 Days</Button>
          <Button variant="outline">Export Report</Button>
        </div>
      </PageHeader>

      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <StatCard2
            key={s.title}
            title={s.title}
            value={s.value}
            subtitle={s.subtitle}
            Icon={s.Icon}
            className={s.className}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Revenue Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <WeeklyRevenuePerformanceChart />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <RatingDistributionChart height={300} />
          </CardContent>
        </Card>
      </div>

      {/* Top performers this month */}
      <TopPerformers performers={topPerformers} />

      {/* Search and Filter Section */}
      <FilterPanel />

      {/* Drivers Table */}
      <PerformanceLeaderboadTable />
    </div>
  );
}
