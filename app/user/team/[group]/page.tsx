import { notFound } from "next/navigation";

import { requireUser } from "@/app/user/_lib/require-user";
import { UserDashboardLayout } from "@/components/user/user-dashboard-layout";
import { Card } from "@/components/ui/card";

const teamRosters = {
  leadership: {
    name: "Leadership",
    description: "Directors and leads guiding the roadmap and strategy.",
    members: [
      { name: "Amelia Carter", role: "VP of Product", timezone: "ET" },
      { name: "Jamal Nguyen", role: "Head of Operations", timezone: "PT" },
      { name: "Priya Desai", role: "Director of Engineering", timezone: "PT" },
    ],
  },
  product: {
    name: "Product",
    description: "Designers, researchers, and product managers shipping improvements.",
    members: [
      { name: "Jonah Patel", role: "Product Manager", timezone: "ET" },
      { name: "Lena Ortiz", role: "Product Designer", timezone: "CT" },
      { name: "Mina Cho", role: "UX Researcher", timezone: "ET" },
      { name: "Theo Zhang", role: "Product Operations", timezone: "PT" },
    ],
  },
  operations: {
    name: "Operations",
    description: "Support, billing, and enablement keeping customers successful.",
    members: [
      { name: "Darius Lane", role: "Support Lead", timezone: "ET" },
      { name: "Harper Singh", role: "Enablement Manager", timezone: "ET" },
      { name: "Rowan Ellis", role: "Billing Specialist", timezone: "PT" },
    ],
  },
} satisfies Record<string, {
  name: string;
  description: string;
  members: { name: string; role: string; timezone: string }[];
}>;

interface TeamGroupPageProps {
  params: { group: string };
}

export default async function TeamGroupPage({ params }: TeamGroupPageProps) {
  const group = teamRosters[params.group as keyof typeof teamRosters];

  if (!group) {
    notFound();
  }

  const user = await requireUser(`/user/team/${params.group}`);

  return (
    <UserDashboardLayout
      user={user}
      title={group.name}
      subtitle="See who&apos;s working on what and when they&apos;re online"
    >
      <Card className="divide-y">
        <div className="p-6">
          <p className="text-sm text-muted-foreground">{group.description}</p>
        </div>
        {group.members.map((member) => (
          <div
            key={member.name}
            className="flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-medium">{member.name}</p>
              <p className="text-xs text-muted-foreground">{member.role}</p>
            </div>
            <span className="text-xs text-muted-foreground">
              Timezone: {member.timezone}
            </span>
          </div>
        ))}
      </Card>
    </UserDashboardLayout>
  );
}
