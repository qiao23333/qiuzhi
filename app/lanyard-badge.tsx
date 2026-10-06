import { Component, Suspense, lazy, useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { sitePath } from './site-path';
import './lanyard.css';
const loadLanyard = () => import('./lanyard');
const Lanyard = lazy(loadLanyard);
function StaticCard({hidden=false}: {hidden?:boolean}) { return <img className={`ref-lanyard__static ${hidden?'is-hidden':''}`} src={sitePath('/assets/lanyard/card-front.png')} alt={hidden?'':'王康桥的个人工牌'} aria-hidden={hidden || undefined} />; }
class Boundary extends Component<{children: ReactNode}, {failed: boolean}> {
  state = {failed: false};
  static getDerivedStateFromError() { return {failed: true}; }
  render() { return this.state.failed ? <StaticCard /> : this.props.children; }
}
export default function LanyardBadge({ active = true }: { active?: boolean }) {
  const [reduced, setReduced] = useState(false);
  const [ready,setReady]=useState(false);
  const onReady=useCallback(()=>setReady(true),[]);
  useEffect(()=>{if(!active || reduced)setReady(false);},[active,reduced]);
  useEffect(()=>{loadLanyard().catch(()=>{});},[]);
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update(); query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return <div className="ref-lanyard" aria-label="可拖动的个人工牌"><Boundary>{reduced || !active ? <StaticCard /> : <Suspense fallback={<StaticCard />}><><div className={`ref-lanyard__canvas ${ready ? 'is-ready' : ''}`}><Lanyard onReady={onReady} /></div><StaticCard hidden={ready}/></></Suspense>}</Boundary></div>;
}
