import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { companyChapters, personalProjects } from './portfolio-data';
import { sitePath } from './site-path';
export default function WorkOverview() {
 const [personal,setPersonal]=useState(()=>window.location.hash === '#personal');
 useEffect(()=>{
  const sync=()=>setPersonal(window.location.hash === '#personal');
  window.addEventListener('portfolio:navigate',sync);
  window.addEventListener('hashchange',sync);
  return()=>{window.removeEventListener('portfolio:navigate',sync);window.removeEventListener('hashchange',sync);};
 },[]);
 return <section className={`choice-work ${personal?'is-personal':''}`}>
 <div className="choice-work__head"><span>{personal?'个人项目':'作品与经历'}</span>{personal?<a href={sitePath('/projects')}><ArrowLeft size={16}/> 返回选择</a>:<span>2026</span>}</div>
 {personal ? <div className="choice-projects">{personalProjects.map((p,i)=><a key={p.slug} href={sitePath(`/projects/${p.slug}`)} style={{'--project-color':p.accent} as React.CSSProperties}><small>0{i+1} / {i===0?'FEATURED':'PERSONAL PROJECT'}</small><div><img src={p.image} alt={p.imageAlt}/></div><h2>{p.name}<ArrowUpRight/></h2><p>{p.subtitle}</p></a>)}</div> : <div className="choice-work__split">
 <a className="choice-door choice-door--product" href={sitePath('/projects#personal')} aria-label="浏览个人项目：SnapSort、合规卫士与玄览"><img className="choice-door__cover" src={sitePath('/portfolio/scene/folder.webp')} alt=""/><span className="choice-door__index">A / PERSONAL PRODUCTS</span><div className="choice-door__title"><b className="choice-letter">A.</b><h1>个人项目</h1><p>软件与 AI 应用</p></div><div className="choice-door__visual choice-door__visual--software" aria-hidden="true">{personalProjects.map(p=><img key={p.slug} src={p.image} alt=""/>)}</div><span className="choice-door__foot"><span>03 个项目</span><ArrowUpRight/></span></a>
 <a className="choice-door choice-door--company" href={sitePath('/projects/aoda')} aria-label="浏览公司经历：内容、品牌与 AI 工作流"><img className="choice-door__cover" src={sitePath('/portfolio/scene/folder.webp')} alt=""/><span className="choice-door__index">B / STARTUP EXPERIENCE</span><div className="choice-door__title"><b className="choice-letter">B.</b><h1>公司经历</h1><p>内容、品牌与业务基础</p></div><div className="choice-door__visual choice-door__visual--company" aria-hidden="true">{['content','brand','crm'].map(id=><img key={id} src={companyChapters.find(c=>c.id===id)!.image} alt=""/>)}</div><span className="choice-door__foot"><span>05 个工作方向</span><ArrowUpRight/></span></a>
 </div>}
 </section>
}
