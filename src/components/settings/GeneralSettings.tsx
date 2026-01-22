import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";

export default function GeneralSettings() {
  return (
    <>
      <Card>
        <CardHeader className="flex items-center gap-3">
          <Globe className="h-5 w-5 text-muted-foreground" />

          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">
                  Company Name
                </div>
                <div className="mt-1">GoParcel</div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">
                  Support Phone
                </div>
                <div className="mt-1">+1-800-GOPARCEL</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">
                  Support Email
                </div>
                <div className="mt-1">support@goparcel.com</div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">
                  Default Timezone
                </div>
                <div className="mt-1">America/New_York</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Operational Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <div
                key={day}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="text-sm">{day}</div>

                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground">06:00 AM</div>
                  <div className="text-sm">to</div>
                  <div className="text-sm text-muted-foreground">11:00 PM</div>

                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only peer"
                    />
                    <div className="w-10 h-6 bg-muted/80 rounded-full peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-green-300 transition-colors" />
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-transform shadow" />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
