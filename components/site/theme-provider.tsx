'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Read persisted theme from localStorage; default is 'light'
    try {
      const stored = localStorage.getItem('adcanopus_theme') as Theme | null
      if (stored === 'dark' || stored === 'light') {
        setThemeState(stored)
        if (stored === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      } else {
        // Default to light mode
        setThemeState('light')
        document.documentElement.classList.remove('dark')
      }
    } catch {
      // Ignore localStorage access errors if any
    }
    setMounted(true)
  }, [])

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme)
    try {
      localStorage.setItem('adcanopus_theme', nextTheme)
    } catch {
      // Ignore
    }
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme: mounted ? theme : 'light', setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
