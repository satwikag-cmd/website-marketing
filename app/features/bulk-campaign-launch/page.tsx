import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { BulkLaunchHero } from '@/components/bulk-launch/bulk-launch-hero'
import { BulkLaunch } from '@/components/bulk-launch/bulk-launch'
import { BulkLaunchDetails } from '@/components/bulk-launch/bulk-launch-details'
import { HomeCta } from '@/components/home/home-cta'
import { Footer } from '@/components/site/footer'

export const metadata: Metadata = {
  title: 'Bulk Campaign Launch | Adcanopus',
  description:
    'Create, configure, and launch multiple Meta ad campaigns across separate ad accounts simultaneously from a single master template.',
}

export default function BulkCampaignLaunchPage() {
  return (
    <>
      <Navbar />
      <main>
        <BulkLaunchHero />
        <BulkLaunch />
        <BulkLaunchDetails />
        <HomeCta />
      </main>
      <Footer />
    </>
  )
}

