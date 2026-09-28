import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { sitePath } from './site-path';
import './envelope-intro.css';

type Scene = 'hello' | 'world' | 'push' | 'about';

export default function EnvelopeIntro({ onDone }: { onDone: () => void }) {
  const [scene, setScene] = useState<Scene>('hello');

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const timer = window.setTimeout(onDone, 400);
      return () => { window.clearTimeout(timer); document.body.style.overflow = previous; };
    }
    const timers = [
      window.setTimeout(() => setScene('world'), 1550),
      window.setTimeout(() => setScene('push'), 4050),
      window.setTimeout(() => setScene('about'), 5400),
      window.setTimeout(onDone, 6450),
    ];
    return () => { timers.forEach(window.clearTimeout); document.body.style.overflow = previous; };
  }, [onDone]);

  return <main className={`film-intro film-intro--${scene}`} aria-label="作品集开场动画">
    <button className="film-intro__skip" onClick={onDone}>SKIP <ArrowUpRight size={16} /></button>
    <div className="film-intro__hello" aria-hidden="true">
      <span className="film-intro__hello-line">HELLO</span>
      <small>A PORTFOLIO BY WANG KANGQIAO</small>
    </div>
    <div className="film-intro__world" aria-hidden="true">
      <img src={sitePath('/portfolio/intro-computer.png')} alt="" />
      <span className="film-intro__word">PORTFOLIO</span>
      <span className="film-intro__monitor"><i>WKQ<span>.</span></i><small>2026</small></span>
      <span className="film-intro__world-caption">WANG KANGQIAO / SELECTED WORK</span>
    </div>
    <div className="film-intro__about" aria-hidden="true"><img src={sitePath('/portfolio/about-binder.png')} alt="" /><span>ABOUT ME</span></div>
  </main>;
}
