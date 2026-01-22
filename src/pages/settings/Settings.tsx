import PageHeader from "@/components/PageHeader";
import GeneralSettings from "@/components/settings/GeneralSettings";
import PricingSettings from "@/components/settings/PricingSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import ServiceToggles from "@/components/settings/ServiceToggles";
import SecuritySettings from "@/components/settings/SecuritySettings";
import FeatureFlags from "@/components/settings/FeatureFlags";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Settings() {
  return (
    <div className="">
      <PageHeader
        title="Settings & Configuration"
        subtitle="Configure system settings, pricing, and operational rules"
      >
        <Button>Save All Changes</Button>
      </PageHeader>

      <div className="mt-6">
        <Tabs defaultValue="general">
          <TabsList className="w-full rounded-full bg-muted/80 p-1">
            <TabsTrigger
              className="text-sm px-4 py-1 rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground"
              value="general"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              className="text-sm px-4 py-1 rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground"
              value="pricing"
            >
              Pricing
            </TabsTrigger>
            <TabsTrigger
              className="text-sm px-4 py-1 rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground"
              value="notifications"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger
              className="text-sm px-4 py-1 rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground"
              value="services"
            >
              Services
            </TabsTrigger>
            <TabsTrigger
              className="text-sm px-4 py-1 rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground"
              value="security"
            >
              Security
            </TabsTrigger>
            <TabsTrigger
              className="text-sm px-4 py-1 rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground"
              value="features"
            >
              Features
            </TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <TabsContent value="general">
              <GeneralSettings />
            </TabsContent>

            <TabsContent value="pricing">
              <PricingSettings />
            </TabsContent>
            <TabsContent value="notifications">
              <NotificationSettings />
            </TabsContent>
            <TabsContent value="services">
              <ServiceToggles />
            </TabsContent>
            <TabsContent value="security">
              <SecuritySettings />
            </TabsContent>
            <TabsContent value="features">
              <FeatureFlags />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
