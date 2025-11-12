"use client"

import React from "react"
import { SessionProvider } from "next-auth/react"

import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/ui/toast"

type ProvidersProps = {
  children: React.ReactNode
  session?: any
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <ToastProvider>{children}</ToastProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
