## Navigation and badge refinement — 2026-10-05

final result: passed for the repairs below

1. Reference: `D:\codex\WKQ\参考\求职\个人介绍页.png`. Before: the About container clipped the strap below the navigation; centered navigation competed with the foreground badge. After: right-aligned handwritten navigation, visible strap from the viewport edge, larger foreground badge, separate paper shadows. Preserved the original physics, model, UV and supplied textures. Adjusted print roughness/metalness and preloaded badge resources; loading art follows the same frame.
2. Company chapter cards now reuse the existing paper texture and show corresponding real previews. Selected cards lift gently; source images remain contained. Brand selection verified to show six brand assets rather than the 72 content assets.
3. Compact desktop case layout repaired: at 1280×720, SnapSort and company default states have a page height of 720 with no horizontal overflow. Expanded galleries intentionally scroll. SnapSort nine-image gallery and full-image viewer checked interactively.
4. Contact navigation matches the other pages without adding page height; removed its conflicting year label and gently corrected booth exposure. Existing projective door opening is preserved.
5. Intro completed into About in the actual browser and the WebGL badge reached its ready state. Fixed duplicate root creation during development reloads. Fresh final browser has no error logs or missing images.

Evidence: `_inspect/polish-about.png`, `polish-about-comparison.png`, `polish-about-mobile.png`, `polish-work.png`, `polish-company.png`, `polish-snap.png`, `polish-contact.png`. Desktop screenshots reviewed at 1280×720; portrait at 390×844. About 1920×1080 page bounds checked, but the available browser screenshot surface clips wider overrides, so the wide screenshot is not complete visual evidence. Native badge drag, project navigation and material expansion checked. TypeScript and production build passed.

Limits: this iteration repairs navigation, layering, surface presentation and compact desktop fit; the photographic door is still a projected image rather than a volumetric 3D booth. Creative intro and overall artwork can still be refined.
# Portfolio visual refinement — 2026-10-04

final result: passed

## Current selected reference and result
- Contact perspective repair, latest iteration: compared `联系方式参考3.png` for the right-hand hinge and outward door pose, and the selected warm tabletop mockup for the room. Replaced the screen-plane rotateY shortcut with a photographic projective door mapping: both hinge endpoints remain fixed and the free edge follows a quarter turn, exposing a visible outward-facing panel. Opening/closing reversals start from the current pose. First paint and resize reapply the projection.
- Generated a lower-camera tabletop plate matching the existing room; positioned the booth on overlapping postcards and the mailbox in the nearer foreground. Reduced displaced image shadows and matched the warm illumination/saturation. Retained handwritten closed labels, raised open lettering, independent controls, and icon-free contact copying; reduced letter extrusion for clearer digits.
- Verified in the actual in-app browser: desktop, 844×390 landscape, 390×844 portrait; open/closed and both-open captures; both clipboard values read back correctly; no horizontal overflow and no browser error logs. Evidence: `_inspect/contact-perspective-open.png`, `contact-perspective-both.png`, `contact-perspective-landscape.png`, `contact-perspective-portrait.png`. TypeScript and production build passed. This supersedes the previous CSS -90-degree matrix check below; a screen-plane angle was not an adequate test of the source-camera opening direction.
- Latest reference supersedes the theatre scene: supplied image 2 for the warm desk / large TELEPHONE extrusion; image 1 for EMAIL / number / @qq.com three-line extrusion. Existing photographic desk, phone, mailbox and yellow accent assets reused.
- Removed the separate copy icon. Contact values are accessible buttons that copy the exact plain phone/email value, use the native copy cursor, hover emphasis and temporary highlight; a screen-reader status reports the result. The app never substitutes a mail-app launch for failed copying.
- Corrected an interaction defect where the invisible raised lettering occupied the closed-mail hit area. Raised layers now have separate hit bounds and the mailbox remains clickable.
- About heading and copy refined; personal project cards reuse actual paper art with transparent surroundings; company detail retains its main title and drops redundant English labels. Navigation/backdrop have stable view-transition names.
- Latest checks: reference 1456×666, desktop 1456×850, compact 1366×768, portrait 390×844, landscape 844×390. Clipboard readback verifies both exact values; door matrix verifies 90 degrees. Screenshot comparison: `_inspect/archive-reference-comparison.png`. No missing assets/browser errors/horizontal overflow. TypeScript and build passed.
- Follow-up: corrected envelope body/flap source aspect ratios, matched flap width and seal position, removed the visible paper edge beneath the closed pocket, kept paper layering fixed and followed extraction with the camera. The paper-to-book blend now uses one aligned interval; the sheet alpha fringe is masked to its actual edge.
- Contact door now stops at exactly -90 degrees. Handwritten labels crossfade to raised lettering after a short opening delay and return on closing. Desktop, portrait and landscape checks verify the hinge matrix, independent open/close, readable contact bounds and no horizontal overflow.
- Remotion Studio now imports the same scene styling as the website. Binder preload added to the intro.
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

