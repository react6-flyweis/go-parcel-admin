import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FilterPanel from "@/components/FilterPanel";
import PageHeader from "@/components/PageHeader";
import {
  PlusIcon,
  AlertTriangle,
  Truck,
  Settings,
  CheckCircle,
} from "lucide-react";
import CreateVehicleDialog from "@/components/fleet/CreateVehicleDialog";
import StatCard2 from "@/components/StatCard2";
import FleetCompositionChart from "@/components/charts/FleetCompositionChart";
import AllVehiclesTable from "@/components/fleet/AllVehiclesTable";

const statCards = [
  {
    title: "Total Vehicles",
    value: "123",
    subtitle: "98 Active",
    Icon: <Truck className="h-8 w-8 text-white" />,
    className: "text-white bg-gradient-to-r from-[#3B82F6] to-[#60A5FA]",
  },
  {
    title: "In Service",
    value: "8",
    subtitle: (
      <span className="inline-flex items-center">
        <Settings className="h-4 w-4 mr-2 text-yellow-500" />
        <span className="text-xs text-gray-600">Maintenance</span>
      </span>
    ),
    Icon: <Settings className="h-8 w-8 text-yellow-500" />,
  },
  {
    title: "Service Due",
    value: "12",
    subtitle: (
      <span className="inline-flex items-center">
        <AlertTriangle className="h-4 w-4 mr-2 text-orange-500" />
        <span className="text-xs text-orange-600">This month</span>
      </span>
    ),
    Icon: <AlertTriangle className="h-8 w-8 text-orange-500" />,
  },
  {
    title: "Utilization",
    value: "84%",
    subtitle: (
      <span className="inline-flex items-center">
        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
        <span className="text-xs text-green-600">Good performance</span>
      </span>
    ),
    Icon: <CheckCircle className="h-8 w-8 text-green-500" />,
  },
];

export default function VehicleFleet() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Vehicle Fleet"
        subtitle="Manage and monitor all vehicles in your fleet"
        Icon={<Truck className="h-6 w-6" />}
        iconColor="bg-green-500"
      >
        <CreateVehicleDialog>
          <Button className="bg-green-500 hover:bg-green-600 flex items-center gap-2">
            <PlusIcon />
            Add Vehicle
          </Button>
        </CreateVehicleDialog>
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

      {/* Fleet Composition Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Fleet Composition</CardTitle>
        </CardHeader>
        <CardContent>
          <FleetCompositionChart height={260} />
        </CardContent>
      </Card>

      {/* Search and Filter Section */}
      <FilterPanel />

      {/* Partners Table */}

      <AllVehiclesTable />
    </div>
  );
}
