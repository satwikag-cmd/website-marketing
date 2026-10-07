'use client'

import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { EASE_OUT } from '@/lib/motion'
import { ActionLink } from '@/components/site/action-link'
import { GoogleIcon } from '@/components/site/google-icon'

const HEADLINE = 'Built for the way modern advertisers work.'

function RevealHeadline() {
  const words = HEADLINE.split(' ')
  return (
    <h1 id="hero-heading" className="text-balance text-[clamp(2.6rem,6.2vw,5.4rem)] font-medium leading-[0.98] tracking-[-0.045em] text-foreground">
      <span className="sr-only">{HEADLINE}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.055, ease: EASE_OUT }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && '\u00A0'}
          </span>
        ))}
      </span>
    </h1>
  )
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE_OUT },
})

export function HeroCopy() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12 xl:gap-16">
      <div className="min-w-0">
        <motion.p
          {...fadeUp(0.05)}
          className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
        >
          <span className="h-px w-8 bg-primary" aria-hidden="true" />
          Meta Ads infrastructure
        </motion.p>
        <RevealHeadline />
      </div>

      <div className="flex w-full flex-col sm:w-fit lg:pb-[0.35em]">
        <motion.p
          {...fadeUp(0.55)}
          className="max-w-md text-pretty text-[16px] leading-relaxed text-muted-foreground md:text-[17px] lg:max-w-[24rem]"
        >
          <span className="text-foreground">Launch campaigns faster.</span> Automate repetitive work. Manage multiple ad
          accounts. Understand what performs.
        </motion.p>

        <motion.div {...fadeUp(0.7)} className="mt-7 flex w-full flex-col items-stretch sm:w-fit">
          <div role="group" aria-label="Get started" className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr]">
            <ActionLink href="#start-trial" size="lg" className="w-full leading-none">
              <span>Start Free Trial</span>
              <ArrowRight
                className="size-4 shrink-0 transition-transform duration-200 group-hover/action:translate-x-0.5"
                aria-hidden="true"
              />
            </ActionLink>
            <ActionLink href="#sign-in" variant="secondary" size="lg" className="w-full leading-none">
              <GoogleIcon className="size-4 shrink-0" />
              <span>Sign in with Google</span>
            </ActionLink>
          </div>
          <p className="mt-4 text-center font-mono text-[11px] text-muted-foreground/80">
            {'14-day trial · No credit card · Cancel anytime'}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
