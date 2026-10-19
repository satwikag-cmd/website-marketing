import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/scaviyo5.png"
      alt="Scaviyo"
      width={200}
      height={70}
      className={cn('h-7 w-auto object-contain dark:hidden mix-blend-multiply', className)}
    />
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
        width={200}
        height={70}
        priority
        className="h-[80px] w-auto object-contain dark:hidden transition-transform duration-200 ease-out group-hover:scale-105 mix-blend-multiply"
      />
      {/* Dark Mode Logo */}
      <Image
        src="/scaviyo6.png"
        alt="Scaviyo"
        width={200}
        height={70}
        priority
        className="h-[80px] w-auto object-contain hidden dark:block transition-transform duration-200 ease-out group-hover:scale-105 mix-blend-screen"
      />
    </Link>
  )
}

