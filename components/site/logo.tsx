import Link from 'next/link'
import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={cn('size-6', className)}>
      <rect width="24" height="24" rx="6" className="fill-primary" />
      <g className="fill-primary-foreground">
        <rect x="5.5" y="5.5" width="5.75" height="5.75" rx="1.75" fillOpacity="0.45" />
        <rect x="12.75" y="5.5" width="5.75" height="5.75" rx="1.75" />
        <rect x="5.5" y="12.75" width="5.75" height="5.75" rx="1.75" />
        <rect x="12.75" y="12.75" width="5.75" height="5.75" rx="1.75" fillOpacity="0.45" />
        <circle cx="12" cy="12" r="1.25" className="fill-primary" />
      </g>
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'group inline-flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4',
        className,
      )}
      aria-label="Adcanopus home"
    >
      <LogoMark className="transition-transform duration-500 ease-out group-hover:-rotate-6" />
      <span className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">adcanopus</span>
    </Link>
  )
}

