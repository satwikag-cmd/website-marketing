export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(to right, oklch(1 0 0 / 0.045) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 0.045) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          backgroundPosition: 'center top',
          maskImage: 'radial-gradient(ellipse 70% 55% at 50% 0%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 55% at 50% 0%, black 30%, transparent 75%)',
        }}
      />
      <div
        className="absolute left-1/2 top-[-260px] h-[620px] w-[1100px] -translate-x-1/2"
        style={{ background: 'radial-gradient(ellipse at center, oklch(0.83 0.135 74 / 0.11), transparent 62%)' }}
      />
      <div
        className="absolute left-1/2 top-[44%] h-[700px] w-[1500px] -translate-x-1/2"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 40%, oklch(0.83 0.135 74 / 0.10), transparent 70%)' }}
      />
      <div
        className="absolute left-1/2 top-[52%] h-[500px] w-[900px] -translate-x-[10%]"
        style={{ background: 'radial-gradient(ellipse at center, oklch(0.82 0.125 168 / 0.05), transparent 65%)' }}
      />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
