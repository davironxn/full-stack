"use client";

import { useEffect, useMemo, useState } from "react";
import { ClipboardList, LineChart, MailOpen, Timer } from "lucide-react";
import { normalizeProjects } from "@/lib/normalizeProject";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { DashboardHeader } from "@/components/ui/dashboard-header";
import { PortfolioPerformanceChart } from "@/components/ui/portfolio-performance-chart";
import { AdminProjectsTable } from "@/components/ui/admin-projects-table";
import { QuickActions } from "@/components/ui/quick-actions";
import { RecentActivity } from "@/components/ui/recent-activity";
import { SystemStatus } from "@/components/ui/system-status";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    }
    loadProjects();
  }, []);

  const normalizedProjects = normalizeProjects(projects);

  const publishedProjects = normalizedProjects.length;

  const portfolioStats = useMemo(
    () => [
      {
        title: "Published projects",
        value: `${publishedProjects}`,
        change: "+2 this quarter",
        changeType: "positive" as const,
        icon: ClipboardList,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
      },
      {
        title: "Active inquiries",
        value: "5",
        change: "+3 this week",
        changeType: "positive" as const,
        icon: MailOpen,
        color: "text-sky-500",
        bgColor: "bg-sky-500/10",
      },
      {
        title: "Avg. response time",
        value: "2h",
        change: "-18% vs last month",
        changeType: "positive" as const,
        icon: Timer,
        color: "text-amber-500",
        bgColor: "bg-amber-500/10",
      },
      {
        title: "Newsletter growth",
        value: "1.2K",
        change: "-4% this week",
        changeType: "negative" as const,
        icon: LineChart,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
      },
    ],
    [publishedProjects]
  );

  const dashboardActivities = [
    { status: "Published", label: "Published", updatedAt: "3 days ago" },
    { status: "Review", label: "In review", updatedAt: "Yesterday" },
    { status: "Draft", label: "Draft", updatedAt: "Ready for polish" },
  ];

  const dashboardProjects = normalizedProjects.slice(0, 5).map((project, index) => ({
    ...project,
    status: dashboardActivities[index % dashboardActivities.length]!.status,
    statusLabel: dashboardActivities[index % dashboardActivities.length]!.label,
    updatedAt: dashboardActivities[index % dashboardActivities.length]!.updatedAt,
    leads: 24 - index * 3,
  }));

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleExport = () => {
    console.log("Exporting portfolio analytics...");
  };

  const handleAddProject = () => {
    console.log("Preparing new project entry...");
  };

  return (
    <>
      <DashboardHeader
        title="Overview"
        description="Track how your portfolio is performing and what needs attention next."
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onRefresh={handleRefresh}
        onExport={handleExport}
        isRefreshing={isRefreshing}
      />

      <div className="flex flex-1 flex-col gap-4 p-4 pt-4 sm:gap-6 sm:p-6">
        <div className="mx-auto w-full max-w-6xl space-y-4 sm:space-y-6">
          <div className="px-1 sm:px-0">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome back, creator
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Here’s the heartbeat of your studio—projects, inquiries, and editorial plans in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {portfolioStats.map((stat, index) => (
              <DashboardCard key={stat.title} stat={stat} index={index} />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3">
            <div className="space-y-4 sm:space-y-6 xl:col-span-2">
              <PortfolioPerformanceChart />
              <AdminProjectsTable projects={dashboardProjects} onAddProject={handleAddProject} />
            </div>

            <div className="space-y-4 sm:space-y-6">
              <QuickActions onAddProject={handleAddProject} onExport={handleExport} />
              <SystemStatus />
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
