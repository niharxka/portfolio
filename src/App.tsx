import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import { Background } from './components/Background'
import { Intro } from './components/Intro'
import { Main } from './components/Main'
import { ProjectPage } from './components/ProjectPage'

/* Routes (hash-based, so it works on any static host):
   ''                  → intro, then the main page
   #/projects/<id>     → a project's deep-dive page
   #/home              → main page (skips the intro), scrolled to Projects
   #/home/<id>         → main page, scrolled to that project card
   #/home/chat         → main page, scrolled to the chat terminal */

function useHash() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return [hash, setHash] as const
}

export default function App() {
  const [hash, setHash] = useHash()
  const [entered, setEntered] = useState(false)
  const [showMain, setShowMain] = useState(false)
  const [target, setTarget] = useState<string | undefined>()

  useEffect(() => {
    console.log(
      '%cHi, curious one ✿ Try typing my first name on the intro screen.',
      'font: 600 14px "Inter Tight", sans-serif; color: #7a5bc4; background: #fbe1ea; padding: 6px 10px; border-radius: 8px;',
    )
  }, [])

  const replay = () => {
    history.replaceState(null, '', window.location.pathname + window.location.search)
    setHash('')
    window.scrollTo({ top: 0, behavior: 'instant' })
    setTarget(undefined)
    setShowMain(false)
    setEntered(false)
  }

  const projectId = hash.match(/^#\/projects\/([\w-]+)/)?.[1]
  const home = hash.match(/^#\/home(?:\/([\w-]+))?/)

  let page
  if (projectId) {
    page = <ProjectPage id={projectId} />
  } else if (home) {
    const t = home[1]
    page = <Main key={hash} onReplay={replay} target={t === 'chat' ? 'chat' : t ? `project-${t}` : 'projects'} />
  } else {
    page = (
      <>
        <AnimatePresence onExitComplete={() => setShowMain(true)}>
          {!entered && (
            <Intro
              key="intro"
              onEnter={(t) => {
                setTarget(t)
                setEntered(true)
              }}
            />
          )}
        </AnimatePresence>
        {showMain && <Main onReplay={replay} target={target} />}
      </>
    )
  }

  return (
    <MotionConfig reducedMotion="user">
      <Background />
      {page}
    </MotionConfig>
  )
}
