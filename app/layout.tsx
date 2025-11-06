import "./globals.css"
import type { Metadata } from "next"
import React from "react"

import { ThemeToggle } from "@/components/theme-toggle"
import Providers from "./providers"

export const metadata: Metadata = {
  title: "Portfolio",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased transition-colors">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            {children}
            </div>
        </Providers>
      </body>
    </html>
  )
}
