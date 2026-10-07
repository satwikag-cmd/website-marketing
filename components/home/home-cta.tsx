'use client'

import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { EASE_OUT } from '@/lib/motion'
import { ActionLink } from '@/components/site/action-link'
import { GoogleIcon } from '@/components/site/google-icon'

export function HomeCta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-hairline py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_50%_50%,oklch(0.83_0.135_74/0.06),transparent_70%)]"
      />
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-primary"
          >
            Get Started
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
            className="text-balance text-[clamp(2.2rem,4.5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.035em] text-foreground"
          >
            Ready to upgrade your Meta Ads workflow?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
            className="mt-4 text-pretty text-[15.5px] leading-relaxed text-muted-foreground md:text-[17px]"
          >
            Start launching campaigns faster and managing multiple ad accounts with confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <ActionLink href="#start-trial" size="lg" className="w-full sm:w-auto">
              <span>Start Free Trial</span>
              <ArrowRight className="size-4 transition-transform duration-200 group-hover/action:translate-x-0.5" aria-hidden="true" />
            </ActionLink>
            <ActionLink href="#sign-in" variant="secondary" size="lg" className="w-full sm:w-auto">
              <GoogleIcon className="size-4" />
              <span>Sign in with Google</span>
            </ActionLink>
          </motion.div>

          <p className="mt-4 font-mono text-[11px] text-muted-foreground/70">
            {'14-day trial · No credit card required · Cancel anytime'}
          </p>
        </div>
      </div>
    </section>
  )
}
