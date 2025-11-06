'use client';

import { memo } from 'react';
import type { Session } from 'next-auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import SignOutButton from '@/components/auth/SignOutButton';
import { siteConfig } from '@/data/site.config';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  Layers,
  LogOut,
  MailOpen,
  MessageSquareQuote,
  Moon,
  Settings,
  Sparkles,
  Sun,
} from 'lucide-react';
import { Image as ImageIcon } from 'lucide-react';

interface AdminSidebarProps {
  user?: Session['user'];
}

const navigationGroups = [
  {
    label: 'Content',
    items: [
      { title: 'Overview', href: '/admin', icon: LayoutDashboard },
      { title: 'Projects', href: '/admin/projects', icon: FolderOpen },
      { title: 'Case studies', href: '/admin/case-studies', icon: FileText },
      { title: 'Services', href: '/admin/services', icon: Layers },
      { title: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
    ],
  },
  {
    label: 'Operations',
    items: [
      { title: 'Inquiries', href: '/admin/inquiries', icon: MailOpen },
      { title: 'Media library', href: '/admin/media', icon: ImageIcon },
      { title: 'Site settings', href: '/admin/settings', icon: Settings },
    ],
  },
];

export const AdminSidebar = memo(({ user }: AdminSidebarProps) => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link prefetch={false} href="/admin">
                <div className="bg-primary/10 text-primary flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{siteConfig.title}</span>
                  <span className="truncate text-xs text-muted-foreground">Portfolio admin</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navigationGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link prefetch={false} href={item.href}>
                          <Icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="gap-3">
        <div className="border-border/70 bg-muted/40 flex flex-col gap-1 rounded-lg border px-3 py-2 text-xs">
          <span className="text-sm font-medium">{user?.name ?? 'Portfolio admin'}</span>
          <span className="text-muted-foreground truncate">{user?.email ?? 'admin@example.com'}</span>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
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

AdminSidebar.displayName = 'AdminSidebar';
