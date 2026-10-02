import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { sitePath } from './site-path';

export default function DeskContact() {
  const [phone,setPhone]=useState(false);
  const [mail,setMail]=useState(false);
  const [hover,setHover]=useState<'phone'|'mail'|null>(null);
  const [copied,setCopied]=useState(false);
  const phoneOpen=phone || hover==='phone';
  const mailOpen=mail || hover==='mail';
  const leaveTimer=useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(()=>()=>clearTimeout(leaveTimer.current),[]);
  const enter=(target:'phone'|'mail')=>{clearTimeout(leaveTimer.current);if(matchMedia('(hover:hover)').matches)setHover(target);};
  const leave=()=>{leaveTimer.current=setTimeout(()=>setHover(null),250);};
  const copy=async()=>{try{await navigator.clipboard.writeText('1162393961@qq.com');setCopied(true);setTimeout(()=>setCopied(false),1800);}catch{location.href='mailto:1162393961@qq.com';}};
  return <section className={`desk-contact ${phoneOpen?'phone-open':''} ${mailOpen?'mail-open':''}`}>
    <div className="desk-phone" onMouseEnter={()=>enter('phone')} onMouseLeave={leave}>
      <button className="desk-phone__object" onClick={()=>{setPhone(!phone);setHover(null);}} aria-label={phoneOpen?'关闭电话亭':'打开电话亭'} aria-pressed={phoneOpen}>
        <span className="desk-phone__geometry"><img className="desk-phone__body" src={sitePath('/portfolio/scene/phone-body.webp')} alt="红色电话亭"/><span className="desk-phone__door"><img src={sitePath('/portfolio/scene/phone-door.webp')} alt=""/></span></span>
      </button>
      <a className="desk-phone__number" href="tel:+8619328749431" tabIndex={phoneOpen?0:-1} aria-hidden={!phoneOpen}><small>TELEPHONE</small><strong>19328749431</strong></a>
      <img className="desk-phone__rays" src={sitePath('/portfolio/scene/contact-rays.webp')} alt=""/>
    </div>
    <div className="desk-mail" onMouseEnter={()=>enter('mail')} onMouseLeave={leave}>
      <button className="desk-mail__object" onClick={()=>{setMail(!mail);setHover(null);}} aria-pressed={mailOpen} aria-label={mailOpen?'关闭邮箱':'打开邮箱'}><img className="desk-mail__closed" src={sitePath('/portfolio/scene/mail-closed.webp')} alt="红色邮箱"/><img className="desk-mail__open" src={sitePath('/portfolio/scene/mail-open.webp')} alt=""/></button>
      <div className="desk-mail__address"><span>Email</span><a href="mailto:1162393961@qq.com"><span>1162393961</span><span>@qq.com</span></a>{mailOpen&&<button onClick={copy} aria-label="复制邮箱">{copied?<Check size={18}/>:<Copy size={18}/>}</button>}</div>
    </div>
    <div className="desk-contact__elsewhere"><a href="https://github.com/qiao23333" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15}/></a><a href="https://qiaozt.pages.dev/" target="_blank" rel="noreferrer">Blog <ArrowUpRight size={15}/></a></div>
  </section>;
}
