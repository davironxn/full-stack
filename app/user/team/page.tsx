import Link from "next/link";

import { requireUser } from "@/app/user/_lib/require-user";
import { UserDashboardLayout } from "@/components/user/user-dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const groups = [
  {
    slug: "leadership",
    name: "Leadership",
    description: "Planning, reporting, and cross-functional alignment.",
    members: 6,
  },
  {
    slug: "product",
    name: "Product",
    description: "Research, design, and delivery for upcoming features.",
    members: 18,
  },
  {
    slug: "operations",
    name: "Operations",
    description: "Support, billing, and internal enablement initiatives.",
    members: 11,
  },
];

export default async function TeamPage() {
  const user = await requireUser("/user/team");

  return (
    <UserDashboardLayout
      user={user}
      title="Team directory"
      subtitle="Find the right people to collaborate with"
      actions={
        <Button asChild size="sm">
          <Link href="/user/team/leadership">View leadership</Link>
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => (
          <Card key={group.slug} className="flex h-full flex-col justify-between p-6">
            <div className="space-y-3">
              <CardHeader className="p-0">
                <CardTitle>{group.name}</CardTitle>
                <CardDescription>{group.description}</CardDescription>
              </CardHeader>
              <span className="text-xs font-medium text-muted-foreground">
                {group.members} members
              </span>
            </div>
            <Button asChild className="mt-6" size="sm" variant="outline">
              <Link href={`/user/team/${group.slug}`}>View roster</Link>
            </Button>
          </Card>
        ))}
      </div>

      <div className="rounded-xl border border-dashed border-border/60 p-6 text-sm text-muted-foreground">
        Pro tip: share project briefs in <span className="font-medium text-foreground">#announcements</span> to keep everyone aligned.
      </div>
    </UserDashboardLayout>
  );
}
