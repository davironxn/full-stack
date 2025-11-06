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

const threads = [
  {
    name: "Product Team",
    preview: "Latest usability findings are in the shared folder.",
    unread: 2,
    updated: "5m ago",
  },
  {
    name: "Leadership",
    preview: "Agenda finalized for Thursday's planning session.",
    unread: 0,
    updated: "1h ago",
  },
  {
    name: "Customer Advisory",
    preview: "Client feedback on the beta release looks promising.",
    unread: 1,
    updated: "Yesterday",
  },
];

export default async function MessagesPage() {
  const user = await requireUser("/user/messages");

  return (
    <UserDashboardLayout
      user={user}
      title="Messages"
      subtitle="Stay connected with your teammates"
      actions={
        <Button asChild size="sm">
          <Link href="/user/messages?compose=true">New thread</Link>
        </Button>
      }
    >
      {/* Inbox Section */}
      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>
            Pick up where you left off or start something new.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          {threads.map((thread) => (
            <div
              key={thread.name}
              className="border-border/60 bg-background/60 flex flex-col gap-2 rounded-lg border p-4 transition hover:border-primary/40 hover:shadow-sm sm:flex-row sm:items-center"
            >
              {/* Thread Info */}
              <div className="flex-1">
                <p className="text-sm font-semibold">{thread.name}</p>
                <p className="text-xs text-muted-foreground">
                  {thread.preview}
                </p>
              </div>

              {/* Thread Status */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {thread.unread ? (
                  <span className="bg-primary text-primary-foreground rounded-full px-2 py-1">
                    {thread.unread} unread
                  </span>
                ) : (
                  <span className="rounded-full border border-border/60 px-2 py-1">
                    Up to date
                  </span>
                )}
                <span>{thread.updated}</span>
              </div>

              {/* ✅ FIXED — Correct Dynamic Link */}
              <Button asChild size="sm" variant="outline">
                <Link
                  href={`/user/messages/${thread.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  View
                </Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Response Templates */}
      <Card className="p-6">
        <CardTitle className="text-lg">Quick response templates</CardTitle>
        <CardDescription>
          Save time with reusable snippets for status updates, handoffs, and
          meeting recaps.
        </CardDescription>

        <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
          {["Project update", "Bug triage", "Launch reminder"].map((label) => (
            <span
              key={label}
              className="border-border/60 text-muted-foreground rounded-full border px-3 py-1"
            >
              {label}
            </span>
          ))}
        </div>
      </Card>
    </UserDashboardLayout>
  );
}
