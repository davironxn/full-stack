"use client";

import { useMemo } from "react";
import Link from "next/link";
import type { Session } from "next-auth";
import {
  CalendarClock,
  CheckCircle2,
  Clock4,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/ui/user-sidebar";

interface UserDashboardShellProps {
  user: Session["user"];
}

const stats = [
  {
    title: "Tasks due this week",
    value: "8",
    description: "Keep your priorities on track",
    icon: CalendarClock,
    accent: "text-sky-500",
    background: "bg-sky-500/10",
  },
  {
    title: "Completed tasks",
    value: "42",
    description: "Great job staying focused",
    icon: CheckCircle2,
    accent: "text-emerald-500",
    background: "bg-emerald-500/10",
  },
  {
    title: "Hours logged",
    value: "32",
    description: "Including collaborative sessions",
    icon: Clock4,
    accent: "text-amber-500",
    background: "bg-amber-500/10",
  },
  {
    title: "Team updates",
    value: "5",
    description: "Messages waiting for review",
    icon: MessageSquare,
    accent: "text-purple-500",
    background: "bg-purple-500/10",
  },
];

const projects = [
  {
    name: "Product Launch",
    description: "Finalize the go-to-market plan and content calendar.",
    progress: 78,
    status: "On track",
  },
  {
    name: "Mobile App",
    description: "QA sign-off for the iOS build before submission.",
    progress: 54,
    status: "Needs review",
  },
  {
    name: "Marketing Site refresh",
    description: "Implement feedback from the design review session.",
    progress: 32,
    status: "In progress",
  },
];

const upcoming = [
  {
    title: "Roadmap sync",
    time: "Today • 2:00 PM",
    location: "Zoom",
  },
  {
    title: "Design review",
    time: "Tomorrow • 9:30 AM",
    location: "Studio 3",
  },
  {
    title: "Client demo",
    time: "Friday • 11:00 AM",
    location: "Conference Room A",
  },
];

const goals = [
  {
    label: "Ship onboarding improvements",
    progress: 64,
  },
  {
    label: "Respond to community feedback",
    progress: 48,
  },
  {
    label: "Plan Q2 objectives",
    progress: 26,
  },
];

const activity = [
  {
    title: "You completed \"Create walkthrough screens\"",
    time: "2 hours ago",
  },
  {
    title: "Amelia added comments to \"Website refresh\"",
    time: "Yesterday",
  },
  {
    title: "Weekly summary ready",
    time: "2 days ago",
  },
];

export function UserDashboardShell({ user }: UserDashboardShellProps) {
  const greeting = useMemo(() => {
    if (!user?.name) {
      return "Welcome back";
    }

    const first = user.name.split(" ")[0];
    return `Welcome back, ${first}`;
  }, [user?.name]);

  return (
    <SidebarProvider>
      <UserSidebar user={user} />
      <SidebarInset>
        <header className="bg-background/95 sticky top-0 z-20 flex h-16 items-center gap-3 border-b px-4 backdrop-blur">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">{greeting}</span>
            <span className="text-base font-semibold">Your personal dashboard</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button asChild size="sm" variant="outline">
              <Link href="/user/tasks/new">New task</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/user/projects/new">Create project</Link>
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-4">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.title}
                  className="border-border/70 bg-card/40 rounded-xl border p-4 shadow-sm transition-colors hover:bg-card/60"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className={`rounded-lg p-2 ${stat.background}`}>
                      <Icon className={`h-5 w-5 ${stat.accent}`} />
                    </div>
                    <TrendingUp className="text-muted-foreground h-4 w-4" />
                  </div>
                  <div className="mt-4 space-y-1">
                    <p className="text-3xl font-semibold">{stat.value}</p>
                    <p className="text-muted-foreground text-sm">{stat.title}</p>
                    <p className="text-xs text-muted-foreground/80">{stat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            <section className="xl:col-span-2 space-y-4 rounded-xl border border-border/70 bg-card/40 p-5 shadow-sm">
              <header className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Active projects</h2>
                  <p className="text-muted-foreground text-sm">
                    Track what needs your attention next.
                  </p>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/user/projects">View all</Link>
                </Button>
              </header>

              <div className="space-y-4">
                {projects.map((project) => (
                  <article
                    key={project.name}
                    className="rounded-lg border border-border/60 bg-background/60 p-4 transition hover:border-primary/40 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-medium">{project.name}</h3>
                        <p className="text-muted-foreground text-sm">
                          {project.description}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">
                        {project.status}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="bg-muted/60 h-2 rounded-full">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="space-y-4 rounded-xl border border-border/70 bg-card/40 p-5 shadow-sm">
              <header className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Upcoming</h2>
                  <p className="text-muted-foreground text-sm">
                    Meetings and reminders on your calendar.
                  </p>
                </div>
                <Button asChild size="sm" variant="ghost">
                  <Link href="/user/calendar">Open calendar</Link>
                </Button>
              </header>

              <ul className="space-y-3 text-sm">
                {upcoming.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-lg border border-border/60 bg-background/60 p-3"
                  >
                    <p className="font-medium">{item.title}</p>
                    <p className="text-muted-foreground text-xs">{item.time}</p>
                    <p className="text-muted-foreground text-xs">{item.location}</p>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <h3 className="text-sm font-medium">Personal goals</h3>
                <div className="space-y-3">
                  {goals.map((goal) => (
                    <div key={goal.label}>
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span>{goal.label}</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <div className="bg-muted/60 mt-1 h-2 rounded-full">
                        <div
                          className="bg-foreground/80 h-2 rounded-full"
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <section className="grid gap-4 rounded-xl border border-border/70 bg-card/40 p-5 shadow-sm lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-3">
              <header className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent activity</h2>
                <Button asChild size="sm" variant="ghost">
                  <Link href="/user/activity">View history</Link>
                </Button>
              </header>

              <ul className="space-y-3 text-sm">
                {activity.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-lg border border-border/60 bg-background/60 p-3"
                  >
                    <p className="font-medium">{item.title}</p>
                    <p className="text-muted-foreground text-xs">{item.time}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 rounded-lg border border-border/60 bg-background/60 p-4">
              <h3 className="text-base font-semibold">Stay focused</h3>
              <p className="text-sm text-muted-foreground">
                Block time for deep work and mute notifications while you finish
                critical tasks.
              </p>
              <Button asChild size="sm">
                <Link href="/user/focus">Start focus session</Link>
              </Button>
              <div className="rounded-lg border border-dashed border-border/70 p-3 text-xs text-muted-foreground">
                Tip: review your goals each Friday to celebrate wins and adjust
                priorities for next week.
              </div>
            </div>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
