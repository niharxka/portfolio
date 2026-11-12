import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { roles } from '../content'
import { stickerSets } from './Stickers'

const ease = [0.16, 1, 0.3, 1] as const

/** "I am ___" with the last phrase rotating and matching stickers popping in around it. */
export function RoleRotator() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % roles.length), 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="roles">
      <AnimatePresence mode="popLayout">
        {stickerSets[i].map((s, j) => (
          <motion.div
            key={`${i}-${j}`}
            className={`sticker sticker--${j}`}
            initial={{ opacity: 0, scale: 0.4, rotate: s.rotate - 25 }}
            animate={{ opacity: 1, scale: 1, rotate: s.rotate }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.3 } }}
            transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.15 + j * 0.12 }}
          >
            {s.el}
          </motion.div>
        ))}
      </AnimatePresence>

      <p className="roles__hi">Hi there! Thanks for being here ✿</p>
      <h2 className="roles__line">
        <motion.span layout transition={{ duration: 0.5, ease }}>
          I am&nbsp;
        </motion.span>
        <motion.span layout className="roles__rotator" aria-live="polite" transition={{ duration: 0.5, ease }}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={roles[i].text}
              style={{ color: roles[i].color }}
              initial={{ y: '60%', opacity: 0, filter: 'blur(8px)' }}
              animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: '-60%', opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.6, ease }}
            >
              {roles[i].text}.
            </motion.span>
          </AnimatePresence>
        </motion.span>
      </h2>
    </div>
  )
}
