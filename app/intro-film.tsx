import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import type { CSSProperties } from 'react';
import { sitePath } from './site-path';
export const INTRO_FRAMES = 204;
const opts = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(.22, 1, .36, 1) } as const;
export function IntroFilm() {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  const fit = Math.min(width / (portrait ? 920 : 1300), height / (portrait ? 1150 : 860));
  const open = interpolate(f, [49, 91], [0, 178], opts);
  const pull = interpolate(f, [87, 137], [0, 278], opts);
  const push = interpolate(f, [143, 190], [0, 1], opts);
  const finalScale = Math.max(width / (690 * fit), height / (406 * fit)) * 1.18;
  const top = height * .56 - 220 * fit;
  const translate = (height / 2 - (top - 57 * fit)) * push;
  const envelopeStyle: CSSProperties = {
    position: 'absolute', width: 760, height: 440, left: width / 2 - 380, top,
    transformOrigin: '50% -57px', transformStyle:'preserve-3d',
    transform: `translateY(${translate + interpolate(f, [0, 43], [54, 0], opts)}px) scale(${fit * (1 + push * (finalScale - 1))}) perspective(1800px) rotateX(${interpolate(f,[0,50,138,190],[27,12,0,0],opts)}deg) rotateY(${interpolate(f,[0,110,175],[-15,4,0],opts)}deg) rotate(${interpolate(f, [0, 132], [-13, 0], opts)}deg)`,
    opacity: interpolate(f, [0, 21], [0, 1], opts),
  };
  return <AbsoluteFill className="letter-film" data-frame={f} style={{ opacity: interpolate(f, [187, 203], [1, 0], opts) }}>
    <img className="letter-film__desk" src={sitePath('/portfolio/scene/desk.webp')} alt="" style={{transform:`scale(${interpolate(f,[0,110,187],[1.12,1.02,1],opts)})`}}/>
    <div className="letter-film__light" style={{ transform: `translateX(${interpolate(f, [0, 180], [-5, 9], opts)}%)` }} />
    <div className="letter-film__caption" style={{ opacity: interpolate(f, [0, 26, 125, 150], [0, .7, .7, 0], opts) }}><span>WANG KANGQIAO</span><span>PORTFOLIO — 2026</span></div>
    <div style={envelopeStyle}>
      <img className="letter-film__body-image letter-film__back-image" src={sitePath('/portfolio/scene/envelope-body.webp')} alt="" style={{ opacity: interpolate(f, [155, 178], [1, 0], opts) }} />
      <div className="letter-film__flap" style={{ transform: `perspective(1400px) rotateX(${-open}deg)`, zIndex: open < 90 ? 6 : 1 }}>
        <img className="letter-film__flap-image" src={sitePath('/portfolio/scene/envelope-flap.webp')} alt=""/>
      </div>
      <div className="letter-film__paper" style={{ transform: `translateY(${-pull}px)`, zIndex: f > 136 ? 9 : 2 }}>
        <div className="letter-film__paper-rule" /><div className="letter-film__paper-meta">PERSONAL PORTFOLIO<span>NO. 001</span></div>
        <div className="letter-film__paper-title" style={{ opacity: interpolate(f, [157, 185], [1, 0], opts) }}>Hello<span>.</span><small>王康桥 / WANG KANGQIAO</small></div>
        <span className="letter-film__paper-footer" style={{ opacity: 1 - push }}>CONTENT · PRODUCT · AI</span><div className="letter-film__grain" />
      </div>
      <img className="letter-film__body-image letter-film__front-image" src={sitePath('/portfolio/scene/envelope-body.webp')} alt="" style={{ opacity: interpolate(f, [151, 178], [1, 0], opts) }}/>
      <div className="letter-film__seal" style={{ opacity: interpolate(f, [41, 64], [1, 0], opts), transform: `translateY(${interpolate(f, [35, 68], [0, -55], opts)}px) scale(${interpolate(f, [35, 68], [1, 1.28], opts)}) rotate(${interpolate(f, [35, 68], [-8, 12], opts)}deg)` }}>
        <img src={sitePath('/portfolio/letter-seal.webp')} alt="" /><div className="letter-film__seal-glint" style={{ transform: `translateX(${interpolate(f, [16, 43], [-130, 180], opts)}%) rotate(30deg)` }} />
      </div>
    </div><div className="letter-film__vignette" style={{ opacity: 1 - push }} />
  </AbsoluteFill>;
}
