import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const actionStyles = cva(
  'group/action relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-medium tracking-[-0.01em] transition-[background-color,color,box-shadow,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-px',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow-[inset_0_1px_0_oklch(1_0_0/0.35),0_0_0_1px_oklch(0.62_0.12_65),0_8px_24px_-8px_oklch(0.83_0.135_74/0.45)] hover:bg-[oklch(0.86_0.13_76)] hover:shadow-[inset_0_1px_0_oklch(1_0_0/0.4),0_0_0_1px_oklch(0.62_0.12_65),0_10px_30px_-8px_oklch(0.83_0.135_74/0.6)]',
        secondary:
          'bg-surface-2 text-foreground shadow-[inset_0_1px_0_oklch(1_0_0/0.06),0_0_0_1px_oklch(1_0_0/0.1)] hover:bg-surface-3 hover:shadow-[inset_0_1px_0_oklch(1_0_0/0.08),0_0_0_1px_oklch(1_0_0/0.16)]',
        ghost: 'text-muted-foreground hover:bg-white/[0.04] hover:text-foreground',
      },
      size: {
        sm: 'h-8 rounded-md px-3 text-[13px]',
        md: 'h-9 rounded-md px-3.5 text-sm',
        lg: 'h-12 rounded-lg px-5 text-[15px]',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

type ActionLinkProps = ComponentProps<'a'> & VariantProps<typeof actionStyles>

export function ActionLink({ className, variant, size, ...props }: ActionLinkProps) {
  return <a className={cn(actionStyles({ variant, size }), className)} {...props} />
}
