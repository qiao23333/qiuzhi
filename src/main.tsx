import { lazy, Suspense, useCallback, useState } from 'react';
import { createRoot } from 'react-dom/client';
import EditorialPortfolio from '../app/editorial-pages';
const EnvelopeIntro = lazy(() => import('../app/envelope-intro'));
import type { EditorialView } from '../app/editorial-pages';
import { currentRoute, sitePath } from '../app/site-path';
import '../app/globals.css';
import '../app/editorial.css';
import '../app/about-reference.css';
import '../app/case-reference.css';
import '../app/portfolio-refinement.css';

const routeViews: Record<string, EditorialView> = {
  '/about': 'about',
  '/projects': 'projects',
  '/projects/snapsort': 'snapsort',
  '/projects/compliance-guardian': 'compliance-guardian',
  '/projects/xuanlan': 'xuanlan',
  '/projects/aoda': 'aoda',
  '/contact': 'contact',
};

const path = currentRoute();

function App() {
  const [intro, setIntro] = useState(path === '/');
  const [effects, setEffects] = useState(path !== '/');
  const reveal = useCallback(() => setEffects(true), []);
  const done = useCallback(() => { window.history.replaceState(null, '', sitePath('/about')); setEffects(true); setIntro(false); }, []);
  return <><div inert={intro || undefined}><EditorialPortfolio view={routeViews[path] ?? 'about'} effects={effects} /></div>{intro && <Suspense fallback={<div className="intro-loading"><button onClick={done}>跳过 ↗</button></div>}><EnvelopeIntro onDone={done} onReveal={reveal} /></Suspense>}</>;
}

createRoot(document.getElementById('root')!).render(<App />);
