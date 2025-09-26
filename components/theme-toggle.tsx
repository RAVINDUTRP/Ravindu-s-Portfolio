"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark"
    
    // Add a smooth transition sequence
    if (resolvedTheme === "dark") {
      // Dark to Light transition
      setTheme("light")
    } else {
      // Light to Dark transition
      setTheme("dark")
    }
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="relative">
        <button
          className="relative w-10 h-5 bg-gray-200 dark:bg-gray-700 rounded-full p-0.5 transition-all duration-1500 hover:scale-105"
        >
          <div className="absolute top-0.5 w-4 h-4 bg-white dark:bg-gray-800 rounded-full shadow-sm transition-all duration-1500 ease-in-out flex items-center justify-center">
            <Sun className="w-2 h-2 text-gray-600 dark:text-gray-300 transition-all duration-1500" />
          </div>
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={handleThemeChange}
        className="relative w-10 h-5 bg-gray-200 dark:bg-gray-700 rounded-full p-0.5 transition-all duration-1500 hover:scale-105"
      >
        <div className={`absolute top-0.5 w-4 h-4 bg-white dark:bg-gray-800 rounded-full shadow-sm transition-all duration-1500 ease-in-out flex items-center justify-center ${
          resolvedTheme === "dark" ? "translate-x-5" : "translate-x-0"
        }`}>
          {resolvedTheme === "dark" ? (
            <Moon className="w-2 h-2 text-gray-600 dark:text-gray-300 transition-all duration-1500 animate-pulse" />
          ) : (
            <Sun className="w-2 h-2 text-gray-600 dark:text-gray-300 transition-all duration-1500 animate-spin" />
          )}
        </div>
      </button>
    </div>
  )
} 