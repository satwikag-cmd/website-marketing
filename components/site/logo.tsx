import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <>
      <Image
        src="/scaviyo5.png"
        alt="Scaviyo"
        width={1459}
        height={437}
        className={cn('h-7 w-auto object-contain dark:hidden', className)}
      />
      <Image
        src="/scaviyo6.png"
        alt="Scaviyo"
        width={1459}
        height={437}
        className={cn('h-7 w-auto object-contain hidden dark:block', className)}
      />
    </>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'group inline-flex items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4',
        className,
      )}
      aria-label="Scaviyo home"
    >
      {/* Light Mode Logo */}
      <Image
        src="/scaviyo5.png"
        alt="Scaviyo"
        width={1459}
        height={437}
        priority
        className="h-9 sm:h-12 w-auto object-contain dark:hidden transition-transform duration-200 ease-out group-hover:scale-105"
      />
      {/* Dark Mode Logo */}
      <Image
        src="/scaviyo6.png"
        alt="Scaviyo"
        width={1459}
        height={437}
        priority
        className="h-9 sm:h-12 w-auto object-contain hidden dark:block transition-transform duration-200 ease-out group-hover:scale-105"
      />
    </Link>
  )
}

