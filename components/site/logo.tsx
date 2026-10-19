import Link from 'next/link'
import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="6.5 6.5 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn('size-5 shrink-0', className)}
    >
      <defs>
        <linearGradient id="scaviyo-delta-grad" x1="8" y1="7" x2="28" y2="29" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      {/* Top Delta Wing */}
      <path
        d="M10 7L27 7L20 15L9 15C7.5 15 6.5 13.5 7.5 12L10 7Z"
        fill="url(#scaviyo-delta-grad)"
      />
      {/* Center Connecting Fin (Depth Shadow) */}
      <path
        d="M16 15L23 15L19 21L12 21L16 15Z"
        fill="#D97706"
        fillOpacity="0.88"
      />
      {/* Bottom Delta Wing */}
      <path
        d="M26 29L9 29L16 21L27 21C28.5 21 29.5 22.5 28.5 24L26 29Z"
        fill="url(#scaviyo-delta-grad)"
      />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'group inline-flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4',
        className,
      )}
      aria-label="Scaviyo home"
    >
      <LogoMark className="transition-transform duration-200 ease-out group-hover:scale-105" />
      <span className="font-brand text-[19px] tracking-[0.015em] text-foreground antialiased">
        Scaviyo
      </span>
    </Link>
  )
}

