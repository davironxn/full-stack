"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, LineChart } from "lucide-react";

const chartData = [
  { month: "Jan", value: 1200, growth: 12, color: "bg-emerald-500" },
  { month: "Feb", value: 980, growth: -6, color: "bg-sky-500" },
  { month: "Mar", value: 1600, growth: 18, color: "bg-indigo-500" },
  { month: "Apr", value: 1480, growth: 9, color: "bg-amber-500" },
  { month: "May", value: 1920, growth: 22, color: "bg-purple-500" },
  { month: "Jun", value: 2100, growth: 11, color: "bg-rose-500" },
];

export const PortfolioPerformanceChart = memo(() => {
  return (
    <div className="border-border bg-card/40 rounded-xl border p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <LineChart className="h-5 w-5 text-emerald-500" />
            Traffic & lead growth
          </h3>
          <p className="text-muted-foreground text-sm">
            Monthly sessions and inbound leads from portfolio touchpoints
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          Last 6 months
        </Button>
      </div>

      <div className="relative mb-4 h-64 rounded-lg p-4">
        <div className="flex h-full items-end justify-between gap-3">
          {chartData.map((item, index) => (
            <div key={item.month} className="group flex flex-1 flex-col items-center">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(item.value / 2100) * 180}px` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className={`relative w-full min-h-[20px] cursor-pointer rounded-t-lg ${item.color} transition-opacity hover:opacity-80`}
              >
                <div className="border-border bg-popover absolute -top-16 left-1/2 z-10 -translate-x-1/2 transform rounded-lg border px-3 py-2 text-sm opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  <div className="font-medium">{item.value.toLocaleString()} visitors</div>
                  <div className={`text-xs ${item.growth > 0 ? "text-emerald-500" : "text-red-500"}`}>
                    {item.growth > 0 ? "+" : ""}
                    {item.growth}% vs prior month
                  </div>
                </div>
              </motion.div>
              <div className="text-muted-foreground mt-2 text-center text-xs font-medium">
                {item.month}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-border/50 grid grid-cols-1 gap-4 border-t pt-4 sm:grid-cols-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-500">8.3K</div>
          <div className="text-muted-foreground text-xs">Portfolio sessions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-sky-500">640</div>
          <div className="text-muted-foreground text-xs">Qualified leads</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-500">3.8%</div>
          <div className="text-muted-foreground text-xs">Conversion rate</div>
        </div>
      </div>
    </div>
  );
});

PortfolioPerformanceChart.displayName = "PortfolioPerformanceChart";
