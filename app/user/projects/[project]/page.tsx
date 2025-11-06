import { notFound } from "next/navigation";

import { requireUser } from "@/app/user/_lib/require-user";
import { UserDashboardLayout } from "@/components/user/user-dashboard-layout";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getProjectBySlug } from "@/lib/projects";

interface ProjectPageProps {
  params: { project: string };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.project);

  if (!project) {
    notFound();
  }

  const user = await requireUser(`/user/projects/${params.project}`);

  return (
    <UserDashboardLayout
      user={user}
      title={project.title}
      subtitle="Track milestones, metrics, and collaborators"
    >
      <Card className="grid gap-4 p-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          <CardTitle className="text-lg">Overview</CardTitle>
          <CardDescription>{project.description}</CardDescription>

          {/* Project milestones are not stored in DB yet; leave placeholder */}
          <div className="mt-4 space-y-3">
            <div className="text-sm text-muted-foreground">No milestones available.</div>
          </div>
        </div>
        <div className="space-y-3">
          <CardTitle className="text-lg">Key metrics</CardTitle>
          <div className="grid gap-3">
            <div className="border-border/60 bg-muted/40 rounded-lg border px-3 py-3 text-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Created</p>
              <p className="text-base font-semibold">{new Date(project.createdAt).toLocaleString()}</p>
            </div>
            <div className="border-border/60 bg-muted/40 rounded-lg border px-3 py-3 text-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Tags</p>
              <p className="text-base font-semibold">{project.tags?.join ? project.tags.join(', ') : project.tags}</p>
            </div>
          </div>
        </div>
      </Card>
    </UserDashboardLayout>
  );
}
