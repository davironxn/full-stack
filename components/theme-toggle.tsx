"use client"

import * as React from "react"
import { Moon, Sparkles, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const THEME_SEQUENCE = ["light", "dark", "beauty"] as const
type ThemeOption = (typeof THEME_SEQUENCE)[number]

const THEME_LABELS: Record<ThemeOption, string> = {
  light: "Light mode",
  dark: "Dark mode",
  beauty: "Beauty mode",
}

function isThemeOption(value: string | undefined | null): value is ThemeOption {
  return value ? (THEME_SEQUENCE as readonly string[]).includes(value) : false
}

function ThemeIcon({ theme }: { theme: ThemeOption }) {
  if (theme === "dark") {
    return <Moon className="h-4 w-4" aria-hidden="true" />
  }
  if (theme === "beauty") {
    return <Sparkles className="h-4 w-4" aria-hidden="true" />
  }
  return <Sun className="h-4 w-4" aria-hidden="true" />
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme: ThemeOption = React.useMemo(() => {
    if (!mounted) {
      return "light"
    }
    if (isThemeOption(resolvedTheme)) {
      return resolvedTheme
    }
    return "light"
  }, [mounted, resolvedTheme])

  const nextTheme = React.useMemo(() => {
    const currentIndex = THEME_SEQUENCE.indexOf(currentTheme)
    const nextIndex = (currentIndex + 1) % THEME_SEQUENCE.length
    return THEME_SEQUENCE[nextIndex]
  }, [currentTheme])

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className="group relative inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-2 text-sm font-medium text-foreground shadow-lg backdrop-blur transition hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring pointer-events-auto"
      aria-label={mounted ? `Switch to ${THEME_LABELS[nextTheme]}` : "Toggle theme"}
      title={mounted ? `Switch to ${THEME_LABELS[nextTheme]}` : undefined}
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
        <ThemeIcon theme={currentTheme} />
      </div>
      <span className="hidden sm:inline">{mounted ? THEME_LABELS[currentTheme] : "Theme"}</span>
    </button>
  )
}
