import LanyardBadge from './lanyard-badge';
import WorkOverview from './work-overview';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Copy, ExternalLink, Mail, Phone, X } from 'lucide-react';
import { companyChapters, personalProjects, toolMeta } from './portfolio-data';
import type { CompanyChapter, PersonalProject, ToolId } from './portfolio-data';
import { sitePath } from './site-path';

export type EditorialView = 'about' | 'projects' | 'snapsort' | 'compliance-guardian' | 'xuanlan' | 'aoda' | 'contact';

const summaries: Record<string, string> = {
  snapsort: '按内容和事件整理本地图片，保留命名、查找与人工复核。',
  'compliance-guardian': '发布前检查文案风险，标出命中规则与修改位置。',
  xuanlan: '把不同体系的输出放在同一界面，展示共识与分歧。',
};

const labels: Record<string, string> = {
  snapsort: '图片整理工具',
  'compliance-guardian': '内容检查工具',
  xuanlan: '交互实验',
};

function Nav({ view }: { view: EditorialView }) {
  return <header className="v3-nav">
    <a className="v3-logo" href={sitePath('/')} aria-label="王康桥，返回个人介绍">WKQ<span>.</span></a>
    <nav aria-label="主导航">
      <a href={sitePath('/about')} aria-current={view === 'about' ? 'page' : undefined}>ABOUT</a>
      <a href={sitePath('/projects')} aria-current={view === 'projects' || personalProjects.some((p) => p.slug === view) || view === 'aoda' ? 'page' : undefined}>WORK</a>
      <a href={sitePath('/contact')} aria-current={view === 'contact' ? 'page' : undefined}>CONTACT</a>
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
      <img className="ref-about__book" src={sitePath('/portfolio/about-binder.png')} alt="" />
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
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); if (event.key === 'Tab') { event.preventDefault(); closeButton.current?.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = overflow; previous?.focus(); };
  }, [close]);
  return <div className="v3-zoom" role="dialog" aria-modal="true" aria-label={alt} onClick={close}><button ref={closeButton} onClick={close} aria-label="关闭大图"><X size={21} /></button><img src={src} alt={alt} onClick={(event) => event.stopPropagation()} /></div>;
}

function PersonalCase({ project }: { project: PersonalProject }) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [zoom, setZoom] = useState<string | null>(null);
  const section = project.sections[active];
  const projectNumber = String(personalProjects.indexOf(project) + 1).padStart(2, '0');
  const screens = [
    { src: project.image, alt: project.imageAlt },
    ...project.sections.filter(s => s.image).map(s => ({ src: s.image!, alt: s.imageAlt ?? project.imageAlt })),
    ...(project.slug === 'snapsort' ? [{ src: sitePath('/portfolio/snapsort-event.webp'), alt: 'SnapSort 事件整理界面' }] : project.slug === 'xuanlan' ? [{ src: sitePath('/portfolio/xuanlan-intro.webp'), alt: '玄览项目介绍界面' }] : []),
  ].filter((s, i, all) => all.findIndex(x => x.src === s.src) === i);
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
      <div className="v3-case__gallery"><h3>界面记录</h3><div>{screens.map(s => <button key={s.src} onClick={() => setZoom(s.src)} aria-label={`放大查看${s.alt}`}><img src={s.src} alt={s.alt} loading="lazy" /><span>{s.alt}<ArrowUpRight size={14} /></span></button>)}</div></div>
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
  const [zoom, setZoom] = useState<string | null>(null);
  const chapter: CompanyChapter = companyChapters[active];
  const current = chapter.media[media] ?? chapter.media[0];
  const change = (next: number) => { setActive(next); setMedia(0); history.replaceState(null, '', `#${companyChapters[next].id}`); };
  return <div className="v3-company">
    <div className="v3-wrap"><Edge left="03 / CASE STUDY — 04" right="STARTUP / 2026" /><a className="v3-return" href={sitePath('/projects')}><ArrowLeft size={17} /> 所有作品</a>
      <div className="v3-company__intro"><div><span>SHENZHEN AODA / 2026.05—09</span><h1>从 <em>0</em> 到 <em>1.</em></h1></div><p>参与澳达的内容获客、品牌物料和内部工作流程搭建。</p></div>
      <div className="v3-company__explorer">
        <nav className="v3-company__chapter-nav" aria-label="公司工作主题">{companyChapters.map((item,index) => <button key={item.id} onClick={() => change(index)} aria-pressed={active === index}>{item.number} {['内容','品牌','直播','CRM','AI 工作流'][index]}</button>)}</nav>
        <div className="v3-company__list" role="tablist" aria-label="选择公司实践内容">{companyChapters.map((item, index) => <button key={item.id} role="tab" aria-selected={active === index} className={active === index ? 'is-active' : ''} onClick={() => change(index)}><span>{item.number}</span><strong>{item.title}</strong><img src={item.image} alt="" /><small>{item.english}</small><ArrowUpRight size={18} /></button>)}</div>
        <div className="v3-company__stage" key={chapter.id}><div className="v3-company__stage-art"><img src={chapter.image} alt={chapter.imageAlt} /><span>{chapter.english} / {chapter.number}</span></div><div className="v3-company__stage-foot"><strong>{chapter.title}</strong><p>{chapter.short}</p></div></div>
      </div>
    </div>
    <div className="v3-company__detail"><div className="v3-wrap"><div className="v3-company__detail-head"><span>{chapter.number} / {chapter.english}</span><h2>{chapter.title}</h2><div><button onClick={() => change((active - 1 + companyChapters.length) % companyChapters.length)} aria-label="上一主题"><ChevronLeft size={19} /></button><button onClick={() => change((active + 1) % companyChapters.length)} aria-label="下一主题"><ChevronRight size={19} /></button></div></div>
      <div className="v3-company__detail-grid"><div className="v3-company__detail-copy"><p>{chapter.detail}</p><ul>{chapter.deliverables.map((item) => <li key={item}>{item}</li>)}</ul><Skills items={chapter.tools} /></div><div className="v3-company__evidence"><div className="v3-company__media-tabs" role="tablist" aria-label="选择对应素材">{chapter.media.map((item, index) => <button key={item.label} role="tab" aria-selected={media === index} className={media === index ? 'is-active' : ''} onClick={() => setMedia(index)}><img src={item.kind === 'video' ? sitePath('/portfolio/aoda-video.webp') : item.src} alt="" /><span>{item.label}{item.kind === 'video' ? ' ▷' : ''}</span></button>)}</div><div className="v3-company__media-box" key={current.src}>{current.kind === 'video' ? <video src={current.src} poster={sitePath('/portfolio/aoda-video.webp')} controls playsInline preload="none" aria-label={current.alt} /> : <button onClick={() => setZoom(current.src)} aria-label="放大查看素材"><img src={current.src} alt={current.alt} /></button>}</div><span className="v3-company__media-caption">REAL WORK / {current.label}　·　{media + 1} / {chapter.media.length}</span></div></div>
      <BottomLink href={sitePath('/projects')} text="BACK TO WORK" /></div></div>
    {zoom && <Zoom src={zoom} alt={current.alt} close={() => setZoom(null)} />}
  </div>;
}

function Contact() {
  const [hover, setHover] = useState(false);
  const [pinned, setPinned] = useState(() => new URLSearchParams(window.location.search).has('open'));
  const [copied, setCopied] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const open = hover || pinned;
  const enter = () => { if (leaveTimer.current) clearTimeout(leaveTimer.current); if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) setHover(true); };
  const leave = () => { leaveTimer.current = setTimeout(() => setHover(false), 220); };
  useEffect(() => () => { if (leaveTimer.current) clearTimeout(leaveTimer.current); }, []);
  const copy = async () => { try { await navigator.clipboard.writeText('1162393961@qq.com'); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { window.location.href = 'mailto:1162393961@qq.com'; } };
  return <div className={`v3-contact ${open ? 'is-open' : ''}`}>
    <div className="v3-contact__art" aria-hidden="true"><img src={sitePath('/portfolio/booth-closed.png')} alt="" /><img src={sitePath('/portfolio/booth-open.png')} alt="" /></div>
    <div className="v3-contact__hints" aria-hidden="true"><span>Telephone<br /><small>193 2874 ****</small></span><span>Email<br /><small>116239****@qq.com</small></span></div>
    <div className="v3-wrap"><Edge left="04 / CONTACT" right="OPEN A CONVERSATION" /><div className="v3-contact__body"><div className="v3-contact__copy" onMouseEnter={enter} onMouseLeave={leave}><span>CONTACT / 王康桥</span><h1>联系我<span>.</span></h1><p>有合适的岗位或项目，欢迎直接联系。</p><div className="v3-contact__links" aria-hidden={!open}><a tabIndex={open ? 0 : -1} href="tel:+8619328749431"><Phone size={18} /><span>电话</span><strong>193 2874 9431</strong><ArrowUpRight size={18} /></a><div><Mail size={18} /><span>邮箱</span><a tabIndex={open ? 0 : -1} href="mailto:1162393961@qq.com">1162393961@qq.com</a><button tabIndex={open ? 0 : -1} onClick={copy} aria-label="复制邮箱">{copied ? <Check size={18} /> : <Copy size={18} />}</button></div><a tabIndex={open ? 0 : -1} href="https://github.com/qiao23333" target="_blank" rel="noreferrer"><span>GitHub</span><strong>qiao23333</strong><ArrowUpRight size={18} /></a><a tabIndex={open ? 0 : -1} href="https://qiaozt.pages.dev/" target="_blank" rel="noreferrer"><span>博客</span><strong>qiaozt.pages.dev</strong><ArrowUpRight size={18} /></a></div></div><button className="v3-contact__booth-hit" onMouseEnter={enter} onMouseLeave={leave} onFocus={enter} onBlur={() => setHover(false)} onClick={() => { setPinned(!pinned); setHover(false); }} aria-label={open ? '关闭电话亭' : '打开电话亭'} aria-pressed={open}></button></div><div className="v3-contact__foot"><a href={sitePath('/projects')}><ArrowLeft size={16} /> 返回作品</a><span>WKQ / 2026</span></div></div>
  </div>;
}

export default function EditorialPortfolio({ view, effects = true }: { view: EditorialView; effects?: boolean }) {
  const project = personalProjects.find((item) => item.slug === view);
  return <div className="v3-shell"><Nav view={view} /><main className="v3-main" key={view}>{view === 'about' ? <About effects={effects} /> : view === 'projects' ? <Work /> : view === 'aoda' ? <CompanyCase /> : view === 'contact' ? <Contact /> : project ? <PersonalCase project={project} /> : <About effects={effects} />}</main></div>;
}
