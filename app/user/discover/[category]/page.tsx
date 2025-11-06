import { notFound } from "next/navigation";

import { requireUser } from "@/app/user/_lib/require-user";
import { UserDashboardLayout } from "@/components/user/user-dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const catalog = {
  templates: {
    title: "Project templates",
    description: "Reusable plans for product, marketing, and operations teams.",
    items: [
      {
        name: "Launch checklist",
        summary: "Coordinate approvals, QA, and enablement for go-to-market launches.",
      },
      {
        name: "Customer interview hub",
        summary: "Organize research questions, recordings, and highlight reels.",
      },
      {
        name: "Hiring pipeline",
        summary: "Track candidates, feedback, and decision timelines in one place.",
      },
    ],
  },
  automation: {
    title: "Automation recipes",
    description: "Connect projects, tasks, and notifications without writing code.",
    items: [
      {
        name: "Task triage",
        summary: "Route new requests to the right project with priority tagging.",
      },
      {
        name: "Standup summary",
        summary: "Send a daily digest of updates to your team channel.",
      },
      {
        name: "Schedule handoff",
        summary: "Alert stakeholders when a task is ready for review.",
      },
    ],
  },
} satisfies Record<string, {
  title: string;
  description: string;
  items: { name: string; summary: string }[];
}>;

interface DiscoverCategoryPageProps {
  params: { category: string };
}

export default async function DiscoverCategoryPage({ params }: DiscoverCategoryPageProps) {
  const category = catalog[params.category as keyof typeof catalog];

  if (!category) {
    notFound();
  }

  const user = await requireUser(`/user/discover/${params.category}`);

  return (
    <UserDashboardLayout
      user={user}
      title={category.title}
      subtitle="Preview and install curated resources"
    >
      <Card>
        <CardHeader>
          <CardTitle>{category.title}</CardTitle>
          <CardDescription>{category.description}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {category.items.map((item) => (
            <div
              key={item.name}
              className="border-border/60 bg-background/60 rounded-lg border p-4 text-sm"
            >
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.summary}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </UserDashboardLayout>
  );
}
