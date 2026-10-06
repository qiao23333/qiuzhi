import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import type { CSSProperties } from 'react';
import { sitePath } from './site-path';
export const INTRO_FRAMES = 266;
const opts = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(.22, 1, .36, 1) } as const;
export function IntroFilm() {
  const frame=useCurrentFrame(),f=Math.max(0,frame-30),{width,height}=useVideoConfig();
  const lift=interpolate(frame,[18,65],[0,1],opts);
  const portrait=height>width;
  const fit=Math.min(width/(portrait?900:1250),height/(portrait?1150:900));
  const open=interpolate(f,[52,100],[0,176],{...opts,easing:Easing.bezier(.42,0,.2,1)}),pull=interpolate(f,[102,153],[0,350],opts),push=interpolate(f,[150,194],[0,1],opts);
  const bookWidth=Math.min(width*.94,(height-130)*1.938);
  const navHeight=width<=720?65:76;
  const bookCenter=height/2+navHeight/2-12;
  const finalScale=portrait?1.3:bookWidth/(650*fit);
  const top=height*.53-180*fit;
  // Follow the emerging sheet, then align its centre and aspect ratio with About's book.
  const paperCenter=22+335/2-350;
  const translate=pull*.12*fit*(1-push)+(bookCenter-(top+paperCenter*fit))*push;
  const envelopeStyle:CSSProperties={position:'absolute',width:760,height:427.44,left:width/2-380,top,transformOrigin:`50% ${paperCenter}px`,
    transform:`translateY(${translate+(1-lift)*95*fit}px) scale(${fit*interpolate(f,[0,100,150,194],[.88,1,1,finalScale],opts)}) perspective(1800px) rotateY(${interpolate(f,[0,100,194],[-7,0,0],opts)}deg) rotate(${interpolate(f,[0,150,194],[-6,-2,-.7],opts)}deg)`,opacity:interpolate(frame,[0,12],[0,1],opts)};
  const paperOpacity=interpolate(f,[182,194],[1,0],opts);
  return <AbsoluteFill className="letter-film" data-frame={f} style={{opacity:interpolate(f,[196,235],[1,0],opts)}}>
    <img className="letter-film__desk" src={sitePath('/portfolio/scene/desk.webp')} alt="" style={{transform:`scale(${interpolate(f,[0,100,194],[1.14,1.045,1],opts)})`}}/>
    <div className="letter-film__caption" style={{opacity:interpolate(f,[0,28,130,155],[0,.7,.7,0],opts)}}><span>WANG KANGQIAO</span><span>PORTFOLIO — 2026</span></div>
    <div className="letter-envelope__ground" style={{position:'absolute',left:width/2-365*fit,top:top+340*fit,width:730*fit,height:55*fit,background:'#140805',borderRadius:'50%',filter:`blur(${8+lift*14}px)`,opacity:interpolate(frame,[0,12,65,152,178],[0,.55,.22,.22,0],opts),transform:`scale(${1-lift*.12},${1+lift*.5})`}}/>
    <div style={envelopeStyle}><div style={{position:'absolute',inset:0,transformOrigin:'50% 213px',transform:`perspective(1800px) rotateX(${(1-lift)*68}deg)`,transformStyle:'preserve-3d'}}>
      <div className="letter-envelope__back" style={{opacity:interpolate(f,[152,178],[1,0],opts)}}><img src={sitePath('/portfolio/scene/envelope-v2-body.png')} alt=""/></div>
      <div className="letter-envelope__flap" style={{transform:`perspective(1800px) rotateX(${-open}deg)`,zIndex:open<90?5:1,opacity:interpolate(f,[152,178],[1,0],opts)}}><div className="letter-envelope__flap-face"><img src={sitePath('/portfolio/scene/envelope-v2-flap.png')} alt="" style={{filter:`brightness(${interpolate(open,[0,90,176],[1,.84,.94])})`}}/></div></div>
      <div className="letter-film__paper" style={{transform:`translateY(${-pull}px)`,clipPath:`inset(0 0 ${Math.max(0,45-pull)}px 0)`,zIndex:2,opacity:paperOpacity}}>
        <img className="letter-film__sheet-texture" src={sitePath('/portfolio/scene/case-paper.webp')} alt=""/>
        <div className="letter-film__paper-meta" style={{opacity:1-push}}>PERSONAL PORTFOLIO<span>NO. 001</span></div>
        <div className="letter-film__paper-title" style={{opacity:interpolate(f,[140,173],[1,0],opts)}}>Hello<span>.</span><small>王康桥 / WANG KANGQIAO</small></div>
        <span className="letter-film__paper-footer" style={{opacity:1-push}}>CONTENT · PRODUCT · AI</span>
      </div>
      <div className="letter-envelope__pocket" style={{opacity:interpolate(f,[152,178],[1,0],opts)}}><img src={sitePath('/portfolio/scene/envelope-v2-body.png')} alt=""/></div>
      <div className="letter-envelope__seal" style={{opacity:interpolate(f,[40,56],[1,0],opts),transform:`translateY(${interpolate(f,[38,58],[0,-12],opts)}px) scale(${interpolate(f,[38,58],[1,1.06],opts)})`}}><img src={sitePath('/portfolio/letter-seal.webp')} alt=""/></div>
    </div></div>
    {!portrait && <img className="letter-film__binder" src={sitePath('/portfolio/scene/binder.webp')} alt="" style={{position:'absolute',left:'50%',top:bookCenter,width:bookWidth,height:bookWidth/1.938,transform:'translate(-50%,-50%) rotate(-.7deg)',opacity:interpolate(f,[182,194],[0,1],opts),filter:'drop-shadow(0 20px 22px #0008)'}}/>}
  </AbsoluteFill>;
}



