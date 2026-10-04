import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Copy, Check, Phone, Mail, CornerDownLeft, CornerDownRight } from 'lucide-react';
import { sitePath } from './site-path';
export default function DeskContact() {
  const [phone,setPhone]=useState(false),[mail,setMail]=useState(false),[hover,setHover]=useState<'phone'|'mail'|null>(null),[copied,setCopied]=useState(false);
  const phoneOpen=phone || hover==='phone',mailOpen=mail || hover==='mail';
  const leaveTimer=useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(()=>()=>clearTimeout(leaveTimer.current),[]);
  const enter=(target:'phone'|'mail')=>{clearTimeout(leaveTimer.current);if(matchMedia('(hover:hover)').matches)setHover(target);};
  const leave=()=>{leaveTimer.current=setTimeout(()=>setHover(null),220);};
  const copy=async()=>{try{await navigator.clipboard.writeText('1162393961@qq.com');setCopied(true);setTimeout(()=>setCopied(false),1800);}catch{location.href='mailto:1162393961@qq.com';}};
  return <section className={`desk-contact theatre-contact ${phoneOpen?'phone-open':''} ${mailOpen?'mail-open':''}`}>
    <span className="theatre-contact__year">2026</span>
    <div className="desk-phone" onMouseEnter={()=>enter('phone')} onMouseLeave={leave}>
      <button className="desk-phone__object" onClick={()=>{clearTimeout(leaveTimer.current);setPhone(!phone);setHover(null);}} aria-label={phoneOpen?'关闭电话亭':'打开电话亭'} aria-pressed={phoneOpen}>
        <span className="desk-phone__geometry"><img className="desk-phone__body" src={sitePath('/portfolio/scene/phone-body.webp')} alt="红色电话亭"/><span className="desk-phone__door"><img src={sitePath('/portfolio/scene/phone-door.webp')} alt=""/></span></span>
      </button>
      <a className="desk-phone__number" href="tel:+8619328749431" aria-label="电话 19328749431"><span className="contact-lettering contact-lettering--hand" aria-hidden="true"><small><Phone size={26}/> Telephone</small><strong>19328749431</strong></span><span className="contact-lettering contact-lettering--raised" aria-hidden="true"><small>Telephone</small><strong>19328749431</strong></span><CornerDownLeft className="contact-direction" size={40}/></a>
    </div>
    <div className="desk-mail" onMouseEnter={()=>enter('mail')} onMouseLeave={leave}>
      <button className="desk-mail__object" onClick={()=>{clearTimeout(leaveTimer.current);setMail(!mail);setHover(null);}} aria-pressed={mailOpen} aria-label={mailOpen?'关闭邮箱':'打开邮箱'}><img className="desk-mail__closed" src={sitePath('/portfolio/scene/mail-closed.webp')} alt="红色邮箱"/><img className="desk-mail__open" src={sitePath('/portfolio/scene/mail-open.webp')} alt=""/></button>
      <div className="desk-mail__address"><a className="contact-email" href="mailto:1162393961@qq.com" aria-label="邮箱 1162393961@qq.com"><span className="contact-lettering contact-lettering--hand" aria-hidden="true"><span>Email <Mail size={28}/></span><strong>1162393961@qq.com</strong></span><span className="contact-lettering contact-lettering--raised" aria-hidden="true"><span>Email</span><strong>1162393961@qq.com</strong></span></a><CornerDownRight className="contact-direction" size={38}/>{mailOpen&&<button className="contact-copy" onClick={copy} aria-label="复制邮箱">{copied?<Check size={18}/>:<Copy size={18}/>}</button>}</div>
    </div>
    <div className="desk-contact__elsewhere"><a href="https://github.com/qiao23333" target="_blank" rel="noreferrer"><img src={sitePath('/assets/github.svg')} alt=""/><span>GitHub</span><ArrowUpRight size={14}/></a><a href="https://qiaozt.pages.dev/" target="_blank" rel="noreferrer"><b>B</b><span>Blog</span><ArrowUpRight size={14}/></a></div>
  </section>;
}

