# AVERXON Website — Master Lock v2.1
Status: Proposed architecture enhancement. Design only; implementation and deployment not authorized.

## Brand invariants
AVERXON — **Coding the Culture. Creating the Future.** Identity: Philippine cultural preservation through gaming, interactive storytelling, and immersive 3D experiences. Approved design: Hybrid Cultural Futurism; Obsidian, Arcane Violet, Heritage Gold; Poppins primary font; shadcn/ui components.

## Information architecture
Six primary destinations: Home, About, Our Games, Achievements, News & Events, Connect. Dedicated game pages for: Chronicles of Babaylan (subtitle must be confirmed: *The Curse of Bakunawa* versus *Legend of Bakunawa*), Project Tumba: Tumbang Preso, Habulan: The Curse of the 5th Bell, Myth Mayhem.

## Achievement claims (publication evidence required)
Level Up 2.0 finalist; Level Up 3.0 finalist in Professional and Student categories; Cyber Craft PH partnership; PROPEL DOST Region IV-B participant. Do not invent dates, award wins, sponsorships, or endorsements.

## Approved design direction and proposed v2.1 extensions
- Preserve cultural identity and approved game characters, artwork, and visual language.
- Proposed immersive homepage: Awakening, Heritage, Four Worlds, Milestones, Creation, Future.
- Hybrid semantic DOM + WebGL, not canvas-only content. Standard scrolling, SEO, keyboard navigation, screen reader support, reduced-motion mode, and static fallback are mandatory.
- Proposed stack: Next.js/TypeScript, Tailwind, shadcn/ui, Poppins, Three.js, React Three Fiber, Drei, GSAP ScrollTrigger, Motion for DOM microinteractions, Vercel.
- **img2threejs is optional authoring tooling**, not a runtime dependency. Source: https://github.com/img2threejs/img2threejs. Use to experiment with procedural reconstructions of small approved props, subject to licensing, fidelity, performance, and agent compatibility review.
- Do not copy assets, proprietary code, or scene choreography from https://cornrevolution.resn.global/.
- MVP excludes commerce, login, forums, and playable full games.

## Open decisions
Confirm Babaylan subtitle; official logo and asset rights; evidence for achievements and partnership; contact channels/domain; CMS choice; approval of individual 3D scene storyboards; Antigravity compatibility of img2threejs.

## Governance
G0 brand/content and design approval; G1 storyboard approval; G2 explicit implementation authorization; G3 QA; G4 explicit production deployment authorization. Changes to locked brand, cultural representation, navigation, game identity, or verified claims require approval. This document grants neither G2 nor G4.
