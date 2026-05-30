"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

type JobStatus = "Active" | "Closed";

interface Job {
  id: string;
  title: string;
  department: string;
  status: JobStatus;
  date: string;
}

// ── Mock data ────────────────────────────────────────────────────────────────

const INITIAL_JOBS: Job[] = [
  {
    id: "JOB-001",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    status: "Active",
    date: "2026-05-01",
  },
  {
    id: "JOB-002",
    title: "Product Designer",
    department: "Design",
    status: "Active",
    date: "2026-05-03",
  },
  {
    id: "JOB-003",
    title: "Marketing Manager",
    department: "Marketing",
    status: "Closed",
    date: "2026-04-15",
  },
  {
    id: "JOB-004",
    title: "Backend Engineer",
    department: "Engineering",
    status: "Active",
    date: "2026-05-10",
  },
  {
    id: "JOB-005",
    title: "Data Analyst",
    department: "Analytics",
    status: "Active",
    date: "2026-05-12",
  },
  {
    id: "JOB-006",
    title: "DevOps Engineer",
    department: "Engineering",
    status: "Closed",
    date: "2026-04-20",
  },
  {
    id: "JOB-007",
    title: "Sales Executive",
    department: "Sales",
    status: "Active",
    date: "2026-05-18",
  },
  {
    id: "JOB-008",
    title: "HR Specialist",
    department: "Human Resources",
    status: "Closed",
    date: "2026-04-28",
  },
];

const jobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  department: z.string().min(2, "Department must be at least 2 characters."),
  status: z.enum(["Active", "Closed"]),
});

type JobFormValues = z.infer<typeof jobSchema>;

// ── Component ────────────────────────────────────────────────────────────────

export default function JobsClient() {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | JobStatus>("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      department: "",
      status: "Active",
    },
  });

  // Watch status to use in Select component
  const formStatus = watch("status");

  // ── Derived filtered list ──────────────────────────────────────────────────

  const filtered = jobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // ── Handlers ──────────────────────────────────────────────────────────────

  const closeDialog = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      reset();
    }
  };

  const handleStatusChange = (jobId: string, newStatus: JobStatus) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
    toast.info("Status updated", {
      description: `Job ${jobId} marked as ${newStatus}.`,
    });
  };

  const onSubmit = (data: JobFormValues) => {
    const newJob: Job = {
      id: `JOB-${String(jobs.length + 1).padStart(3, "0")}`,
      title: data.title.trim(),
      department: data.department.trim(),
      status: data.status,
      date: new Date().toISOString().split("T")[0],
    };
    setJobs((prev) => [newJob, ...prev]);
    toast.success("Job added", {
      description: `${data.title} has been added successfully.`,
    });
    closeDialog(false);
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="p-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Jobs
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {jobs.length} position{jobs.length !== 1 ? "s" : ""} total
        </p>
      </div>

      {/* Search + filter bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="relative min-w-52 flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="jobs-search"
              placeholder="Search by job title…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>

          <Select
            value={statusFilter}
            onValueChange={(val) =>
              setStatusFilter(val as typeof statusFilter)
            }
          >
            <SelectTrigger id="status-filter" className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Add New Job dialog */}
        <Dialog open={dialogOpen} onOpenChange={closeDialog}>
          <DialogTrigger asChild>
            <Button id="open-add-job-dialog" size="sm">
              <Plus />
              Add New Job
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Job</DialogTitle>
              <DialogDescription className="sr-only">
                Fill out the form below to create a new job posting.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label htmlFor="form-job-title">Job Title</Label>
                <Input
                  id="form-job-title"
                  placeholder="e.g. Senior Frontend Engineer"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-xs text-destructive">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="form-job-dept">Department</Label>
                <Input
                  id="form-job-dept"
                  placeholder="e.g. Engineering"
                  {...register("department")}
                />
                {errors.department && (
                  <p className="text-xs text-destructive">{errors.department.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="form-job-status">Status</Label>
                <Select
                  value={formStatus}
                  onValueChange={(val) => setValue("status", val as JobStatus)}
                >
                  <SelectTrigger id="form-job-status" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-xs text-destructive">{errors.status.message}</p>
                )}
              </div>

              <DialogFooter className="mt-4">
                <Button id="submit-new-job" type="submit" className="w-full sm:w-auto">
                  Add Job
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Data table */}
      <div className="overflow-hidden rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="hidden w-28 pl-4 text-xs uppercase tracking-wider text-muted-foreground md:table-cell">
                ID
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                Title
              </TableHead>
              <TableHead className="hidden text-xs uppercase tracking-wider text-muted-foreground sm:table-cell">
                Department
              </TableHead>
              <TableHead className="w-28 text-xs uppercase tracking-wider text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="hidden w-36 pr-4 text-xs uppercase tracking-wider text-muted-foreground lg:table-cell">
                Date Posted
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  No jobs match your search criteria.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="hidden pl-4 font-mono text-xs text-muted-foreground md:table-cell">
                    {job.id}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {job.title}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {job.department}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={job.status}
                      onValueChange={(val) =>
                        handleStatusChange(job.id, val as JobStatus)
                      }
                    >
                      <SelectTrigger
                        className={`h-7 w-24 px-2.5 text-xs font-medium focus:ring-0 focus:ring-offset-0 ${
                          job.status === "Active"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            : "border-zinc-700 bg-zinc-800/50 text-zinc-500"
                        }`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="hidden pr-4 text-muted-foreground lg:table-cell">
                    {new Date(job.date + "T00:00:00").toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric", year: "numeric" }
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Row count */}
      {filtered.length > 0 && (
        <p className="mt-3 text-xs text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">{filtered.length}</span>{" "}
          of{" "}
          <span className="font-medium text-foreground">{jobs.length}</span>{" "}
          jobs
        </p>
      )}
    </div>
  );
}
