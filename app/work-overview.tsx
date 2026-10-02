import { useState } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { personalProjects } from './portfolio-data';
import { sitePath } from './site-path';
export default function WorkOverview() {
 const [personal,setPersonal]=useState(false);
 return <section className={`choice-work ${personal?'is-personal':''}`}>
 <div className="choice-work__head"><span>SELECTED WORK / 2026</span>{personal?<button onClick={()=>setPersonal(false)}><ArrowLeft size={16}/> 两个方向</button>:<span>01 — 02</span>}</div>
 {personal ? <div className="choice-projects">{personalProjects.map((p,i)=><a key={p.slug} href={sitePath(`/projects/${p.slug}`)} style={{'--project-color':p.accent} as React.CSSProperties}><small>0{i+1} / {i===0?'FEATURED':'PERSONAL PROJECT'}</small><div><img src={p.image} alt={p.imageAlt}/></div><h2>{p.name}<ArrowUpRight/></h2><p>{p.subtitle}</p></a>)}</div> : <div className="choice-work__split">
 <button className="choice-door choice-door--product" onClick={()=>setPersonal(true)}><span className="choice-door__index">A / PERSONAL PRODUCTS</span><div className="choice-door__title"><b className="choice-letter">A.</b><h1>个人<br/>项目<span>↗</span></h1><p>软件与 AI 应用</p></div><div className="choice-door__visual choice-door__visual--software"><img src={personalProjects[0].image} alt="SnapSort 界面"/></div><span className="choice-door__foot">SnapSort / 合规卫士 / 玄览 <ArrowUpRight/></span></button>
 <a className="choice-door choice-door--company" href={sitePath('/projects/aoda')}><span className="choice-door__index">B / STARTUP EXPERIENCE</span><div className="choice-door__title"><b className="choice-letter">B.</b><h1>公司<br/>经历<span>↗</span></h1><p>内容、品牌与业务基础</p></div><div className="choice-door__visual choice-door__visual--company"><img src={sitePath('/portfolio/aoda-brochure.webp')} alt="公司品牌三折页"/></div><span className="choice-door__foot">内容 / 品牌 / AI 工作流 <ArrowUpRight/></span></a>
 </div>}
 </section>
}
