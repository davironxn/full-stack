"use client"
import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  as?: keyof React.JSX.IntrinsicElements
  children: React.ReactNode
  className?: string
  delay?: number
}


export function AnimatedText({
  as: Tag = "p",
  children,
  className,
  delay = 0,
}: AnimatedTextProps) {
  const MotionTag = motion(Tag)

  return (
    <MotionTag
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn("tracking-tight", className)}
    >
      {children}
    </MotionTag>
  )
}
