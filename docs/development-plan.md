# AVERXON — Development Plan v2.1
Status: Proposed planning schedule, not implementation authorization. Durations are indicative working-day ranges, dependent on approved assets.

## Phase 0 — Discovery and asset audit (2–4 days)
Inspect existing repo, dependencies, approved artwork, 3D models, rights, achievements, domain and contact information. Resolve canonical Babaylan subtitle and asset availability. Deliver gap analysis, content matrix and risk register. Gate G0.

## Phase 1 — Design and storyboard (4–6 days)
Create desktop/mobile high-fidelity layouts, six-chapter storyboard, camera journey, scroll map, interaction states, shadcn design tokens, static fallback and accessible content flow. Gate G1.

## Phase 2 — Accessible static website (5–8 days)
After G2 approval: build Next.js/TypeScript, Poppins/shadcn/ui, six routes, four game pages, achievements, news, connect, SEO, semantic six-chapter homepage and static poster artwork. Test responsiveness and keyboard accessibility.

## Phase 3 — Three.js proof of concept (4–7 days)
Implement Awakening chapter with R3F/Drei, GSAP timeline, static fallback, quality tiers, loading and WebGL error handling. Measure desktop/mobile FPS and transfer sizes. Do not expand before passing review.

## Phase 3B — Optional img2threejs pilot (2–4 days, may overlap)
Inspect current upstream license/install docs and Antigravity compatibility. After separate approval, reconstruct one Project Tumba can reference, compare visually, inspect generated code, benchmark geometry and memory, and accept/reject. Do not block main launch if this fails.

## Phase 4 — Full immersive experience (7–12 days)
Implement Heritage, Four Worlds, Milestones, Creation, Future. Integrate approved assets, scroll transitions, lazy loading, media optimization, accessible DOM overlays, static fallback and reduced-motion support.

## Phase 5 — QA and release readiness (4–6 days)
Cross-browser and mobile testing, accessibility audit, Core Web Vitals, security/contact-form testing, content verification, licensing, real-device FPS, fallback and rollback tests. Resolve critical issues. Gate G3.

## Phase 6 — Deployment (only after G4)
Vercel preview and approval, CDN and environment configuration, domain and monitoring, rollback plan, production release and post-launch tuning.

## Priority
P0: correct content, six navigation destinations, four games, accessibility, static fallback, contact and SEO.
P1: 3D hero, scroll timeline, Four Worlds, adaptive quality.
P2: remaining 3D chapters, optional img2threejs props, richer process gallery.
P3: interactive lore/bestiary and future web demos.

## Risks
Large assets: compression and lazy loading. GPU limitations: quality tiers and static mode. Cultural inaccuracies: research and owner review. AI code drift: master lock and tests. Licensing: provenance/evidence gate. Agent incompatibility: manual workflow fallback. No P0/P1 blockers before production approval.
