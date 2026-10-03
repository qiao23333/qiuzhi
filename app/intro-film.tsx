import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import type { CSSProperties } from 'react';
import { sitePath } from './site-path';
export const INTRO_FRAMES = 236;
const opts = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(.22, 1, .36, 1) } as const;
export function IntroFilm() {
  const f=useCurrentFrame(),{width,height}=useVideoConfig();
  const portrait=height>width;
  const fit=Math.min(width/(portrait?900:1250),height/(portrait?1150:820));
  const open=interpolate(f,[50,99],[0,164],opts),pull=interpolate(f,[91,145],[0,278],opts),push=interpolate(f,[146,194],[0,1],opts);
  const bookWidth=Math.min(width*.94,(height-130)*1.938);
  const navHeight=width<=720?65:width>=1024 && height>=650 && height<=850?68:76;
  const bookCenter=height/2+navHeight/2-12;
  const finalScale=portrait?1.3:bookWidth/(650*fit);
  const top=height*.56-220*fit;
  const translate=(bookCenter-(top-68*fit))*push;
  const envelopeStyle:CSSProperties={position:'absolute',width:760,height:440,left:width/2-380,top,transformOrigin:'50% -68px',transformStyle:'preserve-3d',
    transform:`translateY(${translate+interpolate(f,[0,45],[38,0],opts)}px) scale(${fit*(1+push*(finalScale-1))}) perspective(1800px) rotateX(${interpolate(f,[0,55,145,194],[18,7,0,0],opts)}deg) rotateY(${interpolate(f,[0,100,194],[-9,2,0],opts)}deg) rotate(${interpolate(f,[0,145,194],[-9,-3,-.7],opts)}deg)`,opacity:interpolate(f,[0,24],[0,1],opts)};
  const paperOpacity=interpolate(f,[184,194],[1,0],opts);
  return <AbsoluteFill className="letter-film" data-frame={f} style={{opacity:interpolate(f,[196,235],[1,0],opts)}}>
    <img className="letter-film__desk" src={sitePath('/portfolio/scene/desk.webp')} alt="" style={{transform:`scale(${interpolate(f,[0,145,194],[1.065,1.025,1],opts)})`}}/>
    <div className="letter-film__caption" style={{opacity:interpolate(f,[0,28,130,155],[0,.7,.7,0],opts)}}><span>WANG KANGQIAO</span><span>PORTFOLIO — 2026</span></div>
    <div style={envelopeStyle}>
      <img className="letter-film__body-image letter-film__back-image" src={sitePath('/portfolio/scene/envelope-body.webp')} alt="" style={{opacity:interpolate(f,[152,178],[1,0],opts)}}/>
      <div className="letter-film__flap" style={{transform:`perspective(1400px) rotateX(${-open}deg)`,zIndex:open<90?6:1,opacity:interpolate(f,[152,178],[1,0],opts)}}><img className="letter-film__flap-image" src={sitePath('/portfolio/scene/envelope-flap.webp')} alt=""/></div>
      <div className="letter-film__paper" style={{transform:`translateY(${-pull}px)`,zIndex:f>143?9:2,opacity:paperOpacity}}>
        <div className="letter-film__paper-meta">PERSONAL PORTFOLIO<span>NO. 001</span></div>
        <div className="letter-film__paper-title" style={{opacity:interpolate(f,[140,173],[1,0],opts)}}>Hello<span>.</span><small>王康桥 / WANG KANGQIAO</small></div>
        <span className="letter-film__paper-footer" style={{opacity:1-push}}>CONTENT · PRODUCT · AI</span><div className="letter-film__grain"/>
      </div>
      <img className="letter-film__body-image letter-film__front-image" src={sitePath('/portfolio/scene/envelope-body.webp')} alt="" style={{opacity:interpolate(f,[152,178],[1,0],opts)}}/>
      <div className="letter-film__seal" style={{opacity:interpolate(f,[42,66],[1,0],opts),transform:`translateY(${interpolate(f,[38,70],[0,-35],opts)}px) scale(${interpolate(f,[38,70],[1,1.15],opts)}) rotate(-8deg)`}}><img src={sitePath('/portfolio/letter-seal.webp')} alt=""/></div>
    </div>
    {!portrait && <img className="letter-film__binder" src={sitePath('/portfolio/scene/binder.webp')} alt="" style={{position:'absolute',left:'50%',top:bookCenter,width:bookWidth,height:bookWidth/1.938,transform:'translate(-50%,-50%) rotate(-.7deg)',opacity:interpolate(f,[164,184],[0,1],opts),filter:'drop-shadow(0 20px 22px #0008)'}}/>}
  </AbsoluteFill>;
}
