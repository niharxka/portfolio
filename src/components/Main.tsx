import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { projects, experiences, blog, about, contact } from '../content'
import { Keycap, ArrowGlyph } from './Keycap'
import { Terminal } from './Terminal'
import { ProjectIcon } from './ProjectIcon'
import { MiniArt } from './MiniArt'

const ease = [0.16, 1, 0.3, 1] as const

const sections = [
  { id: 'experiences', label: 'Experiences', key: 'E' },
  { id: 'projects', label: 'Projects', key: 'P' },
  { id: 'about', label: 'About me', key: 'A' },
  { id: 'blog', label: 'Blog', key: 'B' },
  { id: 'contact', label: 'Contact', key: 'C' },
]

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, ease },
}

function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

/* ───────── section with the blur-away scroll effect ─────────
   Once you've scrolled past a section's content, it lags behind,
   shrinks slightly, blurs and fades while the next section rises over it. */

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  // Starts only once the bottom of the content has scrolled up to 30% from the top
  // of the screen (i.e. you've basically finished reading it), and eases in gently.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['end 30%', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '18vh'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97])
  const opacity = useTransform(scrollYProgress, [0, 0.35, 1], [1, 0.85, 0])
  const blur = useTransform(scrollYProgress, [0, 0.35, 1], [0, 1.5, 9])
  const filter = useMotionTemplate`blur(${blur}px)`

  return (
    <section id={id} className="section">
      <div ref={ref}>
      <motion.div className="section__inner" style={reduce ? undefined : { y, scale, opacity, filter }}>
        <motion.h2 className="section__title" {...reveal}>
          {title}
        </motion.h2>
        {children}
      </motion.div>
      </div>
    </section>
  )
}

/* ───────── left keyboard nav ───────── */

function Nav() {
  const [active, setActive] = useState(sections[0].id)
  const [pressed, setPressed] = useState<string | null>(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  // real keyboard shortcuts: E / P / A / B / C
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if ((e.target as HTMLElement).closest('input, textarea')) return
      const s = sections.find((s) => s.key.toLowerCase() === e.key.toLowerCase())
      if (!s) return
      setPressed(s.id)
      setTimeout(() => setPressed(null), 160)
      goTo(s.id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <motion.nav
      className="nav"
      aria-label="Sections"
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease }}
    >
      <p className="nav__label">Press a key ⌨︎ or here, either way!</p>
      {sections.map((s) => (
        <Keycap
          key={s.id}
          hint={s.key}
          active={active === s.id}
          ariaCurrent={active === s.id}
          pressed={pressed === s.id}
          onClick={() => goTo(s.id)}
        >
          {s.label}
        </Keycap>
      ))}
    </motion.nav>
  )
}

/* ───────── Experiences: timeline ───────── */

function jumpToProject(id: string) {
  const el = document.getElementById(`project-${id}`)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  el.classList.remove('is-highlighted')
  void el.offsetWidth
  el.classList.add('is-highlighted')
}

function Experiences() {
  return (
    <Section id="experiences" title="Experiences">
      <ol className="timeline">
        {experiences.map((e, i) => (
          <motion.li
            key={e.role + e.org}
            className={`timeline__item${e.current ? ' is-current' : ''}`}
            {...reveal}
            transition={{ ...reveal.transition, delay: i * 0.05 }}
          >
            <span className="timeline__date">{e.dates}</span>
            <span className="timeline__dot" aria-hidden="true" />
            <article className="timeline__card">
              <h3>{e.role}</h3>
              <p className="timeline__org">{e.org}</p>
              <p className="timeline__desc">{e.description}</p>
              {e.highlights && (
                <ul className="timeline__highlights">
                  {e.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}

              {(e.projects?.length || e.supplements?.length) && (
                <div className="chips">
                  {e.projects?.map((id) => {
                    const p = projects.find((x) => x.id === id)
                    if (!p) return null
                    return (
                      <button key={id} className="chip" onClick={() => jumpToProject(id)}>
                        <ProjectIcon kind={p.icon} />
                        <span>{p.title}</span>
                        <span className="chip__arrow" aria-hidden="true">
                          →
                        </span>
                      </button>
                    )
                  })}
                  {e.supplements?.map((s) => (
                    <a key={s.href} className="chip chip--link" href={s.href} target="_blank" rel="noreferrer">
                      <span className="chip__note">{s.note}</span>
                      <span>{s.label}</span>
                      <span className="chip__arrow" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </article>
          </motion.li>
        ))}
      </ol>
    </Section>
  )
}

/* ───────── Projects: cards that open a deep dive ───────── */

function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="projects">
        {projects.filter((p) => !p.group).map((p, i) => (
          <motion.a
            key={p.id}
            id={`project-${p.id}`}
            href={`#/projects/${p.id}`}
            className="project"
            {...reveal}
            transition={{ ...reveal.transition, delay: (i % 2) * 0.08 }}
          >
            <div className="project__panel" style={{ backgroundColor: p.tint }}>
              {p.wip && <span className="wip-badge">Work in progress</span>}
              {p.cover ? (
                <img src={p.cover} alt="" loading="lazy" className={p.coverFit === 'contain' ? 'is-contain' : undefined} />
              ) : p.art ? (
                <div className="project__art">
                  <MiniArt kind={p.art} />
                </div>
              ) : (
                <div className="project__placeholder">
                  <ProjectIcon kind={p.icon} />
                  <span>Picture coming soon</span>
                </div>
              )}
            </div>
            <div className="project__body">
              <h3>{p.title}</h3>
              <p className="project__meta">{p.meta.filter((m) => m !== 'Work in progress').join(' · ')}</p>
              <p className="project__tagline">{p.tagline}</p>
              <ul className="specs">
                {p.specs.slice(0, 3).map((sp) => (
                  <li key={sp.label}>
                    <strong>{sp.value}</strong>
                    <span>{sp.label}</span>
                  </li>
                ))}
              </ul>
              <ul className="tags">
                {(p.stack ?? p.tags).map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <span className="project__more">
                Read the deep dive <span aria-hidden="true">→</span>
              </span>
            </div>
          </motion.a>
        ))}
      </div>

      <motion.h3 className="minis__title" {...reveal}>
        Data science + ML
      </motion.h3>
      <div className="minis">
        {projects
          .filter((p) => p.group === 'ds')
          .map((p, i) => (
            <motion.a
              key={p.id}
              id={`project-${p.id}`}
              href={`#/projects/${p.id}`}
              className="mini"
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.06 }}
            >
              <div className="mini__art" style={{ backgroundColor: p.tint }}>
                {p.art ? <MiniArt kind={p.art} /> : <ProjectIcon kind={p.icon} />}
              </div>
              <div className="mini__body">
                <div className="mini__head">
                  <h4>{p.title}</h4>
                  <span className="mini__meta">{p.meta[p.meta.length - 1]}</span>
                </div>
                <p>{p.tagline}</p>
                <ul className="mini__specs">
                  {p.specs.slice(0, 3).map((sp) => (
                    <li key={sp.label}>
                      <strong>{sp.value}</strong> {sp.label}
                    </li>
                  ))}
                </ul>
                {p.stack && (
                  <ul className="tags mini__stack">
                    {p.stack.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
              </div>
              <span className="mini__arrow" aria-hidden="true">
                →
              </span>
            </motion.a>
          ))}
      </div>
    </Section>
  )
}

/* ───────── About ───────── */

function About() {
  return (
    <Section id="about" title="About me">
      <div className="about">
        <motion.div className="about__text" {...reveal}>
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </motion.div>
        <motion.aside {...reveal} transition={{ ...reveal.transition, delay: 0.15 }}>
          <figure className="headshot">
            <span className="headshot__tape" aria-hidden="true" />
            <img src="/about/headshot.jpg" alt="Niharika Sapre, smiling, on a sunny rooftop" loading="lazy" />
          </figure>
          <div className="note">
            <h3>Currently…</h3>
            <dl>
              {about.currently.map(([k, v]) => (
                <div key={k} style={{ display: 'contents' }}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.aside>
      </div>
      <motion.div className="toolkit toolkit--wide" {...reveal}>
        <h4>Toolkit</h4>
        <div className="toolkit__groups">
          {about.toolkit.map(([group, items]) => (
            <div key={group} className="toolkit__group">
              <h5>{group}</h5>
              <ul>
                {items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  )
}

/* ───────── Blog ───────── */

function Blog() {
  return (
    <Section id="blog" title="Blog">
      {blog.posts.length === 0 ? (
        <motion.div className="blog-empty" {...reveal}>
          <span aria-hidden="true">✎</span>
          <p>{blog.emptyNote}</p>
        </motion.div>
      ) : (
        <div className="blog-list">
          {blog.posts.map((post) => (
            <motion.a key={post.href} className="blog-post" href={post.href} {...reveal}>
              <span className="blog-post__date">{post.date}</span>
              <h3>{post.title}</h3>
              <p>{post.blurb}</p>
            </motion.a>
          ))}
        </div>
      )}
    </Section>
  )
}

/* ───────── Contact ───────── */

function Contact() {
  return (
    <Section id="contact" title="Contact">
      <motion.p className="contact__sub" {...reveal}>
        {contact.sub}
      </motion.p>
      <motion.div className="contact__links" {...reveal}>
        {contact.links.map((l) => (
          <Keycap key={l.label} href={l.href}>
            {l.label}
          </Keycap>
        ))}
      </motion.div>
      <motion.p className="term__hint" {...reveal}>
        Or chat with me right here: click the terminal and type, or use the buttons.
      </motion.p>
      <motion.div {...reveal}>
        <Terminal />
      </motion.div>
      <p className="footer">
        Made with &lt;3 &amp; Claude Code (my best friend)
      </p>
    </Section>
  )
}

/* ───────── back to the intro ───────── */

function BackKey({ onBack }: { onBack: () => void }) {
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' || e.metaKey || e.ctrlKey || e.altKey) return
      if ((e.target as HTMLElement).closest('input, textarea')) return
      setPressed(true)
      setTimeout(onBack, 160)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onBack])

  return (
    <motion.div
      className="back"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 18 }}
    >
      <Keycap pressed={pressed} onClick={onBack} ariaLabel="Back to the start">
        <ArrowGlyph flip />
      </Keycap>
    </motion.div>
  )
}

export function Main({ onReplay, target }: { onReplay: () => void; target?: string }) {
  // Arriving from the intro's "Chat with me, live!" button: jump to the terminal and focus it
  // Coming back from a project page: land on the Projects section / that project's card
  useEffect(() => {
    if (!target || target === 'chat') return
    const t = setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'instant', block: target === 'projects' ? 'start' : 'center' })
    }, 60)
    return () => clearTimeout(t)
  }, [target])

  useEffect(() => {
    if (target !== 'chat') return
    const t = setTimeout(() => {
      document.querySelector('.term')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => document.querySelector<HTMLInputElement>('.term input')?.focus({ preventScroll: true }), 900)
    }, 350)
    return () => clearTimeout(t)
  }, [target])

  return (
    <main className="main">
      <BackKey onBack={onReplay} />
      <Nav />
      <Experiences />
      <Projects />
      <About />
      <Blog />
      <Contact />
    </main>
  )
}
