# AVERXON — Functional and Technical Specification Sheet v2.1
Status: Proposed; design only.

## Functional requirements
FR01: Six navigation destinations with mobile and keyboard-accessible navigation.
FR02: Six-chapter immersive homepage with DOM sections and deep-link anchors.
FR03: Four dedicated game pages with verified content, galleries, cultural inspiration, development updates where available.
FR04: Achievements and partnerships with evidence workflow; no fabricated claims.
FR05: News listing and articles with metadata.
FR06: Connect page with server-validated, anti-spam contact form, accessible error/success states.
FR07: Scroll-linked 3D camera and scene transitions, quality presets, loading states, static fallback.
FR08: Optimized media with credits, licensing, and alt text.
FR09: SEO, canonical links, sitemap, OpenGraph metadata.
FR10: Optional img2threejs authoring pipeline for approved reference-to-procedural assets, never required for runtime.

## Proposed architecture
Next.js App Router + TypeScript for routing and server content; Tailwind + shadcn/ui + Poppins for UI; Three.js/R3F/Drei for canvas; GSAP ScrollTrigger for scroll timelines; Motion for nonconflicting DOM transitions; MDX or approved CMS; optimized CDN assets; Vercel deployment after approval.

## Proposed modules
`app/` routes and metadata; `components/ui/` shadcn primitives; `components/site/` navigation/cards/forms; `components/experience/` canvas/director/quality/fallback; `experience/scenes/` six chapters; `experience/animation/` timeline; `experience/quality/` device tier; `content/` typed content; `lib/` validation/SEO/analytics; `public/media/` approved assets.

## State model
BOOT -> STATIC_READY -> WEBGL_LOADING -> IMMERSIVE_READY; errors -> STATIC_FALLBACK. Quality AUTO/HIGH/MEDIUM/LOW/STATIC. Contact form IDLE/VALIDATING/SUBMITTING/SUCCESS/ERROR. Scroll position must synchronize DOM and scene; back/forward and deep links must work.

## Nonfunctional requirements
WCAG 2.2 AA; responsive >=320px; LCP <=2.5s, INP <=200ms, CLS <=0.1 at p75; 3D target 50fps desktop and 30fps midrange mobile with graceful degradation; server-side validation; privacy notice; safe external links; no secrets in client bundle; no mandatory 3D to read or navigate.

## img2threejs acceptance workflow
1. Inspect upstream README/license and verify Google Antigravity support, do not assume it.
2. Select approved simple Project Tumba reference asset with documented rights.
3. After explicit authorization, generate procedural Three.js output in isolated environment.
4. Compare silhouette, dimensions, materials and cultural context against approved image.
5. Inspect output TypeScript, security, geometry, draw calls, memory, loading time, mobile behavior.
6. Wrap with React Three Fiber adapter only after approval; dispose resources; provide static poster.
7. Reject or revert if inaccurate, inaccessible, unstable or over budget.

## Acceptance tests
AT01 routes/navigation work with and without WebGL; AT02 six chapters screen-reader readable; AT03 touch, mouse, keyboard scrolling and deep links synchronize; AT04 quality selector and static fallback work; AT05 reduced motion disables forced camera effects; AT06 mobile 320/375px no overflow; AT07 project content and awards evidence correct; AT08 contact form validates and handles errors; AT09 asset loading/context loss graceful; AT10 Lighthouse, axe, keyboard, NVDA/VoiceOver/TalkBack, real-device FPS and Web Vitals evidence attached; AT11 no unlicensed or copied reference-site assets; AT12 procedural asset passes owner visual review.

## Release gates
G0 content/identity; G1 design/storyboard; G2 explicit implementation approval; G3 functional, accessibility, performance and security QA; G4 explicit deployment approval.
