import type { Project } from '../projects'

/* ───────── little line drawings for projects ───────── */

export function ProjectIcon({ kind }: { kind: Project['icon'] }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const
  return (
    <svg viewBox="0 0 48 32" aria-hidden="true">
      {kind === 'mindmap' && (
        <>
          <circle cx="24" cy="16" r="4" {...p} />
          <circle cx="8" cy="7" r="3" {...p} />
          <circle cx="8" cy="25" r="3" {...p} />
          <circle cx="40" cy="7" r="3" {...p} />
          <circle cx="40" cy="25" r="3" {...p} />
          <path d="M20.5 14 L10.5 8.5 M20.5 18 L10.5 23.5 M27.5 14 L37.5 8.5 M27.5 18 L37.5 23.5" {...p} />
        </>
      )}
      {kind === 'chart' && (
        <>
          <path d="M4 4 V28 H44" {...p} />
          <path d="M8 22 L16 14 L23 19 L31 8 L40 13" {...p} />
          <circle cx="31" cy="8" r="2.5" {...p} />
        </>
      )}
      {kind === 'plane' && (
        <>
          <path d="M6 18 L42 8 L36 14 L42 24 Z M36 14 L20 15" {...p} />
          <path d="M4 26 q8 -3 14 0" {...p} strokeDasharray="2 4" />
        </>
      )}
      {kind === 'wave' && <path d="M3 16 h6 l3 -9 l4 18 l4 -14 l3 8 l3 -4 h4 l3 -10 l4 20 l3 -9 h5" {...p} />}
      {kind === 'bars' && (
        <>
          <path d="M4 28 H44" {...p} />
          <rect x="8" y="16" width="6" height="12" rx="1.5" {...p} />
          <rect x="19" y="8" width="6" height="20" rx="1.5" {...p} />
          <rect x="30" y="12" width="6" height="16" rx="1.5" {...p} />
        </>
      )}
      {kind === 'people' && (
        <>
          <circle cx="16" cy="10" r="4.5" {...p} />
          <circle cx="32" cy="10" r="4.5" {...p} />
          <path d="M6 28 c0 -7 4 -10 10 -10 s10 3 10 10 M24 22 c1.5 -2.6 4.3 -4 8 -4 c6 0 10 3 10 10" {...p} />
        </>
      )}
      {kind === 'pin' && (
        <>
          <path d="M24 29 C24 29 13 19 13 12 C13 6 18 2 24 2 C30 2 35 6 35 12 C35 19 24 29 24 29 Z" {...p} />
          <circle cx="24" cy="12" r="4" {...p} />
          <path d="M4 26 q6 -4 10 0 M34 26 q6 -4 10 0" {...p} strokeDasharray="2 3" />
        </>
      )}
      {kind === 'pulse' && (
        <>
          <path d="M24 27 C14 21 8 16 8 10 C8 6 11 4 14 4 C17 4 20 6 24 10 C28 6 31 4 34 4 C37 4 40 6 40 10 C40 16 34 21 24 27 Z" {...p} />
          <path d="M12 15 h7 l2 -4 l3 8 l2 -4 h10" {...p} />
        </>
      )}
    </svg>
  )
}
