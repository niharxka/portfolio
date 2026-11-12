import { useEffect } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'

/* Scroll stops for the background, roughly one per section:
   top / Experiences → Projects → About → Blog → Contact. All muted cream + pink. */
const STOPS = [0, 0.25, 0.5, 0.75, 1]
const BASE = ['#fbf6f1', '#fbf3ef', '#faf1ef', '#f8f3ef', '#faf0ef']
const A = ['#ecc4cc', '#efcbc2', '#eed5c8', '#e6c6d8', '#ecc1c9'] // big top-right blob
const B = ['#efcaca', '#f2d6cd', '#efc8d2', '#d6e3d0', '#efcccb'] // small top-left blob
const C = ['#f1d3cb', '#ecc6cd', '#f0d8cd', '#ecccd8', '#f0d0cc'] // bottom blob
const D = ['#f1d0d8', '#f3dbd0', '#dfe2d0', '#f0d0cd', '#ecc8d2'] // mid-left blob

/** Fixed pastel gradient blobs that shift color + drift as you scroll, a soft cursor glow,
 *  film grain and a faint dot texture. Also holds shared SVG filter defs. */
export function Background() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.6 })

  const base = useTransform(p, STOPS, BASE)
  const a = useTransform(p, STOPS, A)
  const b = useTransform(p, STOPS, B)
  const c = useTransform(p, STOPS, C)
  const d = useTransform(p, STOPS, D)

  const bgA = useMotionTemplate`radial-gradient(circle at 40% 40%, ${a} 0%, ${a} 30%, rgba(255,255,255,0) 70%)`
  const bgB = useMotionTemplate`radial-gradient(circle, ${b} 0%, rgba(255,255,255,0) 70%)`
  const bgC = useMotionTemplate`radial-gradient(circle, ${c} 0%, ${c} 30%, rgba(255,255,255,0) 70%)`
  const bgD = useMotionTemplate`radial-gradient(circle, ${d} 0%, rgba(255,255,255,0) 70%)`

  // parallax: each blob travels a different distance as you scroll
  const yA = useTransform(p, [0, 1], ['0vh', '38vh'])
  const xA = useTransform(p, [0, 1], ['0vw', '-18vw'])
  const yB = useTransform(p, [0, 1], ['0vh', '62vh'])
  const yC = useTransform(p, [0, 1], ['0vh', '-55vh'])
  const xC = useTransform(p, [0, 1], ['0vw', '-30vw'])
  const yD = useTransform(p, [0, 1], ['10vh', '-20vh'])

  // soft warm glow that follows the cursor
  const mx = useMotionValue(-600)
  const my = useMotionValue(-600)
  const gx = useSpring(mx, { stiffness: 80, damping: 20 })
  const gy = useSpring(my, { stiffness: 80, damping: 20 })
  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce, mx, my])

  return (
    <>
      <motion.div className="bg" aria-hidden="true" style={{ backgroundColor: base }}>
        <motion.div className="blob-wrap" style={reduce ? undefined : { x: xA, y: yA }}>
          <motion.div className="blob blob--a" style={{ background: bgA }} />
        </motion.div>
        <motion.div className="blob-wrap" style={reduce ? undefined : { y: yB }}>
          <motion.div className="blob blob--b" style={{ background: bgB }} />
        </motion.div>
        <motion.div className="blob-wrap" style={reduce ? undefined : { x: xC, y: yC }}>
          <motion.div className="blob blob--c" style={{ background: bgC }} />
        </motion.div>
        <motion.div className="blob-wrap" style={reduce ? undefined : { y: yD }}>
          <motion.div className="blob blob--d" style={{ background: bgD }} />
        </motion.div>
        <motion.div className="glow" style={{ x: gx, y: gy }} />
        <div className="dots" />
        <svg className="grain" width="200%" height="200%">
          <filter id="grain-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-noise)" />
        </svg>
      </motion.div>

      {/* Shared filter: gives any <g filter="url(#die-cut)"> a white sticker border + soft shadow */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="die-cut" x="-30%" y="-30%" width="160%" height="160%">
            <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="fat" />
            <feFlood floodColor="#ffffff" />
            <feComposite in2="fat" operator="in" result="border" />
            <feGaussianBlur in="fat" stdDeviation="4" result="blur" />
            <feOffset in="blur" dy="5" result="off" />
            <feFlood floodColor="#5a3c78" floodOpacity="0.28" />
            <feComposite in2="off" operator="in" result="shadow" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="border" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <pattern id="gingham-pink" width="12" height="12" patternUnits="userSpaceOnUse">
            <rect width="12" height="12" fill="#fff4f7" />
            <rect width="6" height="12" fill="#f6c6d6" opacity="0.7" />
            <rect width="12" height="6" fill="#f6c6d6" opacity="0.7" />
          </pattern>
          <pattern id="gingham-lilac" width="12" height="12" patternUnits="userSpaceOnUse">
            <rect width="12" height="12" fill="#f7f2ff" />
            <rect width="6" height="12" fill="#c9b3ea" opacity="0.7" />
            <rect width="12" height="6" fill="#c9b3ea" opacity="0.7" />
          </pattern>
        </defs>
      </svg>
    </>
  )
}
