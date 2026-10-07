import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { CreativeLibraryHero } from '@/components/creative-library/creative-library-hero'
import { CreativeLibraryApp } from '@/components/creative-library/creative-library-app'
import { CreativeLibraryDetails } from '@/components/creative-library/creative-library-details'
import { HomeCta } from '@/components/home/home-cta'
import { Footer } from '@/components/site/footer'

export const metadata: Metadata = {
  title: 'Creative Library | Adcanopus',
  description:
    'Organize your ad creatives in one place, group them by format or campaign, and quickly find the right assets when building Meta campaigns.',
}

export default function CreativeLibraryPage() {
  return (
    <>
      <Navbar />
      <main>
        <CreativeLibraryHero />
        <CreativeLibraryApp />
        <CreativeLibraryDetails />
        <HomeCta />
      </main>
      <Footer />
    </>
  )
}

