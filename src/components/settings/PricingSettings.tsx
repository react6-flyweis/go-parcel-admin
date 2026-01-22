import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export default function PricingSettings() {
  return (
    <>
      <Card>
        <CardHeader className="flex items-center gap-3">
          <DollarSign className="h-5 w-5 text-muted-foreground" />

          <CardTitle>Pricing Configuration</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="text-lg font-medium">Parcel Delivery Pricing</div>

              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <div className="text-sm text-muted-foreground">Base Rate</div>
                  <div className="mt-1">5.00</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">
                    Per KM Rate
                  </div>
                  <div className="mt-1">1.50</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">
                    Per KG Rate
                  </div>
                  <div className="mt-1">0.75</div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-lg font-medium">Ride Pricing</div>

              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <div className="text-sm text-muted-foreground">Base Fare</div>
                  <div className="mt-1">3.00</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">
                    Per KM Rate
                  </div>
                  <div className="mt-1">2.00</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">
                    Per Minute Rate
                  </div>
                  <div className="mt-1">0.50</div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-lg font-medium">Commission Rates</div>

              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <div className="text-sm text-muted-foreground">
                    Merchant Commission (%)
                  </div>
                  <div className="mt-1">12.5</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">
                    Driver Commission (%)
                  </div>
                  <div className="mt-1">80</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Surge Pricing</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-center">
            <div>
              <div className="text-sm font-medium">Enable Surge Pricing</div>
              <div className="text-sm text-muted-foreground mt-1">
                Automatically adjust prices during high demand
              </div>
            </div>

            <div className="flex items-center justify-end">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-muted/80 rounded-full peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-green-300 transition-colors" />
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-transform shadow" />
              </label>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">
                Max Surge Multiplier
              </div>
              <div className="mt-1">2.5</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">
                Demand Threshold (%)
              </div>
              <div className="mt-1">75</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
