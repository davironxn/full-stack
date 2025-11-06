"use client"

import React from "react"

// ✅ 1️⃣ Add "beauty" to ThemeName type
type ThemeName = "light" | "dark" | "beauty"
type ThemeSetting = ThemeName | "system"

type ThemeContextValue = {
  theme: ThemeSetting
  setTheme: (theme: ThemeSetting) => void
  resolvedTheme: ThemeName
  systemTheme: ThemeName
}

type ThemeProviderProps = {
  attribute?: "class" | "data-theme"
  defaultTheme?: ThemeSetting
  enableSystem?: boolean
  storageKey?: string
  themes?: ThemeName[]
  children: React.ReactNode
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

function getSystemTheme(): ThemeName {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function applyTheme(
  attribute: "class" | "data-theme",
  themes: ThemeName[],
  theme: ThemeName,
) {
  if (typeof document === "undefined") return
  const root = document.documentElement
  if (attribute === "class") {
    const themeClasses = new Set(themes)
    root.classList.forEach((className) => {
      if (themeClasses.has(className as ThemeName)) {
        root.classList.remove(className)
      }
    })
    root.classList.add(theme)
  } else {
    root.setAttribute(attribute, theme)
  }
}

export function ThemeProvider({
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  storageKey = "theme",
  // ✅ 2️⃣ Include "beauty" in default themes list
  themes = ["light", "dark", "beauty"],
  children,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<ThemeSetting>(defaultTheme)
  const [systemTheme, setSystemTheme] = React.useState<ThemeName>("light")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    if (!enableSystem) return
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      const nextSystemTheme = media.matches ? "dark" : "light"
      setSystemTheme(nextSystemTheme)
    }
    handleChange()
    media.addEventListener("change", handleChange)
    return () => media.removeEventListener("change", handleChange)
  }, [enableSystem])

  React.useEffect(() => {
    const stored =
      typeof window !== "undefined" ? window.localStorage.getItem(storageKey) : null
    if (stored === "light" || stored === "dark" || stored === "system" || stored === "beauty") {
      setThemeState(stored)
    } else {
      setThemeState(defaultTheme)
    }
    setSystemTheme(getSystemTheme())
    setMounted(true)
  }, [defaultTheme, storageKey])

  const resolvedTheme: ThemeName = React.useMemo(() => {
    if (theme === "system" && enableSystem) {
      return systemTheme
    }
    // ✅ fallback to "beauty" when explicitly selected
    return theme === "beauty" ? "beauty" : theme === "dark" ? "dark" : "light"
  }, [theme, enableSystem, systemTheme])

  React.useEffect(() => {
    if (!mounted) return
    const themeToApply = resolvedTheme
    applyTheme(attribute, themes, themeToApply)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, theme)
    }
  }, [attribute, themes, resolvedTheme, storageKey, theme, mounted])

  const setTheme = React.useCallback((nextTheme: ThemeSetting) => {
    setThemeState(nextTheme)
  }, [])

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      resolvedTheme,
      systemTheme,
    }),
    [theme, setTheme, resolvedTheme, systemTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
