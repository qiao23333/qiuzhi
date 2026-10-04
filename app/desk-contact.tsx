import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Phone, Mail, BookOpen, CornerDownLeft, CornerDownRight } from 'lucide-react';
import { sitePath } from './site-path';
import PhoneDoor from './phone-door';
export default function DeskContact() {
  const [phone,setPhone]=useState(false),[mail,setMail]=useState(false),[hover,setHover]=useState<'phone'|'mail'|null>(null),[copied,setCopied]=useState<'phone'|'mail'|null>(null),[status,setStatus]=useState('');
  const phoneOpen=phone || hover==='phone',mailOpen=mail || hover==='mail';
  const leaveTimer=useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const copyTimer=useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(()=>()=>{clearTimeout(leaveTimer.current);clearTimeout(copyTimer.current);},[]);
  const enter=(target:'phone'|'mail')=>{clearTimeout(leaveTimer.current);if(matchMedia('(hover:hover)').matches)setHover(target);};
  const leave=()=>{leaveTimer.current=setTimeout(()=>setHover(null),220);};
  const copy=async(target:'phone'|'mail')=>{
    const value=target==='phone'?'19328749431':'1162393961@qq.com';
    try{await navigator.clipboard.writeText(value);}catch{
      const field=document.createElement('textarea');field.value=value;field.style.cssText='position:fixed;left:-9999px';document.body.append(field);field.select();const success=document.execCommand('copy');field.remove();if(!success){setStatus('复制未完成，请选择号码或邮箱手动复制');return;}
    }
    clearTimeout(copyTimer.current);setCopied(target);setStatus(target==='phone'?'电话号码已复制':'邮箱已复制');copyTimer.current=setTimeout(()=>{setCopied(null);setStatus('');},1600);
  };
  return <section className={`desk-contact theatre-contact ${phoneOpen?'phone-open':''} ${mailOpen?'mail-open':''}`}>
    <span className="theatre-contact__year">2026</span>
    <div className="desk-phone" onMouseEnter={()=>enter('phone')} onMouseLeave={leave}>
      <button className="desk-phone__object" onClick={()=>{clearTimeout(leaveTimer.current);setPhone(!phone);setHover(null);}} aria-label={phoneOpen?'关闭电话亭':'打开电话亭'} aria-pressed={phoneOpen}>
        <span className="desk-phone__geometry"><img className="desk-phone__body" src={sitePath('/portfolio/scene/phone-body.webp')} alt="红色电话亭"/><PhoneDoor open={phoneOpen}/></span>
      </button>
      <button className={`desk-phone__number contact-value ${copied==='phone'?'is-copied':''}`} onClick={()=>copy('phone')} aria-label="复制电话号码 19328749431"><span className="contact-lettering contact-lettering--hand" aria-hidden="true"><small><Phone size={26}/> Telephone</small><strong>19328749431</strong></span><span className="contact-lettering contact-lettering--raised" aria-hidden="true"><small>TELEPHONE</small><strong>19328749431</strong></span><CornerDownLeft className="contact-direction" size={40}/></button>
      <img className="desk-phone__rays" src={sitePath('/portfolio/scene/contact-rays.webp')} alt=""/>
    </div>
    <div className="desk-mail" onMouseEnter={()=>enter('mail')} onMouseLeave={leave}>
      <button className="desk-mail__object" onClick={()=>{clearTimeout(leaveTimer.current);setMail(!mail);setHover(null);}} aria-pressed={mailOpen} aria-label={mailOpen?'关闭邮箱':'打开邮箱'}><img className="desk-mail__closed" src={sitePath('/portfolio/scene/mail-closed.webp')} alt="红色邮箱"/><img className="desk-mail__open" src={sitePath('/portfolio/scene/mail-open.webp')} alt=""/></button>
      <div className="desk-mail__address"><button className={`contact-email contact-value ${copied==='mail'?'is-copied':''}`} onClick={()=>copy('mail')} aria-label="复制邮箱 1162393961@qq.com"><span className="contact-lettering contact-lettering--hand" aria-hidden="true"><span>Email <Mail size={28}/></span><strong>1162393961@qq.com</strong></span><span className="contact-lettering contact-lettering--raised" aria-hidden="true"><span>EMAIL</span><strong>1162393961<span>@qq.com</span></strong></span></button><CornerDownRight className="contact-direction" size={38}/></div>
    </div>
    <div className="desk-contact__elsewhere"><a href="https://github.com/qiao23333" target="_blank" rel="noreferrer"><img src={sitePath('/assets/github.svg')} alt=""/><span>GitHub</span><ArrowUpRight size={14}/></a><a href="https://qiaozt.pages.dev/" target="_blank" rel="noreferrer"><BookOpen size={22}/><span>Blog</span><ArrowUpRight size={14}/></a></div>
    <span className="contact-status" role="status" aria-live="polite">{status}</span>
  </section>;
}

