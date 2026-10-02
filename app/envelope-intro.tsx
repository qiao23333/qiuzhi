import { useEffect, useRef, useState } from 'react';
import { Player } from '@remotion/player';
import type { PlayerRef } from '@remotion/player';
import { IntroFilm, INTRO_FRAMES } from './intro-film';
import './envelope-intro.css';
import { sitePath } from './site-path';
export default function EnvelopeIntro({ onDone, onReveal }: { onDone: () => void; onReveal: () => void }) {
  const player = useRef<PlayerRef>(null);
  const [loaded,setLoaded]=useState(false);
  useEffect(()=>{
    let cancelled=false;
    const assets=['/portfolio/scene/desk.webp','/portfolio/scene/envelope-body.webp','/portfolio/scene/envelope-flap.webp','/portfolio/scene/case-paper.webp','/portfolio/letter-seal.webp'];
    Promise.allSettled(assets.map(src=>{const image=new Image();image.src=sitePath(src);return image.decode();})).then(()=>{if(!cancelled)setLoaded(true);});
    return()=>{cancelled=true;};
  },[]);
  const [size, setSize] = useState(() => ({ width: window.innerWidth, height: window.innerHeight }));
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const resize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') onDone(); };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) onDone();
    const instance = player.current;
    const finishTimer=loaded?window.setTimeout(onDone, (INTRO_FRAMES / 30) * 1000 + 1200):undefined;
    const reveal = ({ detail }: { detail: { frame: number } }) => { if (detail.frame >= 115) onReveal(); };
    instance?.addEventListener('ended', onDone);
    instance?.addEventListener('frameupdate', reveal);
    window.addEventListener('resize', resize);
    window.addEventListener('keydown', escape);
    return () => {
      document.body.style.overflow = previous;
      window.clearTimeout(finishTimer);
      instance?.removeEventListener('ended', onDone);
      instance?.removeEventListener('frameupdate', reveal);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', escape);
    };
  }, [onDone, onReveal,loaded]);
  return <main className="film-intro" aria-label="信封开场动画">
    {loaded && <Player ref={player} component={IntroFilm} durationInFrames={INTRO_FRAMES} fps={30}
      compositionWidth={size.width} compositionHeight={size.height}
      autoPlay controls={false} moveToBeginningWhenEnded={false} clickToPlay={false} doubleClickToFullscreen={false}
      spaceKeyToPlayOrPause={false} style={{ width: '100%', height: '100%' }}
      errorFallback={() => <div className="film-intro__error">王康桥 · 作品集</div>} />}
    <button className="film-intro__skip" onClick={onDone}>跳过 <span>↗</span></button>
  </main>;
}
