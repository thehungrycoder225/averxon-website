import { ProjectSchema, type Project, type Media } from "./schema";

export interface CulturalPillar {
  id: "culture" | "creativity" | "technology";
  index: string;
  pillar: "Culture" | "Creativity" | "Technology";
  title: string;
  description: string;
  highlights: string[];
}

export const CULTURAL_PILLARS: CulturalPillar[] = [
  {
    id: "culture",
    index: "01",
    pillar: "Culture",
    title: "Authentic Cultural Preservation",
    description:
      "Every project starts with Philippine folklore, regional mythology, and traditional games (Laro ng Lahi), so the stories and symbols we use are treated with respect.",
    highlights: [
      "Folklore and oral tradition research",
      "Traditional Filipino games and play",
      "Respectful, researched representation",
    ],
  },
  {
    id: "creativity",
    index: "02",
    pillar: "Creativity",
    title: "Hybrid Cultural Futurism",
    description:
      "We pair cinematic Philippine worldbuilding and expressive character art with modern game design that speaks to today's players.",
    highlights: [
      "Original characters and worlds",
      "Character-driven storytelling",
      "Atmosphere and environmental storytelling",
    ],
  },
  {
    id: "technology",
    index: "03",
    pillar: "Technology",
    title: "Real-Time 3D, Built for Everyone",
    description:
      "We build responsive games and web-based 3D experiences that run smoothly on powerful desktops and everyday phones alike.",
    highlights: [
      "Plays well on desktop and mobile",
      "Optimized 3D models and lighting",
      "Accessible, keyboard-friendly design",
    ],
  },
];

export interface ProcessStage {
  id: "concept" | "sculpt" | "gameplay";
  stepNumber: string;
  label: string;
  title: string;
  description: string;
  technicalNotes: string[];
  media: Media;
}

export const CREATION_STAGES: ProcessStage[] = [
  {
    id: "concept",
    stepNumber: "01",
    label: "Concept Art",
    title: "It Starts With Research and a Silhouette",
    description:
      "Every character begins with folklore research and concept art that settles the silhouette, costume, and personality before any 3D work starts.",
    technicalNotes: [
      "Front and back character views",
      "Expression studies",
      "Costume and accessory details",
    ],
    media: {
      id: "process-stage-concept",
      type: "image",
      src: "/assets/games/habulan/models/habulan-jie-concept_art.png",
      alt: "Concept art sheet for Jie from Habulan showing front, side, and back views, hair studies, and a range of facial expressions.",
      caption: "Jie — concept art sheet, Habulan: The Curse of the 5th Bell",
      credit: "AVERXON Studios",
      licenseStatus: "approved_first_party",
      dimensions: { width: 1254, height: 1254 },
    },
  },
  {
    id: "sculpt",
    stepNumber: "02",
    label: "Character Design",
    title: "Turnarounds From Every Angle",
    description:
      "Turnaround sheets show a character from the front, side, and back, so the 3D version stays true to the original design.",
    technicalNotes: [
      "Front three-quarter, side, and back views",
      "Consistent proportions across angles",
      "A shared reference for modeling and texturing",
    ],
    media: {
      id: "process-stage-sculpt",
      type: "image",
      src: "/assets/games/habulan/models/habulan-jie-turnaround.png",
      alt: "Jie character turnaround from Habulan in a T-pose showing front, left side, right side, and back views.",
      caption: "Jie — character turnaround, Habulan: The Curse of the 5th Bell",
      credit: "AVERXON Studios",
      licenseStatus: "approved_first_party",
      dimensions: { width: 1774, height: 887 },
    },
  },
  {
    id: "gameplay",
    stepNumber: "03",
    label: "From Concept to 3D",
    title: "Characters Ready for Play",
    description:
      "Finished designs become stylized 3D characters and game cards, made to read clearly in motion and on any screen.",
    technicalNotes: [
      "Real-time GLB model of Jie (Three.js)",
      "Front, side, and back camera presets",
      "Drag to orbit, auto-rotate showcase",
    ],
    media: {
      id: "process-stage-gameplay",
      type: "image",
      src: "/assets/games/habulan/models/habulan-jie-turnaround.png",
      alt: "Interactive real-time 3D model of Jie from Habulan, viewable from the front, side, and back.",
      caption: "Jie — interactive 3D model (jie_threejs_package), Habulan: The Curse of the 5th Bell",
      credit: "AVERXON Studios",
      licenseStatus: "approved_first_party",
      dimensions: { width: 1774, height: 887 },
    },
  },
];

/**
 * Canonical flagship title (owner-confirmed): "Legend of Bakunawa: Chronicles of Babaylan".
 * The route slug `chronicles-of-babaylan` is intentionally preserved for link compatibility.
 */
export const FLAGSHIP_TITLE = "Legend of Bakunawa: Chronicles of Babaylan";

const BAKUNAWA_ALT =
  "Key art of the Bakunawa, a colossal dark-scaled serpent studded with glowing moon-like orbs, rising open-jawed through storm clouds above floating cliffs.";
const REMONTADA_ALT =
  "Character design sheet for The Remontada showing front and back views, with neutral, angry, resolute, and fatigued expressions.";
const KEN_KEN_ALT =
  "Ken-Ken from Habulan in a T-pose: spiky two-tone hair, red patterned headband, yellow headphones, red woven-pattern vest, black cargo shorts, and red high-top sneakers.";
const NINING_JOAN_ALT =
  "Nining Joan from Habulan in a T-pose: flower-adorned updo, embroidered blouse with a purple vest, woven pink-and-purple skirt, satchel, and a glowing brass lantern.";
const HABULAN_LOGO_ALT =
  "Habulan logo: bold white lettering with a coconut palm, church belfry, and a sprinting figure, accented in lime green.";
const MYTH_CARD_ALT =
  "Manananggal entity card from the Night Hunter faction (cost 4, attack 3, defense 5), showing the winged Manananggal before a full moon and a ruined church.";
const MANANANGGAL_TURNAROUND_ALT =
  "Manananggal turnaround showing front three-quarter, side, and back views, with crimson bat wings, black hair, a red hibiscus, and gold-trimmed ribbon-like robes.";
const MANANANGGAL_FRONT_ALT =
  "Front view of the Manananggal with outstretched clawed arms, crimson bat wings, flowing black hair, and long gold-trimmed ribbons in place of a lower body.";

const rawProjects: Project[] = [
  {
    id: "game-chronicles-of-babaylan",
    slug: "chronicles-of-babaylan",
    canonicalTitle: FLAGSHIP_TITLE,
    subtitlePendingConfirmation: false,
    summary:
      "An action-adventure journey steeped in pre-colonial Philippine mythology, set beneath the shadow of the colossal moon-eating serpent Bakunawa.",
    description:
      "Legend of Bakunawa: Chronicles of Babaylan invites players into a mythic archipelago where the harmony between people and nature is threatened by encroaching darkness. Drawing from Visayan and pan-Philippine accounts of the moon-eating serpent Bakunawa and the revered role of the Babaylan as healer, mediator, and spiritual leader, the game weaves ritual magic, ancestral weaponry, and atmospheric exploration into one story.",
    culturalInspiration:
      "Inspired by pre-colonial Philippine cosmology, the spiritual leadership of the Babaylan, and the enduring myth of the Bakunawa—the colossal serpent said to rise from the sea to swallow the moon during an eclipse.",
    genres: ["Action-Adventure", "Mythological Narrative", "3D Exploration"],
    culturalThemes: [
      "Babaylan Spiritual Heritage",
      "Bakunawa Eclipse Myth",
      "Pre-Colonial Philippine Cosmology",
    ],
    heroMedia: {
      id: "hero-babaylan",
      type: "poster",
      src: "/assets/games/chronicles-of-babaylan/posters/bakunawa-key-art.png",
      alt: BAKUNAWA_ALT,
      caption: "Bakunawa — key art",
      credit: "AVERXON Studios",
      licenseStatus: "approved_first_party",
      dimensions: { width: 1024, height: 1536 },
    },
    posterFallback: {
      id: "poster-babaylan",
      type: "poster",
      src: "/assets/games/chronicles-of-babaylan/posters/bakunawa-key-art.png",
      alt: BAKUNAWA_ALT,
      caption: "Bakunawa — key art",
      credit: "AVERXON Studios",
      licenseStatus: "approved_first_party",
      dimensions: { width: 1024, height: 1536 },
    },
    gameMedia: {
      poster: {
        id: "gm-poster-babaylan",
        type: "poster",
        src: "/assets/games/chronicles-of-babaylan/posters/bakunawa-key-art.png",
        alt: BAKUNAWA_ALT,
        caption: "Bakunawa — key art",
        credit: "AVERXON Studios",
        licenseStatus: "owner_supplied_reference",
        dimensions: { width: 1024, height: 1536 },
      },
      secondaryPreview: {
        id: "gm-secondary-babaylan",
        type: "image",
        src: "/assets/games/chronicles-of-babaylan/references/babaylan-turnaround.png",
        alt: REMONTADA_ALT,
        caption: "The Remontada — character design",
        credit: "AVERXON Studios",
        licenseStatus: "owner_supplied_reference",
        dimensions: { width: 1024, height: 1536 },
      },
      approvedGLB: null,
      proceduralThree: "NONE",
      loadingStateLabel: "Loading artwork…",
      fallbackReasonLabel: "Artwork for this world is coming soon.",
      reviewStatus: "reference_locked_2d_only",
      reconstructionStrategy: "layered_2_5d_poster_parallax",
      worldAccentHex: "#01BEF5",
      worldSurfaceHex: "#151729",
      rights: {
        source: "image reference/chronicles-of-bakunawa-bakunawa.png",
        credit: "AVERXON Official Concept & Character Art",
        licenseStatus: "owner_supplied_reference",
        isApproved: false,
      },
    },
    gallery: [
      {
        id: "gal-babaylan-1",
        type: "image",
        src: "/assets/games/chronicles-of-babaylan/posters/bakunawa-key-art.png",
        alt: BAKUNAWA_ALT,
        caption: "Bakunawa — key art",
        credit: "AVERXON Studios",
        licenseStatus: "approved_first_party",
        dimensions: { width: 1024, height: 1536 },
      },
      {
        id: "gal-babaylan-2",
        type: "image",
        src: "/assets/games/chronicles-of-babaylan/references/babaylan-turnaround.png",
        alt: REMONTADA_ALT,
        caption: "The Remontada — character design",
        credit: "AVERXON Studios",
        licenseStatus: "approved_first_party",
        dimensions: { width: 1024, height: 1536 },
      },
    ],
    features: [
      {
        title: "Myth-Grounded Worldbuilding",
        description:
          "Explore sacred groves, coastal shrines, and eclipse-lit realms shaped by researched Philippine folklore.",
      },
      {
        title: "Ritual & Elemental Combat",
        description:
          "Channel ancestral chants, protective talismans, and agile melee techniques to restore spiritual balance.",
      },
      {
        title: "Cinematic Eclipse Atmosphere",
        description:
          "Moonlit shadow gives way to ritual firelight as the Bakunawa rises to swallow the moon.",
      },
    ],
    seo: {
      title: "Legend of Bakunawa: Chronicles of Babaylan | AVERXON Games",
      description:
        "Discover Legend of Bakunawa: Chronicles of Babaylan by AVERXON—an action-adventure inspired by Babaylan heritage and the Bakunawa eclipse myth.",
      canonicalPath: "/games/chronicles-of-babaylan",
      ogImage: "/assets/games/chronicles-of-babaylan/posters/bakunawa-key-art.png",
      noIndex: false,
    },
  },
  {
    id: "game-habulan",
    slug: "habulan",
    canonicalTitle: "Habulan: The Curse of the 5th Bell",
    subtitlePendingConfirmation: false,
    summary:
      "A tense folklore survival and chase game where the tolling of a forbidden fifth bell awakens nocturnal entities across a shadowed heritage town.",
    description:
      "Habulan: The Curse of the 5th Bell blends the adrenaline of Filipino tag and chase games (habulan) with atmospheric Philippine gothic and nocturnal folklore. Set in an old heritage town watched over by a weathered stone belfry, players navigate winding courtyards, listen for clues in the night air, and try to survive the omen that follows when the cursed fifth chime echoes across town.",
    culturalInspiration:
      "Combines the kinetic tension of traditional habulan (chase and tag) games with Philippine cautionary tales of old bell towers, nocturnal spirits, and sacred curfew hours.",
    genres: ["Folklore Survival", "Stealth & Chase", "Suspense"],
    culturalThemes: [
      "Philippine Nocturnal Folklore",
      "Heritage Towns & Bell Legends",
      "Traditional Chase Games",
    ],
    heroMedia: {
      id: "hero-habulan",
      type: "poster",
      src: "/assets/games/habulan/posters/habulan-logo-transparent.png",
      alt: HABULAN_LOGO_ALT,
      caption: "Habulan — game logo",
      credit: "AVERXON Studios",
      licenseStatus: "approved_first_party",
      dimensions: { width: 2000, height: 2000 },
    },
    posterFallback: {
      id: "poster-habulan",
      type: "poster",
      src: "/assets/games/habulan/posters/habulan-logo-transparent.png",
      alt: HABULAN_LOGO_ALT,
      caption: "Habulan — game logo",
      credit: "AVERXON Studios",
      licenseStatus: "approved_first_party",
      dimensions: { width: 2000, height: 2000 },
    },
    gameMedia: {
      poster: {
        id: "gm-poster-habulan",
        type: "poster",
        src: "/assets/games/habulan/posters/habulan-logo-transparent.png",
        alt: HABULAN_LOGO_ALT,
        caption: "Habulan — game logo",
        credit: "AVERXON Studios",
        licenseStatus: "owner_supplied_reference",
        dimensions: { width: 2000, height: 2000 },
      },
      secondaryPreview: {
        id: "gm-secondary-habulan",
        type: "image",
        src: "/assets/games/habulan/references/habulan-nining-joan.jpg",
        alt: NINING_JOAN_ALT,
        caption: "Nining Joan — character design",
        credit: "AVERXON Studios",
        licenseStatus: "owner_supplied_reference",
        dimensions: { width: 1024, height: 1536 },
      },
      approvedGLB: null,
      proceduralThree: "NONE",
      loadingStateLabel: "Loading artwork…",
      fallbackReasonLabel: "Artwork for this world is coming soon.",
      reviewStatus: "reference_locked_2d_only",
      reconstructionStrategy: "layered_2_5d_poster_parallax",
      worldAccentHex: "#FF6924",
      worldSurfaceHex: "#151729",
      rights: {
        source: "image reference/habulan-logo-transparent.png",
        credit: "AVERXON Official Logo & 3D Character Renders",
        licenseStatus: "owner_supplied_reference",
        isApproved: false,
      },
    },
    gallery: [
      {
        id: "gal-habulan-logo",
        type: "image",
        src: "/assets/games/habulan/posters/habulan-logo-transparent.png",
        alt: HABULAN_LOGO_ALT,
        caption: "Habulan — game logo",
        credit: "AVERXON Studios",
        licenseStatus: "approved_first_party",
        dimensions: { width: 2000, height: 2000 },
      },
      {
        id: "gal-habulan-nining-joan",
        type: "image",
        src: "/assets/games/habulan/references/habulan-nining-joan.jpg",
        alt: NINING_JOAN_ALT,
        caption: "Nining Joan — character design",
        credit: "AVERXON Studios",
        licenseStatus: "approved_first_party",
        dimensions: { width: 1024, height: 1536 },
      },
      {
        id: "gal-habulan-ken-ken",
        type: "image",
        src: "/assets/games/habulan/references/habulan-ken-ken.jpg",
        alt: KEN_KEN_ALT,
        caption: "Ken-Ken — character design",
        credit: "AVERXON Studios",
        licenseStatus: "approved_first_party",
        dimensions: { width: 1024, height: 1536 },
      },
    ],
    features: [
      {
        title: "Sound & Shadow Survival",
        description:
          "Use cover, careful lantern light, and the sounds of the night to stay ahead of relentless pursuers.",
      },
      {
        title: "The Fifth Bell Changes Everything",
        description:
          "Each toll shifts the town—altering patrol routes, visibility, and the safe paths home.",
      },
      {
        title: "Rooted in Local Cautionary Lore",
        description:
          "Follow Ken-Ken and Nining Joan through moonlit courtyards shaped by regional legends.",
      },
    ],
    seo: {
      title: "Habulan: The Curse of the 5th Bell | AVERXON Games",
      description:
        "Survive the toll of the cursed belfry in Habulan: The Curse of the 5th Bell, a Philippine folklore survival and chase game by AVERXON.",
      canonicalPath: "/games/habulan",
      ogImage: "/assets/games/habulan/posters/habulan-logo-transparent.png",
      noIndex: false,
    },
  },
  {
    id: "game-myth-mayhem",
    slug: "myth-mayhem",
    canonicalTitle: "Myth Mayhem",
    subtitlePendingConfirmation: false,
    summary:
      "A fast-paced clash of Philippine mythology, bringing iconic creatures, guardians, and heroes into a vibrant strategic card and arena battle.",
    description:
      "Myth Mayhem celebrates the diversity of Philippine mythology. Designed to make learning about local folklore thrilling and accessible, it pits legendary beings—like the Night Hunter faction's Manananggal—and cultural guardians against one another through expressive character designs and strategic card play.",
    culturalInspiration:
      "Draws on mythology and creature lore from across the archipelago, translating traditional traits, habitats, and legends into readable, expressive card and arena mechanics.",
    genres: ["Mythological Action", "Card & Arena Strategy", "Cultural Showcase"],
    culturalThemes: [
      "Philippine Mythological Creatures",
      "Folklore From Across the Archipelago",
      "Accessible Cultural Discovery",
    ],
    heroMedia: {
      id: "hero-myth-mayhem",
      type: "poster",
      src: "/assets/games/myth-mayhem/posters/myth-mayhem-card.png",
      alt: MYTH_CARD_ALT,
      caption: "Manananggal — entity card",
      credit: "AVERXON Studios",
      licenseStatus: "approved_first_party",
      dimensions: { width: 1067, height: 1474 },
    },
    posterFallback: {
      id: "poster-myth-mayhem",
      type: "poster",
      src: "/assets/games/myth-mayhem/posters/myth-mayhem-card.png",
      alt: MYTH_CARD_ALT,
      caption: "Manananggal — entity card",
      credit: "AVERXON Studios",
      licenseStatus: "approved_first_party",
      dimensions: { width: 1067, height: 1474 },
    },
    gameMedia: {
      poster: {
        id: "gm-poster-myth-mayhem",
        type: "poster",
        src: "/assets/games/myth-mayhem/posters/myth-mayhem-card.png",
        alt: MYTH_CARD_ALT,
        caption: "Manananggal — entity card",
        credit: "AVERXON Studios",
        licenseStatus: "owner_supplied_reference",
        dimensions: { width: 1067, height: 1474 },
      },
      secondaryPreview: {
        id: "gm-secondary-myth-mayhem",
        type: "image",
        src: "/assets/games/myth-mayhem/references/myth-mayhem-manananggal-3d-view.png",
        alt: MANANANGGAL_TURNAROUND_ALT,
        caption: "Manananggal — character turnaround",
        credit: "AVERXON Studios",
        licenseStatus: "owner_supplied_reference",
        dimensions: { width: 1448, height: 1086 },
      },
      approvedGLB: null,
      proceduralThree: "MYTH_CARD_PEDESTAL_CANDIDATE",
      loadingStateLabel: "Loading artwork…",
      fallbackReasonLabel: "Artwork for this world is coming soon.",
      reviewStatus: "reference_locked_2d_only",
      reconstructionStrategy: "controlled_manual_3d_character_workflow",
      worldAccentHex: "#8A45CD",
      worldSurfaceHex: "#151729",
      rights: {
        source: "image reference/myth-mayhem-card.png",
        credit: "AVERXON Official Card & Character Turnaround Art",
        licenseStatus: "owner_supplied_reference",
        isApproved: false,
      },
    },
    gallery: [
      {
        id: "gal-myth-card",
        type: "image",
        src: "/assets/games/myth-mayhem/posters/myth-mayhem-card.png",
        alt: MYTH_CARD_ALT,
        caption: "Manananggal — entity card",
        credit: "AVERXON Studios",
        licenseStatus: "approved_first_party",
        dimensions: { width: 1067, height: 1474 },
      },
      {
        id: "gal-myth-turnaround",
        type: "image",
        src: "/assets/games/myth-mayhem/references/myth-mayhem-manananggal-3d-view.png",
        alt: MANANANGGAL_TURNAROUND_ALT,
        caption: "Manananggal — character turnaround",
        credit: "AVERXON Studios",
        licenseStatus: "approved_first_party",
        dimensions: { width: 1448, height: 1086 },
      },
      {
        id: "gal-myth-front",
        type: "image",
        src: "/assets/games/myth-mayhem/references/myth-mayhem-manananggal.png",
        alt: MANANANGGAL_FRONT_ALT,
        caption: "Manananggal — character design",
        credit: "AVERXON Studios",
        licenseStatus: "approved_first_party",
        dimensions: { width: 1086, height: 1448 },
      },
    ],
    features: [
      {
        title: "Folklore-Driven Abilities",
        description:
          "Every creature card and faction—like the Night Hunter Manananggal—is built around traits from Philippine mythology.",
      },
      {
        title: "Bold, Readable Card Art",
        description:
          "Strong faction colors and clear stat frames keep every match easy to follow at a glance.",
      },
      {
        title: "Built for Community Showcases",
        description:
          "Pick-up-and-play depth crafted for student expos, cultural festivals, and community events.",
      },
    ],
    seo: {
      title: "Myth Mayhem | AVERXON Games",
      description:
        "Enter the arena of Philippine folklore in Myth Mayhem by AVERXON—where legendary creatures and guardians clash.",
      canonicalPath: "/games/myth-mayhem",
      ogImage: "/assets/games/myth-mayhem/posters/myth-mayhem-card.png",
      noIndex: false,
    },
  },
];

export const PROJECTS: Project[] = rawProjects.map((p) => ProjectSchema.parse(p));

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/**
 * Splits a canonical "Title: Subtitle" into display parts for typographic hierarchy.
 * The full canonical title is always preserved in the DOM for SEO and screen readers.
 */
export function splitDisplayTitle(title: string): { main: string; sub?: string } {
  const idx = title.indexOf(": ");
  if (idx === -1) return { main: title };
  return { main: title.slice(0, idx), sub: title.slice(idx + 2) };
}
