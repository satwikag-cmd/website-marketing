'use client'

import { useTheme } from './theme-provider'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn(
        'relative inline-flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-primary',
        className,
      )}
    >
      <Sun
        className={cn(
          'size-4 transition-all duration-200',
          isDark ? 'scale-0 rotate-90 opacity-0 absolute' : 'scale-100 rotate-0 opacity-100 text-amber-500',
        )}
        aria-hidden="true"
      />
      <Moon
        className={cn(
          'size-4 transition-all duration-200',
          isDark ? 'scale-100 rotate-0 opacity-100 text-primary' : 'scale-0 -rotate-90 opacity-0 absolute',
        )}
        aria-hidden="true"
      />
    </button>
  )
}
