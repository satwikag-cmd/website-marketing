'use client'

import { useAuth } from '@/components/site/auth-context'
import { actionStyles } from '@/components/site/action-link'
import { ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PricingCardActionProps {
  planName: string
  ctaText: string
  ctaVariant: 'primary' | 'secondary'
}

export function PricingCardAction({ planName, ctaText, ctaVariant }: PricingCardActionProps) {
  const { user, signInWithGoogle } = useAuth()

  const handleClick = () => {
    if (!user) {
      signInWithGoogle()
    } else {
      if (planName === 'Enterprise') {
        window.location.href = 'mailto:hello@adcanopus.com?subject=Enterprise%20Inquiry'
      } else {
        alert(`You are signed in as ${user.displayName || user.email}. Workspace setup for ${planName} plan will open here.`)
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(actionStyles({ variant: ctaVariant, size: 'lg' }), 'w-full')}
    >
      <span>{user && planName !== 'Enterprise' ? 'Continue with Plan' : ctaText}</span>
      <ArrowRight className="size-4" />
    </button>
  )
}
