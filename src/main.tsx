import { lazy, Suspense, useCallback, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import EditorialPortfolio from '../app/editorial-pages';
const EnvelopeIntro = lazy(() => import('../app/envelope-intro'));
import type { EditorialView } from '../app/editorial-pages';
import { currentRoute, sitePath } from '../app/site-path';
import '../app/desk-scene.css';
import '../app/theatre-contact.css';

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
  const [route,setRoute] = useState(path);
  useEffect(() => {
    const update=()=>{setRoute(currentRoute());window.scrollTo(0,0);};
    const navigate=(e: MouseEvent)=>{const a=(e.target as Element).closest('a');if(!a || a.target || a.hasAttribute('download') || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button!==0)return;const u=new URL(a.href);if(u.origin!==location.origin || !u.pathname.startsWith(sitePath('/')))return;e.preventDefault();const apply=()=>{history.pushState(null,'',u.pathname+u.search+u.hash);update();};if('startViewTransition' in document && !matchMedia('(prefers-reduced-motion: reduce)').matches)(document as any).startViewTransition(apply);else apply();};
    document.addEventListener('click',navigate);window.addEventListener('popstate',update);return()=>{document.removeEventListener('click',navigate);window.removeEventListener('popstate',update);};
  }, []);
  const reveal = useCallback(() => setEffects(true), []);
  const done = useCallback(() => { window.history.replaceState(null, '', sitePath('/about')); setEffects(true); setRoute('/about'); setIntro(false); }, []);
  return <><div inert={intro || undefined}><EditorialPortfolio view={routeViews[route] ?? 'about'} effects={effects} /></div>{intro && <Suspense fallback={<div className="intro-loading"><button onClick={done}>跳过 ↗</button></div>}><EnvelopeIntro onDone={done} onReveal={reveal} /></Suspense>}</>;
}

createRoot(document.getElementById('root')!).render(<App />);
