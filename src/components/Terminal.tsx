import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { contact, messaging } from '../content'

/* A little terminal for the Contact section: preset commands to reach out,
   plus an in-built message flow (name → email → message → send). */

type Line =
  | { kind: 'cmd'; text: string }
  | { kind: 'out' | 'muted' | 'ok' | 'err'; text: string }
  | { kind: 'link'; label: string; text: string; href: string }

type Flow =
  | { step: 'idle' }
  | { step: 'name' | 'email' | 'message' | 'confirm' | 'sending'; topic: string; name?: string; email?: string; message?: string }

const PROMPT = 'niharika@portfolio:~/contact'

const links = contact.links.map((l) => ({
  label: l.label.toLowerCase(),
  href: l.href,
  text: l.href.replace(/^mailto:|^https?:\/\/(www\.)?/, ''),
}))

const help: [string, [string, string][]][] = [
  ['chat with me', [...messaging.topics.map((t) => [t.cmd, t.help] as [string, string]), ['message', 'write me about anything else']]],
  ['ask me', messaging.questions.map((q) => [q.cmd, q.ask] as [string, string])],
  [
    'links',
    [
      ['ls', 'all my links'],
      ['linkedin', 'open my LinkedIn'],
      ['github', 'open my GitHub'],
      ['email', 'email me directly'],
    ],
  ],
  [
    'just for fun',
    [
      ['sing', 'a little harmonium'],
      ['water', 'a hydration reminder'],
      ['tina', 'meet my (hypothetical) cat'],
      ['sudo', 'try it'],
    ],
  ],
  [
    'other',
    [
      ['who-are-you', 'a short intro'],
      ['help', 'this list'],
      ['clear', 'clear the screen'],
    ],
  ],
]

const boot: Line[] = [
  { kind: 'out', text: 'Hi, I’m Niharika ✿ Ask me something below, start a chat (`hire`, `collab`, `coffee`, `hi`), or type `help` for everything.' },
]

export function Terminal() {
  const [lines, setLines] = useState<Line[]>(boot)
  const [flow, setFlow] = useState<Flow>({ step: 'idle' })
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [hIndex, setHIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [lines, flow])

  const print = (...l: Line[]) => setLines((cur) => [...cur, ...l])

  const startMessage = (topic: string, intro: string) => {
    print({ kind: 'out', text: intro }, { kind: 'muted', text: 'Press Enter after each answer. Type `cancel` anytime. First, your name?' })
    setFlow({ step: 'name', topic })
  }

  const open = (href: string) => {
    if (href.startsWith('mailto:')) window.location.href = href
    else window.open(href, '_blank', 'noopener')
  }

  const mailtoFallback = (f: { topic: string; name?: string; email?: string; message?: string }) => {
    const subject = `[Portfolio] ${f.topic} from ${f.name}`
    const body = `${f.message}\n\n— ${f.name} (${f.email})`
    window.location.href = `mailto:${messaging.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const send = async (f: Extract<Flow, { topic: string }>) => {
    setFlow({ ...f, step: 'sending' })
    if (!messaging.formspreeId) {
      print({ kind: 'muted', text: 'Opening your email app with your message ready to go…' })
      mailtoFallback(f)
      print({ kind: 'ok', text: 'Just hit send there and it’ll land in my inbox ✿' })
      setFlow({ step: 'idle' })
      return
    }
    print({ kind: 'muted', text: 'Sending…' })
    try {
      const res = await fetch(`https://formspree.io/f/${messaging.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ topic: f.topic, name: f.name, email: f.email, message: f.message, _subject: `[Portfolio] ${f.topic} from ${f.name}` }),
      })
      if (!res.ok) throw new Error(String(res.status))
      print({ kind: 'ok', text: `Sent! Thanks, ${f.name}. I’ll get back to you at ${f.email} soon ✿` })
    } catch {
      print({ kind: 'err', text: 'Hmm, that didn’t go through. Opening your email app instead…' })
      mailtoFallback(f)
    }
    setFlow({ step: 'idle' })
  }

  const runCommand = (raw: string, echo = true) => {
    const input = raw.trim()
    const cmd = input.toLowerCase().replace(/[?’']/g, (c) => (c === '?' ? '' : c))
    if (echo) print({ kind: 'cmd', text: input })
    if (!cmd) return

    const topic = messaging.topics.find((t) => t.cmd === cmd)
    if (topic) return startMessage(topic.label, topic.intro)

    const q = messaging.questions.find((x) => x.cmd === cmd || x.ask.toLowerCase() === cmd)
    if (q)
      return print(
        { kind: 'muted', text: q.ask },
        ...q.answer.map((t) => ({ kind: 'out' as const, text: t })),
        { kind: 'ok', text: `→ Want to talk more? Type \`${q.next}\`.` },
      )

    switch (cmd) {
      case 'help':
        return print(
          ...help.flatMap(([group, cmds]) => [
            { kind: 'muted' as const, text: `# ${group}` },
            ...cmds.map(([c, d]) => ({ kind: 'out' as const, text: `  ${c.padEnd(17)} ${d}` })),
          ]),
        )
      case 'message':
      case 'contact':
        return startMessage('Message', 'Writing me a message. Love that.')
      case 'who-are-you':
      case 'whoami':
        return print({
          kind: 'out',
          text: 'Niharika Sapre: software engineer with a product brain, CS + Cog Sci @ UC San Diego. I build full-stack and AI systems that feel genuinely human.',
        })
      case 'ls':
      case 'links':
        return print(...links.map((l) => ({ kind: 'link' as const, label: l.label, text: l.text, href: l.href })))
      case 'linkedin':
      case 'github':
      case 'email': {
        const l = links.find((x) => x.label === cmd)!
        print({ kind: 'link', label: l.label, text: l.text, href: l.href })
        return open(l.href)
      }
      case 'clear':
        setLines([])
        return
      // easter eggs
      case 'sudo':
      case 'sudo hire-niharika':
      case 'sudo hire niharika':
        return print({ kind: 'ok', text: 'Permission granted ✿ Type `hire` and let’s talk.' })
      case 'sing':
      case 'harmonium':
        return print({ kind: 'out', text: '♪ Sa Re Ga Ma Pa Dha Ni Sa ♪  (imagine a harmonium here)' })
      case 'water':
        return print({ kind: 'out', text: 'Your reminder to go sip some water! 💧 I’m on jug #3 today.' })
      case 'tina':
        return print({ kind: 'out', text: 'Meow? (Tina is still hypothetical. Still accepting applications.)' })
      default:
        return print({ kind: 'err', text: `command not found: ${input}. Try \`help\`.` })
    }
  }

  const answer = (raw: string) => {
    if (flow.step === 'idle' || flow.step === 'sending') return
    const v = raw.trim()
    print({ kind: 'cmd', text: flow.step === 'confirm' ? v : `${flow.step}: ${v}` })
    if (v.toLowerCase() === 'cancel') {
      print({ kind: 'muted', text: 'Cancelled. No worries!' })
      return setFlow({ step: 'idle' })
    }
    if (flow.step === 'name') {
      if (!v) return print({ kind: 'err', text: 'What should I call you?' })
      print({ kind: 'muted', text: `Nice to meet you, ${v}! Your email, so I can reply?` })
      return setFlow({ ...flow, step: 'email', name: v })
    }
    if (flow.step === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return print({ kind: 'err', text: 'That email doesn’t look quite right. Try again?' })
      print({ kind: 'muted', text: 'And your message?' })
      return setFlow({ ...flow, step: 'message', email: v })
    }
    if (flow.step === 'message') {
      if (!v) return print({ kind: 'err', text: 'Say a little something first ✿' })
      print({ kind: 'muted', text: 'Send it? (y/n)' })
      return setFlow({ ...flow, step: 'confirm', message: v })
    }
    if (flow.step === 'confirm') {
      if (/^y(es)?$/i.test(v)) return void send(flow)
      print({ kind: 'muted', text: 'Not sent. Type a topic to start over anytime.' })
      return setFlow({ step: 'idle' })
    }
  }

  const submit = (raw: string) => {
    if (flow.step === 'idle') {
      if (raw.trim()) setHistory((h) => [raw.trim(), ...h])
      runCommand(raw)
    } else answer(raw)
    setValue('')
    setHIndex(-1)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit(value)
    else if (e.key === 'c' && e.ctrlKey && flow.step !== 'idle') {
      print({ kind: 'muted', text: '^C  Cancelled.' })
      setFlow({ step: 'idle' })
    } else if (flow.step === 'idle' && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
      e.preventDefault()
      const next = Math.max(-1, Math.min(history.length - 1, hIndex + (e.key === 'ArrowUp' ? 1 : -1)))
      setHIndex(next)
      setValue(next === -1 ? '' : history[next])
    }
  }

  const label = flow.step === 'idle' ? '$' : flow.step === 'confirm' ? '(y/n)' : flow.step === 'sending' ? '…' : `${flow.step}:`

  const presets = [...messaging.topics.map((t) => t.cmd), 'message', 'who-are-you', 'ls', 'sing', 'water', 'tina', 'sudo', 'help', 'clear']

  return (
    <div className="term" onClick={() => inputRef.current?.focus({ preventScroll: true })}>
      <div className="term__bar">
        <span className="term__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="term__title">{PROMPT}</span>
      </div>

      <div className="term__body" ref={bodyRef} role="log" aria-live="polite">
        {lines.map((l, i) =>
          l.kind === 'cmd' ? (
            <p key={i} className="term__line term__line--cmd">
              <span className="term__prompt">$</span> {l.text}
            </p>
          ) : l.kind === 'link' ? (
            <p key={i} className="term__line">
              <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                <span className="term__key">{l.label.padEnd(16)}</span>→ {l.text}
              </a>
            </p>
          ) : (
            <p key={i} className={`term__line term__line--${l.kind}`}>
              {l.text}
            </p>
          ),
        )}

        <label className="term__input">
          <span className="term__prompt">{label}</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={flow.step === 'sending'}
            type={flow.step === 'email' ? 'email' : 'text'}
            autoComplete={flow.step === 'name' ? 'name' : flow.step === 'email' ? 'email' : 'off'}
            spellCheck={flow.step === 'message'}
            aria-label={flow.step === 'idle' ? 'Terminal command' : `Your ${flow.step}`}
          />
        </label>
      </div>

      <div className="term__presets term__presets--ask">
        <span className="term__presets-label">Ask me:</span>
        {messaging.questions.map((q) => (
          <button
            key={q.cmd}
            className="term__ask"
            onClick={(e) => {
              e.stopPropagation()
              if (flow.step !== 'idle') setFlow({ step: 'idle' })
              print({ kind: 'cmd', text: q.cmd })
              runCommand(q.cmd, false)
              inputRef.current?.focus({ preventScroll: true })
            }}
          >
            {q.ask}
          </button>
        ))}
      </div>

      <div className="term__presets">
        {presets.map((p) => (
          <button
            key={p}
            className="term__btn"
            onClick={(e) => {
              e.stopPropagation()
              if (flow.step !== 'idle') setFlow({ step: 'idle' })
              runCommand(p)
              inputRef.current?.focus({ preventScroll: true })
            }}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}
