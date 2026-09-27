import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import EditorialPortfolio from '../app/editorial-pages';
import EnvelopeIntro from '../app/envelope-intro';
import type { EditorialView } from '../app/editorial-pages';
import '../app/globals.css';
import '../app/editorial.css';

const routeViews: Record<string, EditorialView> = {
  '/about': 'about',
  '/projects': 'projects',
  '/projects/snapsort': 'snapsort',
  '/projects/compliance-guardian': 'compliance-guardian',
  '/projects/xuanlan': 'xuanlan',
  '/projects/aoda': 'aoda',
  '/contact': 'contact',
};

const path = window.location.pathname.replace(/\/+$/, '') || '/';

function App() {
  const [intro, setIntro] = useState(path === '/');
  const done = () => { window.history.replaceState(null, '', '/about'); setIntro(false); };
  if (intro) return <><div inert><EditorialPortfolio view="about" /></div><EnvelopeIntro onDone={done} /></>;
  return <EditorialPortfolio view={routeViews[path] ?? 'about'} />;
}

createRoot(document.getElementById('root')!).render(<App />);
