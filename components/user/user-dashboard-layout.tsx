"use client";

import type { ReactNode } from "react";
import type { Session } from "next-auth";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/ui/user-sidebar";

interface UserDashboardLayoutProps {
  user: Session["user"];
  title: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}

export function UserDashboardLayout({
  user,
  title,
  subtitle,
  actions,
  children,
}: UserDashboardLayoutProps) {
  return (
    <SidebarProvider>
      <UserSidebar user={user} />
      <SidebarInset>
        <header className="bg-background/95 sticky top-0 z-20 flex h-16 items-center gap-3 border-b px-4 backdrop-blur">
          <SidebarTrigger className="-ml-1" />
          <div className="flex min-w-0 flex-col">
            {subtitle ? (
              <span className="text-sm font-medium text-muted-foreground truncate">
                {subtitle}
              </span>
            ) : null}
            <span className="text-base font-semibold truncate">{title}</span>
          </div>
          {actions ? (
            <div className="ml-auto flex flex-shrink-0 items-center gap-2">{actions}</div>
          ) : null}
        </header>
        <div className="flex flex-1 flex-col gap-6 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
