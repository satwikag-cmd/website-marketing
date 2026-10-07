import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { AutomationHero } from '@/components/automation/automation-hero'
import { AutomationConsole } from '@/components/automation/automation-console'
import { AutomationDetails } from '@/components/automation/automation-details'
import { HomeCta } from '@/components/home/home-cta'
import { Footer } from '@/components/site/footer'

export const metadata: Metadata = {
  title: 'Automation | Adcanopus',
  description:
    'Build automated workflows around your Meta advertising operations and reduce repetitive campaign management work.',
}

export default function AutomationPage() {
  return (
    <>
      <Navbar />
      <main>
        <AutomationHero />
        <AutomationConsole />
        <AutomationDetails />
        <HomeCta />
      </main>
      <Footer />
    </>
  )
}
