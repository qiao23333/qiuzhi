import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './envelope-intro.css';

type Phase = 'closed' | 'open' | 'expand' | 'exit';

function LetterFace() {
  return <div className="envelope-intro__letter-face">
    <div className="envelope-intro__letter-top"><span>PERSONNEL FILE</span><span>NO. 2026—WKQ</span></div>
    <div className="envelope-intro__letter-center"><small>ABOUT ME</small><strong>王康桥<span>.</span></strong><em>WANG KANGQIAO</em></div>
    <div className="envelope-intro__letter-bottom">CONTENT　/　PRODUCT　/　AI</div>
  </div>;
}

export default function EnvelopeIntro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>('closed');
  const [origin, setOrigin] = useState<CSSProperties>({});
  const letter = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<Phase>('closed');
  const update = (next: Phase) => { phaseRef.current = next; setPhase(next); };

  const expand = () => {
    if (phaseRef.current === 'expand') return;
    const rect = letter.current?.getBoundingClientRect();
    if (rect) setOrigin({
      '--letter-left': `${rect.left}px`,
      '--letter-top': `${rect.top}px`,
      '--letter-width': `${rect.width}px`,
      '--letter-height': `${rect.height}px`,
    } as CSSProperties);
    update('expand');
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const first = window.setTimeout(() => update('open'), 1050);
    const second = window.setTimeout(expand, 3150);
    const third = window.setTimeout(() => update('exit'), 4350);
    const fourth = window.setTimeout(onDone, 4950);
    return () => { window.clearTimeout(first); window.clearTimeout(second); window.clearTimeout(third); window.clearTimeout(fourth); };
  }, []);

  const activate = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { onDone(); return; }
    if (phaseRef.current === 'closed') update('open');
    else if (phaseRef.current === 'open') expand();
  };

  return <main className={`envelope-intro is-${phase === 'exit' ? 'expand is-exit' : phase}`}>
    <div className="envelope-intro__header"><span>WKQ<span>.</span></span><button onClick={onDone}>SKIP <ArrowUpRight size={14} /></button></div>
    <div className="envelope-intro__halo" aria-hidden="true" />
    <div className="envelope-intro__quill" aria-hidden="true"><i /><i /><i /></div>
    <div className="envelope-intro__scene">
      <div className="envelope-intro__edition" aria-hidden="true"><span>PORTFOLIO</span><span>VOL. 01 / 2026</span></div>
      <button className="envelope-intro__envelope" onClick={activate} aria-label={phase === 'closed' ? '打开信封，进入个人介绍' : '进入个人介绍'}>
        <span className="envelope-intro__back" />
        <span className="envelope-intro__letter" ref={letter}><LetterFace /></span>
        <span className="envelope-intro__front" />
        <span className="envelope-intro__flap" />
        <span className="envelope-intro__seal"><b>W</b></span>
      </button>
      <span className="envelope-intro__scene-note">WANG KANGQIAO <span>·</span> 2026</span>
    </div>
    <div className="envelope-intro__footer"><span>AN INTRODUCTION</span><span>{phase === 'closed' ? '01 / 04' : phase === 'open' ? '02 / 04' : '03 / 04'}</span></div>
    {(phase === 'expand' || phase === 'exit') && <div className="envelope-intro__expanding-letter" style={origin} aria-hidden="true"><LetterFace /></div>}
  </main>;
}
