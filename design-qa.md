# Visual and interaction check — 2026-09-28

final result: passed

Scope: supplied Lanyard artwork, live 3D integration, loading, desktop and portrait rendering, drag/release; wider layout corrections from the preceding iteration.

- Inspected the original GLB: card, clip and clamp meshes; two materials; embedded 1678 × 1677 atlas. Model geometry is unchanged.
- Front artwork is fitted to the original physical card ratio with margins. Main lettering, illustration and colors are retained. The original back atlas is preserved.
- Woven strap is extracted and rotated so its yellow stitch follows the rope. Original joints, gravity, camera and light configuration are retained.
- Connector image supplies its metal surface texture. The supplied connector silhouette and blue button cannot be reproduced exactly on the existing connector geometry; no replacement model was fabricated.
- Bounded rope interpolation prevents overshoot on slower frames. Disabled culling on the dynamically updated rope mesh. Drag/release checked visually.
- Desktop 1440 × 900 and portrait 390 × 844: one live Canvas, no page errors or failed asset requests in the check. Reduced-motion fallback uses the supplied front artwork.
- About/Work now use viewport-relative sizing; personal case title wrapping corrected; local and Pages base paths supported.

Remaining design review: user judgment of the intro sequence and overall visual direction; final copy; company card interaction can be replaced when the selected component is supplied. This report does not claim exact reproduction of the source video or a new connector model.

## 2026-09-30 — Envelope and portfolio refinement

- Added a 204-frame Remotion opening: lift seal, fold flap, withdraw letter, push into About. Desktop and portrait compositions share a deterministic timeline. Playback completes, Escape/Skip work, reduced-motion bypasses it.
- Delay live badge effects until the intro reveal. Paper grain is a cached raster texture to avoid expensive live SVG filters.
- Work uses two category covers and concise links. Company topics stay in its case page. No horizontal overflow at 390 × 844.
- Company media are thumbnail-selectable. Vertical MP4 loads as 720 × 1280 (readyState 4), retains its full frame and native controls. Theme buttons are all clickable.
- Personal projects include a deduplicated screenshot gallery; SnapSort event view can be enlarged. Lightbox closes with Escape and restores scrolling/focus.
- Contact hover remains open when moving to the email link; click interaction and mobile layout remain available.
- Verified desktop 1440 × 900, wide 1920 × 1080, portrait 390 × 844, landscape 844 × 390. Browser run reported no page errors or failed resource responses. TypeScript and production build passed.

Visual judgments and final wording still need the owner's review. Intro uses an authored 2.5D envelope, not a full 3D scene or exact reproduction of the source video.
