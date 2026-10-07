import { HeroBackdrop } from './hero-backdrop'
import { HeroCopy } from './hero-copy'
import { HeroVisual } from './hero-visual'

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative isolate overflow-hidden scroll-mt-16 pb-24 pt-[calc(4rem+4.5rem)] md:pb-32 md:pt-[calc(4rem+6rem)]">
      <HeroBackdrop />
      <div className="container-site">
        <HeroCopy />
        <div className="mt-14 md:mt-20">
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}
