import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LifeBuoy, Mail, Info } from "lucide-react";

export const metadata = {
  title: "Help & Support — HireFlow",
};

export default function SupportPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            Help & Support
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Need assistance? Find answers to common questions or contact our team.
          </p>
        </div>

        <div className="mb-6 rounded-lg border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-blue-500 flex items-start gap-3">
          <Info className="size-5 shrink-0 mt-0.5" />
          <p>
            <strong>Dummy Page:</strong> This help & support page is a UI mockup created for the technical test. The buttons below are visually functional but do not send actual emails.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="flex flex-col">
            <CardHeader>
              <LifeBuoy className="size-8 text-primary mb-2" />
              <CardTitle>Knowledge Base</CardTitle>
              <CardDescription>
                Browse our detailed guides and tutorials to get the most out of HireFlow ATS.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button variant="outline" className="w-full">View Articles</Button>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <Mail className="size-8 text-primary mb-2" />
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Can&apos;t find what you&apos;re looking for? Our team is ready to help you 24/7.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button className="w-full">Email Us</Button>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
