import { sitePath } from './site-path';
export type ToolId = 'photoshop' | 'illustrator' | 'gpt' | 'feishu' | 'jianying' | 'wechat' | 'pycharm';

export type CaseSection = {
  number: string;
  label: string;
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
  caption?: string;
};

export type PersonalProject = {
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  summary: string;
  image: string;
  imageAlt: string;
  accent: string;
  tools: ToolId[];
  links: { label: string; href: string }[];
  sections: CaseSection[];
};

export const personalProjects: PersonalProject[] = [
  {
    slug: 'snapsort',
    name: 'SnapSort',
    subtitle: '本地 AI 图片整理工具',
    category: '本地 AI 素材整理工具 · 主推项目',
    summary: '从一次真实的素材整理任务出发，做出按内容或事件组织图片的本地工作台，并把命名、搜索、查重和复核接成完整流程。',
    image: sitePath('/portfolio/snapsort.webp'),
    imageAlt: 'SnapSort 桌面应用的真实界面',
    accent: '#4779c8',
    tools: ['pycharm', 'gpt'],
    links: [
      { label: 'GitHub 仓库', href: 'https://github.com/qiao23333/SnapSort' },
      { label: '项目拆解文章', href: 'https://qiaozt.pages.dev/posts/snapsort-01/' },
    ],
    sections: [
      {
        number: '01', label: '问题', title: '整理的终点，是下次创作时找得到',
        body: '工作中的图片不断从手机、相机和不同活动进入素材库。逐张打开、分类、改名能完成一次任务，却不能保证后续查找和复用。这个项目把问题定义为：如何让素材持续可检索、可核对、可再次使用。',
        image: sitePath('/portfolio/snapsort.webp'), imageAlt: 'SnapSort 首页真实界面', caption: '从素材整理的入口，到可回看的工作台。',
      },
      {
        number: '02', label: '关键判断', title: '内容与事件，是两种不同的找图方式',
        body: '按内容分类回答“画面里有什么”；按事件整理回答“哪些照片属于同一次活动”。事件模式先利用拍摄时间组织，再让 AI 辅助命名，背景不确定的地方交由人确认。时间只是线索，因此分组结果仍需复核。',
        image: sitePath('/portfolio/snapsort-sort.webp'), imageAlt: 'SnapSort 智能分类界面',
        caption: '分类与规则入口保留在同一工作流。',
      },
      {
        number: '03', label: '实现取舍', title: '让模型看图，让程序管理流程',
        body: '本地视觉模型负责描述画面，程序负责解析结果、应用规则和输出文件。原件优先保留，异常、低置信度和中断恢复都需要明确处理。模型无法从一张照片得知人物身份或事情结果，重要描述仍由人确认。',
        image: sitePath('/portfolio/snapsort-rules.webp'), imageAlt: 'SnapSort 任务规则界面', caption: '可检查的规则比一次性模型输出更重要。',
      },
      {
        number: '04', label: '现状与复盘', title: '工具可运行，效果仍要继续验证',
        body: '目前已有可运行应用、公开仓库、真实界面与迭代记录。下一步最有说服力的证据，是同一批素材的人工与工具耗时对照、抽样复核结果，以及完整的“整理前 → 操作 → 整理后”演示。这里暂不使用未经验证的效率数字。',
        image: sitePath('/portfolio/snapsort-tools.webp'), imageAlt: 'SnapSort 工具箱界面', caption: '清理、复核与后续管理也进入同一工具。',
      },
    ],
  },
  {
    slug: 'compliance-guardian',
    name: '合规卫士',
    subtitle: '发布前的文案检查工具',
    category: '内容合规工具 · 个人项目',
    summary: '将行业红线、平台差异和账号类型放进同一次本地检测；每个提示都能回到规则依据，AI 只参与改写建议。',
    image: sitePath('/portfolio/guardian.webp'),
    imageAlt: '合规卫士单条文案检测的真实界面',
    accent: '#36b786',
    tools: ['pycharm', 'gpt'],
    links: [
      { label: '在线体验', href: 'https://qiaozt.pages.dev/guardian/' },
      { label: 'GitHub 仓库', href: 'https://github.com/qiao23333/ComplianceGuardian' },
      { label: '项目拆解文章', href: 'https://qiaozt.pages.dev/posts/compliance-guardian-01/' },
    ],
    sections: [
      {
        number: '01', label: '问题', title: '同一段文案，要经过几套规则',
        body: '移民等行业的内容发布前，要同时看行业监管、平台规则和账号类型。人工反复核对容易疲劳；通用极限词工具又覆盖不了行业场景。项目由真实内容工作中的这种摩擦开始。',
        image: sitePath('/portfolio/guardian-desktop.webp'), imageAlt: '合规卫士桌面端单条检测界面', caption: '桌面端的单条文案检测结果。',
      },
      {
        number: '02', label: '关键判断', title: '规则负责判定，AI 负责改写',
        body: '合规结论需要确定、可复现和可追溯，因此是否命中、严重度和依据由规则引擎给出。语言模型只负责根据已发现的问题建议改写，最终发布仍需人工复核。',
        image: sitePath('/portfolio/guardian-rules.webp'), imageAlt: '合规卫士的词库规则浏览界面',
        caption: '词库页面让风险词、分类和依据可以被查看。',
      },
      {
        number: '03', label: '迭代', title: '误报和规则过期，都需要被发现',
        body: '中文的“第一步”和“行业第一”不能用同一条简单词匹配处理。项目加入语境守卫，并为规则来源建立复核台账与到期检查。具体评测数字随版本变化，网站先展示判断和机制，避免复述可能过时的统计。',
        image: sitePath('/portfolio/guardian-batch.webp'), imageAlt: '合规卫士批量检测界面', caption: '批量检测服务于真实发布前的成批检查。',
      },
      {
        number: '04', label: '边界', title: '工具是发布前的一道筛子',
        body: '规则库覆盖已知写法，无法理解所有语境、谐音或图片中的隐含承诺。平台规范也会变化，因此结果是辅助检查，不能替代法务判断和最终人工审核。',
      },
    ],
  },
  {
    slug: 'xuanlan',
    name: '玄览',
    subtitle: '多体系结果聚合实验',
    category: '交互与系统实验 · 个人项目',
    summary: '把多个结构不同的结果映射到共同的比较维度，让共识、分歧与低样本的不确定性可以被看见。',
    image: sitePath('/portfolio/xuanlan.webp'),
    imageAlt: '玄览八顾问合议界面',
    accent: '#d7ae72',
    tools: ['gpt'],
    links: [
      { label: '在线体验', href: 'https://qiaozt.pages.dev/xuanlan/' },
      { label: 'GitHub 仓库', href: 'https://github.com/qiao23333/xuanlan' },
    ],
    sections: [
      {
        number: '01', label: '问题', title: '八种不同的输出，怎样放在同一张桌上',
        body: '项目的重点是异质结果的组织方式：不同体系各有术语和结论形式，直接拼接只会得到更长的文本。我建立共同的比较维度，把结论、共识和分歧并列展示。',
        image: sitePath('/portfolio/xuanlan.webp'), imageAlt: '玄览的八顾问合议界面', caption: '八个体系的结论先被放进共同的展示结构。',
      },
      {
        number: '02', label: '关键判断', title: '相同输入，应该能够回放同一结果',
        body: '时间和随机种子从内核外部传入，同一输入可以重复计算。分享链接只携带必要信息，由同一内核重算，方便回放与检验。底层排盘能力依托开源库，项目工作集中在聚合、解释和交互层。',
        image: sitePath('/portfolio/xuanlan-axes.webp'), imageAlt: '玄览六大维度展示', caption: '不同体系投影到共同维度后才能比较。',
      },
      {
        number: '03', label: '边界', title: '分歧也是一种需要呈现的结果',
        body: '样本很少时不显示看似确定的高一致度；体系意见冲突时明确展示分歧。本项目属于娱乐与交互实验，不把推演结果包装成事实预测或现实决策依据。',
        image: sitePath('/portfolio/xuanlan-consensus.webp'), imageAlt: '玄览共识与分歧展示', caption: '分歧和低样本情况都需要被显式呈现。',
      },
    ],
  },
];

export type CompanyChapter = {
  id: string;
  number: string;
  title: string;
  english: string;
  short: string;
  detail: string;
  impact: string;
  deliverables: string[];
  image: string;
  imageAlt: string;
  media: { label: string; src: string; alt: string; kind?: 'video' }[];
  tools: ToolId[];
};

export const companyChapters: CompanyChapter[] = [
  {
    id: 'content', number: '01', title: '内容与新媒体', english: 'CONTENT',
    short: '老板 IP 口播、小红书图文、公众号内容与账号呈现。',
    detail: '围绕用户疑问与业务口径，参与账号定位、选题和用户画像，制作老板 IP 口播、图文与公众号内容，并逐步整理可复用的内容素材。',
    impact: '初创阶段缺少现成的内容体系，先让“对谁说、说什么、怎样说”有一个可执行的起点。',
    deliverables: ['短视频口播与账号内容', '小红书图文与封面', '公众号内容与账号呈现'],
    image: sitePath('/portfolio/aoda-video.webp'), imageAlt: '澳达老板 IP 视频封面',
    media: [
      { label: '口播视频', src: sitePath('/portfolio/aoda-video.mp4'), alt: '老板 IP 口播视频片段', kind: 'video' },
      { label: '账号主页', src: sitePath('/portfolio/aoda-ip.webp'), alt: '短视频账号主页截图' },
      { label: '小红书图文', src: sitePath('/portfolio/aoda-xhs.webp'), alt: '小红书图文封面' },
      { label: '公众号', src: sitePath('/portfolio/aoda-wechat.webp'), alt: '公众号主页截图' },
    ], tools: ['jianying', 'wechat', 'gpt'],
  },
  {
    id: 'brand', number: '02', title: '品牌与物料', english: 'BRAND',
    short: '三折页、合作资料、品牌视觉与统一文案。',
    detail: '围绕业务介绍和品牌主视觉，参与梳理公司介绍、三折页双面内容、线上线下物料与合作展示材料。将不同场景需要的内容放进同一套视觉和信息口径。',
    impact: '从零散的业务描述走向可交付的品牌材料，让团队在介绍公司时有共同的版本。',
    deliverables: ['公司宣传三折页', '品牌视觉与文案规范', '合作介绍物料'],
    image: sitePath('/portfolio/aoda-brochure.webp'), imageAlt: '公司宣传三折页正面',
    media: [
      { label: '三折页正面', src: sitePath('/portfolio/aoda-brochure.webp'), alt: '公司宣传三折页正面' },
      { label: '三折页背面', src: sitePath('/portfolio/aoda-brochure-back.webp'), alt: '公司宣传三折页背面' },
      
    ], tools: ['photoshop', 'illustrator', 'gpt'],
  },
  {
    id: 'live', number: '03', title: '直播与现场', english: 'LIVE',
    short: '设备、直播画面、贴片和多平台现场执行。',
    detail: '早期完成布景、设备调试、OBS 多平台推流、贴片制作和现场中控。随后因素材声音与连麦限制，改用抖音直播助手作为画面源，通过虚拟屏与投屏实现多平台直播，并对接单反与灯光设备升级。',
    impact: '团队有了一套可反复使用的直播画面与执行方式，内容现场不再完全依靠临时拼接。',
    deliverables: ['直播间视觉贴片', 'OBS 场景与设备联调', '讲解与展示素材'],
    image: sitePath('/portfolio/aoda-live.webp'), imageAlt: '澳达官方号直播背景与组件预览',
    media: [
      { label: '直播画面', src: sitePath('/portfolio/aoda-live.webp'), alt: '官方号直播背景与贴片预览' },
      { label: '沙龙贴片', src: sitePath('/portfolio/aoda-live-boss.webp'), alt: '老板直播间沙龙贴片' },
      
    ], tools: ['jianying', 'photoshop', 'gpt'],
  },
  {
    id: 'crm', number: '04', title: '获客与 CRM', english: 'OPERATIONS',
    short: '表单收集、来源追踪、意向分级与负责人提醒。',
    detail: '从没有统一客户资料和跟进方式的状态出发，独立搭建飞书 CRM 基础结构：按渠道、业务项目和跟进阶段组织客户记录，设置 A/B/C 意向分级。公众号表单收集线索后自动写入线索池，并提醒对应负责人；后续持续补充沟通记录。',
    impact: '线索从不同渠道进入后，团队能在同一处查看、分配和持续跟进。',
    deliverables: ['飞书 CRM 基础结构', '线索归集与分配字段', '自动提醒工作流'],
    image: sitePath('/portfolio/aoda-crm.webp'), imageAlt: '已裁去账号信息的飞书 CRM 工作流界面',
    media: [
      { label: '自动提醒流程', src: sitePath('/portfolio/aoda-crm.webp'), alt: '已裁去账号信息的新增线索自动提醒工作流' },
      { label: '使用指引', src: sitePath('/portfolio/aoda-crm-guide.webp'), alt: '已裁去账号信息的 CRM 使用指引界面' },
    ], tools: ['feishu', 'gpt'],
  },
  {
    id: 'systems', number: '05', title: '业务知识与 AI', english: 'SYSTEMS',
    short: '业务问答、内容口径与内部资料结构。',
    detail: '参与业务问答、内容口径和内部资料的结构化整理，再尝试将 AI 用在信息梳理、内容草稿与线索分析等有清晰人工复核环节的流程里。',
    impact: '新同事与内容协作可以从整理过的资料开始，而不是每次从散落的聊天记录里重新寻找答案。',
    deliverables: ['业务问题与资料框架', '可复用的内容口径', 'AI 辅助整理与复核流程'],
    image: sitePath('/portfolio/aoda-qa.webp'), imageAlt: '雇主担保移民与企业出海业务问答脑图',
    media: [
      { label: '业务问答结构', src: sitePath('/portfolio/aoda-qa.webp'), alt: '业务问答脑图' },
      
      
    ], tools: ['feishu', 'gpt', 'wechat'],
  },
];

export const toolMeta: Record<ToolId, { name: string; src: string }> = {
  photoshop: { name: 'Photoshop', src: sitePath('/portfolio/icons/photoshop.png') },
  illustrator: { name: 'Illustrator', src: sitePath('/portfolio/icons/illustrator.png') },
  gpt: { name: 'ChatGPT', src: sitePath('/portfolio/icons/gpt.png') },
  feishu: { name: '飞书', src: sitePath('/portfolio/icons/feishu.png') },
  jianying: { name: '剪映', src: sitePath('/portfolio/icons/jianying.png') },
  wechat: { name: '微信公众平台', src: sitePath('/portfolio/icons/wechat.png') },
  pycharm: { name: 'PyCharm', src: sitePath('/portfolio/icons/pycharm.png') },
};
