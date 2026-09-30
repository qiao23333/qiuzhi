# Design QA — 2026-09-30

Final result: passed for this iteration's supplied layout targets and implemented interactions.

## Scope and targets
Compared the supplied personal and company case reference images with fresh 1586 × 995, deviceScaleFactor 1 captures. Source images were proportionally normalized; only page layout, visual hierarchy and interactions were targets. Palette, identity, software UI and available materials intentionally differ. Combined comparisons: `_inspect/compare-personal.jpg`, `_inspect/compare-company.jpg`. About and contact were inspected against their supplied reference screenshots. This is an iteration, not a claim of pixel-identical imagery or final artistic approval.

## Findings and corrections
- P1: hero screenshot overflowed into the chapter. Fixed with a constrained flex media surface; recaptured fully contained screenshot.
- P1: the contact text layer intercepted the booth pointer target. Removed its pointer interception while keeping contact links interactive. Verified hover, click and hover-to-email continuity.
- P2: card overlap hid theme labels, especially on phones. Reduced desktop fan overlap; mobile now has a horizontal snap strip with complete cards.
- P2: portrait contact cropped the booth off screen. Corrected the asset positioning; recaptured the open booth with usable contact links.
- P2: initially empty 3D surface. Static badge remains until the resource-dependent scene has rendered eight frames; eager module loading and earlier intro warmup preserve drag physics.
- P2: company evidence misclassification. Removed shop covers from live/brand and social posts from systems, imported 123 library items, and split collections inside the evidence browser.

## Verification
TypeScript check and Vite production build passed. Fresh browser checks: no page errors or failed asset requests. Routes, section controls, zoom/Escape, SPA navigation, contact hover persistence, 720 × 1280 metadata and playback readiness for both new videos passed. 1920 × 1080 routes fit without horizontal overflow; main case views fit their desktop viewport. At 1366 × 768 the initial personal layout showed 15 px excess height; compact-height adjustment subsequently applied. Phones support scrolling and landscape rather than forcing orientation.

IAB inspection timed out; captures and interactions were performed with the installed Chromium test runtime. No remote source media or confidential customer records were newly published.

## Outstanding evidence
AI workflow is supported by business knowledge and content-structure materials. A full operation recording with input, AI processing, manual review and output is still needed for stronger case evidence. Client CRM rows were excluded; existing cropped workflow and guide images remain.
The final 1366 × 768 recheck covered all three personal cases: document height 768 px, chapter bottom 683.53 px, no overflow. The video collection includes all three videos. Long images now support a separately verified reading zoom with scroll, fit-to-screen toggle and Escape dismissal.
