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

const tasks = [
  {
    title: "Prepare product launch brief",
    due: "Due in 2 days",
    status: "In progress",
    priority: "High",
  },
  {
    title: "Review design QA notes",
    due: "Due tomorrow",
    status: "Blocked",
    priority: "Medium",
  },
  {
    title: "Draft release newsletter",
    due: "Due next week",
    status: "Scheduled",
    priority: "Low",
  },
  {
    title: "Sync with support on FAQs",
    due: "Due in 4 days",
    status: "In progress",
    priority: "Medium",
  },
];

const quickFilters = [
  { label: "Today", href: "/user/tasks?filter=today" },
  { label: "This week", href: "/user/tasks?filter=week" },
  { label: "Delegated", href: "/user/tasks?filter=delegated" },
];

export default async function TasksPage() {
  const user = await requireUser("/user/tasks");

  return (
    <UserDashboardLayout
      user={user}
      title="My tasks"
      subtitle="Stay on top of the work that matters"
      actions={
        <Button asChild size="sm">
          <Link href="/user/tasks/new">Add task</Link>
        </Button>
      }
    >
      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Today&apos;s focus</CardTitle>
            <CardDescription>
              Review what&apos;s scheduled and make quick adjustments to your plan.
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
            {quickFilters.map((filter) => (
              <Link
                key={filter.label}
                href={filter.href}
                className="border-border bg-muted/40 hover:bg-muted/70 text-muted-foreground rounded-full border px-3 py-1 transition"
              >
                {filter.label}
              </Link>
            ))}
          </div>
        </CardHeader>
        <CardContent className="divide-y">
          {tasks.map((task) => (
            <div key={task.title} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <p className="text-sm font-medium leading-tight">{task.title}</p>
                <p className="text-xs text-muted-foreground">{task.due}</p>
              </div>
              <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                <span
                  className="border-border/60 text-foreground/80 bg-background/70 rounded-full border px-2 py-1"
                  aria-label={`Status: ${task.status}`}
                >
                  {task.status}
                </span>
                <span className="bg-primary/10 text-primary rounded-full px-2 py-1">
                  {task.priority} priority
                </span>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link href="/user/tasks/new">Update</Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="grid gap-3 p-6 sm:grid-cols-2">
        <div className="rounded-lg border border-dashed border-border/60 p-4">
          <h3 className="text-sm font-semibold">Automate triage</h3>
          <p className="text-xs text-muted-foreground">
            Set up rules to assign new requests to the right teammates.
          </p>
          <Button asChild className="mt-3" size="sm" variant="ghost">
            <Link href="/user/discover/automation">Explore automations</Link>
          </Button>
        </div>
        <div className="rounded-lg border border-dashed border-border/60 p-4">
          <h3 className="text-sm font-semibold">Need a break?</h3>
          <p className="text-xs text-muted-foreground">
            Schedule a focus block to regain momentum when you return.
          </p>
          <Button asChild className="mt-3" size="sm" variant="ghost">
            <Link href="/user/focus">Plan focus session</Link>
          </Button>
        </div>
      </Card>
    </UserDashboardLayout>
  );
}
