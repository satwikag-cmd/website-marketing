'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useAuth } from './auth-context'
import { LogOut, User as UserIcon, ChevronDown, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function UserProfileMenu() {
  const { user, signOutUser } = useAuth()
  const [open, setOpen] = useState(false)
  const [imageError, setImageError] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) return null

  const firstLetter = (
    user.displayName?.trim()?.[0] ||
    user.email?.trim()?.[0] ||
    'U'
  ).toUpperCase()

  const displayName = user.displayName || user.email?.split('@')[0] || 'Account'

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          'group flex items-center gap-2 rounded-full border border-border bg-surface/90 py-1 pl-1 pr-2.5 transition-all duration-200 hover:border-primary/40 hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-primary',
          open && 'border-primary/50 bg-surface-2 ring-1 ring-primary/30',
        )}
      >
        {user.photoURL && !imageError ? (
          <div className="relative size-7 shrink-0 overflow-hidden rounded-full border border-hairline">
            <Image
              src={user.photoURL}
              alt={displayName}
              fill
              className="object-cover"
              sizes="28px"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/15 font-mono text-[12px] font-semibold text-primary">
            {firstLetter}
          </div>
        )}

        <span className="max-w-[120px] truncate text-[13px] font-medium text-foreground">
          {displayName.split(' ')[0]}
        </span>

        <ChevronDown
          className={cn(
            'size-3.5 text-muted-foreground transition-transform duration-200',
            open && 'rotate-180 text-foreground',
          )}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 origin-top-right overflow-hidden rounded-xl border border-border bg-surface p-3 shadow-xl backdrop-blur-xl">
          {/* User info header */}
          <div className="flex items-center gap-3 border-b border-hairline pb-3">
            {user.photoURL && !imageError ? (
              <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-hairline">
                <Image
                  src={user.photoURL}
                  alt={displayName}
                  fill
                  className="object-cover"
                  sizes="40px"
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/15 font-mono text-[15px] font-bold text-primary">
                {firstLetter}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13.5px] font-medium text-foreground">
                {user.displayName || displayName}
              </p>
              <p className="truncate font-mono text-[11px] text-muted-foreground">
                {user.email}
              </p>
              <div className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-signal">
                <CheckCircle2 className="size-3 text-signal shrink-0" />
                <span>Signed in with Google</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2">
            <button
              type="button"
              onClick={async () => {
                setOpen(false)
                await signOutUser()
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="size-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
