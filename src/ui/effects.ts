export const glassSurface = {
  card:
    'banner-glass banner-glass-card',
  compact:
    'banner-glass banner-glass-compact',
  pill:
    'banner-glass banner-glass-pill',
} as const

export const glowSurface = {
  cyan: 'banner-glow banner-glow-cyan',
  mint: 'banner-glow banner-glow-mint',
  rose: 'banner-glow banner-glow-rose',
} as const

export const spring = {
  hero: { type: 'spring', stiffness: 82, damping: 18, mass: 0.9 },
  soft: { type: 'spring', stiffness: 150, damping: 22, mass: 0.7 },
  press: { type: 'spring', stiffness: 420, damping: 28, mass: 0.5 },
} as const

export const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: 'blur(12px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
} as const

export const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
} as const

export const supportsReducedEffects = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('(prefers-reduced-transparency: reduce)').matches)
