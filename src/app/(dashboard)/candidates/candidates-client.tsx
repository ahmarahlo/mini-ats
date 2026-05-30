"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

// ── Types ─────────────────────────────────────────────────────────────────────

type Stage = "Applied" | "Interview" | "Hired";

interface Candidate {
  id: string;
  name: string;
  initials: string;
  role: string;
}

interface Column {
  stage: Stage;
  topBorder: string;
  badgeClass: string;
  avatarClass: string;
  candidates: Candidate[];
}

// ── Data ──────────────────────────────────────────────────────────────────────

const INITIAL_COLUMNS: Column[] = [
  {
    stage: "Applied",
    topBorder: "border-t-blue-500",
    badgeClass: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    avatarClass: "bg-blue-500/15 text-blue-400",
    candidates: [
      { id: "c1", name: "Sarah Chen", initials: "SC", role: "Senior Frontend Engineer" },
      { id: "c2", name: "Marcus Williams", initials: "MW", role: "Product Designer" },
      { id: "c3", name: "Priya Patel", initials: "PP", role: "Data Analyst" },
    ],
  },
  {
    stage: "Interview",
    topBorder: "border-t-amber-500",
    badgeClass: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    avatarClass: "bg-amber-500/15 text-amber-400",
    candidates: [
      { id: "c4", name: "James Rodriguez", initials: "JR", role: "Backend Engineer" },
      { id: "c5", name: "Emily Thompson", initials: "ET", role: "DevOps Engineer" },
    ],
  },
  {
    stage: "Hired",
    topBorder: "border-t-emerald-500",
    badgeClass: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    avatarClass: "bg-emerald-500/15 text-emerald-400",
    candidates: [
      { id: "c6", name: "David Kim", initials: "DK", role: "Marketing Manager" },
      { id: "c7", name: "Aisha Johnson", initials: "AJ", role: "HR Specialist" },
    ],
  },
];

export default function CandidatesClient() {
  const [columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const totalCandidates = columns.reduce((acc, col) => acc + col.candidates.length, 0);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside a list
    if (!destination) return;

    // Dropped in the same place
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColIndex = columns.findIndex((c) => c.stage === source.droppableId);
    const destColIndex = columns.findIndex((c) => c.stage === destination.droppableId);

    const sourceCol = columns[sourceColIndex];
    const destCol = columns[destColIndex];

    const sourceCandidates = [...sourceCol.candidates];
    const destCandidates = [...destCol.candidates];

    // Remove from source
    const [movedCandidate] = sourceCandidates.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      // Reordering in the same column
      sourceCandidates.splice(destination.index, 0, movedCandidate);
      const newColumns = [...columns];
      newColumns[sourceColIndex] = { ...sourceCol, candidates: sourceCandidates };
      setColumns(newColumns);
    } else {
      // Moving to a different column
      destCandidates.splice(destination.index, 0, movedCandidate);
      const newColumns = [...columns];
      newColumns[sourceColIndex] = { ...sourceCol, candidates: sourceCandidates };
      newColumns[destColIndex] = { ...destCol, candidates: destCandidates };
      setColumns(newColumns);

      toast.success("Candidate moved", {
        description: `${movedCandidate.name} moved to ${destination.droppableId}.`,
      });
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Candidate Pipeline
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {totalCandidates} candidates across {columns.length} stages
        </p>
      </div>

      {/* Kanban board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {columns.map((col) => (
            <div key={col.stage} className="flex flex-col gap-3">
              {/* Column header */}
              <div className="flex items-center justify-between px-0.5">
                <h2 className="text-sm font-semibold text-foreground">{col.stage}</h2>
                <Badge variant="outline" className={col.badgeClass}>
                  {col.candidates.length}
                </Badge>
              </div>

              {/* Column body */}
              <Droppable droppableId={col.stage}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex min-h-64 flex-col gap-2.5 rounded-lg border border-t-2 border-border p-3 transition-colors ${
                      col.topBorder
                    } ${snapshot.isDraggingOver ? "bg-muted/40" : "bg-muted/20"}`}
                  >
                    {col.candidates.map((candidate, index) => (
                      <Draggable key={candidate.id} draggableId={candidate.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => setSelectedCandidate(candidate)}
                            className={`touch-none rounded-lg border border-border p-3.5 transition-colors ${
                              snapshot.isDragging
                                ? "bg-accent/80 shadow-md ring-1 ring-ring/50 cursor-grabbing"
                                : "bg-card hover:bg-muted/50 cursor-grab"
                            }`}
                            style={{
                              ...provided.draggableProps.style,
                            }}
                          >
                            <div className="flex items-center gap-3">
                              {/* Avatar placeholder */}
                              <div
                                className={`flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${col.avatarClass}`}
                                aria-hidden="true"
                              >
                                {candidate.initials}
                              </div>

                              {/* Candidate info */}
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-foreground">
                                  {candidate.name}
                                </p>
                                <p className="truncate text-xs text-muted-foreground">
                                  {candidate.role}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Candidate CV Sheet */}
      <Sheet open={!!selectedCandidate} onOpenChange={(open) => !open && setSelectedCandidate(null)}>
        <SheetContent className="sm:max-w-md w-full overflow-y-auto p-6 sm:p-8">
          {selectedCandidate && (
            <>
              <SheetHeader className="mb-8 mt-4">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                    {selectedCandidate.initials}
                  </div>
                  <div className="text-left min-w-0">
                    <SheetTitle className="text-xl truncate">{selectedCandidate.name}</SheetTitle>
                    <SheetDescription className="truncate">{selectedCandidate.role}</SheetDescription>
                  </div>
                </div>
              </SheetHeader>
              
              <div className="space-y-8">
                {/* Contact Info */}
                <div className="space-y-3 rounded-lg border border-border p-5 bg-muted/20">
                  <h3 className="text-sm font-semibold">Contact Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-2 text-sm">
                    <div className="text-muted-foreground">Email:</div>
                    <div className="font-medium truncate" title={`${selectedCandidate.name.toLowerCase().replace(' ', '.')}@example.com`}>
                      {selectedCandidate.name.toLowerCase().replace(' ', '.')}@example.com
                    </div>
                    <div className="text-muted-foreground">Phone:</div>
                    <div className="font-medium">+1 (555) 123-4567</div>
                    <div className="text-muted-foreground">Location:</div>
                    <div className="font-medium">Remote</div>
                  </div>
                </div>

                {/* Mock CV / Resume Document */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 flex items-center justify-between">
                    Resume / CV
                    <Badge variant="secondary" className="text-[10px]">PDF</Badge>
                  </h3>
                  <div className="rounded-xl border border-border bg-card p-5 sm:p-7 shadow-sm">
                    <div className="mb-5 border-b border-border pb-5">
                      <h4 className="text-lg font-bold text-foreground">{selectedCandidate.name}</h4>
                      <p className="text-sm text-primary font-medium">{selectedCandidate.role}</p>
                    </div>
                    
                    <div className="space-y-6 text-sm text-muted-foreground">
                      <div>
                        <p className="font-semibold text-foreground mb-1.5">Professional Summary</p>
                        <p className="leading-relaxed">Experienced professional with a proven track record in developing scalable solutions. Passionate about creating elegant, user-centric products and improving team workflows.</p>
                      </div>
                      
                      <div>
                        <p className="font-semibold text-foreground mb-2">Experience</p>
                        <ul className="list-disc pl-4 space-y-3">
                          <li>
                            <span className="font-medium text-foreground">Tech Corp</span> — Senior Role (2020 - Present)
                            <div className="mt-1">Led multiple high-impact projects resulting in 30% increase in efficiency.</div>
                          </li>
                          <li>
                            <span className="font-medium text-foreground">Startup Inc</span> — Mid-level Role (2018 - 2020)
                            <div className="mt-1">Developed core product features and mentored junior team members.</div>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="font-semibold text-foreground mb-1.5">Education</p>
                        <p>B.S. in Computer Science — University of Technology (2018)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
