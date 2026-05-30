"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Briefcase,
  Users2,
  FileText,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  PlusCircle,
  UserPlus,
} from "lucide-react";

const stats = [
  {
    title: "Total Jobs",
    value: "48",
    change: "+12%",
    trend: "up" as const,
    description: "Active job postings",
    icon: Briefcase,
    accent: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    title: "Total Candidates",
    value: "1,284",
    change: "+8.3%",
    trend: "up" as const,
    description: "Registered applicants",
    icon: Users2,
    accent: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    title: "Total Applications",
    value: "3,971",
    change: "-2.1%",
    trend: "down" as const,
    description: "Submitted applications",
    icon: FileText,
    accent: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
];

const recentActivities = [
  {
    id: 1,
    action: "applied for",
    target: "Senior Frontend Engineer",
    user: "Sarah Chen",
    time: "2 hours ago",
    icon: FileText,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    id: 2,
    action: "moved to Interview stage",
    target: "Data Analyst",
    user: "Priya Patel",
    time: "4 hours ago",
    icon: UserPlus,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
  {
    id: 3,
    action: "posted a new job",
    target: "DevOps Engineer",
    user: "Admin",
    time: "1 day ago",
    icon: PlusCircle,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    id: 4,
    action: "was hired for",
    target: "Marketing Manager",
    user: "David Kim",
    time: "2 days ago",
    icon: CheckCircle2,
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-8">
      {/* Page header */}
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back! Here&apos;s an overview of your recruitment pipeline.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const TrendIcon =
              stat.trend === "up" ? TrendingUp : TrendingDown;
            const trendColor =
              stat.trend === "up" ? "text-emerald-400" : "text-red-400";

            return (
              <Card
                key={stat.title}
                className="relative overflow-hidden transition-all duration-200 hover:shadow-md hover:shadow-black/20"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardDescription className="text-xs font-medium uppercase tracking-wider">
                        {stat.title}
                      </CardDescription>
                      <p className="mt-2 font-heading text-4xl font-bold tabular-nums text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${stat.bg} border ${stat.border}`}
                    >
                      <Icon className={`size-5 ${stat.accent}`} />
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`flex cursor-help items-center gap-1 text-xs font-semibold ${trendColor}`}
                          >
                            <TrendIcon className="size-3.5" />
                            <span>{stat.change}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Compared to last month</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8">
          <h2 className="mb-4 font-heading text-base font-semibold text-foreground">
            Recent Activity
          </h2>
          <Card className="border-border bg-card">
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 p-4 transition-colors hover:bg-muted/30 sm:p-5"
                    >
                      <div
                        className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full ${activity.iconBg}`}
                      >
                        <Icon className={`size-4 ${activity.iconColor}`} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-foreground">
                          {activity.user}{" "}
                          <span className="font-normal text-muted-foreground">
                            {activity.action}
                          </span>{" "}
                          {activity.target}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
