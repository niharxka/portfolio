// ─────────────────────────────────────────────────────────────
//  Projects: the cards in the Projects section AND their deep-dive pages
//  (#/projects/<id>). Every section of a deep dive is optional; leave one
//  out and it simply won't show.
//
//  Pictures: put files in /public/projects/<id>/ and set `cover` (the card
//  picture) and `screens` (the deep-dive gallery).
// ─────────────────────────────────────────────────────────────

import type { ArtKind } from './components/MiniArt'

export type Project = {
  id: string
  /** 'ds' = shown as a mini-card in the "Data science + ML" group */
  group?: 'ds'
  /** illustration for mini-cards and the deep-dive header */
  art?: ArtKind
  icon: 'mindmap' | 'chart' | 'plane' | 'wave' | 'bars' | 'pulse' | 'people' | 'pin'
  /** shows a “Work in progress” badge, and words the deep dive in the present tense */
  wip?: boolean
  title: string
  tagline: string
  /** short labels under the title, e.g. role and dates */
  meta: string[]
  /** big easy-to-scan numbers, shown on the card (first 3) and the deep dive */
  specs: { value: string; label: string }[]
  /** tech chips on the deep dive */
  stack?: string[]
  /** tags on the card */
  tags: string[]
  links?: { label: string; href: string }[]
  cover?: string
  /** 'contain' shows the whole cover (good for diagrams) instead of cropping it */
  coverFit?: 'contain'
  /** 'phone' = tall phone screenshots shown side by side */
  screensStyle?: 'phone' | 'wide'
  screens?: { src: string; caption: string }[]
  tint: string
  how?: { title: string; body: string }[]
  howNote?: string
  problem?: string[]
  built?: string[]
  decisions?: string[]
  outcome?: string[]
  hardest?: string[]
  limitations?: string[]
}

export const projects: Project[] = [
  /* ───────── Relyze ───────── */
  {
    id: 'relyze',
    icon: 'mindmap',
    title: 'Relyze',
    tagline: 'An AI-powered research paper analysis tool that turns unstructured papers into navigable semantic mind-maps.',
    meta: ['Software Engineer + Product Co-Owner', 'San Diego Supercomputer Center', 'Jun – Aug 2026'],
    specs: [
      { value: '55%', label: 'less time reviewing papers' },
      { value: '34', label: 'REST endpoints' },
      { value: '1 ms', label: 'to render a 20-node mind map' },
      { value: '10 wks', label: 'blank codebase to launch' },
      { value: '10+', label: 'SDSC labs using it' },
    ],
    stack: ['Python', 'FastAPI', 'Supabase', 'PostgreSQL', 'Next.js', 'React Flow', 'PyMuPDF', 'Docling', 'spaCy', 'Groq', 'Figma'],
    tags: ['Product', 'FastAPI', 'Next.js', 'Supabase'],
    links: [{ label: 'Visit relyze.app', href: 'https://relyze.app' }],
    cover: '/projects/relyze/home.jpg',
    screens: [{ src: '/projects/relyze/home.jpg', caption: 'The home page: upload a PDF and pick up where you left off.' }],
    tint: '#f6d5de',
    how: [
      { title: 'Upload a PDF', body: 'A researcher drops in a paper.' },
      { title: 'Extract', body: 'PyMuPDF and Docling pull out the text and structure.' },
      { title: 'Enrich', body: 'spaCy NLP and sentence tokenization segment and classify it, boosted by two Groq LLM calls.' },
      { title: 'Connect', body: 'Embeddings and LLM calls find concepts and how they link. Every link cites a passage.' },
      { title: 'Mind map', body: 'A BFS layout renders the graph in React Flow: 20 nodes in 1 ms.' },
    ],
    howNote: 'About 60 seconds per paper, end to end.',
    problem: [
      'Reviewing a research paper took researchers around 45 minutes.',
      'The ideas that matter are often spread across a paper: a limitation in the dataset on one page explains an experimental failure much later. Reading section by section hides that.',
      '8+ user interviews turned these pain points into 20+ user stories and a roadmap across 4 sprints.',
    ],
    built: [
      '34 REST endpoints across 6 FastAPI routers, on a 3-table Supabase/Postgres model with per-user isolation.',
      'A four-stage pipeline (extraction, NLP enrichment, LLM calls, semantic subcategories) that also sorts papers by difficulty.',
      'An interactive mind map in Next.js and React Flow, laid out by a BFS traversal algorithm.',
      'Hi-fi Figma prototypes, plus CLAUDE.md context files that guided our AI coding agents across 4 sprints.',
    ],
    decisions: [
      'Section-based or semantic? Four of our engineers wanted the mind map organized by paper section (abstract, methods…): easier to build, less prone to errors. I believed the value was in connecting concepts across sections.',
      'My conviction alone wasn’t a reason to override the team, but a vote shouldn’t settle a question about users either. So I ran 5 user interviews and 10 surveys, presenting both options neutrally. 12 of 15 preferred semantic.',
      'We time-boxed a two-day test on 5 papers, with the section-based version as the fallback. The prototype beat our expectations, finding links that weren’t obvious.',
    ],
    outcome: [
      'Launched to 10+ SDSC labs in 10 weeks, from a blank codebase.',
      'Paper-review time dropped 55% (45 → 20 min) across 40+ active use cases in the first month.',
      'Researchers answered cross-section questions 3x faster with the semantic mind map, and ranked it a top-2 feature.',
    ],
    hardest: [
      'Finding connections was easier than we expected. Making sure they were true was the hard part: a confident wrong link is worse than no link.',
      'So every connection has to be backed by a specific passage from the paper before it shows up on the map.',
    ],
    limitations: ['Our accuracy check was a two-day test on 5 papers. That’s a strong signal, not a benchmark.'],
  },

  /* ───────── T-SMART ───────── */
  {
    id: 'tsmart',
    icon: 'chart',
    title: 'T-SMART',
    tagline: 'A neurosymbolic framework that helps language models answer questions about time-series data, without making the numbers up.',
    meta: ['Undergraduate Researcher', 'SEE Lab, UC San Diego (Prof. Tajana Rosing)', 'Jan – Jul 2026'],
    specs: [
      { value: '67.5%', label: 'accuracy vs. 60.2% state of the art' },
      { value: '+31.7', label: 'points from deterministic tools' },
      { value: '13.9%', label: 'IEEE ICTAI acceptance rate' },
      { value: '0.53%', label: 'of parameters fine-tuned' },
    ],
    stack: ['Python', 'PyTorch', 'Hugging Face PEFT', 'QLoRA', 'Qwen2.5-7B'],
    tags: ['LLM Agents', 'QLoRA', 'PyTorch', 'Research'],
    links: [
      { label: 'Read the paper on arXiv', href: 'https://arxiv.org/abs/2609.14142' },
      { label: 'View the poster', href: 'https://drive.google.com/file/d/1StQj0LGrVgAahoJEtQJLDSBA0IRv7A7d/view?usp=sharing' },
    ],
    cover: '/projects/tsmart/architecture.png',
    coverFit: 'contain',
    screens: [
      { src: '/projects/tsmart/architecture.png', caption: 'The T-SMART architecture: a task router sends each question to specialized tools, and to vision only when math confidence is low.' },
      { src: '/projects/tsmart/arxiv.jpg', caption: 'Accepted at the 38th IEEE International Conference on Tools with AI (ICTAI ’26).' },
    ],
    tint: '#e6dcf3',
    how: [
      { title: 'A question', body: 'Is there a trend? Is this periodic? How noisy is it?' },
      { title: 'Interpret', body: 'A frozen LLM reads the question and picks the operations to run.' },
      { title: 'Compute', body: 'Deterministic tools do the actual math, instead of the LLM guessing from numbers as text.' },
      { title: 'Trust gate', body: 'A statistical check decides whether the costly vision step is worth calling.' },
      { title: 'Answer', body: 'The LLM reasoner answers, grounded in what the tools found.' },
    ],
    howNote: 'Each query is routed by task category to statistical tools, vision modules, or LLM reasoners.',
    problem: [
      'LLMs struggle with time-series questions, especially when the numbers are serialized as text and need real computation. They hallucinate.',
      'Tool-augmented systems help, but they tangle language, computation, and perception together, so nobody can tell which part is actually helping.',
    ],
    built: [
      'T-SMART, a multimodal agentic pipeline that separates the roles: an LLM for language, deterministic tools for math, and perception only when needed.',
      'A statistical trust gate that calls visual reasoning only for the question types where it helps.',
      'Fine-tuned Qwen2.5-7B-Instruct with QLoRA (4-bit quantization + LoRA adapters), training 40M of 7.66B parameters, and benchmarked fine-tuning against prompting.',
    ],
    decisions: [
      'Visual reasoning was our most computationally expensive component, so I checked whether it was earning its cost and latency.',
      'Broken down by question category: vision added 24 points on periodicity and 14 on trends, but cost 4.2 points on noise detection.',
      'So instead of applying vision to every question, we gate it. Less compute, less latency, and better accuracy.',
    ],
    outcome: [
      '67.5% accuracy, beating the previous state of the art (60.2%).',
      'Controlled ablations showed deterministic computation drives most of the gain: +31.7 points over an LLM reasoning directly on the numbers.',
      'Published at IEEE ICTAI 2026, and won an industry-judged cash award at the UCSD Engineering Research Symposium.',
    ],
    hardest: [
      'Starting over. My previous lab disbanded and I lost a quarter of progress, then I joined a field I didn’t know.',
      'I read papers systematically, set up 1:1s with teammates, and kept asking for feedback until I could contribute to technical discussions.',
      'The lesson I kept: the best technical solution isn’t always the most complicated one. Sometimes impact is knowing what not to build.',
    ],
  },

  /* ───────── FlyTag ───────── */
  {
    id: 'flytag',
    icon: 'plane',
    title: 'FlyTag',
    tagline: 'Rides to and from San Diego airport, shared with fellow UCSD students.',
    meta: ['Full-stack, designed & built solo', 'Web app for UCSD students', '2026'],
    specs: [
      { value: '129', label: 'database tests' },
      { value: '30', label: 'UI components' },
      { value: '1 of 10', label: 'wins the last-seat race' },
      { value: '20', label: 'database migrations' },
    ],
    stack: ['Expo', 'React Native', 'TypeScript', 'Supabase', 'PostgreSQL', 'TanStack Query', 'NativeWind', 'Vercel'],
    tags: ['Product', 'React Native', 'Supabase', 'Design'],
    links: [
      { label: 'Try FlyTag', href: 'https://ucsdflytag.vercel.app/' },
      { label: 'FlyTag on GitHub', href: 'https://github.com/niharxka/flytag' },
    ],
    cover: '/projects/flytag/cover.jpg',
    screensStyle: 'phone',
    screens: [
      { src: '/projects/flytag/01-welcome.jpg', caption: 'Welcome: sign in with your UCSD Google account.' },
      { src: '/projects/flytag/02-rides.jpg', caption: 'Rides by day. Open lock = seats left.' },
      { src: '/projects/flytag/03-ride.jpg', caption: 'Ride detail: timeline, riders, and the fare split.' },
      { src: '/projects/flytag/04-chat.jpg', caption: 'Live chat with the meet spot pinned.' },
      { src: '/projects/flytag/05-post.jpg', caption: 'Post a ride, with nearby rides suggested first.' },
      { src: '/projects/flytag/06-profile.jpg', caption: 'Profile: home college, rider tag, theme.' },
      { src: '/projects/flytag/07-rides-charcoal.jpg', caption: 'The dark Charcoal theme, from the same tokens.' },
    ],
    tint: '#dfe8f3',
    how: [
      { title: 'Sign in', body: 'Continue with Google. Only verified @ucsd.edu accounts get in, checked on the server.' },
      { title: 'Browse', body: 'Rides grouped by day and direction: to the airport or to campus.' },
      { title: 'Join or post', body: 'Posting suggests nearby rides to join before you create a duplicate.' },
      { title: 'Chat', body: 'Each ride has a live chat, with the meet spot pinned on top.' },
      { title: 'Split the fare', body: 'Riders see “About $24 each,” and the share drops as people join.' },
    ],
    howNote: 'Every screen follows the same path: screen → hook → API → Supabase. The rules live in the database.',
    problem: [
      'Every break, thousands of UCSD students make the same trip to SAN, often at the same hour from the same few colleges. Most go alone: a $40–60 rideshare each way.',
      'Group chats work until they don’t: posts get buried, seats get double-booked, and phone numbers end up with strangers.',
    ],
    built: [
      'An Expo + React Native app for iOS, Android, and web from one TypeScript codebase.',
      'Every rule lives in Postgres, so it holds even if someone skips the app: Row Level Security on every table, RPCs for joining and leaving, and an auth hook that only lets @ucsd.edu accounts sign up.',
      'Members-only live chat over Supabase Realtime, with a trigger that rejects more than 20 messages a minute.',
      'A small brand system: one tokens file generates the code for two themes (Mist and Charcoal), and 30 components live in a dev-only gallery.',
      'Accessibility from the start: 48 pt touch targets, labels on every control, and status never shown by color alone.',
    ],
    decisions: [
      'One job, done well: get classmates to the airport together. Payments, ratings, and DMs are deliberately out of v1.',
      'Private by default. Phone numbers reach co-riders only, and only if the rider chooses to share.',
      'A web app, not an app-store download: students open it from a link, no install needed.',
      'Google sign-in over email codes: free, no email service to run, and students already have the account.',
      'North-star metric: matched rides per week, meaning rides that reach 2+ riders before departure.',
    ],
    outcome: [
      'Live as a web app for UCSD students, deployed automatically to Vercel.',
      '129 database tests, 72 app tests, and the race test run in CI on every push.',
    ],
    hardest: [
      'The last seat. When two people tap Join at once, both can get in. With the row lock removed as an experiment, 10 simultaneous joins put 11 people in a 2-seat ride.',
      'Now join_ride() locks the ride row, so exactly one request wins and nine see “This ride just filled up.”',
    ],
    limitations: [
      'No push notifications or alerts yet.',
      'Safety tools (block, report, delete account) and a privacy policy come before a wider launch.',
    ],
  },

  /* ───────── TrekSpert (work in progress) ───────── */
  {
    id: 'trekspert',
    icon: 'pin',
    art: 'trek',
    wip: true,
    title: 'TrekSpert',
    tagline: 'Scan anything you see while traveling, learn what it is, and get recommended where to go next.',
    meta: ['Work in progress', 'AI travel companion', '2026'],
    specs: [
      { value: '4', label: 'recommendation modes' },
      { value: '500+', label: 'destinations in the catalog' },
      { value: '5', label: 'core MVP features' },
      { value: '20', label: 'user stories' },
    ],
    stack: ['React Native', 'Expo', 'TypeScript', 'FastAPI', 'Supabase', 'GPT-4o Vision', 'MobileNetV2', 'sentence-transformers', 'Chroma'],
    tags: ['Product', 'AI', 'Computer Vision', 'React Native'],
    tint: '#fbefd6',
    how: [
      { title: 'Scan', body: 'Snap or upload a photo of a landmark, statue, mural, or food spot. GPS tags where you are.' },
      { title: 'Identify', body: 'A fine-tuned MobileNetV2 classifier guesses the category, then GPT-4o Vision names the specific subject.' },
      { title: 'Learn', body: 'A result card: what it is, an AI summary, 3 fun facts, a source link, and vibe tags like Ancient or Serene.' },
      { title: 'Journal + map', body: 'Every scan saves to your travel journal and drops a pin on your personal map.' },
      { title: 'Go next', body: '“Since you scanned this, go here next”: recommendations, each with a visible reason.' },
    ],
    howNote: 'Low-confidence scans don’t guess. You get “We couldn’t identify this, try a clearer photo” instead of a wrong answer.',
    problem: [
      'When you travel, you see things you can’t name: a statue, a mural, a building. Finding out means stopping to search.',
      'Recommendations rarely reflect what you actually loved seeing, and new travelers with no history get nothing useful at all.',
    ],
    built: [
      'A scan pipeline: the image is compressed, classified by MobileNetV2, then sent to GPT-4o Vision with the classifier’s guess and your reverse-geocoded city as context. It returns strict JSON.',
      'A recommendation engine with four modes: cold start (popular places + an onboarding quiz), content match (scan embeddings vs. a destination catalog in Chroma), vibe match (shared vibe tags across your last 10 scans), and history match (your average scan embedding after 5+ scans).',
      'Ratings feed back in: 4–5 stars boost similar places, 1–2 stars suppress them.',
      'A travel journal and a personal scan map: record cards with favorites, ratings, and vibe tags, and pins colored by category.',
    ],
    decisions: [
      'Started from 20 user stories and ranked every feature high, medium, or low. The MVP is scan, recommendations, journal, and maps; friends and a “Travel Wrapped” recap wait.',
      'Every recommendation shows why it’s there (“Because you scanned the Colosseum,” “Matches your vibe: Ancient”), so the system feels transparent and trustworthy.',
      'No empty screens for new users: a 3-step “what excites you about travel?” quiz seeds recommendations before the first scan.',
      'Moved the crowd-predictor map from core to stretch. Prediction data is the riskiest part, so it shouldn’t block the main loop, and when it ships it’ll be labeled an estimate, not a live count.',
    ],
    outcome: [
      'Specced end to end: user stories, ranked features, wireframes, and frontend + backend tasks with hour estimates.',
      'Next up: the core scan flow, then recommendations.',
    ],
    limitations: ['Crowd predictions, the friends map, and social sharing are stretch goals, not part of the MVP.'],
  },

  /* ───────── Neural Speech Decoding ───────── */
  {
    id: 'bci',
    group: 'ds',
    art: 'brain',
    icon: 'wave',
    title: 'Neural Speech Decoding',
    tagline: 'Decoding speech from brain–computer interface recordings, in a 48-hour hackathon.',
    meta: ['Brain-Computer Interface Hackathon', 'Best Engineering Award', 'Oct 2025'],
    specs: [
      { value: '48 hrs', label: 'to build it' },
      { value: '30+', label: 'phonemes decoded' },
      { value: '5', label: 'person team' },
      { value: '100+', label: 'neural channels' },
    ],
    stack: ['Python', 'Gaussian Process Factor Analysis', 'Dynamic Time Warping'],
    tags: ['Neuro', 'Time-Series', 'Python'],
    tint: '#d9ebdf',
    how: [
      { title: 'Spike trains', body: 'Intracortical recordings across 100+ channels.' },
      { title: 'Reduce', body: 'Gaussian Process Factor Analysis compresses them into low-dimensional trajectories.' },
      { title: 'Align', body: 'Dynamic Time Warping separates timing variation from real neural differences.' },
      { title: 'Decode', body: 'Cleaner inputs feed the speech decoder.' },
    ],
    problem: [
      'Decoding speech from the brain means finding patterns in 100+ channels of high-dimensional recordings, where single trials are hard to interpret.',
    ],
    built: [
      'Owned the neural data analysis for our team’s brain–computer interface.',
      'Compressed 100+ channels into low-dimensional trajectories with Gaussian Process Factor Analysis.',
      'Applied Dynamic Time Warping across hundreds of trials and 30+ dimensions to improve the decoder’s inputs.',
    ],
    decisions: ['Delivered the technical analysis while coordinating across a 5-person team, in about 48 hours.'],
    outcome: ['Best Engineering Award.', 'Made single-trial patterns interpretable, and decoded patterns for 30+ phonemes.'],
  },

  /* ───────── Tech Skill Demand Analysis ───────── */
  {
    id: 'skills',
    group: 'ds',
    art: 'jobs',
    icon: 'bars',
    title: 'Tech Skill Demand Analysis',
    tagline: 'What skills actually get you hired? A look at 1.3M LinkedIn job postings.',
    meta: ['Data science project', 'Mar 2026'],
    specs: [
      { value: '1.3M', label: 'postings processed' },
      { value: '82%', label: 'prediction accuracy' },
      { value: '10', label: 'job categories' },
      { value: '25K+', label: 'tech roles kept' },
    ],
    stack: ['Python', 'Pandas', 'NumPy', 'scikit-learn'],
    tags: ['Python', 'Pandas', 'scikit-learn'],
    tint: '#e9e2f5',
    how: [
      { title: 'Collect', body: '1.3M LinkedIn job postings.' },
      { title: 'Filter', body: 'Down to 25,000+ tech-relevant records.' },
      { title: 'Merge', body: 'Combine datasets into skill, seniority, and salary features.' },
      { title: 'Train', body: 'A Random Forest classifier.' },
      { title: 'Predict', body: 'Job category, from skills alone.' },
    ],
    problem: ['Students get plenty of advice about which skills get you hired. I wanted to show them the hiring trends in the data.'],
    built: [
      'A data pipeline that processed 1.3M postings down to 25,000+ tech-relevant records.',
      'Merged datasets to extract skill frequency, seniority, and salary across 10 job categories.',
      'A Random Forest that predicts job category from skill sets alone.',
    ],
    outcome: ['82% accuracy predicting job category from skills alone.'],
  },

  /* ───────── Lung Cancer Risk Prediction ───────── */
  {
    id: 'lung',
    group: 'ds',
    art: 'lungs',
    icon: 'pulse',
    title: 'Lung Cancer Risk Prediction',
    tagline: 'Predictive models and an interactive site for checking your own risk.',
    meta: ['ML project', 'Jun 2025'],
    specs: [
      { value: '300+', label: 'people assessed their risk' },
      { value: '30', label: 'lifestyle variables' },
      { value: '3', label: 'models compared' },
    ],
    stack: ['Python', 'scikit-learn', 'NumPy', 'Seaborn', 'HTML/CSS/JS'],
    tags: ['scikit-learn', 'Python', 'HTML/CSS/JS'],
    tint: '#f3dcd8',
    how: [
      { title: 'Data', body: '30 lifestyle variables.' },
      { title: 'Explore', body: 'EDA and charts in Google Colab.' },
      { title: 'Model', body: 'MLP, logistic regression, and KNN, compared.' },
      { title: 'Ask', body: 'An interactive site with 30+ questions about your habits.' },
      { title: 'Assess', body: 'Your predicted risk level.' },
    ],
    problem: ['Most people don’t know how their everyday habits relate to lung cancer risk.'],
    built: [
      'Predictive models (MLP, logistic regression, KNN) for lung cancer risk level from 30 variables.',
      'Exploratory analysis and charts with NumPy, Matplotlib, and Seaborn.',
      'An interactive HTML/CSS/JS site where people answer 30+ questions about their lifestyle.',
    ],
    outcome: ['300+ people assessed their own risk.', 'A 25% increase in comprehension of health habits.'],
  },
]
