import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

export interface Performer {
  rank: number;
  name: string;
  role: string;
  tier: string;
  rating: string;
  trips: string;
  color?: string;
}

export default function TopPerformers({
  performers,
}: {
  performers: Performer[];
}) {
  const tierColorMap: Record<string, string> = {
    Gold: "bg-amber-400",
    Platinum: "bg-violet-500",
    Silver: "bg-slate-400",
    Bronze: "bg-amber-600",
  };
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-yellow-500" />
          <CardTitle>Top Performers This Month</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {performers.map((p) => {
            const avatarColor =
              p.color ?? tierColorMap[p.tier] ?? "bg-gray-400";
            const badgeColor = tierColorMap[p.tier] ?? "bg-gray-200";
            return (
              <div key={p.rank} className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-10 w-10 shrink-0 flex items-center justify-center rounded-full text-white ${avatarColor}`}
                    >
                      {p.rank}
                    </div>
                    <div>
                      <div className="text-lg font-semibold">{p.name}</div>
                      <div className="mt-1 text-xs inline-block rounded-md border px-2 py-0.5">
                        {p.role}
                      </div>
                    </div>
                  </div>

                  <div className="ml-auto">
                    <span
                      className={`${badgeColor} inline-block rounded-md text-white text-sm px-3 py-1`}
                    >
                      {p.tier}
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-md bg-amber-50 p-4 text-center">
                    <div className="text-sm text-muted-foreground">Rating</div>
                    <div className="text-2xl font-bold text-amber-700">
                      {p.rating}
                    </div>
                  </div>
                  <div className="rounded-md bg-emerald-50 p-4 text-center">
                    <div className="text-sm text-muted-foreground">Trips</div>
                    <div className="text-2xl font-bold text-emerald-600">
                      {p.trips}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
