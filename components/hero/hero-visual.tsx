'use client'

import { useLaunchSequence } from './use-launch-sequence'
import { ProductStage } from './product-stage'
import { CompactStage } from './compact-stage'

export function HeroVisual() {
  const sequence = useLaunchSequence()
  return (
    <>
      <ProductStage sequence={sequence} />
      <CompactStage sequence={sequence} />
    </>
  )
}
