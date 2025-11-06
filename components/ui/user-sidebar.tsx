"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import type { Session } from "next-auth";
import {
  CalendarClock,
  CheckCircle2,
  Compass,
  FolderOpen,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  MessageCircle,
  Plus,
  Settings,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import SignOutButton from "@/components/auth/SignOutButton";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

interface UserSidebarProps {
  user: Session["user"];
}

const primaryNavigation = [
  { title: "Overview", href: "/user", icon: LayoutDashboard },
  { title: "My Tasks", href: "/user/tasks", icon: CheckCircle2, badge: "4" },
  { title: "Calendar", href: "/user/calendar", icon: CalendarClock },
  { title: "Messages", href: "/user/messages", icon: MessageCircle, badge: "3" },
];

const workspaceNavigation = [
  {
    title: "Projects",
    href: "/user/projects",
    icon: FolderOpen,
    badge: "6",
    children: [
      { title: "Product Launch", href: "/user/projects/product-launch" },
      { title: "Mobile App", href: "/user/projects/mobile-app" },
      { title: "Marketing Site", href: "/user/projects/marketing-site" },
    ],
  },
  {
    title: "Team",
    href: "/user/team",
    icon: Users,
    children: [
      { title: "Leadership", href: "/user/team/leadership" },
      { title: "Product", href: "/user/team/product" },
      { title: "Operations", href: "/user/team/operations" },
    ],
  },
  {
    title: "Discover",
    href: "/user/discover",
    icon: Compass,
    children: [
      { title: "Templates", href: "/user/discover/templates" },
      { title: "Automation", href: "/user/discover/automation" },
    ],
  },
];

const resourceNavigation = [
  { title: "Getting Started", href: "/docs/overview", icon: Sparkles },
  { title: "Support", href: "/support", icon: LifeBuoy },
  { title: "Settings", href: "/settings", icon: Settings },
];

export const UserSidebar = memo(({ user }: UserSidebarProps) => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const initials = useMemo(() => {
    if (user?.name) {
      const [first = "", second = ""] = user.name.split(" ");
      return (first.charAt(0) + second.charAt(0)).toUpperCase();
    }

    return user?.email?.charAt(0).toUpperCase() ?? "U";
  }, [user?.email, user?.name]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="gap-3">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card/50 px-3 py-2">
          <div className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-lg">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex flex-col text-sm">
            <span className="font-semibold">My Workspace</span>
            <span className="text-muted-foreground text-xs">Organize your day</span>
          </div>
        </div>
        <SidebarInput placeholder="Quick search" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link prefetch={false} href={item.href}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.badge ? (
                      <SidebarMenuBadge className="bg-primary/10 text-primary">
                        {item.badge}
                      </SidebarMenuBadge>
                    ) : null}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupAction asChild>
            <button
              type="button"
              onClick={() => {
                /* noop: placeholder for future action */
              }}
            >
              <Plus className="h-4 w-4" />
            </button>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {workspaceNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link prefetch={false} href={item.href}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.badge ? (
                      <SidebarMenuBadge className="bg-foreground/10 text-foreground">
                        {item.badge}
                      </SidebarMenuBadge>
                    ) : null}
                    <SidebarMenuAction asChild showOnHover>
                      <button type="button" aria-label="Star workspace">
                        <Star className="h-4 w-4" />
                      </button>
                    </SidebarMenuAction>
                    {item.children?.length ? (
                      <SidebarMenuSub>
                        {item.children.map((child) => (
                          <SidebarMenuSubItem key={child.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === child.href}
                            >
                              <Link prefetch={false} href={child.href}>
                                <span>{child.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    ) : null}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourceNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link prefetch={false} href={item.href}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="border-border/60 bg-muted/50 flex items-center gap-3 rounded-xl border px-3 py-2">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name ?? "User avatar"}
              width={36}
              height={36}
              className="size-9 rounded-full object-cover"
            />
          ) : (
            <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-full text-sm font-medium">
              {initials}
            </div>
          )}
          <div className="flex flex-col text-xs">
            <span className="font-medium">{user?.name ?? "Authenticated user"}</span>
            <span className="text-muted-foreground truncate">
              {user?.email}
            </span>
          </div>
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sparkles />
              <span>Toggle theme</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <SignOutButton className="flex w-full items-center gap-2 text-left">
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </SignOutButton>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
});

UserSidebar.displayName = "UserSidebar";

