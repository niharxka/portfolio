import type { ReactNode, MouseEventHandler } from 'react'

type Props = {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLElement>
  href?: string
  /** tiny legend in the top-left corner, like a real keycap */
  hint?: string
  /** force the pressed look (e.g. when the matching keyboard key is held) */
  pressed?: boolean
  active?: boolean
  className?: string
  ariaLabel?: string
  ariaCurrent?: boolean
}

/** A chunky, pressable keyboard key. Renders a <button>, or an <a> when given href. */
export function Keycap({ children, onClick, href, hint, pressed, active, className = '', ariaLabel, ariaCurrent }: Props) {
  const cls = ['key', pressed && 'is-pressed', active && 'key--active', className].filter(Boolean).join(' ')
  const inner = (
    <>
      <span className="key__side" aria-hidden="true" />
      <span className="key__face">
        {hint && (
          <span className="key__hint" aria-hidden="true">
            {hint}
          </span>
        )}
        {children}
      </span>
    </>
  )

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        className={cls}
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
      >
        {inner}
      </a>
    )
  }
  return (
    <button
      type="button"
      className={cls}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-current={ariaCurrent ? 'true' : undefined}
    >
      {inner}
    </button>
  )
}

/** Cute rounded arrow glyph for the "enter" key */
export function ArrowGlyph({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
      <path
        d="M10 24h24M25 14l10 10-10 10"
        fill="none"
        stroke="#3a3340"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
