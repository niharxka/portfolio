import type { ReactNode, CSSProperties } from 'react'

/* Die-cut sticker drawings. Every sticker wraps its art in the shared
   #die-cut filter (defined in Background.tsx) for the white border + shadow. */

const INK = '#3a3340'

function Sticker({ children, view = 140 }: { children: ReactNode; view?: number }) {
  return (
    <svg viewBox={`0 0 ${view} ${view}`} aria-hidden="true">
      <g filter="url(#die-cut)">{children}</g>
    </svg>
  )
}

/** circle with scalloped edge */
function scallop(cx: number, cy: number, r: number, bumps: number, depth: number) {
  let d = ''
  for (let i = 0; i <= bumps * 2; i++) {
    const a = (i / (bumps * 2)) * Math.PI * 2
    const rr = i % 2 === 0 ? r : r + depth
    const x = cx + Math.cos(a) * rr
    const y = cy + Math.sin(a) * rr
    if (i === 0) d += `M${x.toFixed(1)} ${y.toFixed(1)}`
    else if (i % 2 === 1) {
      const a2 = ((i + 1) / (bumps * 2)) * Math.PI * 2
      d += ` Q${x.toFixed(1)} ${y.toFixed(1)} ${(cx + Math.cos(a2) * r).toFixed(1)} ${(cy + Math.sin(a2) * r).toFixed(1)}`
    }
  }
  return d + 'Z'
}

/* ───────── product manager ───────── */

export function ShipItBadge() {
  return (
    <Sticker>
      <path d={scallop(70, 70, 50, 14, 8)} fill="#f6c6d6" />
      <circle cx="70" cy="70" r="40" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="3 4" />
      <text x="70" y="66" textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontWeight="800" fontSize="21" fill={INK} letterSpacing="-1">
        SHIP
      </text>
      <text x="70" y="88" textAnchor="middle" style={{ fontFamily: 'var(--accent)', fontStyle: 'var(--accent-style)', fontWeight: 'var(--accent-weight)' } as CSSProperties} fontSize="22" fill="#c2577f">
        it!
      </text>
    </Sticker>
  )
}

export function Clipboard() {
  return (
    <Sticker>
      <rect x="30" y="24" width="80" height="98" rx="10" fill="url(#gingham-lilac)" />
      <rect x="38" y="36" width="64" height="78" rx="5" fill="#fffaf4" />
      <rect x="52" y="17" width="36" height="16" rx="6" fill="#a487dc" />
      <circle cx="70" cy="22" r="3" fill="#fff" />
      {[52, 72, 92].map((y, i) => (
        <g key={y}>
          <rect x="46" y={y - 7} width="12" height="12" rx="3" fill={i < 2 ? '#f6c6d6' : '#fff'} stroke="#e79bb6" strokeWidth="1.8" />
          {i < 2 && (
            <path d={`M48.5 ${y - 1} l3 3 l5 -6`} stroke="#c2577f" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          )}
          <rect x="64" y={y - 3} width={i === 1 ? 22 : 30} height="4" rx="2" fill="#d9c8f3" />
        </g>
      ))}
    </Sticker>
  )
}

export function HeartButton() {
  return (
    <Sticker>
      <path
        d="M70 118 C40 98 18 78 18 54 C18 36 32 24 48 24 C58 24 66 30 70 38 C74 30 82 24 92 24 C108 24 122 36 122 54 C122 78 100 98 70 118 Z"
        fill="url(#gingham-pink)"
      />
      <path
        d="M70 108 C46 92 28 76 28 56 C28 42 38 34 50 34"
        stroke="#fff"
        strokeWidth="2"
        fill="none"
        strokeDasharray="3 4"
        opacity="0.9"
      />
      {[
        [62, 58],
        [78, 58],
        [62, 74],
        [78, 74],
      ].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="4.5" fill="#e79bb6" stroke="#c2577f" strokeWidth="1.2" />
      ))}
    </Sticker>
  )
}

/* ───────── developer ───────── */

export function TerminalStamp() {
  const holes = []
  for (let i = 0; i < 9; i++) {
    const t = 22 + i * 12
    holes.push([t, 18], [t, 122], [18, t], [122, t])
  }
  return (
    <Sticker>
      <mask id="perf">
        <rect width="140" height="140" fill="#fff" />
        {holes.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="#000" />
        ))}
      </mask>
      <rect x="18" y="18" width="104" height="104" fill="#fbe6cf" mask="url(#perf)" />
      <rect x="30" y="30" width="80" height="80" rx="4" fill={INK} />
      <circle cx="39" cy="39" r="2.5" fill="#f6c6d6" />
      <circle cx="47" cy="39" r="2.5" fill="#fbe6a6" />
      <circle cx="55" cy="39" r="2.5" fill="#a9d6b3" />
      <text x="38" y="72" fontFamily="ui-monospace, Menlo, monospace" fontWeight="700" fontSize="20" fill="#f6c6d6">
        {'>_'}
      </text>
      <text x="38" y="94" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill="#d9c8f3">
        Hello, world
      </text>
    </Sticker>
  )
}

export function CodeButton() {
  return (
    <Sticker>
      <circle cx="70" cy="70" r="48" fill="#c9b3ea" />
      <circle cx="70" cy="70" r="38" fill="#d9c8f3" />
      <circle cx="70" cy="70" r="38" fill="none" stroke="#a487dc" strokeWidth="1.5" strokeDasharray="3 4" />
      <text x="70" y="80" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontWeight="700" fontSize="30" fill="#5d3fa8">
        {'{ }'}
      </text>
      <ellipse cx="52" cy="40" rx="12" ry="6" fill="#fff" opacity="0.5" transform="rotate(-25 52 40)" />
    </Sticker>
  )
}

export function Ladybug() {
  return (
    <Sticker>
      <path d="M58 30 q-8 -14 -18 -14 M82 30 q8 -14 18 -14" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="40" cy="16" r="4" fill={INK} />
      <circle cx="100" cy="16" r="4" fill={INK} />
      <ellipse cx="70" cy="40" rx="20" ry="15" fill={INK} />
      <ellipse cx="70" cy="80" rx="42" ry="44" fill="#ef8aa7" />
      <path d="M70 38 V124" stroke={INK} strokeWidth="3" />
      {[
        [50, 64, 8],
        [90, 64, 8],
        [44, 92, 7],
        [96, 92, 7],
        [60, 110, 5],
        [80, 110, 5],
      ].map(([x, y, r]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r={r} fill={INK} />
      ))}
      <ellipse cx="52" cy="50" rx="8" ry="4" fill="#fff" opacity="0.5" transform="rotate(-30 52 50)" />
    </Sticker>
  )
}

/* ───────── obsessed with AI ───────── */

export function Sparkle() {
  return (
    <Sticker>
      <path d="M70 12 C74 50 90 66 128 70 C90 74 74 90 70 128 C66 90 50 74 12 70 C50 66 66 50 70 12 Z" fill="#fbe6a6" />
      <path d="M70 32 C72 56 84 68 108 70" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" />
      <path d="M112 22 c1 7 4 10 11 11 c-7 1 -10 4 -11 11 c-1 -7 -4 -10 -11 -11 c7 -1 10 -4 11 -11 z" fill="#f6c6d6" />
    </Sticker>
  )
}

export function Robot() {
  return (
    <Sticker>
      <path d="M70 34 V20" stroke="#a487dc" strokeWidth="4" strokeLinecap="round" />
      <path d="M70 18 c-4 -6 -11 -2 -8 3 c2 3 8 6 8 6 s6 -3 8 -6 c3 -5 -4 -9 -8 -3 z" fill="#ef8aa7" />
      <rect x="22" y="34" width="96" height="78" rx="24" fill="#d9c8f3" />
      <rect x="14" y="62" width="10" height="24" rx="5" fill="#c9b3ea" />
      <rect x="116" y="62" width="10" height="24" rx="5" fill="#c9b3ea" />
      <rect x="34" y="48" width="72" height="50" rx="16" fill={INK} />
      <path d="M48 70 q6 -8 12 0 M80 70 q6 -8 12 0" stroke="#a9e6d3" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M62 82 q8 6 16 0" stroke="#f6c6d6" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <circle cx="44" cy="86" r="4" fill="#ef8aa7" opacity="0.6" />
      <circle cx="96" cy="86" r="4" fill="#ef8aa7" opacity="0.6" />
    </Sticker>
  )
}

export function PromptBubble() {
  return (
    <Sticker>
      <path d="M20 34 Q20 20 34 20 H106 Q120 20 120 34 V84 Q120 98 106 98 H58 L36 118 L40 98 H34 Q20 98 20 84 Z" fill="#fbe6cf" />
      <text x="70" y="56" textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontWeight="700" fontSize="16" fill="#d07a4a">
        Ask me
      </text>
      <text x="70" y="78" textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontWeight="700" fontSize="16" fill="#d07a4a">
        anything ✦
      </text>
    </Sticker>
  )
}

type Placement = { el: ReactNode; rotate: number }

/** Stickers for each role (same order as `roles` in content.ts). Positions live in CSS (.sticker--0/1/2). */
export const stickerSets: Placement[][] = [
  [
    { el: <ShipItBadge />, rotate: -12 },
    { el: <Clipboard />, rotate: 9 },
    { el: <HeartButton />, rotate: -8 },
  ],
  [
    { el: <TerminalStamp />, rotate: 8 },
    { el: <CodeButton />, rotate: -10 },
    { el: <Ladybug />, rotate: 18 },
  ],
  [
    { el: <Sparkle />, rotate: -6 },
    { el: <Robot />, rotate: 10 },
    { el: <PromptBubble />, rotate: -7 },
  ],
]
