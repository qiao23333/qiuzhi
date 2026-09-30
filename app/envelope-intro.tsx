import { useEffect, useRef, useState } from 'react';
import { Player } from '@remotion/player';
import type { PlayerRef } from '@remotion/player';
import { IntroFilm, INTRO_FRAMES } from './intro-film';
import './envelope-intro.css';
export default function EnvelopeIntro({ onDone, onReveal }: { onDone: () => void; onReveal: () => void }) {
  const player = useRef<PlayerRef>(null);
  const [size, setSize] = useState(() => ({ width: window.innerWidth, height: window.innerHeight }));
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const resize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') onDone(); };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) onDone();
    const instance = player.current;
    const reveal = ({ detail }: { detail: { frame: number } }) => { if (detail.frame >= 177) onReveal(); };
    instance?.addEventListener('ended', onDone);
    instance?.addEventListener('frameupdate', reveal);
    window.addEventListener('resize', resize);
    window.addEventListener('keydown', escape);
    return () => {
      document.body.style.overflow = previous;
      instance?.removeEventListener('ended', onDone);
      instance?.removeEventListener('frameupdate', reveal);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', escape);
    };
  }, [onDone, onReveal]);
  return <main className="film-intro" aria-label="信封开场动画">
    <Player ref={player} component={IntroFilm} durationInFrames={INTRO_FRAMES} fps={30}
      compositionWidth={size.width} compositionHeight={size.height}
      autoPlay controls={false} moveToBeginningWhenEnded={false} clickToPlay={false} doubleClickToFullscreen={false}
      spaceKeyToPlayOrPause={false} style={{ width: '100%', height: '100%' }}
      errorFallback={() => <div className="film-intro__error">王康桥 · 作品集</div>} />
    <button className="film-intro__skip" onClick={onDone}>跳过 <span>↗</span></button>
  </main>;
}
