# AVERXON — Immersive Website Design System & Asset Integration Specification

**Document ID:** AVX-DS-022  
**Version:** 2.2 — Logo-Aligned Hybrid Cultural Futurism + Approved Game Art Pipeline  
**Status:** Proposed design revision for owner approval; implementation requires separate authorization.  
**Project:** AVERXON — *Coding the Culture. Creating the Future.*  
**Scope:** Existing Antigravity-built Next.js website scaffold, UI styling, immersive homepage and four project showcases.  
**Input evidence:** Owner's four screenshots (Awakening hero; Babaylan/Tumba cards; Habulan/Myth Mayhem cards; arrow logo).  
**Reference precedence:** Owner-approved brand and assets > Master Lock > this design.md > specification sheet > development plan > existing implementation > speculative interpretations.

---

## 0. Implementation contract for Claude / Antigravity

1. **Do not rebuild the website from scratch.** Inspect and extend the existing scaffold; preserve working routing, six-chapter IA, accessible content, navigation, scroll positioning, shared components, and currently working animations.
2. **Do not fabricate the incoming four game images.** The owner will supply official reference images. Prepare the asset manifest, ingestion process, placeholders, and acceptance criteria first. Existing vector placeholders must remain identified as temporary until approved assets are integrated.
3. **Do not replace a character, reinterpret lore, or invent a final model** without an approved visual reference. If source art is insufficient for faithful 3D, use the approved 2D image and optional depth/parallax effects instead.
4. **Do not treat screenshot-derived palette estimates as final brand source files.** Screenshot is a sampling reference. Original vector/transparent logo remains authoritative once supplied.
5. **Do not use `img2threejs` as a magical image-to-perfect-3D substitute.** Evaluate method per subject. Use explicit model source, review images, license, and quality gates. Never silently replace an approved GLB asset with approximate procedural geometry.
6. **Maintain accessibility and SEO:** all essential copy, cards, CTAs, and status must be real HTML, not canvas-only; the site's contents remain fully usable with WebGL disabled.
7. **Stages:** audit existing site -> design token update -> asset intake -> one representative vertical slice -> approve -> remaining three games -> integrated immersive chapters -> QA. End each stage with modified files, evidence, pass/fail/not-tested matrix, and owner checkpoint.

## 1. Existing UI review (from supplied screenshots)

### 1.1 What to retain

- Six chapters: Awakening, Heritage, Four Worlds, Milestones, Creation, Future.
- Hero headline: **We Don't Just Create Games. We Bring Culture to Life.**
- Tagline: **Coding the Culture. Creating the Future.**
- Rich dark backgrounds, large display typography, slim section chapter navigation, game taxonomy chips.
- Four featured games: Chronicles of Babaylan, Project Tumba: Tumbang Preso, Habulan: The Curse of the 5th Bell, Myth Mayhem.
- Three.js/React Three Fiber/GSAP immersive architecture, Poppins and shadcn/ui.
- Current working interactions and layout structure, barring explicit improvements below.

### 1.2 Deficiencies observed

- Hero eclipse rings sit behind/through the headline and compete with text hierarchy; maintain a clear no-overlap typography zone.
- Four showcase visuals rely on simple circle/triangle/arch/diamond geometry; remove these after approved game art integration.
- The game cards use nearly identical composition and do not communicate individual worlds.
- Current UI overuses muted purple and metallic gold relative to the supplied arrow logo.
- Upper visual areas in game cards lack recognizable game-specific environments or characters.
- Screenshots show a right-side chapter rail close to cards. Enforce a desktop safe inset so cards and content never collide with it.
- Game summaries are visually at risk of clipping below fold boundaries; cards must have natural-height text regions and responsive sizing.

### 1.3 Product direction

**Cinematic Filipino cultural storytelling with a modern, logo-derived futuristic interface.** The homepage should transition from an abstract technical scaffold to recognizable, approved, culturally grounded worlds. Brand colors unify the website; game artwork supplies the distinct identity of each world.

## 2. Brand system — logo-derived foundation

The supplied logo is a forward-moving arrow whose visible gradient transitions from orange/yellow to violet/blue/cyan against a very dark indigo/navy background. The arrow conveys motion, innovation, forward progress, and digital creativity. Use its characteristic silhouette or an official approved mark, not invented reproductions or a different logo.

### 2.1 Palette (provisional image-derived tokens)

| Token | Hex | Purpose |
|---|---|---|
| `--avx-navy-950` | `#030237` | Primary brand navy sampled from supplied logo background |
| `--avx-obsidian` | `#090B16` | Neutral dark surface near hero/scene transitions |
| `--avx-slate-900` | `#151729` | Cards and secondary panels |
| `--avx-slate-800` | `#22253A` | Floating UI background and overlays |
| `--avx-amber-500` | `#FDB001` | Logo-derived warm highlight; sparingly for labels |
| `--avx-flame-500` | `#FF6924` | Logo warm gradient transition; promotional highlights |
| `--avx-violet-500` | `#8A45CD` | Logo gradient midpoint and interactive secondary accents |
| `--avx-blue-500` | `#087BE6` | Primary interactive highlight and active state candidate |
| `--avx-cyan-400` | `#01BEF5` | Logo arrow tip, focal light, futuristic emphasis |
| `--avx-white` | `#F5F5FA` | Accessible main text |
| `--avx-muted` | `#B6B9C9` | Descriptions and metadata |
| `--avx-border` | `#30344A` | Card edges, dividers, form borders |

These are **visual design proposals**, not instrument-calibrated brand standards; the supplied logo raster is small and has compression/anti-aliasing. Confirm against the actual logo artwork before committing final tokens. Previous heritage gold `#D8AE63` and arcane violet `#8056D9` can remain as legacy/heritage-support tokens if needed for cultural detail; do not compete with the new logo-derived accents.

### 2.2 Gradient system

- **Official brand expression:** approximately `linear-gradient(100deg, #FDB001 0%, #FF6924 20%, #8A45CD 48%, #087BE6 75%, #01BEF5 100%)`. Adjust stops after authoritative logo file review; never recolor the logo bitmap to force a match.
- **Brand accent usage:** thin feature dividers, headline accent on only a few words, active progress, restrained CTA flourish, transition sparks.
- **Never:** apply full rainbow gradients to every card, paragraph, border, or button; do not use a repeated gradient as a replacement for actual artwork.
- **Background:** deep navy/obsidian with localized soft blue/cyan or orange rim lighting, not large solid bright fills.
- **Legibility:** body text stays neutral white/muted, not gradient text. Audit WCAG contrast for all combinations; saturated amber/orange on white and cyan on white are not assumed accessible.

### 2.3 Semantic shadcn tokens

Map project tokens onto the installed version of shadcn/ui and Tailwind, respecting its current design token syntax rather than overwriting blindly:

- `background`: `#030237` or section-appropriate obsidian
- `foreground`: `#F5F5FA`
- `card`: `#151729`; `card-foreground`: `#F5F5FA`
- `popover`: `#151729`; `popover-foreground`: `#F5F5FA`
- `primary`: choose validated accessible blue/cyan-on-dark combination (do not adopt a low-contrast pair blindly)
- `primary-foreground`: contrast-tested color
- `secondary`: `#22253A`; `secondary-foreground`: `#F5F5FA`
- `muted`: `#22253A`; `muted-foreground`: `#B6B9C9`
- `accent`: `#8A45CD`; `accent-foreground`: contrast-tested color
- `border`, `input`: `#30344A`
- `ring`: an accessibility-tested cyan or amber focus ring, minimum 3:1 surrounding contrast
- CSS custom properties for gradient positions and scene glow must be scoped to brand/experience utilities, not hard-coded into every component.

## 3. Typography & UI

- **Primary:** Poppins 400/500/600/700. **Optional editorial display:** Space Grotesk 600/700, used selectively. No font changes for culturally sensitive scripted text without language review.
- Hero heading on desktop: `clamp(3.25rem, 5.3vw, 5.75rem)`, line-height roughly `1.05–1.12`; cap text line length to around 13–16 words in its column.
- Section headings: `clamp(2.25rem, 3.5vw, 3.75rem)`; body 16–18px; microcopy never smaller than 12px.
- Chips: small, compact, legible, no more than three visible per project before wrapping; true focusable chip only if interactive.
- Buttons: shadcn variants `brand`, `outline`, `ghost` with distinct hover/focus/disabled/loading semantics; min 44x44px touch targets.
- Cards: 12–20px radius, hairline border, restrained shadow, interior spacing 20–28px; no heavy ornamental outlines across every component.
- Cultural motifs: subtle researched Filipino textile/architectural patterns in low-contrast strips, transition masks, or illustrations; label provenance and avoid treating Baybayin as decorative gibberish.

## 4. Layout specification

- Desktop >=1280px: 12 columns; max content width 1280–1360px; section side padding 56–72px. Tablet 768–1279px: 8 columns, 28–36px. Mobile <=767px: 4 columns, 16–24px; include 320px testing.
- Hero desktop: 45–52% bounded text region on left, 48–55% 3D visual/cinematic stage on right. Do not allow camera or rings to obscure essential text. Optional background bokeh can cross behind text only if low contrast and visually tested.
- Hero 3D safe zones: left 0–52% for text; top 10% for header; bottom reserved for CTA and scroll cue. Camera framing must preserve these constraints at 1024, 1280, 1440, 1920 widths.
- Featured games: two-column desktop cards, single-column mobile; meaningful 3D/artwork aspect ratio approximately 16:10 or 4:3. Caption/description flows after the media with no fixed clipped height.
- Right chapter rail: reserve a 72–96px desktop right-side exclusion zone (or position rail outside content max width), never cover buttons/cards. At mobile widths, replace with a compact chapter selector/progress treatment.
- Respect sticky header offset, browser address bar, safe-area insets, and reduced-motion preference. Use `scroll-margin-top` on section anchors.

## 5. Homepage visual & narrative contracts

### Chapter 01 — Awakening

- Keep approved hero headline and tagline.
- Replace abstract circle stacks with an **approved Bakunawa eclipse visual**, ideally a validated 3D creature or layered approved scene artwork. Without a high-quality approved 3D asset, display an approved 2D cinematic visual with controlled depth/parallax, not a generic ring pretending to be the Bakunawa.
- Lighting may softly mix blue/cyan rim accents with orange eclipse glow, balancing logo identity and folklore atmosphere.
- CTAs: Explore Our Worlds / Our Story. CTA and header must always remain readable during camera movement.

### Chapter 02 — Heritage

- Three pillars: Culture, Creativity, Technology; use official or culturally researched artifacts and consistent restrained motion.
- Color gradient appears as a connecting motif, not generic neon décor.

### Chapter 03 — Four Worlds

Each game has a **unique environment, approved key art, 3D focal subject, and dominant world color grading**; the website frame remains coherent with the master brand:

| Game | Approved art to request | 3D candidate | Design emphasis | Avoid |
|---|---|---|---|---|
| Chronicles of Babaylan | Character/environment key art, Bakunawa reference, approved turnarounds | Bakunawa/eclipse or lore artifact, or approved GLB | Mythic atmospheric fantasy, cultural depth, luminous celestial light | Replacing original character with arbitrary fantasy model |
| Project Tumba: Tumbang Preso | Street scene, can/slipper references, gameplay visuals | Can and slipper with physically plausible materials | Warm community energy, playful street perspective | Generic cylinders without recognizable street-game context |
| Habulan: The Curse of the 5th Bell | Approved characters, Baryo/Cursed Forest environment, villain references | Fifth Bell artifact, environmental scene or approved character GLB | Suspense, lantern/fog silhouette, playful chase energy | Literal unrelated arch/tomb silhouette without game setting |
| Myth Mayhem | Approved card frame, hero character, arena, existing 3D assets | Display card pedestal, turntable card, approved arena elements | Legendary card arena, magical effects, precise card framing | Plain diamond emblem that doesn't resemble the game |

- Keep exact approved project names and canon; verify the Chronicles of Babaylan subtitle before publication.
- Card media area must be visually meaningful even before WebGL loads. Use user-supplied images as poster fallback and as reference for camera framing/model construction. Do not claim a generated reconstruction is an original game asset.
- Required HTML content: title, genre, 1–2 sentence description, platform/status only if verified, CTA linking to project page, alt/caption/credit.

### Chapter 04 — Milestones

- Verify each recognition and partnership before promotion; maintain factual badges. Use an editorial timeline and restrained interactive constellation, if appropriate.

### Chapter 05 — Creation

- Show authentic stages: concept art -> reference preparation -> 3D production -> playable prototype. Display annotations and asset provenance. A reconstructed demo must be described as a prototype, not a shipped game screenshot.

### Chapter 06 — Future

- Collaboration CTA with confident editorial copy, subtle logo-derived horizon gradient, contact route, privacy-respecting form, and standard semantic footer.

## 6. Game image intake & no-generic-model policy

### 6.1 Owner submission protocol

The owner will supply official artwork separately, one game or batch at a time. Do not generate models until each game's references arrive. Preferred bundle per game:

1. Official key art or hero composition (PNG/WebP/JPG; original full resolution if available).
2. Subject views: front, side, back or three-quarter, if reconstructing a character/object.
3. World/background imagery or environment layout for camera framing.
4. Approved logo/card frame/game title mark and any typography rules.
5. Visual elements that must remain unchanged; permitted stylizations; source rights/credits.

For each submission, inspect aspect ratio, subject visibility, pose, silhouette, distinguishing details, lighting, scene layout, and what cannot be inferred from one image. Distinguish official reference from conceptual art.

### 6.2 Manifest & naming

Suggested structure, adjust to actual repository:

```text
public/assets/
  brand/averxon-logo-original.[svg|png]
  games/
    chronicles-of-babaylan/{references,posters,models,textures}/
    project-tumba/{references,posters,models,textures}/
    habulan/{references,posters,models,textures}/
    myth-mayhem/{references,posters,models,textures}/
  shared/{patterns,particles,icons}/
```

Every asset entry must include `id`, `projectId`, `type` (`reference`, `poster`, `model`, `texture`), `source`, `licenseOrPermission`, `isApproved`, `approvedBy`, `approvalDate`, `caption`, `alt`, `fileSizeBytes`, `dimensions`, `geometryMetrics?`, `fallbackPoster`, `visualReviewStatus`, `lastUpdated`. No `isApproved: true` default.

### 6.3 Decision tree for reconstruction

- Existing approved GLB/FBX/Blender asset available? **Prefer original approved model**; optimize and import after technical validation.
- Simple hard-surface prop? **Trial img2threejs** procedural TypeScript `THREE.Group` reconstruction and compare to reference. Some third-party hosted services may also offer GLB outputs; verify exactly which tool/mode is being used and its terms.
- Character with face, costume, complicated silhouette? **Use approved existing model or controlled 3D modeling workflow**; procedural image-only output is provisional and may be rejected.
- Rich landscape/environment from 2D artwork only? Prefer layered parallax/2.5D with deliberate camera limits, or manually art-directed 3D environment. Do not pretend one painting specifies complete geometry.
- Fidelity gate fails? Keep approved 2D image. **No generic substitute enters production.**

### 6.4 Reconstruction approval gates

- A0 **Ownership:** owner-provided source, rights clear, official status marked.
- A1 **Reference lock:** subject description, shape, color, cultural elements, no-redesign notes approved.
- A2 **Blockout review:** canonical silhouette and proportion within approved tolerance.
- A3 **Material & detail review:** distinctive textures, accessories, markings and game-specific cues match references.
- A4 **Browser technical review:** GLB or procedural `THREE.Group` loads, disposes resources, respects camera, animations, loading, fallback.
- A5 **Performance review:** acceptable load, memory, fps and mobile downgrade; produce actual test evidence.
- A6 **Owner visual approval:** side-by-side comparison of source image and final scene at target camera angle, explicit signoff.

## 7. Three.js, R3F & scene pipeline

- Keep one main immersive canvas when practical; client-only SSR boundary. Code-split heavy components. Avoid mounting multiple WebGL contexts for each game card by default; use poster/thumbnail views and focus the 3D renderer on the selected world or a staged canvas.
- Define deterministic `SceneDirector` with chapterId, scrollProgress, selectedGameId, sceneQuality, reducedMotion, userPaused, assetsReady and error status.
- Limit camera movement: do not let subject, particles or eclipse rings enter title/CTA safe areas.
- Use GSAP ScrollTrigger for camera/scene timeline, Motion for DOM-only microinteractions; avoid competing animators on the same value.
- Compressed GLB/glTF assets and textures as warranted (Meshopt/Draco, KTX2), preloaded critical poster, lazy-loaded scene assets; stream other game models after intent/proximity to viewport.
- Favor baked light, environment maps, limited dynamic lights and selective particle effects. Make postprocessing optional in quality presets.
- Maintain color correctness: work with modern Three.js color management, sRGB annotations for color maps, linear working space, and appropriate output color space; inspect model materials and exposure in target browser (see Three.js manual: https://threejs.org/manual/pages/color-management.html).
- Dispose geometry/materials/textures on replacement; handle context loss/recovery and abort stale network loads on chapter changes.
- Do not imply unlimited device capability. Quality modes: Auto, High, Medium, Low, Static. Static is a fully usable default fallback.

## 8. Motion & states

- Scroll should remain native; chapter progress cannot trap focus or require pointer-only input.
- Hover/reveal 180–500ms, with no continuous high-frequency visual effect behind body text.
- Support `prefers-reduced-motion`: skip camera travel, parallax, pulsing/particle-heavy effects, while retaining all content and navigation.
- Transitions between games may use brand arrow streaks, environmental light shifts, or silhouette-to-scene reveals, but must preserve distinct game art identities.
- No autoplay audio; add user-initiated audio only if approved.

## 9. UX & accessibility

- WCAG 2.2 AA target; visible focus, keyboard navigation, skip navigation, heading hierarchy, screen reader labels, non-color cues, text enlargement and 200% zoom tested.
- Canvas alone is never primary content; use accessible DOM summaries and captions for each 3D scene. If entirely decorative, mark canvas `aria-hidden` appropriately.
- Avoid cards that turn into illegible hover-only information. Content must be accessible on touch and keyboard.
- Use semantic button/link roles, dialog focus traps where needed, clear external-link behavior, alt text describing meaningful source art rather than declaring '3D model'.
- No screen covered by chapter rail on small desktop sizes; no horizontal overflow at 320px.

## 10. Performance budgets & measurements

- Core Web Vitals at 75th percentile targets: LCP <=2.5s, INP <=200ms, CLS <=0.1.
- Scene quality targets: >=50fps typical desktop and >=30fps representative midrange mobile during active scenes, with auto degradation; these are targets, not asserted results.
- Use audited limits for initial critical media and 3D loads; do not enforce arbitrary fixed file thresholds without knowing visual/device requirements. Record compressed bytes, triangle count, draw calls, texture memory, GPU timings, FPS and network behavior per scene.
- Keep non-WebGL version fully functional on slow network and unsupported browsers. Test 3D fallback before integrating full assets.

## 11. Responsive design acceptance

| Viewport | Required behavior |
|---|---|
| 320–375px | No overflow, single-column cards, approved poster images, accessible menu, concise scroll progress, CTA visible |
| 390–767px | Single-column portfolio, optimized assets, no mandatory camera animation |
| 768–1023px | Balanced 1- or 2-column card layout depending on readable content, compact chapter control |
| 1024–1279px | Desktop-like navigation without collision; enforce rail safe area |
| 1280–1599px | Two-column game grid, hero left/right staging, full rail |
| 1600–1920px+ | Max content width retained, large cinematic stage without excessive empty fields |

## 12. Acceptance criteria: design revision

- [ ] Existing layout and all six chapter routes/anchors remain functional.
- [ ] Logo correctly represented from official asset and new palette implemented via semantic tokens; screenshot approximations distinguished from final brand color values.
- [ ] The original AVERXON mark is neither redrawn nor distorted.
- [ ] Hero text and CTA no longer collide with eclipse geometry at all target widths.
- [ ] Every game card uses a game-specific approved poster, even if 3D is unavailable.
- [ ] Every 3D model has documented official reference, rights, review comparison, and owner approval.
- [ ] No placeholder circle/triangle/arch/diamond is represented as a completed game model.
- [ ] Image-to-3D process is conditional; fidelity failures produce a safe 2D fallback.
- [ ] Cards, chapter rail, and scroll timeline function on desktop and mobile.
- [ ] Poppins and approved shadcn/ui behavior retained; cultural ornaments are researched and restrained.
- [ ] Tests: responsiveness, accessibility, reduced motion, no WebGL, network failure, model disposal, animation regression, and performance documented.
- [ ] No deployment without explicit project-owner approval.

## 13. Change management and approved workflow

**Stage 1 (now):** inspect source, inventory placeholder components, integrate design tokens and prepare image intake; no 3D reconstruction until owner uploads approved references.  
**Stage 2 (per game):** reference analysis -> candidate strategy -> preview -> fidelity comparison -> approval -> optimized integration.  
**Stage 3:** immersive hero and chapter transitions integrated, benchmarked and signed off.  
**Stage 4:** production QA and deployment separately approved.

**Design non-negotiable:** an accurate approved image is preferable to a visually polished but inaccurate AI-generated 3D object. AVERXON's game worlds and cultural specificity must remain recognizable.
