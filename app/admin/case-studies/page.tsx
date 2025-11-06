import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AdminPageHeader } from '@/components/admin/page-header';
import { getAllProjects } from '@/lib/projects';
import { BadgeCheck, BookOpenCheck, FilePenLine, Sparkles } from 'lucide-react';

const workflow = [
  {
    title: 'Discovery call recap',
    owner: 'Idowu',
    status: 'In review',
    due: 'Today',
  },
  {
    title: 'Results section refresh',
    owner: 'Alex',
    status: 'Draft',
    due: 'Tomorrow',
  },
  {
    title: 'Visual asset handoff',
    owner: 'Jamie',
    status: 'Published',
    due: 'Shipped',
  },
];

export default async function AdminCaseStudiesPage() {
  const projects = await getAllProjects();

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-6 sm:p-6">
      <AdminPageHeader
        title="Case studies"
        description="Orchestrate long-form stories that highlight outcomes and client transformations."
        actions={
          <Button variant="outline" asChild>
            <Link prefetch={false} href="/projects">
              View live stories
            </Link>
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <div className="border-border bg-card/40 rounded-xl border p-4 sm:p-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Featured case studies</h2>
              <p className="text-muted-foreground text-sm">
                Update hero stories and pin the work that best represents your capabilities.
              </p>
            </div>
            <Button size="sm">Create draft</Button>
          </div>

          <div className="mt-4 space-y-3">
            {projects.slice(0, 5).map((project, index) => (
              <div
                key={project.slug}
                className="border-border/60 bg-muted/30 rounded-lg border px-4 py-3"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-base font-medium">{project.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                      index < 2
                        ? 'bg-emerald-500/10 text-emerald-600'
                        : index === 2
                          ? 'bg-amber-500/10 text-amber-600'
                          : 'bg-slate-500/10 text-slate-600'
                    }`}
                  >
                    {index < 2 ? 'Published' : index === 2 ? 'In review' : 'Draft'}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    {index < 2 ? 'Live on portfolio' : 'Queued for publication'}
                  </span>
                  {project.tags?.length ? (
                    <span className="inline-flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5" />
                      {project.tags.slice(0, 2).join(' · ')}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-border bg-card/40 rounded-xl border p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Production board</h2>
            <Button variant="ghost" size="sm">
              View all tasks
            </Button>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">
            Coordinate writing, design, and approvals across the team.
          </p>

          <div className="mt-4 space-y-3">
            {workflow.map((item) => (
              <div
                key={item.title}
                className="border-border/60 bg-muted/20 flex items-center justify-between rounded-lg border px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-muted-foreground text-xs">
                    Owner: {item.owner} · Due {item.due}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground">
                  {item.status}
                  <FilePenLine className="h-3.5 w-3.5" />
                </span>
              </div>
            ))}
          </div>

          <div className="border-border/70 bg-muted/20 mt-6 rounded-lg border px-4 py-3 text-sm">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              <BookOpenCheck className="h-4 w-4" />
              Editorial tips
            </div>
            <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
              Repurpose high-performing newsletter issues into long-form case studies. Highlight measurable results within the first two paragraphs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
