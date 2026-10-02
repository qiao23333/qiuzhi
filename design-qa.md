# Portfolio desk direction — visual QA, 2026-10-03

final result: passed

## Targets and scope

Selected target: `design/2026-09-30-cohesion/visual-direction-01.png` (warm collector desk). The board establishes the shared scene, materials, two-folder Work choice and independent phone/mail interactions. Actual badge artwork, avatar, application interfaces and company evidence replace the board's illustrative placeholder content. Case chapter structure retains the user's supplied case layout rather than the board's example English copy.

## Visual evidence

Local browser captures are saved in the working stage `_inspect` directory. The in-app browser failed to initialize with a missing kernel-assets path; Chromium browser captures and interaction checks were used as the fallback.

- `qa-contact-comparison-final.png`: source contact crop and actual open-phone screen together, each 1456 × 668.
- `qa-pages-comparison.png`: About, Work and personal case source panels beside the rendered pages. Board panels are camera close-ups with a different aspect ratio; these comparisons assess composition/material continuity, not a pixel-difference score.
- `qa-projects-{snapsort,compliance-guardian,xuanlan,aoda}.png`: cases at 1366 × 768.
- `check-desktop-*.png`: 1440 × 900; `desk-desktop-*.png`: 1920 × 1080.
- `check-landscape-*.png`: 844 × 390; `check-mobile-*.png`: 390 × 844.
- `contact-closed.png`, `contact-open.png`, `contact-both.png`: independent closed/open states.

## Iterations and fixes

1. P1: old paper-noise texture overwhelmed case text. Replaced with generated subtle paper folio artwork.
2. P1: old company layout collapsed theme cards into thin rows. Restored five selectable physical paper tabs with clear titles and selected state.
3. P1: About portrait layout clipped the experience and next link. Removed fixed portrait height and verified the complete scrolling page.
4. P1: isolated door was detached/narrow because a global image max-width overrode the texture mapping. Corrected the actual transparent bounds and hinge mapping; compared closed and open captures again.
5. P2: desk was too bare and evenly lit compared with the chosen board. Regenerated the background with foreground photographs, pen, books, plant and film props, while retaining room for real controls. The final source/implementation comparison uses this updated scene.
6. P2: small landscape cases placed their chapter below the selector. Restored the compact three-column chapter grid and verified all primary content fits the landscape viewport.
7. P2: long chapter copy hid the explanation action and skill icons. Made only the paragraph internally scrollable, keeping chapter actions visible; recaptured all personal cases at 1366 × 768.

## Functional checks

Verified real navigation from Work to SnapSort; three personal project entries; chapter changes; image dialog and Escape close; nine SnapSort gallery images; company theme changes; video starts and advances; independent phone/mail click states; phone and email links; zero horizontal page overflow at the tested sizes. No JavaScript errors or failed asset responses in these checks. Intro finishes at About and removes its overlay.

## Remaining polish, P3

- The contact scene uses a textured door with a perspective hinge, not a complete booth 3D model; fine hinge shading can improve in a later animation pass.
- The editable interface uses real materials, so its screenshot content differs from the generated board's fictional applications/person.
- Small landscape text is compact; full evidence remains available through enlargement and the gallery. Portrait uses natural vertical scrolling.
- AI workflow evidence still needs the user's full before/after demonstration; the current case accurately labels the available documentation.

No unresolved P0/P1/P2 item remains in this implementation scope.
