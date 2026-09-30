import { Component, Suspense, lazy, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { sitePath } from './site-path';
import './lanyard.css';
const Lanyard = lazy(() => import('./lanyard'));
function StaticCard() { return <img className="ref-lanyard__static" src={sitePath('/assets/lanyard/card-front.png')} alt="王康桥的个人工牌" />; }
class Boundary extends Component<{children: ReactNode}, {failed: boolean}> {
  state = {failed: false};
  static getDerivedStateFromError() { return {failed: true}; }
  render() { return this.state.failed ? <StaticCard /> : this.props.children; }
}
export default function LanyardBadge({ active = true }: { active?: boolean }) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update(); query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return <div className="ref-lanyard" aria-label="可拖动的个人工牌"><Boundary>{reduced || !active ? <StaticCard /> : <Suspense fallback={<StaticCard />}><div className="ref-lanyard__canvas"><Lanyard /></div></Suspense>}</Boundary></div>;
}
