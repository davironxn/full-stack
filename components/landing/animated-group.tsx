"use client"

import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils" // optional helper for merging classNames

interface AnimatedGroupProps {
  children: React.ReactNode
  className?: string
  preset?: "fade" | "blur-slide" | "scale"
}

export function AnimatedGroup({
  children,
  className,
  preset = "fade",
}: AnimatedGroupProps) {
  const presets = {
    fade: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, duration: 0.6 },
      },
    },
    "blur-slide": {
      hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { staggerChildren: 0.15, duration: 0.6 },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { staggerChildren: 0.15, duration: 0.6 },
      },
    },
  }

  return (
    <AnimatePresence>
      <motion.div
        variants={presets[preset]}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className={cn("space-y-4", className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
