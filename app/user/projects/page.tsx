import Link from "next/link";

import { requireUser } from "@/app/user/_lib/require-user";
import { UserDashboardLayout } from "@/components/user/user-dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const projects = [
  {
    slug: "product-launch",
    name: "Product Launch",
    status: "On track",
    summary: "Coordinate marketing assets, support docs, and release logistics.",
    progress: 78,
  },
  {
    slug: "mobile-app",
    name: "Mobile App",
    status: "Needs review",
    summary: "QA sign-off and final bug sweeps before submitting to the store.",
    progress: 54,
  },
  {
    slug: "marketing-site",
    name: "Marketing Site refresh",
    status: "In progress",
    summary: "Finalize hero concepts and developer handoff for new components.",
    progress: 32,
  },
];

export default async function ProjectsPage() {
  const user = await requireUser("/user/projects");

  return (
    <UserDashboardLayout
      user={user}
      title="Projects"
      subtitle="See how each initiative is progressing"
      actions={
        <Button asChild size="sm">
          <Link href="/user/projects/new">New project</Link>
        </Button>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>In-flight projects</CardTitle>
          <CardDescription>Keep work moving by reviewing blockers and next steps.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="border-border/70 bg-background/60 flex flex-col gap-4 rounded-xl border p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold">{project.name}</h3>
                  <p className="text-xs text-muted-foreground">{project.summary}</p>
                </div>
                <span className="border-border/60 text-xs font-medium text-muted-foreground rounded-full border px-2 py-1">
                  {project.status}
                </span>
              </div>
              <div>
                <div className="bg-muted/40 h-2 rounded-full">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link href={`/user/projects/${project.slug}`}>Open project</Link>
              </Button>
            </article>
          ))}
        </CardContent>
      </Card>

      <Card className="p-6">
        <CardTitle className="text-lg">Suggested templates</CardTitle>
        <CardDescription>Jumpstart your next initiative with ready-made plans.</CardDescription>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {["Go-to-market", "Research sprint", "Ad campaign"].map((template) => (
            <Link
              key={template}
              href="/user/discover/templates"
              className="border-border/60 hover:border-primary/40 hover:shadow-sm rounded-lg border p-4 text-sm font-medium transition"
            >
              {template}
            </Link>
          ))}
        </div>
      </Card>
    </UserDashboardLayout>
  );
}
