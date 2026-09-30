import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { personalProjects } from './portfolio-data';
import { sitePath } from './site-path';
export default function WorkOverview() {
  const [selected, setSelected] = useState<'personal' | 'company'>(() => new URLSearchParams(location.search).get('category') === 'company' ? 'company' : 'personal');
  return <section className={`work-gallery work-gallery--${selected}`}>
    <div className="work-gallery__heading"><div><small>SELECTED WORK / 2026</small><h1>作品<span>与实践</span></h1></div><span>01 — 02</span></div>
    <div className="work-gallery__doors">
      <button className={`work-door work-door--personal ${selected === 'personal' ? 'is-selected' : ''}`} onClick={() => setSelected('personal')} aria-pressed={selected === 'personal'}>
        <div className="work-door__heading"><small>01 / PERSONAL PRODUCTS</small><h2>个人项目</h2><span>SnapSort · 合规卫士 · 玄览</span></div>
        <div className="work-door__software" aria-hidden="true">{[personalProjects[2], personalProjects[1], personalProjects[0]].map(p => <div key={p.slug}><img src={p.image} alt="" /></div>)}</div>
        <span className="work-door__number">03 PROJECTS</span><ArrowUpRight className="work-door__arrow" />
      </button>
      <button className={`work-door work-door--company ${selected === 'company' ? 'is-selected' : ''}`} onClick={() => setSelected('company')} aria-pressed={selected === 'company'}>
        <div className="work-door__heading"><small>02 / STARTUP EXPERIENCE</small><h2>初创公司</h2><span>内容 · 品牌 · AI 提效</span></div>
        <div className="work-door__company" aria-hidden="true"><img src={sitePath('/portfolio/aoda-xhs-2.webp')} alt="" /><img src={sitePath('/portfolio/aoda-video.webp')} alt="" /><img src={sitePath('/portfolio/aoda-brochure.webp')} alt="" /></div>
        <span className="work-door__number">SHENZHEN AODA / 2026</span><ArrowUpRight className="work-door__arrow" />
      </button>
    </div>
    <div className="work-gallery__entries" key={selected} aria-label={selected === 'personal' ? '个人项目入口' : '公司案例入口'}>
      {selected === 'personal' ? personalProjects.map((p,i) => <a key={p.slug} href={sitePath(`/projects/${p.slug}`)}><span>0{i+1}</span><div><strong>{p.name}</strong><small>{i === 0 ? '本地 AI 图片整理工具' : i === 1 ? '发布前的文案检查工具' : '多体系结果的交互实验'}</small></div><ArrowUpRight /></a>) : <a href={sitePath('/projects/aoda')} className="work-gallery__company-entry"><span>01</span><div><strong>深圳澳达 · 从 0 到 1</strong><small>内容、新媒体、品牌物料与内部工作流程</small></div><span className="work-gallery__entry-count">5 个主题</span><ArrowUpRight /></a>}
    </div>
  </section>;
}
