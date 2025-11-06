import Link from "next/link";

import { requireUser } from "@/app/user/_lib/require-user";
import { UserDashboardLayout } from "@/components/user/user-dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default async function NewProjectPage() {
  const user = await requireUser("/user/projects/new");

  return (
    <UserDashboardLayout
      user={user}
      title="Create a project"
      subtitle="Outline the work, assign collaborators, and set milestones"
      actions={
        <Button asChild size="sm" variant="outline">
          <Link href="/user/projects">Back to projects</Link>
        </Button>
      }
    >
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Project brief</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="project-name">Project name</FieldLabel>
                <Input id="project-name" placeholder="What are you building?" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="project-summary">Summary</FieldLabel>
                <textarea
                  id="project-summary"
                  placeholder="Share why this project matters and the outcome you expect."
                  className="border-input bg-transparent text-sm text-foreground/90 placeholder:text-muted-foreground h-32 w-full rounded-md border px-3 py-2 shadow-xs outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
                />
              </Field>
            </FieldGroup>

            <FieldGroup className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="project-owner">Project owner</FieldLabel>
                <Input id="project-owner" placeholder="Who&apos;s leading the work?" />
              </Field>
              <Field>
                <FieldLabel htmlFor="project-dates">Timeline</FieldLabel>
                <div className="grid grid-cols-2 gap-3">
                  <Input id="project-start" type="date" aria-label="Start date" />
                  <Input id="project-end" type="date" aria-label="Target end date" />
                </div>
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="project-milestones">Milestones</FieldLabel>
                <FieldDescription>
                  Draft a quick outline—add more detail later as the work evolves.
                </FieldDescription>
                <textarea
                  id="project-milestones"
                  placeholder="1. Kickoff\n2. Beta release\n3. Launch announcement"
                  className="border-input bg-transparent text-sm text-foreground/90 placeholder:text-muted-foreground h-32 w-full rounded-md border px-3 py-2 shadow-xs outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
                />
              </Field>
            </FieldGroup>

            <div className="flex items-center gap-3">
              <Button type="submit">Create project</Button>
              <Button asChild type="button" variant="ghost">
                <Link href="/user/projects">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </UserDashboardLayout>
  );
}
