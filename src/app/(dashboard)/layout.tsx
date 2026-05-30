import AppLayout from "@/components/app-layout";
import { PageTransition } from "@/components/page-transition";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout>
      <PageTransition>{children}</PageTransition>
    </AppLayout>
  );
}
