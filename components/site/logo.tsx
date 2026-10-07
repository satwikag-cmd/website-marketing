import Link from 'next/link'
import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={cn('size-6', className)}>
      <rect width="24" height="24" rx="6" className="fill-primary" />
      <path
        d="M6.5 17.25 12 6.75l5.5 10.5"
        className="stroke-primary-foreground"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.25 13.5h5.5" className="stroke-primary-foreground" strokeWidth="2.1" strokeLinecap="round" />
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

