# Portfolio visual refinement — 2026-10-04

## Current selected reference and result
- Contact follows the lower theatre scene in `design/2026-09-30-cohesion/visual-direction-03.png`: charcoal backdrop, burgundy curtains, warm brass lighting, handwritten contact labels and postage links.
- About and Work now size their principal objects against both viewport width and height, without the previous narrow desktop width caps. At 1920×1080 both fit within the viewport.
- About typography and copy now use a clear introduction, factual experience and graduation/job-search status.
- Intro uses a slower envelope opening, paper extraction and camera push. Its final binder position aligns with About. The opaque parent layer that prevented the actual handoff was corrected.
- Contact phone/mail interactions remain independent; phone and email are readable before interaction. Portrait layouts place the two contact labels in separate columns.
- Fresh reference/actual comparison: `_inspect/theatre-contact-comparison.png`. Fresh intro handoff: `_inspect/bridge-final-215.png`.
- Theatre checks cover 1456×650, 1920×1080, 390×844 and 844×390, with no horizontal overflow, missing assets or browser errors. TypeScript and production build passed.
- Scope passes the selected composition and interaction checks. The booth and mailbox retain the existing asset perspectives; they are not identical to the mockup camera angles.

## Previous repair verification — 2026-10-03

Visual direction: approved warm desk, paper binder/folders, red booth and mailbox (visual-direction-01). Compared with fresh browser captures; no new visual direction introduced.

## Repairs
- Replaced six overlapping legacy page stylesheets with one page stylesheet; preserved the badge physics and provided art.
- Corrected desktop and mobile text sizes, About hierarchy and excessive mobile badge spacing.
- Preserved A/B first selection, then three personal project entries; images remain contained and cannot push over titles.
- Reworked case chapters and company details into readable selection / description / evidence columns.
- Removed stretching of the paper frame on tall mobile pages; materials remain accessible by collection, gallery and full-screen zoom.
- Moved the zoom dialog to the document root so page shadows cannot limit its viewport or layer order.
- Separated phone and email on mobile, including the both-open state; added a short hover exit delay.
- Preloaded opening visual assets before starting the film and aligned its final camera scale with the actual paper dimensions.

## Verified
- TypeScript check and production build.
- Fresh screenshots at 390×844, 844×390, 1366×768, 1440×900 and 1920×1080.
- No horizontal overflow at checked viewports; no browser exceptions or missing assets.
- Default desktop case states fit at 1366×768 and larger. Expanded material galleries intentionally scroll.
- Personal navigation, chapter change, nine-image SnapSort gallery, zoom opening/Escape, full-viewport zoom bounds.
- Company five themes load corresponding materials; native video playback advances.
- Contact independent open/close, and mobile both-open phone/email bounds do not overlap.
- Intro completes into About; actual 3D badge reaches its ready state, with static art displayed during loading.

## Limits
- Phone landscape uses readable scrolling rather than compressing the full case into tiny text.
- The WebGL badge remains a large lazy-loaded dependency; static art is the loading / reduced-motion / error fallback.
- AI workflow evidence still lacks a complete before/after operation demo. Existing material and its stated limits are preserved.
- This is a verified repair of layout and interaction defects, not a claim that every creative detail is final.
