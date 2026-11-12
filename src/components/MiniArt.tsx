/* Little illustrations for the data science + ML mini-cards (and their deep-dive headers). */

const INK = '#3a3340'
const PINK = '#f6c6d6'
const ROSE = '#e79bb6'
const LILAC = '#d9c8f3'
const PURPLE = '#a487dc'
const SAGE = '#a9d6b3'
const BUTTER = '#fbe6a6'

export type ArtKind = 'brain' | 'jobs' | 'lungs' | 'trek'

export function MiniArt({ kind }: { kind: ArtKind }) {
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true" className="mini-art">
      {kind === 'brain' && <Brain />}
      {kind === 'jobs' && <Jobs />}
      {kind === 'lungs' && <Lungs />}
      {kind === 'trek' && <Trek />}
    </svg>
  )
}

/* brain with an electrode array → spike trains → a decoded phoneme */
function Brain() {
  const spikes = (y: number, xs: number[]) =>
    `M98 ${y} ` + xs.map((x) => `L${x - 1.5} ${y} L${x} ${y - 7} L${x + 1.5} ${y}`).join(' ') + ` L128 ${y}`
  return (
    <>
      {/* brain */}
      <g>
        <path
          d="M30 66 C22 64 18 54 24 47 C20 38 28 28 38 30 C40 21 52 17 60 23 C66 16 80 18 82 28 C92 28 98 38 93 46 C100 52 96 64 86 64 C86 74 74 79 66 73 C60 80 46 80 42 72 C34 76 26 72 30 66 Z"
          fill={PINK}
          stroke={INK}
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path d="M60 25 C56 36 64 42 58 52 C54 60 60 66 58 74" fill="none" stroke={ROSE} strokeWidth="2.2" strokeLinecap="round" />
        <path d="M34 44 C42 42 46 48 44 54 M76 36 C72 42 78 48 84 46 M70 58 C74 62 80 60 82 56" fill="none" stroke={ROSE} strokeWidth="2" strokeLinecap="round" />
        {/* electrode array */}
        <rect x="64" y="36" width="20" height="16" rx="3" fill="#fff" stroke={INK} strokeWidth="1.8" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => <circle key={`${r}${c}`} cx={69 + c * 5} cy={40 + r * 4} r="1.2" fill={PURPLE} />),
        )}
        {/* stem */}
        <path d="M58 76 C58 84 62 88 66 92" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      </g>
      {/* wires */}
      <path d="M84 40 C92 40 92 32 98 32 M84 44 H98 M84 48 C92 48 92 56 98 56" fill="none" stroke={PURPLE} strokeWidth="1.6" strokeDasharray="2 2.5" />
      {/* spike trains */}
      <path d={spikes(32, [104, 111, 120])} fill="none" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      <path d={spikes(44, [102, 115, 119, 124])} fill="none" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      <path d={spikes(56, [108, 113, 122])} fill="none" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      {/* decoded phoneme */}
      <path d="M132 70 h20 a5 5 0 0 1 5 5 v14 a5 5 0 0 1 -5 5 h-12 l-6 6 v-6 h-2 a5 5 0 0 1 -5 -5 v-14 a5 5 0 0 1 5 -5 z" fill={LILAC} stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
      <text x="141" y="87" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="11" fontWeight="700" fill={INK}>
        /a/
      </text>
      <path d="M128 58 C134 60 138 64 138 69" fill="none" stroke={ROSE} strokeWidth="1.8" strokeLinecap="round" markerEnd="" />
      <path d="M134.5 66 L138 69.5 L141 65.5" fill="none" stroke={ROSE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  )
}

/* stacked job postings with skill pills → a rising bar chart */
function Jobs() {
  const pill = (x: number, y: number, w: number, fill: string, label: string) => (
    <g>
      <rect x={x} y={y} width={w} height="10" rx="5" fill={fill} />
      <text x={x + w / 2} y={y + 7.2} textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontSize="6.4" fontWeight="700" fill={INK}>
        {label}
      </text>
    </g>
  )
  return (
    <>
      {/* back cards */}
      <rect x="22" y="22" width="62" height="74" rx="8" fill="#fff" stroke={INK} strokeWidth="1.6" transform="rotate(-8 53 59)" opacity="0.55" />
      <rect x="24" y="20" width="62" height="74" rx="8" fill="#fff" stroke={INK} strokeWidth="1.6" transform="rotate(-3 55 57)" opacity="0.8" />
      {/* front posting */}
      <g transform="rotate(2 58 58)">
        <rect x="28" y="20" width="62" height="76" rx="8" fill="#fff" stroke={INK} strokeWidth="2" />
        <circle cx="38" cy="31" r="5" fill={LILAC} />
        <rect x="47" y="27" width="30" height="4" rx="2" fill={INK} />
        <rect x="47" y="33.5" width="20" height="3" rx="1.5" fill="#c9bfcc" />
        <rect x="34" y="44" width="50" height="3" rx="1.5" fill="#e3dbe6" />
        <rect x="34" y="50" width="44" height="3" rx="1.5" fill="#e3dbe6" />
        {pill(34, 60, 26, PINK, 'Python')}
        {pill(62, 60, 20, BUTTER, 'SQL')}
        {pill(34, 73, 22, SAGE, 'React')}
        {pill(58, 73, 26, LILAC, 'PyTorch')}
      </g>
      {/* chart */}
      <path d="M100 96 H146" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <rect x="104" y="74" width="9" height="22" rx="2.5" fill={SAGE} stroke={INK} strokeWidth="1.6" />
      <rect x="117" y="58" width="9" height="38" rx="2.5" fill={LILAC} stroke={INK} strokeWidth="1.6" />
      <rect x="130" y="40" width="9" height="56" rx="2.5" fill={PINK} stroke={INK} strokeWidth="1.6" />
      <path d="M104 64 L118 48 L128 52 L142 30" fill="none" stroke={ROSE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M135 29.5 L142 30 L141.5 37" fill="none" stroke={ROSE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  )
}

/* lungs with a pulse line, plus a little questionnaire */
function Lungs() {
  return (
    <>
      {/* trachea */}
      <path d="M62 18 V40 M62 40 C58 46 52 48 48 52 M62 40 C66 46 72 48 76 52" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      {/* left lung */}
      <path d="M56 46 C46 44 30 58 28 78 C26 94 34 100 44 98 C54 96 58 88 58 78 V50 C58 48 57.5 46.5 56 46 Z" fill={PINK} stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
      {/* right lung */}
      <path d="M68 46 C78 44 94 58 96 78 C98 94 90 100 80 98 C70 96 66 88 66 78 V50 C66 48 66.5 46.5 68 46 Z" fill={PINK} stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
      {/* branches */}
      <path d="M50 60 C46 66 44 72 44 80 M48 70 L38 76 M74 60 C78 66 80 72 80 80 M76 70 L86 76" fill="none" stroke={ROSE} strokeWidth="1.8" strokeLinecap="round" />
      {/* pulse */}
      <path d="M16 74 H34 L39 64 L45 86 L50 70 L54 74 H70 L75 62 L81 88 L86 72 L90 74 H104" fill="none" stroke={PURPLE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* questionnaire */}
      <g transform="rotate(4 128 62)">
        <rect x="108" y="28" width="40" height="64" rx="7" fill="#fff" stroke={INK} strokeWidth="2" />
        <rect x="116" y="35" width="24" height="4" rx="2" fill={INK} />
        {[48, 60, 72].map((y, i) => (
          <g key={y}>
            <rect x="115" y={y - 4} width="8" height="8" rx="2" fill={i < 2 ? SAGE : '#fff'} stroke={INK} strokeWidth="1.4" />
            {i < 2 && <path d={`M117 ${y} l2 2 l3.5 -4`} fill="none" stroke={INK} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />}
            <rect x="127" y={y - 1.5} width={i === 1 ? 12 : 15} height="3" rx="1.5" fill="#e3dbe6" />
          </g>
        ))}
        <rect x="115" y="81" width="26" height="6" rx="3" fill={BUTTER} />
      </g>
    </>
  )
}

/* a phone scanning a landmark → a result card, with map pins and a route */
function Trek() {
  return (
    <>
      {/* route + pins in the background */}
      <path d="M14 98 C30 86 34 104 52 94 S 80 70 96 84 S 130 96 148 74" fill="none" stroke={PURPLE} strokeWidth="1.8" strokeDasharray="3 4" strokeLinecap="round" />
      <g>
        <path d="M18 92 c0 -6 4 -10 9 -10 s9 4 9 10 c0 7 -9 14 -9 14 s-9 -7 -9 -14 z" fill={ROSE} stroke={INK} strokeWidth="1.8" />
        <circle cx="27" cy="91.5" r="3" fill="#fff" />
      </g>
      <g>
        <path d="M134 66 c0 -5 3.5 -8 7.5 -8 s7.5 3 7.5 8 c0 6 -7.5 12 -7.5 12 s-7.5 -6 -7.5 -12 z" fill={SAGE} stroke={INK} strokeWidth="1.8" />
        <circle cx="141.5" cy="65.5" r="2.5" fill="#fff" />
      </g>
      {/* phone */}
      <g transform="rotate(-6 70 58)">
        <rect x="46" y="10" width="50" height="92" rx="9" fill="#fff" stroke={INK} strokeWidth="2.2" />
        <rect x="51" y="18" width="40" height="58" rx="4" fill="#dfe8f3" />
        {/* landmark: a little arch */}
        <path d="M58 70 V50 C58 40 84 40 84 50 V70 H77 V54 C77 48 65 48 65 54 V70 Z" fill={BUTTER} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M56 46 H86" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M54 72 H88" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
        {/* viewfinder brackets */}
        <path d="M54 26 v-5 h5 M88 26 v-5 h-5 M54 66 v5 h5 M88 66 v5 h-5" fill="none" stroke={ROSE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* shutter */}
        <circle cx="71" cy="89" r="6" fill={PINK} stroke={INK} strokeWidth="1.8" />
      </g>
      {/* result card */}
      <g transform="rotate(5 122 34)">
        <rect x="100" y="14" width="46" height="40" rx="7" fill="#fff" stroke={INK} strokeWidth="2" />
        <rect x="106" y="20" width="26" height="4.5" rx="2.2" fill={INK} />
        <rect x="106" y="28" width="34" height="3" rx="1.5" fill="#e3dbe6" />
        <rect x="106" y="33.5" width="28" height="3" rx="1.5" fill="#e3dbe6" />
        <rect x="106" y="42" width="16" height="7" rx="3.5" fill={LILAC} />
        <rect x="124" y="42" width="15" height="7" rx="3.5" fill={SAGE} />
      </g>
      {/* sparkle */}
      <path d="M100 66 c0.6 3.4 2 4.8 5.4 5.4 c-3.4 0.6 -4.8 2 -5.4 5.4 c-0.6 -3.4 -2 -4.8 -5.4 -5.4 c3.4 -0.6 4.8 -2 5.4 -5.4 z" fill={BUTTER} stroke={INK} strokeWidth="1.2" />
    </>
  )
}
