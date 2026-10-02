import LanyardBadge from './lanyard-badge';
import WorkOverview from './work-overview';
import DeskContact from './desk-contact';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Copy, Clapperboard, Palette, Radio, Workflow, BookOpen, ExternalLink, Mail, Phone, X } from 'lucide-react';
import { companyChapters, personalProjects, toolMeta } from './portfolio-data';
import type { CompanyChapter, PersonalProject, ToolId } from './portfolio-data';
import { sitePath } from './site-path';
import library from './material-library.json';

export type EditorialView = 'about' | 'projects' | 'snapsort' | 'compliance-guardian' | 'xuanlan' | 'aoda' | 'contact';

const summaries: Record<string, string> = {
  snapsort: '按内容和事件整理本地图片，保留命名、查找与人工复核。',
  'compliance-guardian': '发布前检查文案风险，标出命中规则与修改位置。',
  xuanlan: '把不同体系的输出放在同一界面，展示共识与分歧。',
};

const workingNotes: Record<string,string> = {
 content:'内容先按用户画像和业务问题组织选题，再制作口播、图文与公众号版本。展示材料包含不同系列的图文成品，完整长图可点击放大。',
 brand:'三折页用于长期陈列，访客应能独立理解业务与咨询入口；文案避免写入容易变化的费用、周期与政策数字。主视觉规范分别为官网封面、白底说明页和轻量横幅设计不同版本。',
 live:'直接推流无法同时满足素材声音和粉丝连麦需求，因此后期更换画面源和多平台呈现方式。这里展示贴片与背景成品，不将橱窗商品图当作直播成果。',
 crm:'CRM 由我独立完成。渠道来源、意向项目、跟进阶段和意向分级分别记录，表单进入线索池后提醒负责人，沟通纪要关联到客户记录。客户资料只展示已脱敏材料。',
 systems:'先整理业务问答和共同口径，再将资料交给团队复用。现有证据主要是问答结构与内容口径；AI 自动化的完整操作链和前后对照演示，仍需补充。'
};

const labels: Record<string, string> = {
  snapsort: '图片整理工具',
  'compliance-guardian': '内容检查工具',
  xuanlan: '交互实验',
};

function Nav({ view }: { view: EditorialView }) {
  return <header className="v3-nav">
    <a className="v3-logo" href={sitePath('/')} aria-label="王康桥，返回个人介绍">王康桥</a>
    <nav aria-label="主导航">
      <a href={sitePath('/about')} aria-current={view === 'about' ? 'page' : undefined}>About</a>
      <a href={sitePath('/projects')} aria-current={view === 'projects' || personalProjects.some((p) => p.slug === view) || view === 'aoda' ? 'page' : undefined}>Work</a>
      <a href={sitePath('/contact')} aria-current={view === 'contact' ? 'page' : undefined}>Contact</a>
    </nav>
    <span className="v3-nav__side">王康桥　/　2026</span>
  </header>;
}

function Edge({ left, right }: { left: string; right: string }) {
  return <div className="v3-edge"><span>{left}</span><span>{right}</span></div>;
}

function Skills({ items }: { items: ToolId[] }) {
  return <div className="v3-skills">{items.map((id) => <span key={id}><img src={toolMeta[id].src} alt="" />{toolMeta[id].name}</span>)}</div>;
}

function BottomLink({ href, text }: { href: string; text: string }) {
  return <a className="v3-next-link" href={href}>{text}<ArrowUpRight size={18} /></a>;
}

function About({ effects = true }: { effects?: boolean }) {
  return <section className="ref-about">
    <div className="ref-about__spread">
      <img className="ref-about__book" src={sitePath('/portfolio/scene/binder.webp')} alt="" />
      <LanyardBadge active={effects} />
      <div className="ref-about__heading"><small>01 / PERSONAL FILE</small><h1>ABOUT ME</h1><span>CONTENT　/　PRODUCT　/　AI WORKFLOW</span></div>
      <div className="ref-about__intro"><strong>HI! I'M WANG KANGQIAO.</strong><p>你好，我是王康桥。做过内容、投流和品牌物料，也会把工作里遇到的问题做成工具。</p><p>2026 年 6 月毕业，目前寻找能把这些经验放进实际业务的机会。</p></div>
      <div className="ref-about__experience"><h2>Experience</h2><div><b>星航传媒</b><time>2025.09 — 2026.05</time><p>新媒体运营与投流专员实习。</p></div><div><b>澳达因私出入境</b><time>2026.05 — 2026.09</time><p>参与内容、品牌和内部流程的搭建。</p></div></div>
      <div className="ref-about__polaroid"><img src={sitePath('/portfolio/avatar.webp')} alt="王康桥的博客头像" /><span>WANG KANGQIAO</span></div>
      <a className="ref-about__next" href={sitePath('/projects')}>VIEW WORK <ArrowUpRight size={22} /></a>
    </div>
  </section>;
}

function Work() { return <WorkOverview />; }

function Zoom({ src, alt, close }: { src: string; alt: string; close: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const [enlarged,setEnlarged]=useState(false);
  const zoomDialog=useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); if (event.key === 'Tab') { const controls=Array.from(zoomDialog.current?.querySelectorAll<HTMLButtonElement>('button') ?? []);const first=controls[0],last=controls[controls.length-1];if(event.shiftKey && document.activeElement===first){event.preventDefault();last?.focus();}else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first?.focus();} } };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = overflow; previous?.focus(); };
  }, [close]);
  return <div ref={zoomDialog} className={`v3-zoom ${enlarged ? 'is-enlarged' : ''}`} role="dialog" aria-modal="true" aria-label={alt}><button ref={closeButton} onClick={close} aria-label="关闭大图"><X size={21} /></button><button className="zoom-size" onClick={()=>setEnlarged(!enlarged)}>{enlarged ? '适合屏幕' : '放大阅读'}</button><div className="zoom-viewport" onClick={close}><img src={src} alt={alt} onClick={(event) => {event.stopPropagation();setEnlarged(!enlarged);}} /></div></div>;
}

function PersonalCase({ project }: { project: PersonalProject }) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [zoom, setZoom] = useState<string | null>(null);
  const section = project.sections[active];
  const projectNumber = String(personalProjects.indexOf(project) + 1).padStart(2, '0');
  const originalScreens = [
    { src: project.image, alt: project.imageAlt },
    ...project.sections.filter(s => s.image).map(s => ({ src: s.image!, alt: s.imageAlt ?? project.imageAlt })),
    ...(project.slug === 'snapsort' ? [{ src: sitePath('/portfolio/snapsort-event.webp'), alt: 'SnapSort 事件整理界面' }] : project.slug === 'xuanlan' ? [{ src: sitePath('/portfolio/xuanlan-intro.webp'), alt: '玄览项目介绍界面' }] : []),
  ].filter((s, i, all) => all.findIndex(x => x.src === s.src) === i);
  const screens = library.filter(m=>m.group===project.slug).length ? library.filter(m=>m.group===project.slug).map(m=>({src:sitePath(m.src),alt:m.alt})) : originalScreens;
  const change = (next: number) => { setActive(next); setExpanded(false); };
  return <div className="v3-case" style={{ '--case-accent': project.accent } as CSSProperties}>
    <div className="v3-wrap">
      <Edge left={`03 / CASE STUDY — ${projectNumber}`} right={labels[project.slug]} />
      <a className="v3-return" href={sitePath('/projects')}><ArrowLeft size={17} /> 所有作品</a>
      <div className="v3-case__hero">
        <div className="v3-case__copy"><span>PERSONAL PROJECT / {projectNumber}</span><h1>{project.name}<i>.</i></h1><h2>{project.subtitle}</h2><p>{summaries[project.slug]}</p><div className="v3-case__links">{project.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label}<ExternalLink size={15} /></a>)}</div><div className="v3-case__scroll"><ArrowDown size={16} /> 向下看项目过程</div></div>
        <button className="v3-case__hero-image" onClick={() => setZoom(project.image)} aria-label={`放大查看${project.name}界面`}><img src={project.image} alt={project.imageAlt} /><span>ACTUAL INTERFACE / 点击放大</span></button>
      </div>
    </div>
    <div className="v3-case__story"><div className="v3-wrap">
      <div className="v3-case__story-head"><span>PROCESS / 项目过程</span><span>{section.number} / {String(project.sections.length).padStart(2, '0')}</span></div>
      <div className="v3-case__tabs" role="tablist" aria-label="选择项目章节">{project.sections.map((item, index) => <button key={item.number} role="tab" aria-selected={active === index} className={active === index ? 'is-active' : ''} onClick={() => change(index)}><span>{item.number}</span>{item.label}</button>)}</div>
      <div className="v3-case__chapter" key={section.number}>
        <div className="v3-case__chapter-copy"><span>{section.number} / {section.label}</span><h3>{section.title}</h3><p>{expanded ? section.body : section.body.split('。').slice(0, 2).join('。') + '。'}</p><button className="v3-text-button" onClick={() => setExpanded(!expanded)}>{expanded ? '收起说明' : '展开完整说明'} <ArrowDown size={15} /></button><Skills items={project.tools} /></div>
        <button className="v3-case__chapter-media" onClick={() => setZoom(section.image ?? project.image)} aria-label="放大查看项目材料"><img src={section.image ?? project.image} alt={section.imageAlt ?? project.imageAlt} /><span>{section.caption ?? '项目真实界面'} <ArrowUpRight size={15} /></span></button>
      </div>
      <div className="v3-case__pager"><button onClick={() => change((active - 1 + project.sections.length) % project.sections.length)} aria-label="上一章节"><ChevronLeft size={18} /></button><button onClick={() => change((active + 1) % project.sections.length)} aria-label="下一章节"><ChevronRight size={18} /></button></div>
      <details className="v3-case__gallery"><summary>全部界面记录 · {screens.length}</summary><div>{screens.map(s => <button key={s.src} onClick={() => setZoom(s.src)} aria-label={`放大查看${s.alt}`}><img src={s.src} alt={s.alt} loading="lazy" /><span>{s.alt}<ArrowUpRight size={14} /></span></button>)}</div></details>
      <div className="v3-case__next"><span>OTHER PROJECTS</span>{personalProjects.filter((item) => item.slug !== project.slug).map((item) => <a key={item.slug} href={sitePath(`/projects/${item.slug}`)}>{item.name}<ArrowUpRight size={16} /></a>)}</div>
      <BottomLink href={sitePath('/projects')} text="BACK TO WORK" />
    </div></div>
    {zoom && <Zoom src={zoom} alt={project.name} close={() => setZoom(null)} />}
  </div>;
}

function CompanyCase() {
  const initial = companyChapters.findIndex((item) => `#${item.id}` === window.location.hash);
  const [active, setActive] = useState(initial >= 0 ? initial : 0);
  const [media, setMedia] = useState(0);
  const [collection,setCollection]=useState('全部');
  const [zoom, setZoom] = useState<string | null>(null);
  const chapter: CompanyChapter = companyChapters[active];
  const materials = [...chapter.media.map(m=>({...m,collection:m.kind==='video'?'视频':chapter.id==='content'?(m.label.includes('小红书')?'小红书':m.label.includes('公众号')?'公众号':'账号'):chapter.id==='brand'?'三折页':chapter.id==='crm'?'CRM':chapter.id==='live'?'直播贴片':'资料结构'})), ...library.filter(m=>m.group===chapter.id).map(m=>({...m,src:sitePath(m.src),kind:('kind' in m?m.kind:undefined) as 'video'|undefined}))];
  const visibleMaterials = materials.map((m,i)=>({...m,index:i})).filter(m=>collection==='全部' || ('collection' in m && m.collection===collection) || (collection==='精选' && m.index<chapter.media.length));
  const collections = ['精选',...new Set(materials.map(m=>m.collection))];
  const current = materials[media] ?? materials[0];
  const poster = 'poster' in current ? sitePath(String(current.poster)) : sitePath('/portfolio/aoda-video.webp');
  const change = (next: number) => { setActive(next); setMedia(0); setCollection('全部'); history.replaceState(null, '', `#${companyChapters[next].id}`); };
  return <div className="v3-company">
    <div className="v3-wrap"><Edge left="03 / CASE STUDY — 04" right="STARTUP / 2026" /><a className="v3-return" href={sitePath('/projects')}><ArrowLeft size={17} /> 所有作品</a>
      <div className="v3-company__intro"><div><span>SHENZHEN AODA / 2026.05—09</span><h1>从 <em>0</em> 到 <em>1.</em></h1></div><p>参与澳达的内容获客、品牌物料和内部工作流程搭建。</p></div>
      <div className="v3-company__explorer">
        <nav className="v3-company__chapter-nav" aria-label="公司工作主题">{companyChapters.map((item,index) => <button key={item.id} onClick={() => change(index)} aria-pressed={active === index}>{item.number} {['内容','品牌','直播','CRM','AI 工作流'][index]}</button>)}</nav>
        <div className="v3-company__list" role="tablist" aria-label="选择公司实践内容">{companyChapters.map((item, index) => <button key={item.id} role="tab" aria-selected={active === index} className={active === index ? 'is-active' : ''} onClick={() => change(index)}><span>{item.number}</span><strong>{item.title}</strong><div className="chapter-symbol">{[<Clapperboard key="c"/>,<Palette key="b"/>,<Radio key="l"/>,<Workflow key="o"/>,<BookOpen key="s"/>][index]}</div><img src={item.image} alt="" /><small>{item.english}</small><ArrowUpRight size={18} /></button>)}</div>
        <div className="v3-company__stage" key={chapter.id}><div className="v3-company__stage-art"><img src={chapter.image} alt={chapter.imageAlt} /><span>{chapter.english} / {chapter.number}</span></div><div className="v3-company__stage-foot"><strong>{chapter.title}</strong><p>{chapter.short}</p></div></div>
      </div>
    </div>
    <div className="v3-company__detail"><div className="v3-wrap"><div className="v3-company__detail-head"><span>{chapter.number} / {chapter.english}</span><h2>{chapter.title}</h2><div><button onClick={() => change((active - 1 + companyChapters.length) % companyChapters.length)} aria-label="上一主题"><ChevronLeft size={19} /></button><button onClick={() => change((active + 1) % companyChapters.length)} aria-label="下一主题"><ChevronRight size={19} /></button></div></div>
      <div className="v3-company__detail-grid"><div className="v3-company__detail-summary"><small>{chapter.english}</small><h3>{chapter.title}</h3><p>{chapter.short}</p><span>{materials.length} 份展示材料</span></div><div className="v3-company__detail-copy"><p>{chapter.detail}</p><ul>{chapter.deliverables.map((item) => <li key={item}>{item}</li>)}</ul><details className="working-notes"><summary>工作记录与设计说明</summary><p>{workingNotes[chapter.id]}</p></details><Skills items={chapter.tools} /></div><div className="v3-company__evidence"><div className="evidence-collections"><button aria-pressed={collection==='全部'} onClick={()=>setCollection('全部')}>全部</button>{collections.map(c=><button key={c} aria-pressed={collection===c} onClick={()=>{setCollection(c);const first=materials.findIndex((m,i)=>c==='精选'?i<chapter.media.length:('collection' in m && m.collection===c));if(first>=0)setMedia(first);}}>{c}</button>)}</div><div className="v3-company__media-tabs" role="tablist" aria-label="选择对应素材">{visibleMaterials.map((item) => <button key={item.label} role="tab" aria-selected={media === item.index} className={media === item.index ? 'is-active' : ''} onClick={() => setMedia(item.index)}><img loading="lazy" src={item.kind === 'video' ? ('poster' in item ? sitePath(String(item.poster)) : sitePath('/portfolio/aoda-video.webp')) : item.src} alt="" /><span>{item.label}{item.kind === 'video' ? ' ▷' : ''}</span></button>)}</div><div className="v3-company__media-box" key={current.src}>{current.kind === 'video' ? <video src={current.src} poster={poster} controls playsInline preload="none" aria-label={current.alt} /> : <button onClick={() => setZoom(current.src)} aria-label="放大查看素材"><img src={current.src} alt={current.alt} /></button>}</div><span className="v3-company__media-caption">REAL WORK / {current.label}　·　{media + 1} / {materials.length}</span></div></div>
      <BottomLink href={sitePath('/projects')} text="BACK TO WORK" /></div></div>
    {zoom && <Zoom src={zoom} alt={current.alt} close={() => setZoom(null)} />}
  </div>;
}

export default function EditorialPortfolio({ view, effects = true }: { view: EditorialView; effects?: boolean }) {
  const project = personalProjects.find((item) => item.slug === view);
  return <div className={`v3-shell desk-shell desk-shell--${view}`}><div className="desk-backdrop" aria-hidden="true"/><Nav view={view} /><main className="v3-main" key={view}>{view === 'about' ? <About effects={effects} /> : view === 'projects' ? <Work /> : view === 'aoda' ? <CompanyCase /> : view === 'contact' ? <DeskContact /> : project ? <PersonalCase project={project} /> : <About effects={effects} />}</main></div>;
}
