import { Navbar } from '@/components/site/navbar'
import { Hero } from '@/components/hero/hero'
import { ValueProposition } from '@/components/home/value-proposition'
import { FeaturesPreview } from '@/components/home/features-preview'
import { HomeCta } from '@/components/home/home-cta'
import { Footer } from '@/components/site/footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ValueProposition />
        <FeaturesPreview />
        <HomeCta />
      </main>
      <Footer />
    </>
  )
}

