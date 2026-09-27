import { createRoot } from 'react-dom/client';
import EditorialPortfolio from '../app/editorial-pages';
import type { EditorialView } from '../app/editorial-pages';
import '../app/globals.css';
import '../app/editorial.css';

const routeViews: Record<string, EditorialView> = {
  '/': 'about',
  '/about': 'about',
  '/projects': 'projects',
  '/projects/snapsort': 'snapsort',
  '/projects/compliance-guardian': 'compliance-guardian',
  '/projects/xuanlan': 'xuanlan',
  '/projects/aoda': 'aoda',
  '/contact': 'contact',
};

const path = window.location.pathname.replace(/\/+$/, '') || '/';
createRoot(document.getElementById('root')!).render(<EditorialPortfolio view={routeViews[path] ?? 'about'} />);
