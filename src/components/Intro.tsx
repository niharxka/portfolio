import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { name, funFacts, factsTitle } from '../content'
import { Keycap, ArrowGlyph } from './Keycap'
import { Desk } from './Desk'
import { RoleRotator } from './RoleRotator'

const ease = [0.16, 1, 0.3, 1] as const
const exitEase = [0.7, 0, 0.84, 0] as const

export function Intro({ onEnter }: { onEnter: (target?: string) => void }) {
  const [pressed, setPressed] = useState(false)
  const [flipped, setFlipped] = useState<number | null>(null)
  const [hearts, setHearts] = useState<number[]>([])

  const go = () => {
    setPressed(true)
    setTimeout(onEnter, 160)
  }

  // → / Enter to continue, and a secret: type my name for a surprise
  useEffect(() => {
    let typed = ''
    const onKey = (e: KeyboardEvent) => {
      const onControl = (e.target as HTMLElement).closest?.('button, a, [role="button"]')
      if (e.key === 'ArrowRight' || (e.key === 'Enter' && !onControl)) {
        e.preventDefault()
        go()
        return
      }
      if (e.key.length === 1) {
        typed = (typed + e.key.toLowerCase()).slice(-name.first.length)
        if (typed === name.first.toLowerCase()) {
          setHearts(Array.from({ length: 28 }, (_, i) => Date.now() + i))
          setTimeout(() => setHearts([]), 4200)
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.section
      className="intro"
      aria-label="Intro"
      exit={{ opacity: 0, transition: { delay: 0.5, duration: 0.3 } }}
    >
      <h1 className="intro__name">
        <motion.span
          initial={{ x: '-110vw' }}
          animate={{ x: 0 }}
          exit={{ x: '-110vw', transition: { duration: 0.75, ease: exitEase } }}
          transition={{ duration: 1.1, ease }}
          whileTap={{ rotate: -2, scale: 0.98 }}
        >
          {name.first}
        </motion.span>
        <motion.span
          className="last"
          initial={{ x: '110vw' }}
          animate={{ x: 0 }}
          exit={{ x: '110vw', transition: { duration: 0.75, ease: exitEase } }}
          transition={{ duration: 1.1, ease, delay: 0.12 }}
          whileTap={{ rotate: 2, scale: 0.98 }}
        >
          {name.last}
        </motion.span>
      </h1>

      <motion.div
        className="intro__roles"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ x: '110vw', transition: { duration: 0.75, ease: exitEase } }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <RoleRotator />
      </motion.div>

      <div className="intro__bottom">
        <Desk />

        <motion.ul
          className="facts"
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, y: 30, transition: { duration: 0.4 } }}
          variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 1.5 } } }}
        >
          <li className="facts__label" aria-hidden="true">
            {factsTitle}
          </li>
          {funFacts.map((f, i) => (
            <motion.li
              key={f.front}
              className="fact"
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <button
                className={flipped === i ? 'is-flipped' : ''}
                onClick={() => setFlipped(flipped === i ? null : i)}
                aria-label={`${f.front}. Flip side: ${f.back}`}
              >
                <span className="fact__inner">
                  <span className="fact__side">
                    <span aria-hidden="true">{f.emoji}</span> {f.front}
                  </span>
                  <span className="fact__side fact__side--back" aria-hidden="true">
                    {f.back}
                  </span>
                </span>
              </button>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="intro__go"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 120, transition: { duration: 0.5, ease: exitEase } }}
          transition={{ delay: 1.8, duration: 0.8, ease }}
        >
          <Keycap className="key--live" onClick={() => onEnter('chat')} ariaLabel="Chat with me, live! Opens the chat terminal">
            <span className="live-dot" aria-hidden="true" />
            Chat with me, live!
          </Keycap>
          <small>Come on in →</small>
          <motion.div animate={{ x: [0, 6, 0] }} transition={{ delay: 3, duration: 1.4, repeat: Infinity, repeatDelay: 1.2 }}>
            <Keycap className="key--arrow" hint="Enter" pressed={pressed} onClick={go} ariaLabel="Enter the site">
              <ArrowGlyph />
            </Keycap>
          </motion.div>
        </motion.div>
      </div>

      {hearts.length > 0 && (
        <div className="hearts" aria-hidden="true">
          {hearts.map((id, i) => (
            <motion.span
              key={id}
              style={{ left: `${(i * 37) % 100}%` }}
              initial={{ y: 0, rotate: 0, opacity: 1 }}
              animate={{ y: '120vh', rotate: (i % 2 ? 1 : -1) * 180, opacity: [1, 1, 0] }}
              transition={{ duration: 2.4 + (i % 5) * 0.3, delay: (i % 7) * 0.12, ease: 'easeIn' }}
            >
              {['💗', '💜', '✿', '🩷', '✦'][i % 5]}
            </motion.span>
          ))}
        </div>
      )}
    </motion.section>
  )
}
