import { useEffect, useRef, useState, type ReactNode, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { deskItems, mugOverload, board } from '../content'

const W = 440
const H = 320

/** Where each popup bubble points to (SVG coords: top-center of the object). */
const anchors: Record<string, [number, number]> = {
  board: [75, 28],
  lamp: [72, 128],
  books: [120, 170],
  me: [220, 58],
  laptop: [220, 154],
  mug: [314, 146],
  clock: [368, 152],
  cat: [306, 270],
}

const HAIR = '#3b2a35'
const SKIN = '#f4d3bf'
const SKIN_SHADE = '#e9bea6'
const INK = '#3a3340'

type SpotProps = { id: string; label: string; open: string | null; onToggle: (id: string) => void; children: ReactNode }

/** Clickable, keyboard-focusable group wrapper */
function Spot({ id, label, open, onToggle, children }: SpotProps) {
  return (
    <g
      className={`hotspot${open === id ? ' is-open' : ''}`}
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-expanded={open === id}
      onClick={(e) => {
        e.stopPropagation()
        onToggle(id)
      }}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          e.stopPropagation()
          onToggle(id)
        }
      }}
    >
      {children}
    </g>
  )
}

export function Desk() {
  const [open, setOpen] = useState<string | null>(null)
  const [mugClicks, setMugClicks] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null)
    }
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const toggle = (id: string) => {
    if (id === 'mug') setMugClicks((n) => n + 1)
    setOpen((cur) => (cur === id && id !== 'mug' ? null : id))
  }

  const item =
    open === 'board'
      ? null
      : open === 'mug' && mugClicks >= 5
      ? { title: mugOverload.title, body: mugOverload.body.replace('{n}', String(mugClicks)) }
      : open
        ? deskItems[open]
        : null

  let bubbleStyle: Record<string, string> = {}
  if (open) {
    const [x, y] = anchors[open]
    const align = x < 130 ? 0.15 : x > 320 ? 0.85 : 0.5
    bubbleStyle = {
      left: `${(x / W) * 100}%`,
      top: `${(y / H) * 100}%`,
      x: `-${align * 100}%`,
      y: 'calc(-100% - 14px)',
      transformOrigin: `${align * 100}% 100%`,
      '--tail': `${align * 100}%`,
    }
  }

  return (
    <motion.div
      ref={ref}
      className="desk"
      initial={{ x: '-120%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-130%', opacity: 0, transition: { duration: 0.7, ease: [0.7, 0, 0.84, 0] } }}
      transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="desk__hint">Click around my desk ↓</span>

      <svg viewBox={`0 0 ${W} ${H}`} role="group" aria-label="An illustration of me at my desk. Objects are clickable.">
        {/* floor shadow */}
        <ellipse cx="220" cy="313" rx="210" ry="6" fill="#5a3c78" opacity="0.12" />

        {/* ── moodboard on the wall ── */}
        <Spot open={open} onToggle={toggle} id="board" label="Moodboard">
          <rect x="28" y="28" width="96" height="72" rx="7" fill="#e3c4a3" />
          <rect x="33" y="33" width="86" height="62" rx="4" fill="#f3dfc6" />
          <g transform="rotate(-8 52 62)">
            <rect x="40" y="44" width="24" height="28" rx="2" fill="#fff" />
            <rect x="43" y="47" width="18" height="16" fill="#f6c6d6" />
          </g>
          <g transform="rotate(6 82 58)">
            <rect x="70" y="40" width="24" height="28" rx="2" fill="#fff" />
            <rect x="73" y="43" width="18" height="16" fill="#c9b3ea" />
          </g>
          <rect x="96" y="66" width="18" height="18" rx="2" fill="#fbe6a6" transform="rotate(-4 105 75)" />
          <path d="M60 82 q6 -6 12 0 q6 6 12 0" stroke="#e79bb6" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <circle cx="52" cy="45" r="2.6" fill="#e05d8a" />
          <circle cx="82" cy="41" r="2.6" fill="#7a5bc4" />
          <circle cx="105" cy="67" r="2.2" fill="#d07a4a" />
        </Spot>

        {/* ── desk lamp ── */}
        <Spot open={open} onToggle={toggle} id="lamp" label="Desk lamp">
          <motion.polygon
            points="86,150 66,208 150,208 104,146"
            fill="#fbe6a6"
            animate={{ opacity: [0.35, 0.5, 0.35] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <ellipse cx="50" cy="207" rx="17" ry="4.5" fill="#a487dc" />
          <path d="M50 205 L58 160 L88 138" stroke="#a487dc" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="58" cy="160" r="4.5" fill="#7a5bc4" />
          <path d="M80 128 L106 140 L96 156 L74 146 Z" fill="#f6c6d6" stroke="#e79bb6" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="95" cy="151" r="4" fill="#fff6c8" />
        </Spot>

        {/* ── books ── */}
        <Spot open={open} onToggle={toggle} id="books" label="Stack of books">
          <rect x="88" y="196" width="66" height="13" rx="2.5" fill="#c9b3ea" />
          <rect x="88" y="200" width="66" height="2" fill="#fff" opacity="0.6" />
          <rect x="94" y="184" width="56" height="12" rx="2.5" fill="#f6c6d6" />
          <rect x="140" y="184" width="4" height="12" fill="#e79bb6" />
          <g transform="rotate(-4 118 178)">
            <rect x="90" y="173" width="58" height="11" rx="2.5" fill="#f9d9c4" />
            <rect x="96" y="177" width="22" height="2.5" rx="1" fill="#d07a4a" opacity="0.6" />
          </g>
        </Spot>

        {/* ── me ── */}
        <Spot open={open} onToggle={toggle} id="me" label="That's me">
          {/* chair back */}
          <rect x="156" y="120" width="128" height="108" rx="30" fill="#c9b3ea" />
          <rect x="166" y="130" width="108" height="90" rx="24" fill="#d9c8f3" />
          {/* long hair behind */}
          <path d="M186 112 Q180 170 194 202 L246 202 Q260 170 254 112 Z" fill={HAIR} />
          {/* torso / sweater */}
          <path d="M166 212 Q168 172 196 165 L244 165 Q272 172 274 212 Z" fill="#f6c6d6" />
          <path d="M206 165 L220 180 L234 165 Z" fill="#fbe1ea" />
          {/* neck */}
          <rect x="211" y="138" width="18" height="30" rx="8" fill={SKIN_SHADE} />
          {/* bun */}
          <circle cx="220" cy="76" r="15" fill={HAIR} />
          <ellipse cx="220" cy="89" rx="11" ry="4" fill="#e79bb6" />
          {/* ears */}
          <circle cx="188.5" cy="120" r="5.5" fill={SKIN_SHADE} />
          <circle cx="251.5" cy="120" r="5.5" fill={SKIN_SHADE} />
          {/* head */}
          <circle cx="220" cy="116" r="32" fill={SKIN} />
          {/* hair cap + side-swept fringe */}
          <path
            d="M187 122 Q182 82 220 83 Q258 82 253 122 Q250 104 236 98 Q222 108 200 106 Q190 110 187 122 Z"
            fill={HAIR}
          />
          {/* face — blinking eyes */}
          <motion.g
            animate={{ scaleY: [1, 1, 0.1, 1] }}
            transition={{ duration: 4.2, times: [0, 0.92, 0.96, 1], repeat: Infinity }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            <ellipse cx="208" cy="122" rx="3" ry="4" fill={INK} />
            <ellipse cx="232" cy="122" rx="3" ry="4" fill={INK} />
          </motion.g>
          <ellipse cx="201" cy="132" rx="6" ry="3.5" fill="#f2a1b9" opacity="0.7" />
          <ellipse cx="239" cy="132" rx="6" ry="3.5" fill="#f2a1b9" opacity="0.7" />
          <path d="M214 134 Q220 140 226 134" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* arms (typing) */}
          <motion.g animate={{ y: [0, -1.5, 0, -1, 0] }} transition={{ duration: 0.9, repeat: Infinity }}>
            <path d="M180 180 Q176 200 198 204" stroke="#f6c6d6" strokeWidth="15" fill="none" strokeLinecap="round" />
          </motion.g>
          <motion.g animate={{ y: [0, -1, 0, -1.5, 0] }} transition={{ duration: 0.9, repeat: Infinity, delay: 0.2 }}>
            <path d="M260 180 Q264 200 242 204" stroke="#f6c6d6" strokeWidth="15" fill="none" strokeLinecap="round" />
          </motion.g>
        </Spot>

        {/* ── laptop (lid faces us) ── */}
        <Spot open={open} onToggle={toggle} id="laptop" label="Laptop">
          <rect x="170" y="156" width="100" height="52" rx="7" fill="#ece5f5" stroke="#c9b3ea" strokeWidth="2" />
          <rect x="174" y="158" width="92" height="3" rx="1.5" fill="#fff" opacity="0.8" />
          {/* lid stickers */}
          <path
            d="M203 186 c-6 -6 -12 -1 -9 4 c2 4 9 8 9 8 s7 -4 9 -8 c3 -5 -3 -10 -9 -4 z"
            fill="#f6c6d6"
            stroke="#fff"
            strokeWidth="2"
          />
          <path
            d="M240 170 l2.6 5.6 6 .7 -4.5 4.1 1.3 6 -5.4 -3 -5.4 3 1.3 -6 -4.5 -4.1 6 -.7 z"
            fill="#fbe6a6"
            stroke="#fff"
            strokeWidth="1.6"
          />
          <rect x="226" y="190" width="26" height="10" rx="5" fill="#a487dc" stroke="#fff" strokeWidth="1.6" />
          <text x="239" y="198" textAnchor="middle" fontSize="7" fontWeight="700" fill="#fff" fontFamily="Inter Tight, sans-serif">
            {'</>'}
          </text>
          <rect x="158" y="206" width="124" height="5" rx="2.5" fill="#d8c6ea" />
        </Spot>

        {/* ── desk surface ── */}
        <rect x="20" y="210" width="400" height="12" rx="4" fill="#ecd3b6" />
        <rect x="24" y="222" width="392" height="6" rx="2" fill="#d9b994" />
        <rect x="40" y="226" width="10" height="84" rx="3" fill="#d9b994" />
        <rect x="390" y="226" width="10" height="84" rx="3" fill="#d9b994" />

        {/* ── tan tumbler (water jug) ── */}
        <Spot open={open} onToggle={toggle} id="mug" label="Water jug">
          {/* straw */}
          <path d="M315 162 L319 142" stroke="#c9a27a" strokeWidth="3.2" strokeLinecap="round" />
          {/* handle */}
          <path d="M327 173 H336 Q339 173 339 176 V193 Q339 196 336 196 H325" stroke="#b98f63" strokeWidth="4.5" fill="none" strokeLinejoin="round" />
          {/* lid */}
          <rect x="299" y="161" width="31" height="5" rx="2.5" fill="#b98f63" />
          <rect x="300" y="165" width="29" height="6" rx="1.5" fill="#cfa77c" />
          {/* body: wide cup tapering into the narrow cup-holder base */}
          <path d="M301 171 H328 L325.5 196 Q324.5 199 322.5 199.5 V209 H306.5 V199.5 Q304.5 199 303.5 196 Z" fill="#d8b48a" />
          <rect x="306.5" y="199.5" width="16" height="2" fill="#c9a27a" />
          {/* shine */}
          <path d="M305.5 175 L307.5 194" stroke="#f3e2cc" strokeWidth="2.6" strokeLinecap="round" opacity="0.8" />
        </Spot>

        {/* ── alarm clock ── */}
        <Spot open={open} onToggle={toggle} id="clock" label="Alarm clock">
          <motion.g
            animate={{ rotate: [0, -6, 6, -6, 6, 0, 0] }}
            transition={{ duration: 4, times: [0, 0.03, 0.06, 0.09, 0.12, 0.15, 1], repeat: Infinity, repeatDelay: 2 }}
            style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
          >
            {/* bells + hammer */}
            <path d="M347 172 a10 10 0 0 1 14 -12 z" fill="#e79bb6" />
            <path d="M389 172 a10 10 0 0 0 -14 -12 z" fill="#e79bb6" />
            <rect x="366" y="157" width="4" height="7" rx="2" fill="#c97898" />
            {/* legs */}
            <path d="M356 204 l-5 6 M380 204 l5 6" stroke="#c97898" strokeWidth="3.5" strokeLinecap="round" />
            {/* body + face */}
            <circle cx="368" cy="186" r="21" fill="#f6c6d6" />
            <circle cx="368" cy="186" r="16" fill="#fffaf4" />
            {[0, 90, 180, 270].map((d) => (
              <rect key={d} x="367" y="172" width="2" height="3.5" rx="1" fill="#c9a9b4" transform={`rotate(${d} 368 186)`} />
            ))}
            <path d="M368 186 L368 177 M368 186 L374 189" stroke="#3a3340" strokeWidth="2.2" strokeLinecap="round" />
            <motion.path
              d="M368 186 L368 174"
              stroke="#e05d8a"
              strokeWidth="1"
              strokeLinecap="round"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '368px 186px' }}
            />
            <circle cx="368" cy="186" r="1.8" fill="#3a3340" />
          </motion.g>
        </Spot>

        {/* ── cat napping under the desk ── */}
        <Spot open={open} onToggle={toggle} id="cat" label="Sleeping cat">
          <path d="M346 300 q22 4 16 -14 q-3 -8 -10 -4" stroke="#f2b48a" strokeWidth="6" fill="none" strokeLinecap="round" />
          <ellipse cx="326" cy="298" rx="27" ry="13" fill="#f2b48a" />
          <path d="M296 282 l3 -12 l8 8 z" fill="#f2b48a" />
          <path d="M314 282 l-2 -12 l-7 8 z" fill="#f2b48a" />
          <circle cx="305" cy="290" r="12" fill="#f2b48a" />
          <path d="M299 290 q2.5 2.5 5 0 M307 290 q2.5 2.5 5 0" stroke={INK} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M320 292 q5 -3 10 0 M326 300 q5 -3 10 0" stroke="#e39a6d" strokeWidth="2" fill="none" strokeLinecap="round" />
          <motion.text
            x="285"
            y="272"
            fontFamily="Inter Tight, sans-serif"
            fontWeight="600"
            fontSize="11"
            fill="#a487dc"
            animate={{ opacity: [0, 1, 0], y: [0, -8, -14] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Z z
          </motion.text>
        </Spot>
      </svg>

      <AnimatePresence>
        {open && item && (
          <motion.div
            key={open + (open === 'mug' ? mugClicks : '')}
            className="bubble"
            role="dialog"
            aria-label={item.title}
            style={bubbleStyle}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.12 } }}
            transition={{ type: 'spring', stiffness: 420, damping: 24 }}
          >
            <button className="bubble__close" onClick={() => setOpen(null)} aria-label="Close">
              ×
            </button>
            <h3>{item.title}</h3>
            {Array.isArray(item.body) ? (
              <ul>
                {item.body.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : (
              <p>{item.body}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{open === 'board' && <Board onClose={() => setOpen(null)} />}</AnimatePresence>
    </motion.div>
  )
}

/* ───────── bulletin board (expands over the desk) ───────── */

function Pin({ color }: { color: string }) {
  return (
    <svg className="pin" viewBox="0 0 24 24" aria-hidden="true">
      <ellipse cx="12" cy="20" rx="5" ry="1.6" fill="#000" opacity="0.15" />
      <path d="M12 12 L12 20" stroke="#9a8f98" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="9" r="7" fill={color} />
      <circle cx="9.5" cy="6.5" r="2.2" fill="#fff" opacity="0.55" />
    </svg>
  )
}

const pinColors = ['#e05d8a', '#a487dc', '#f2b48a', '#7fb98d', '#6fa8d6']
const tilts = [-2.5, 2, -1.5, 2.5, -2]

function Board({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="board"
      role="dialog"
      aria-label="Bulletin board"
      initial={{ opacity: 0, scale: 0.25 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.25, transition: { duration: 0.25 } }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      style={{ transformOrigin: '17% 20%' }}
    >
      <button className="bubble__close board__close" onClick={onClose} aria-label="Close bulletin board">
        ×
      </button>
      <div className="board__grid">
        {board.photos.map((ph, i) => (
          <motion.figure
            key={ph.caption}
            className="polaroid"
            style={{ rotate: tilts[i % tilts.length] }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.07 }}
          >
            <Pin color={pinColors[i % pinColors.length]} />
            {ph.src && ph.fit === 'whole' ? (
              <div className="polaroid__whole">
                <img className="polaroid__backdrop" src={ph.src} alt="" aria-hidden="true" />
                <img src={ph.src} alt={ph.caption} loading="lazy" />
              </div>
            ) : ph.src ? (
              <img src={ph.src} alt={ph.caption} loading="lazy" style={{ objectPosition: ph.focus }} />
            ) : (
              <div className="polaroid__ph" style={{ background: ph.tint }}>
                Photo
              </div>
            )}
            <figcaption>{ph.caption}</figcaption>
          </motion.figure>
        ))}

        <motion.blockquote
          className="board__quote"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Pin color="#e05d8a" />“{board.quote}”
        </motion.blockquote>
      </div>
    </motion.div>
  )
}
