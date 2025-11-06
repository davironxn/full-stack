import Link from "next/link";

import { requireUser } from "@/app/user/_lib/require-user";
import { UserDashboardLayout } from "@/components/user/user-dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default async function NewTaskPage() {
  const user = await requireUser("/user/tasks/new");

  return (
    <UserDashboardLayout
      user={user}
      title="Create a task"
      subtitle="Capture the work and assign it in one place"
      actions={
        <Button asChild size="sm" variant="outline">
          <Link href="/user/tasks">Back to tasks</Link>
        </Button>
      }
    >
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Task details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="task-name">Task name</FieldLabel>
                <Input id="task-name" placeholder="Give your task a clear title" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="task-description">Description</FieldLabel>
                <textarea
                  id="task-description"
                  placeholder="Add context, requirements, or helpful links"
                  className="border-input bg-transparent text-sm text-foreground/90 placeholder:text-muted-foreground h-32 w-full rounded-md border px-3 py-2 shadow-xs outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
                />
                <FieldDescription>
                  Tip: @mention a teammate to bring them into the conversation.
                </FieldDescription>
              </Field>
            </FieldGroup>

            <FieldGroup className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="task-assignee">Assignee</FieldLabel>
                <Input id="task-assignee" placeholder="Search teammates" />
              </Field>
              <Field>
                <FieldLabel htmlFor="task-due-date">Due date</FieldLabel>
                <Input id="task-due-date" type="date" />
              </Field>
            </FieldGroup>

            <FieldGroup className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="task-priority">Priority</FieldLabel>
                <select
                  id="task-priority"
                  className="border-input bg-transparent text-sm text-foreground/90 placeholder:text-muted-foreground h-9 w-full rounded-md border px-3 py-1 shadow-xs outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
                  defaultValue="medium"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </Field>
              <Field>
                <FieldLabel htmlFor="task-project">Project</FieldLabel>
                <Input id="task-project" placeholder="Associate with a project" />
              </Field>
            </FieldGroup>

            <div className="flex items-center gap-3">
              <Button type="submit">Save task</Button>
              <Button asChild variant="ghost">
                <Link href="/user/tasks">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </UserDashboardLayout>
  );
}
