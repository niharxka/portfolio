import { useEffect, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { projects } from '../projects'
import { messaging } from '../content'
import { ProjectIcon } from './ProjectIcon'
import { MiniArt } from './MiniArt'

const ease = [0.16, 1, 0.3, 1] as const

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.7, ease },
}

function Block({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null
  return (
    <motion.section className="dd-block" {...reveal}>
      <h2>{title}</h2>
      <ul>
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </motion.section>
  )
}

function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="chip chip--link" href={href} target="_blank" rel="noreferrer">
      <span>{children}</span>
      <span className="chip__arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  )
}

/** Deep-dive page for one project, at #/projects/<id> */
export function ProjectPage({ id }: { id: string }) {
  const index = projects.findIndex((p) => p.id === id)
  const p = projects[index]
  const next = projects[(index + 1) % projects.length]
  const [copied, setCopied] = useState(false)
  const [shot, setShot] = useState(0)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setShot(0)
    document.title = p ? `${p.title} · Niharika Sapre` : 'Niharika Sapre'
    return () => {
      document.title = 'Niharika Sapre'
    }
  }, [id, p])

  if (!p) {
    return (
      <main className="dd">
        <a className="dd-back" href="#/home">
          ← Back to my projects
        </a>
        <h1 className="dd-title">Hmm, no project here.</h1>
      </main>
    )
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(messaging.to)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      window.location.href = `mailto:${messaging.to}`
    }
  }

  const screens = p.screens ?? []

  return (
    <main className="dd" id="top">
      {/* ── header ── */}
      <motion.header className="dd-head" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
        <a className="dd-back" href={`#/home/${p.id}`}>
          ← Back to my projects
        </a>
        <div className="dd-head__row">
          <div className="dd-head__text">
            {p.wip && <span className="wip-badge wip-badge--inline">Work in progress</span>}
            <h1 className="dd-title">{p.title}</h1>
            <p className="dd-tagline">{p.tagline}</p>
            {p.links && (
              <div className="dd-links">
                {p.links.map((l) => (
                  <ExtLink key={l.href} href={l.href}>
                    {l.label}
                  </ExtLink>
                ))}
              </div>
            )}
            {p.stack && (
              <ul className="dd-stack" aria-label="Built with">
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            )}
            <p className="dd-meta">{p.meta.filter((m) => m !== 'Work in progress').join('  ·  ')}</p>
          </div>
          <div className={`dd-head__icon${p.art ? ' dd-head__icon--art' : ''}`} style={{ backgroundColor: p.tint }} aria-hidden="true">
            {p.art ? <MiniArt kind={p.art} /> : <ProjectIcon kind={p.icon} />}
          </div>
        </div>
      </motion.header>

      {/* ── specs ── */}
      <motion.ul className="specs specs--big" {...reveal}>
        {p.specs.map((s) => (
          <li key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </li>
        ))}
      </motion.ul>

      {/* ── how it works ── */}
      {p.how && (
        <motion.section className="dd-how" {...reveal}>
          <h2>How it works</h2>
          <ol>
            {p.how.map((step, i) => (
              <li key={step.title}>
                <span className="dd-how__n">{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          {p.howNote && <p className="dd-how__note">{p.howNote}</p>}
        </motion.section>
      )}

      {/* ── the story: tech + product ── */}
      <div className="dd-grid">
        <Block title="The problem" items={p.problem} />
        <Block title={p.wip ? 'What I’m building' : 'What I built'} items={p.built} />
        <Block title="Product decisions" items={p.decisions} />
        <Block title={p.wip ? 'Where it’s at' : 'Outcome'} items={p.outcome} />
        <Block title="Hardest part" items={p.hardest} />
        <Block title="Limitations" items={p.limitations} />
      </div>

      {/* ── screens ── */}
      {screens.length > 0 && (
        <motion.section className="dd-screens" {...reveal}>
          <h2>Screens</h2>
          {p.screensStyle === 'phone' ? (
            <div className="dd-phones">
              {screens.map((s) => (
                <figure key={s.src}>
                  <img src={s.src} alt={s.caption} loading="lazy" />
                  <figcaption>{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <>
              <figure className="dd-wide">
                <img src={screens[shot].src} alt={screens[shot].caption} />
              </figure>
              <div className="dd-wide__bar">
                <p>{screens[shot].caption}</p>
                {screens.length > 1 && (
                  <div className="dd-wide__nav">
                    <button onClick={() => setShot((shot - 1 + screens.length) % screens.length)} aria-label="Previous screen">
                      ←
                    </button>
                    <span>
                      {shot + 1} / {screens.length}
                    </span>
                    <button onClick={() => setShot((shot + 1) % screens.length)} aria-label="Next screen">
                      →
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </motion.section>
      )}

      {/* ── sign-off ── */}
      <motion.section className="dd-cta" {...reveal}>
        <h2>Want the detail?</h2>
        <p>I can walk through any decision on this page: why it was built this way, what broke, and what I’d change.</p>
        <div className="dd-cta__email">
          <a href={`mailto:${messaging.to}`}>{messaging.to}</a>
          <button onClick={copy} aria-label="Copy email address">
            {copied ? 'Copied ✿' : 'Copy'}
          </button>
        </div>
        <div className="dd-links">
          {p.links?.map((l) => (
            <ExtLink key={l.href} href={l.href}>
              {l.label}
            </ExtLink>
          ))}
          <a className="chip" href="#/home/chat">
            <span>Chat with me, live!</span>
            <span className="chip__arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </motion.section>

      <nav className="dd-foot" aria-label="More projects">
        <a href={`#/projects/${next.id}`} className="dd-next">
          <span>Next project</span>
          <strong>{next.title} →</strong>
        </a>
        <div className="dd-foot__row">
          <a href="#/home">← All projects</a>
          <span>© 2026 Niharika Sapre</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to the top ↑</button>
        </div>
      </nav>
    </main>
  )
}
