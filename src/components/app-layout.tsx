"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close sheet on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <main className="flex flex-1 flex-col overflow-hidden bg-background">
        {/* Mobile Header */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border px-4 md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="-ml-2">
                <Menu className="size-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Access dashboard features and settings.
              </SheetDescription>
              <Sidebar />
            </SheetContent>
          </Sheet>
          <div className="font-heading text-sm font-semibold text-foreground">
            HireFlow
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
