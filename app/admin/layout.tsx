import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { AdminSidebar } from "@/components/ui/admin-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { authOptions } from "@/lib/authOptions";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/sign-in?callbackUrl=/admin");
  }

  const isAdmin = Boolean((session.user as Record<string, unknown>)?.isAdmin);
  if (!isAdmin) {
    redirect("/user");
  }

  return (
    <SidebarProvider>
      <AdminSidebar user={session.user} />
      <SidebarInset className="flex min-h-svh w-full flex-col bg-muted/30">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
