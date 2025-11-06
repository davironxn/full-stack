"use client";

import { memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Clock, Users } from "lucide-react";

// Project type previously imported from `data/projects` (DOM fixtures).
// This component now expects a `DashboardProject[]` prop passed in by callers.

export interface DashboardProject {
  id: number;
  slug: string;
  title: string;
  description: string;
  url?: string;
  imageUrl?: string;
  tags: string[]; // ✅ array, not string
  status: string;
  statusLabel: string;
  updatedAt: string;
  leads: number;
  createdAt: Date;
}


interface AdminProjectsTableProps {
  projects: DashboardProject[];
  onAddProject: () => void;
}

const statusStyles: Record<string, string> = {
  Published: "bg-emerald-500/10 text-emerald-600",
  Review: "bg-amber-500/10 text-amber-600",
  Draft: "bg-slate-500/10 text-slate-600",
};

export const AdminProjectsTable = memo(
  ({ projects, onAddProject }: AdminProjectsTableProps) => {
    return (
      <div className="border-border bg-card/40 rounded-xl border p-4 sm:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold sm:text-xl">Active projects</h3>
            <p className="text-muted-foreground text-sm">
              Track publishing status and lead flow for featured work
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={onAddProject}>
            Add project
          </Button>
        </div>

        <div className="space-y-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="hover:bg-accent/50 group rounded-lg border border-transparent p-4 transition-colors"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-base font-medium sm:text-lg">{project.title}</h4>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        statusStyles[project.status] ?? "bg-slate-500/10 text-slate-600"
                      }`}
                    >
                      {project.statusLabel}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      Updated {project.updatedAt}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {project.leads} leads
                    </span>
                    {project.tags?.length ? (
                      <span className="inline-flex items-center gap-1">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                        {project.tags.slice(0, 2).join(" · ")}
                        {project.tags.length > 2 ? "…" : ""}
                      </span>
                    ) : null}
                  </div>
                </div>

                <Button variant="ghost" size="sm" asChild>
                  <Link prefetch={false} href={`/projects/${project.slug}`} className="flex items-center gap-1">
                    View case study
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  },
);

AdminProjectsTable.displayName = "AdminProjectsTable";
