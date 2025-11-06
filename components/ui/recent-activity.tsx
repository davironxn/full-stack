'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Mail, Pencil, Sparkles } from 'lucide-react';

const activities = [
  {
    action: 'New inquiry',
    user: 'alex@studiox.com',
    time: '2 min ago',
    icon: Mail,
    color: 'text-emerald-500',
  },
  {
    action: 'Case study draft updated',
    user: 'Business Website refresh',
    time: '14 min ago',
    icon: Pencil,
    color: 'text-sky-500',
  },
  {
    action: 'Client kickoff scheduled',
    user: 'Lumen AI redesign',
    time: '1 hr ago',
    icon: CalendarCheck,
    color: 'text-purple-500',
  },
  {
    action: 'New testimonial idea',
    user: 'Add note for Waveform',
    time: '3 hrs ago',
    icon: Sparkles,
    color: 'text-amber-500',
  },
];

export const RecentActivity = memo(() => {
  return (
    <div className="border-border bg-card/40 rounded-xl border p-6">
      <h3 className="mb-4 text-xl font-semibold">Recent activity</h3>
      <div className="space-y-3">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="hover:bg-accent/50 flex items-center gap-3 rounded-lg p-2 transition-colors"
            >
              <div className="bg-accent/40 rounded-lg p-2">
                <Icon className={`h-4 w-4 ${activity.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">{activity.action}</div>
                <div className="text-muted-foreground truncate text-xs">
                  {activity.user}
                </div>
              </div>
              <div className="text-muted-foreground text-xs">{activity.time}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});

RecentActivity.displayName = 'RecentActivity';
