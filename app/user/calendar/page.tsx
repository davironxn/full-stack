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

const events = [
  {
    title: "Roadmap sync",
    time: "Today • 2:00 PM",
    type: "Meeting",
    location: "Zoom",
  },
  {
    title: "Content review",
    time: "Tomorrow • 10:30 AM",
    type: "Workshop",
    location: "Room 4A",
  },
  {
    title: "Product QA",
    time: "Friday • 1:00 PM",
    type: "Working session",
    location: "Lab 2",
  },
];

const focusBlocks = [
  {
    title: "Deep work",
    description: "Finalize onboarding tour copy",
    duration: "90 min",
  },
  {
    title: "Maker time",
    description: "Prototype project reports",
    duration: "60 min",
  },
];

export default async function CalendarPage() {
  const user = await requireUser("/user/calendar");

  return (
    <UserDashboardLayout
      user={user}
      title="Calendar overview"
      subtitle="Balance collaboration with uninterrupted focus"
      actions={
        <Button asChild size="sm">
          <Link href="/user/focus">Plan focus time</Link>
        </Button>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Upcoming commitments</CardTitle>
          <CardDescription>Everything on your calendar for the next few days.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {events.map((event) => (
            <div
              key={event.title}
              className="border-border/60 bg-background/60 flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-medium">{event.title}</p>
                <p className="text-xs text-muted-foreground">{event.location}</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="rounded-full border border-border/60 px-3 py-1">{event.type}</span>
                <span>{event.time}</span>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link href="/user/messages">Share agenda</Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="grid gap-4 p-6 sm:grid-cols-2">
        <div>
          <CardTitle className="text-lg">Focus blocks</CardTitle>
          <CardDescription>
            Protect space on your calendar and let your teammates know when you&apos;re heads-down.
          </CardDescription>
        </div>
        <div className="grid gap-3">
          {focusBlocks.map((block) => (
            <div
              key={block.title}
              className="border-border/60 bg-muted/40 flex flex-col gap-1 rounded-lg border px-3 py-3"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {block.duration}
              </span>
              <span className="text-sm font-medium">{block.title}</span>
              <span className="text-xs text-muted-foreground">{block.description}</span>
            </div>
          ))}
        </div>
      </Card>
    </UserDashboardLayout>
  );
}
