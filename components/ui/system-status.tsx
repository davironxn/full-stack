'use client';

import { memo } from "react";
import { motion } from "framer-motion";
import { Activity, Globe, MailCheck, ShieldCheck } from "lucide-react";

const statusItems = [
  {
    label: "Portfolio uptime",
    status: "99.9%",
    color: "text-emerald-500",
    icon: ShieldCheck,
    percentage: 99.9,
  },
  {
    label: "Contact form delivery",
    status: "100%",
    color: "text-sky-500",
    icon: MailCheck,
    percentage: 100,
  },
  {
    label: "Content freshness",
    status: "5 drafts",
    color: "text-amber-500",
    icon: Activity,
    percentage: 70,
  },
  {
    label: "Global performance",
    status: "1.2s LCP",
    color: "text-purple-500",
    icon: Globe,
    percentage: 82,
  },
];

export const SystemStatus = memo(() => {
  return (
    <div className="border-border bg-card/40 rounded-xl border p-6">
      <h3 className="mb-4 text-xl font-semibold">Portfolio health</h3>
      <div className="space-y-4">
        {statusItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="hover:bg-accent/50 flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-4 w-4 ${item.color}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-muted h-2 w-20 overflow-hidden rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full rounded-full ${item.color.replace("text-", "bg-")}`}
                  />
                </div>
                <span
                  className={`text-sm font-medium ${item.color} min-w-[70px] text-right`}
                >
                  {item.status}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});

SystemStatus.displayName = 'SystemStatus';
