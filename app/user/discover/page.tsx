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

const spotlight = [
  {
    title: "Project templates",
    description: "Kickstart a new initiative with curated plans from our community.",
    href: "/user/discover/templates",
  },
  {
    title: "Automation recipes",
    description: "Reduce busywork by connecting tasks, docs, and alerts.",
    href: "/user/discover/automation",
  },
];

export default async function DiscoverPage() {
  const user = await requireUser("/user/discover");

  return (
    <UserDashboardLayout
      user={user}
      title="Discover"
      subtitle="Explore tools to support your team"
      actions={
        <Button asChild size="sm" variant="outline">
          <Link href="/user/projects/new">Start from template</Link>
        </Button>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Spotlight</CardTitle>
          <CardDescription>Hand-picked ways to improve your workflows.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {spotlight.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="border-border/60 hover:border-primary/40 hover:shadow-sm block rounded-xl border p-5 transition"
            >
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              <span className="mt-3 inline-flex items-center text-xs font-semibold text-primary">
                Explore →
              </span>
            </Link>
          ))}
        </CardContent>
      </Card>

      <Card className="p-6">
        <CardTitle className="text-lg">Recently added</CardTitle>
        <CardDescription>
          See what other teams are using to stay productive this week.
        </CardDescription>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {["Sprint review board", "Executive briefing", "Support intake"].map((item) => (
            <div
              key={item}
              className="border-border/60 bg-muted/40 rounded-lg border px-3 py-3 text-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </Card>
    </UserDashboardLayout>
  );
}
