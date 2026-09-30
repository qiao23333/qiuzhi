# 王康桥求职作品集

静态前端作品集，包含开屏、About、Work、三个个人项目、澳达公司案例和 Contact。

## 页面

- `/`：Remotion 信封开场：封印抬起、翻盖、抽出信纸、接入 About；支持跳过与 Escape
- `/about`：个人介绍与工牌
- `/projects`：个人项目 / 初创公司两级目录
- `/projects/snapsort`、`/projects/compliance-guardian`、`/projects/xuanlan`：个人项目案例
- `/projects/aoda`：澳达五个主题及相应图片、视频素材
- `/contact`：电话亭交互与联系方式

手机横屏和竖屏都能直接浏览，横屏采用更宽的视觉构图。页面保留键盘操作与减少动态效果设置。

## 本地运行

需要 Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
npm run build
```

静态发布目录是 `dist/`。开屏在 `app/envelope-intro.tsx` 与 `app/envelope-intro.css`，文案和项目链接在 `app/portfolio-data.ts`，其余页面在 `app/editorial-pages.tsx`，样式在 `app/editorial.css`，图片、视频和图标在 `public/portfolio/`。

GitHub Pages 通过 `.github/workflows/pages.yml` 发布，构建命令为 `npm run build -- --base=/qiuzhi/`，输出目录为 `dist`。网站地址为 https://qiao23333.github.io/qiuzhi/ 。`app/site-path.ts` 统一处理子路径。仓库经本人确认改为公开。

工牌使用 React Bits Lanyard 原模型，组件在 `app/lanyard.jsx`，素材在 `public/assets/lanyard/`。保留原关节、相机、灯光与重力设置，绳子插值增加慢帧范围保护。卡片正面完整适配，背面保留原 atlas；连接器使用新图中的金属纹理，外形仍是原模型，未复刻蓝色按钮。源组件：https://www.reactbits.dev/components/lanyard 。

## 内容状态

- 工牌已替换为用户提供的黄色漫画设计；右侧相片位置暂用博客头像。
- 毕业学校、专业及简历 PDF 未提供，页面未编造。
- 澳达案例使用已有成品与脱敏截图，视频可在网页内播放。上线前仍需对每张公司素材作最后一轮公开范围核对。
- SnapSort 效率数字、合规卫士检测指标尚无可公开核验的同口径证据，页面未展示具体数字。
- 当前开屏采用 Remotion 帧动画，浏览器直接播放；可用 npm run motion 在 Studio 中查看横屏、竖屏两个版本。

2026-09-30：Work 改为双分类封面与简洁项目入口；案例添加界面缩略图、完整图片放大和视频播放器；开屏末段再启动工牌以减少同时渲染的负担。Remotion 源码在 app/intro-film.tsx，预览入口为 remotion/index.tsx。
