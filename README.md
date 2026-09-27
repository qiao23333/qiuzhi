# 王康桥求职作品集

静态前端作品集。当前版本包含信封开屏、About、Work、三个个人项目、澳达公司案例和 Contact。信封开屏是可继续调整的网页动效。

## 页面

- `/`：红色信封打开，信纸放大后进入 About；支持 Skip
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

Cloudflare Pages 使用 GitHub 仓库连接，构建命令 `npm run build`，输出目录 `dist`。当前开屏直接由前端代码制作，Remotion 样片等创意确定后再考虑。

## 内容状态

- 工牌暂用博客头像，后续替换本人照片。
- 毕业学校、专业及简历 PDF 未提供，页面未编造。
- 澳达案例使用已有成品与脱敏截图，视频可在网页内播放。上线前仍需对每张公司素材作最后一轮公开范围核对。
- SnapSort 效率数字、合规卫士检测指标尚无可公开核验的同口径证据，页面未展示具体数字。
- 当前信封开屏参考了用户提供的封蜡信件图与作品集视频的转场节奏，仍属可调整版本。
