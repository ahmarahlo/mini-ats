"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Briefcase, Users2, Zap, LogOut, Settings, LifeBuoy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/candidates", label: "Candidates", icon: Users2 },
];

const secondaryNavItems = [
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/support", label: "Help & Support", icon: LifeBuoy },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-sidebar-border px-6 py-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/30">
          <Zap className="size-4 text-primary-foreground" />
        </div>
        <div>
          <p className="font-heading text-sm font-semibold leading-none text-sidebar-foreground">
            HireFlow
          </p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">ATS Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-6">
        <div>
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Main Menu
          </p>
          <ul className="space-y-0.5">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 relative",
                      isActive
                        ? "bg-sidebar-primary/10 text-sidebar-primary-foreground shadow-sm"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-md bg-primary" />
                    )}
                    <Icon
                      className={cn(
                        "size-4 shrink-0 transition-colors",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-sidebar-accent-foreground"
                      )}
                    />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Preferences
          </p>
          <ul className="space-y-0.5">
            {secondaryNavItems.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-all duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Icon className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-sidebar-accent-foreground" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        <div className="mb-4 flex items-center gap-3 px-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
            U
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-sidebar-foreground">
              User Account
            </p>
            <p className="truncate text-[10px] text-muted-foreground">
              admin@hireflow.io
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0 text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={() => {
              toast.info("Logged out successfully");
              router.push("/login");
            }}
            title="Log out"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
        
        <div className="px-2 text-[10px] text-muted-foreground/60 text-center">
          &copy; {new Date().getFullYear()} HireFlow Inc. <br /> All rights reserved.
        </div>
      </div>
    </aside>
  );
}
