'use client';

import { memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Download,
  FolderOpen,
  MailOpen,
  Settings,
  Sparkles,
} from "lucide-react";

interface QuickActionsProps {
  onAddProject: () => void;
  onExport: () => void;
}

const actions = [
  {
    icon: FolderOpen,
    label: "Add portfolio project",
    shortcut: "Shift + N",
    action: "project",
    iconClass: "text-emerald-500",
    hoverClass: "hover:border-emerald-500/50 hover:bg-emerald-500/10",
  },
  {
    icon: MailOpen,
    label: "Review new inquiries",
    shortcut: "Shift + I",
    action: "inquiries",
    iconClass: "text-sky-500",
    hoverClass: "hover:border-sky-500/40 hover:bg-sky-500/10",
  },
  {
    icon: Download,
    label: "Export case study metrics",
    shortcut: "Shift + E",
    action: "export",
    iconClass: "text-purple-500",
    hoverClass: "hover:border-purple-500/50 hover:bg-purple-500/10",
  },
  {
    icon: Sparkles,
    label: "Plan upcoming launch",
    shortcut: "Shift + L",
    action: "plan",
    iconClass: "text-amber-500",
    hoverClass: "hover:border-amber-500/50 hover:bg-amber-500/10",
  },
  {
    icon: Settings,
    label: "Open site settings",
    shortcut: "Shift + S",
    action: "settings",
    iconClass: "text-slate-500",
    hoverClass: "hover:border-slate-500/40 hover:bg-slate-500/10",
  },
];

export const QuickActions = memo(
  ({ onAddProject, onExport }: QuickActionsProps) => {
    const handleAction = (action: string) => {
      switch (action) {
        case "project":
          onAddProject();
          break;
        case "inquiries":
          console.log("Opening inquiries queue...");
          break;
        case "export":
          onExport();
          break;
        case "plan":
          console.log("Drafting launch roadmap...");
          break;
        case "settings":
          console.log("Opening settings...");
          break;
      }
    };

    return (
      <div className="border-border bg-card/40 rounded-xl border p-6">
        <h3 className="mb-4 text-xl font-semibold">Quick actions</h3>
        <div className="space-y-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Button
                  variant="outline"
                  className={cn(
                    "h-12 w-full justify-start transition-all duration-200",
                    action.hoverClass,
                  )}
                  onClick={() => handleAction(action.action)}
                >
                  <Icon className={cn("mr-3 h-5 w-5", action.iconClass)} />
                  <span className="font-medium">{action.label}</span>
                  <div className="text-muted-foreground ml-auto text-xs">
                    {action.shortcut}
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  },
);

QuickActions.displayName = 'QuickActions';
