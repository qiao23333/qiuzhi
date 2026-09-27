# 王康桥求职作品集

静态前端作品集。当前版本先完成 About、Work、三个个人项目、澳达公司案例和 Contact；开屏动画暂缓，首页直接进入 About。

## 页面

- `/`、`/about`：个人介绍与工牌
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

静态发布目录是 `dist/`。文案和项目链接在 `app/portfolio-data.ts`，新版页面在 `app/editorial-pages.tsx`，样式在 `app/editorial.css`，图片、视频和图标在 `public/portfolio/`。

Cloudflare Pages 使用 GitHub 仓库连接，构建命令 `npm run build`，输出目录 `dist`。开屏 Remotion 样片单独制作，确定后再接入首页。

## 内容状态

- 工牌暂用博客头像，后续替换本人照片。
- 毕业学校、专业及简历 PDF 未提供，页面未编造。
- 澳达案例使用已有成品与脱敏截图，视频可在网页内播放。上线前仍需对每张公司素材作最后一轮公开范围核对。
- SnapSort 效率数字、合规卫士检测指标尚无可公开核验的同口径证据，页面未展示具体数字。
- 开屏创意与转场还未定稿，因此本版没有播放旧开屏。
