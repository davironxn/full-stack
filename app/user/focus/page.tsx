import Link from "next/link";

import { requireUser } from "@/app/user/_lib/require-user";
import { UserDashboardLayout } from "@/components/user/user-dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const suggestions = [
  {
    title: "Deep work session",
    duration: "90 minutes",
    description: "Mute notifications and block your calendar to finish critical work.",
  },
  {
    title: "Planning reset",
    duration: "45 minutes",
    description: "Review tasks, adjust priorities, and clear out your inbox.",
  },
  {
    title: "Team co-working",
    duration: "60 minutes",
    description: "Coordinate a shared focus block with your project teammates.",
  },
];

export default async function FocusPage() {
  const user = await requireUser("/user/focus");

  return (
    <UserDashboardLayout
      user={user}
      title="Focus mode"
      subtitle="Choose a session to stay on track"
      actions={
        <Button asChild size="sm">
          <Link href="/user/calendar">View calendar</Link>
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        {suggestions.map((session) => (
          <Card key={session.title} className="flex flex-col justify-between p-6">
            <CardHeader className="p-0">
              <CardTitle>{session.title}</CardTitle>
              <CardDescription>{session.description}</CardDescription>
            </CardHeader>
            <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
              <span>{session.duration}</span>
              <Button size="sm">Start session</Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="rounded-xl border border-dashed border-border/60 p-6 text-sm text-muted-foreground">
        Tip: Pair focus sessions with the <Link className="underline" href="/user/tasks">My tasks</Link> view to keep priorities
        front and center.
      </div>
    </UserDashboardLayout>
  );
}
