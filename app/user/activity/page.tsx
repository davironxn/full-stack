import { requireUser } from "@/app/user/_lib/require-user";
import { UserDashboardLayout } from "@/components/user/user-dashboard-layout";
import { Card } from "@/components/ui/card";

const timeline = [
  {
    title: "You created \"Launch checklist\"",
    time: "2 hours ago",
    detail: "Added to the Product Launch project",
  },
  {
    title: "Amelia completed \"Update help center\"",
    time: "Yesterday",
    detail: "Marked as ready for review",
  },
  {
    title: "Theo left a comment",
    time: "Yesterday",
    detail: "Shared feedback on the Mobile App QA plan",
  },
  {
    title: "Weekly digest available",
    time: "2 days ago",
    detail: "Summary emailed to leadership",
  },
];

export default async function ActivityPage() {
  const user = await requireUser("/user/activity");

  return (
    <UserDashboardLayout
      user={user}
      title="Activity log"
      subtitle="Review the latest updates across your workspace"
    >
      <Card className="divide-y">
        {timeline.map((item) => (
          <div key={item.title} className="flex flex-col gap-1 p-6">
            <span className="text-sm font-medium">{item.title}</span>
            <span className="text-xs text-muted-foreground">{item.time}</span>
            <span className="text-xs text-muted-foreground/80">{item.detail}</span>
          </div>
        ))}
      </Card>
    </UserDashboardLayout>
  );
}
