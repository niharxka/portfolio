# Niharika Sapre: Portfolio

My personal site: an animated intro with an interactive desk, a timeline of my experience, deep dives into my projects, and a terminal you can use to chat with me.

**Live:** https://niharika-sapre.vercel.app

## Stack

React 19 · TypeScript · Vite · Motion · hand-drawn SVG illustrations · deployed on Vercel

## Run it locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
```

## Where things live

| Path | What's there |
|---|---|
| `src/content.ts` | All the copy: fun facts, desk popups, experiences, about me, contact, chat terminal answers |
| `src/projects.ts` | Project cards and their deep-dive pages |
| `src/components/` | Intro, desk scene, main page sections, project pages, chat terminal, illustrations |
| `public/` | Photos, project screenshots, headshot |

Routes are hash-based (`#/projects/<id>`, `#/home`), so the site works on any static host with no rewrites.
