'use client'

import { motion } from 'motion/react'
import { EASE_OUT } from '@/lib/motion'

export function ValueProposition() {
  return (
    <section className="relative border-y border-hairline bg-surface/30 py-16 md:py-20">
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-primary"
          >
            Unified Meta Advertising Workflows
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
            className="text-balance text-[clamp(1.8rem,3.8vw,2.8rem)] font-medium leading-[1.12] tracking-[-0.035em] text-foreground"
          >
            Everything you need to launch, automate, and scale Meta campaigns.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
            className="mt-5 text-pretty text-[15.5px] leading-relaxed text-muted-foreground md:text-[17px]"
          >
            Adcanopus brings campaign creation, rule-based automation, creative asset management, and multi-account reporting into one cohesive workspace designed for modern media buyers.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
