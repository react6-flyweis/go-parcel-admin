import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function SecuritySettings() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-3">
        <Shield className="h-5 w-5 text-muted-foreground" />

        <CardTitle>Security Settings</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <div className="text-sm font-medium">
                Two-Factor Authentication
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Require 2FA for all admin users
              </div>
            </div>

            <div className="flex items-center">
              <Switch defaultChecked aria-label="toggle-2fa" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <div className="text-sm font-medium">Session Timeout</div>
              <div className="text-sm text-muted-foreground mt-1">
                Auto logout after inactivity
              </div>
            </div>

            <div className="text-sm text-muted-foreground">30</div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <div className="text-sm font-medium">IP Whitelisting</div>
              <div className="text-sm text-muted-foreground mt-1">
                Restrict admin access by IP
              </div>
            </div>

            <div className="flex items-center">
              <Switch aria-label="toggle-ip-whitelist" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
