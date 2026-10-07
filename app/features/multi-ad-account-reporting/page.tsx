import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { ReportingHero } from '@/components/reporting/reporting-hero'
import { ReportingConsole } from '@/components/reporting/reporting-console'
import { ReportingDetails } from '@/components/reporting/reporting-details'
import { HomeCta } from '@/components/home/home-cta'
import { Footer } from '@/components/site/footer'

export const metadata: Metadata = {
  title: 'Multi-Ad Account Reporting | Adcanopus',
  description:
    'Consolidated performance analytics, blended ROAS, and multi-account visibility for Meta advertising teams.',
}

export default function MultiAdAccountReportingPage() {
  return (
    <>
      <Navbar />
      <main>
        <ReportingHero />
        <ReportingConsole />
        <ReportingDetails />
        <HomeCta />
      </main>
      <Footer />
    </>
  )
}
