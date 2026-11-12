// ─────────────────────────────────────────────────────────────
//  All the words on the site live here. Swap the [placeholders]
//  for the real stuff — no need to touch the components.
// ─────────────────────────────────────────────────────────────

export const name = { first: 'Niharika', last: 'Sapre' }

/** "Double-sided" fact cards on the intro screen. Hover / tap flips them to the back. */
export const factsTitle = 'About me — it’s double sided 😌'

export const funFacts: { front: string; back: string; emoji: string }[] = [
  { emoji: '📍', front: 'Based in San Diego, CA', back: 'But my heart is in the Bay 💗' },
  { emoji: '🌊', front: 'UC San Diego', back: 'Lived in an ocean-view dorm for 2 years' },
  { emoji: '💻', front: 'Double CS Major', back: 'Computer Science & Cognitive Science, Spec. Machine Learning' },
  { emoji: '🎓', front: 'Graduating: June 2028', back: 'Can’t believe I’m almost outta here!' },
]

/** Popups for things on the desk. Keys must match the hotspots in Desk.tsx.
 *  `body` can be a sentence, or a list (rendered as bullet points). */
export const deskItems: Record<string, { title: string; body: string | string[] }> = {
  me: { title: 'Hi, that’s me!', body: 'Usually right here: building something, debugging something, or both, with a jug of water in reach.' },
  laptop: { title: 'My 15-inch mac', body: 'Where I’m always building, learning, beholding, and blogging' },
  mug: { title: 'Your reminder to go sip some water!', body: 'I drink at least 4 of these a day' },
  clock: {
    title: 'Running on schedule',
    body: 'Google Calendar, handwritten schedules, alarms, and Pomodoro timers run my life.',
  },
  books: { title: 'Book Reccs', body: ['Every Summer After', 'Smarter, Faster, Better', 'The Bhagavad Gītā As It Is'] },
  lamp: {
    title: 'Late-night lamp',
    body: 'Yea, early bird gets the worm, but night owl gets the stillness of a world asleep, a mind awake, and endless room to dream.',
  },
  cat: { title: 'Meow?', body: 'Meet Tina, my hypothetical cat' },
}

/** Easter egg: click the water bottle 5+ times */
export const mugOverload = {
  title: 'Okay, you’re officially hydrated',
  body: 'That’s {n} clicks. {n} jugs. Your kidneys thank you 💧',
}

/** The bulletin board (click it on the desk to open).
 *  Photos live in /public/board/. `focus` = which part of the photo stays in frame when cropped. */
export const board: {
  /** `fit: 'whole'` shows the entire photo (soft blurred fill on the sides) instead of cropping */
  photos: { caption: string; src: string; focus?: string; fit?: 'whole'; tint: string }[]
  quote: string
} = {
  photos: [
    { caption: 'singing + harmonium', src: '/board/harmonium.jpg', fit: 'whole', tint: '#f6d5de' },
    { caption: 'hiking / running', src: '/board/hiking.jpg', focus: '66% 46%', tint: '#d9ebdf' },
    { caption: 'friends', src: '/board/friends.jpg', focus: '50% 40%', tint: '#fbe6cf' },
    { caption: 'family', src: '/board/family.jpg', focus: '50% 45%', tint: '#dfe8f3' },
    { caption: 'cooking', src: '/board/cooking.jpg', focus: '55% 50%', tint: '#f3dcd8' },
  ],
  quote: 'What you’re not changing, you’re choosing.',
}

/** The rotating "I am ___" headline. sticker keys map to drawings in Stickers.tsx */
export const roles = [
  { text: 'a product manager', color: '#c2577f' },
  { text: 'a software engineer', color: '#7a5bc4' },
  { text: 'obsessed with AI', color: '#d07a4a' },
] as const

export { projects, type Project } from './projects'

/** Experiences timeline (newest first).
 *  `projects` = ids from the list above (buttons jump to them).
 *  `supplements` = outside links you contributed to but don't own. */
export const experiences: {
  dates: string
  current?: boolean
  role: string
  org: string
  description: string
  highlights?: string[]
  projects?: string[]
  supplements?: { label: string; note: string; href: string }[]
}[] = [
  {
    dates: 'Jun – Aug 2026',
    role: 'Software Engineer Intern + Product Co-Owner',
    org: 'San Diego Supercomputer Center (SDSC)',
    description:
      'Built Relyze from a blank codebase to 10+ labs in 10 weeks: 34 REST endpoints across 6 FastAPI routers on Supabase/Postgres, a PDF → NLP → LLM pipeline that processes a paper in ~60 seconds, and a React Flow mind map that renders 20 nodes in 1 ms. Also co-owned the product: user interviews, roadmap, and 4 sprints with a 5-person team.',
    projects: ['relyze'],
  },
  {
    dates: 'Jan – Jul 2026',
    role: 'Undergraduate Researcher, Agentic ML Systems',
    org: 'SEE Lab, UC San Diego',
    description:
      'Agentic ML for time-series reasoning under Prof. Tajana Rosing. Built T-SMART, a pipeline that routes each question to deterministic tools, vision, or LLM reasoners, and fine-tuned Qwen2.5-7B with QLoRA (PyTorch + Hugging Face PEFT). Published at IEEE ICTAI 2026.',
    projects: ['tsmart'],
  },
  {
    dates: 'Jan – Mar 2026',
    role: 'AI Product Management Intern',
    org: 'BRG Energies',
    description:
      'Wrote the technical specs for a multi-agent AI platform for energy developers (agent workflows, RAG pipelines, and Modelica simulations), and shipped a redesigned onboarding funnel with Claude Code (+20% contact form CTR).',
    supplements: [{ label: 'Joulios', note: 'Client project', href: 'https://joulios.com/' }],
  },
  {
    dates: 'Oct 2024 – Present',
    current: true,
    role: 'Senior Technology Consultant',
    org: 'Lumnus Consulting',
    description:
      'Joined UC San Diego’s student-run, for-profit consulting org as an intern and grew into a Senior Technology Consultant. We work with external clients to deliver technical and business solutions, and as an organization, we’ve delivered over $15,000 in client value. I’ve worked on two client projects, leading teams of 5+ consultants, and built internal tools such as a document generation system that cut prep time 75% for 40+ consultants and our recruitment portal, which 250+ candidates use each quarter and which saves 260 consultant-hours.',
  },
]

/** Blog posts. Leave empty to show the "coming soon" card. */
export const blog: { posts: { title: string; date: string; blurb: string; href: string }[]; emptyNote: string } = {
  posts: [],
  emptyNote: 'First posts coming soon: notes on building products, shipping code, and working with AI.',
}

export const about = {
  paragraphs: [
    'I’ve always been fascinated by how people think, make decisions, and interact with the world. Cognitive Science let me dig into that, and Computer Science gave me the tools to build on it. Now I’m a third-year at UC San Diego double majoring in both, specializing in Machine Learning.',
    'What drives me is bringing psychology, AI, and engineering together to build technology that feels genuinely human. At the San Diego Supercomputer Center, that meant sitting down with researchers to understand what slowed them down, turning it into requirements, then engineering the backend and AI pipeline behind a research tool that cut paper-review time by 55% across 10+ labs. Back on campus, I lead technical projects for international clients at Lumnus Consulting.',
    'Outside of work, I sing and play the harmonium, an Indian classical instrument, everywhere from the streets of the Bay Area to festivals of 4,000+ people. I love bringing people together, whether that’s connecting tech founders with monks who practice yoga or hosting events for friends, family, and community. And to stay grounded: meditation, journaling, and a run every day.',
  ],
  currently: [
    ['Training', 'Lumnus’s next intern cohort'],
    ['Building', 'TrekSpert'],
    ['Consulting', 'Lumnus Consulting'],
    ['Studying', 'CS + Cog Sci @ UCSD'],
  ] as [string, string][],
  /** grouped the way recruiters scan a skills section */
  toolkit: [
    ['Languages', ['Python', 'TypeScript', 'JavaScript', 'Java', 'C/C++', 'SQL', 'HTML/CSS']],
    ['Frameworks', ['React', 'React Native', 'Next.js', 'Node.js', 'FastAPI', 'Expo', 'Flutter', 'Tailwind CSS', 'REST APIs']],
    ['Data + ML', ['PyTorch', 'TensorFlow', 'Hugging Face', 'scikit-learn', 'pandas', 'NumPy', 'spaCy', 'Jupyter']],
    ['Infra + tools', ['PostgreSQL', 'Supabase', 'Firebase', 'Redis', 'Docker', 'Git', 'GitHub Actions', 'Jest', 'Vercel', 'Linux/UNIX', 'Claude Code']],
    ['Product + analysis', ['Figma', 'Tableau', 'Power BI', 'Jira', 'Trello', 'Notion', 'Miro', 'Confluence', 'Linear', 'Amplitude', 'Mixpanel', 'Google Analytics', 'Excel']],
  ] as [string, string[]][],
}

export const contact = {
  sub: 'Let’s make something. Whether it’s a role, a collab, or just to say hi, my inbox is always open.',
  links: [
    { label: 'Email', href: 'mailto:niiharika.sapre@gmail.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/niharikasapre' },
    { label: 'GitHub', href: 'https://github.com/niharxka' },
  ],
}

/** The chat terminal in the Contact section.
 *  Messages go to Formspree if `formspreeId` is set (free: formspree.io → New form → copy the ID
 *  from https://formspree.io/f/XXXXXXX). Until then, sending opens the visitor's email app pre-filled. */
export const messaging = {
  to: 'niiharika.sapre@gmail.com',
  formspreeId: '',
  topics: [
    { cmd: 'hire', label: 'Role / opportunity', help: 'you have a role or opportunity', intro: 'Ooh, an opportunity! Tell me about it.' },
    { cmd: 'collab', label: 'Collab', help: 'let’s build something together', intro: 'Let’s build something! What are you thinking?' },
    { cmd: 'coffee', label: 'Coffee chat', help: 'advice, questions, or a coffee chat', intro: 'Always down for a coffee chat ☕ Ask me anything.' },
    { cmd: 'hi', label: 'Saying hi', help: 'just say hi', intro: 'Hi back! 👋' },
  ],
  /** Sentence-starter questions. Each prints a fixed answer plus a nudge to keep talking. */
  questions: [
    {
      cmd: 'what-drives-you',
      ask: 'What drives you?',
      answer: [
        'Understanding how people think, decide, and interact with the world, then building tech that actually fits them.',
        'Cog Sci taught me the “why” behind behavior. CS lets me build on it. Psychology + AI + engineering = human-centered tech.',
      ],
      next: 'coffee',
    },
    {
      cmd: 'why-product',
      ask: 'Why product management?',
      answer: [
        'It brings together everything that excites me: understanding people, building technology, and bringing teams together to make something meaningful.',
        'My favorite part is the loop: talk to users, find what actually hurts, build the fix, then check whether it worked.',
      ],
      next: 'hire',
    },
    {
      cmd: 'how-do-you-lead',
      ask: 'How do you lead a team?',
      answer: [
        'By giving people a real say, not just tasks. People do their best work on things they helped shape; my job is clearing blockers and keeping us on schedule.',
        'And by investing in people early. I remember being an intimidated intern surrounded by people with more experience, so I make room for questions without judgment.',
      ],
      next: 'collab',
    },
    {
      cmd: 'working-on',
      ask: 'What are you working on?',
      answer: [
        'Building TrekSpert, an AI travel companion: scan anything you see, learn what it is, and get told where to go next. Also helping new Lumnus interns find their footing. This summer I wrapped up Relyze at SDSC, which makes research papers easier to navigate.',
      ],
      next: 'collab',
    },
    {
      cmd: 'off-the-clock',
      ask: 'What do you do for fun?',
      answer: [
        'Music, mostly. Singing and the harmonium have been with me forever.',
        'Otherwise I’m usually the one organizing the get-together. Meditation, journaling, and a daily run keep me grounded.',
      ],
      next: 'hi',
    },
    {
      cmd: 'reading',
      ask: 'What are you reading?',
      answer: [
        'The one that’s shaped me most is Smarter Faster Better: a sense of control over your decisions is what drives motivation. It changed how I lead.',
        'The rest of the pile is on my desk back on the intro screen!',
      ],
      next: 'coffee',
    },
  ],
}
