import { useRef } from 'react'
import { ArrowRight, Check, Orbit, Sparkles, Zap } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import LiquidGlass from 'liquid-glass-react'
import clsx from 'clsx'
import { fadeUp, glassSurface, glowSurface, spring, stagger } from '../ui/effects'

type ClassProps = {
  className?: string
  children?: React.ReactNode
}

export function GradientBackground() {
  return (
    <div className="gradient-background" aria-hidden="true">
      <div className="mesh mesh-cyan" />
      <div className="mesh mesh-mint" />
      <div className="mesh mesh-rose" />
      <div className="mesh mesh-ink" />
    </div>
  )
}

export function GlowLayer({ tone = 'cyan' }: { tone?: keyof typeof glowSurface }) {
  return <div className={glowSurface[tone]} aria-hidden="true" />
}

export function NoiseOverlay() {
  return <div className="noise-overlay" aria-hidden="true" />
}

export function BackgroundBlurBlob({
  tone = 'cyan',
  className,
}: {
  tone?: keyof typeof glowSurface
  className?: string
}) {
  return <div className={clsx('background-blur-blob', `blob-${tone}`, className)} aria-hidden="true" />
}

export function GlassCard({ className, children }: ClassProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const content = <div className="glass-card-inner">{children}</div>

  return (
    <div ref={containerRef} className={clsx(glassSurface.card, className)}>
      <div className="css-glass-shell">{content}</div>
      <div className="desktop-liquid-shell" aria-hidden="true">
        <LiquidGlass
          mouseContainer={containerRef}
          displacementScale={42}
          blurAmount={0.08}
          saturation={145}
          aberrationIntensity={1.4}
          elasticity={0.18}
          cornerRadius={28}
          className="liquid-glass-shell"
        >
          {content}
        </LiquidGlass>
      </div>
    </div>
  )
}

export function AnimatedTitle() {
  return (
    <motion.div className="banner-copy" variants={stagger} initial="hidden" animate="visible">
      <motion.p className="banner-kicker" variants={fadeUp} transition={spring.soft}>
        <Sparkles size={16} strokeWidth={1.8} />
        Premium banner effect stack
      </motion.p>
      <motion.h1 variants={fadeUp} transition={spring.hero}>
        Build launch screens with liquid glass, ambient glow, and cinematic depth.
      </motion.h1>
      <motion.p className="banner-lede" variants={fadeUp} transition={spring.soft}>
        A ready-to-use React design system for SaaS hero banners: glass panels, animated mesh
        backgrounds, hover glow, subtle grain, and GPU-friendly motion.
      </motion.p>
    </motion.div>
  )
}

export function CTAButton({ className }: { className?: string }) {
  return (
    <motion.a
      href="#banner-preview"
      className={clsx(glassSurface.pill, 'cta-button', className)}
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={spring.press}
    >
      Explore stack
      <ArrowRight size={18} strokeWidth={1.8} />
    </motion.a>
  )
}

function StackPill({ children }: ClassProps) {
  return (
    <span className={glassSurface.compact}>
      <Check size={14} strokeWidth={2.2} />
      {children}
    </span>
  )
}

export default function Banner() {
  const reduceMotion = useReducedMotion()

  return (
    <main className="banner-page">
      <section className="banner-shell" id="banner-preview">
        <GradientBackground />
        <GlowLayer tone="cyan" />
        <GlowLayer tone="mint" />
        <NoiseOverlay />
        <BackgroundBlurBlob tone="cyan" className="blob-one" />
        <BackgroundBlurBlob tone="rose" className="blob-two" />

        <div className="banner-content">
          <div className="banner-left">
            <AnimatedTitle />

            <motion.div
              className="banner-actions"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring.soft, delay: 0.34 }}
            >
              <CTAButton />
              <a className="secondary-link" href="https://motion.dev/docs/react" target="_blank">
                Motion docs
              </a>
            </motion.div>

            <motion.div
              className="stack-pills"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <StackPill>Motion 12</StackPill>
              <StackPill>Liquid glass</StackPill>
              <StackPill>CSS mesh</StackPill>
            </motion.div>
          </div>

          <motion.div
            className="banner-right"
            initial={{ opacity: 0, y: 20, rotateX: reduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ ...spring.hero, delay: 0.15 }}
          >
            <GlassCard>
              <div className="preview-topline">
                <span>Effect Pipeline</span>
                <span className="live-dot">Live</span>
              </div>
              <div className="preview-orbit">
                <Orbit size={92} strokeWidth={0.8} />
                <div className="preview-core">
                  <Zap size={28} strokeWidth={1.6} />
                </div>
              </div>
              <div className="preview-grid">
                <span>Frosted blur</span>
                <strong>18px</strong>
                <span>Glow intensity</span>
                <strong>72%</strong>
                <span>Noise opacity</span>
                <strong>0.08</strong>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
