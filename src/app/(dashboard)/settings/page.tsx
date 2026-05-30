import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";

export const metadata = {
  title: "Settings — HireFlow",
};

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            Settings
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="mb-6 rounded-lg border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-blue-500 flex items-start gap-3">
          <Info className="size-5 shrink-0 mt-0.5" />
          <p>
            <strong>Dummy Page:</strong> This settings page is a functional UI mockup created for the technical test. Any changes made here will not be permanently saved.
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your account&apos;s profile information and email address.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input defaultValue="Admin User" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input defaultValue="admin@hireflow.io" />
              </div>
              <Button className="mt-4">Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Ensure your account is using a long, random password to stay secure.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <Input type="password" />
              </div>
              <Button className="mt-4">Update Password</Button>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
