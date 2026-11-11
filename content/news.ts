import { ArticleSchema, type Article } from "./schema";

const rawArticles: Article[] = [
  {
    id: "art-hybrid-cultural-futurism",
    slug: "introducing-averxon-hybrid-cultural-futurism",
    title: "Coding the Culture: Inside AVERXON's Hybrid Cultural Futurism Vision",
    excerpt:
      "How AVERXON combines researched Philippine folklore, traditional play mechanics, and accessible real-time 3D web and game engineering.",
    body: [
      "AVERXON was founded on a clear conviction: Philippine folklore, mythology, and traditional play deserve to be experienced not as static museum footnotes, but as living, interactive worlds.",
      "Our visual and engineering philosophy—Hybrid Cultural Futurism—pairs deep respect for cultural sources with modern, accessible user interfaces and real-time 3D craft. Rather than copying generic neon tropes or inventing unverified motifs, every project begins with research into the stories and traditions that shaped communities across the archipelago.",
      "Across our flagship worlds—Legend of Bakunawa: Chronicles of Babaylan, Habulan: The Curse of the 5th Bell, and Myth Mayhem—our team works to ensure that players of every background can discover the depth of Philippine heritage.",
    ],
    category: "culture",
    publishedAt: "2026-01-15",
    cover: {
      id: "cover-art-1",
      type: "poster",
      src: "/assets/games/chronicles-of-babaylan/posters/card-cover.png",
      alt: "Key art for Legend of Bakunawa: Chronicles of Babaylan showing the colossal Bakunawa serpent and The Remontada.",
      credit: "AVERXON Editorial",
      licenseStatus: "approved_first_party",
    },
    seo: {
      title: "Inside AVERXON's Hybrid Cultural Futurism Vision | AVERXON News",
      description:
        "Learn how AVERXON preserves Philippine culture through original game worlds and accessible 3D storytelling.",
      canonicalPath: "/news/introducing-averxon-hybrid-cultural-futurism",
      ogImage: "/assets/games/chronicles-of-babaylan/posters/bakunawa-key-art.png",
      noIndex: false,
    },
  },
  {
    id: "art-four-worlds-showcase",
    slug: "four-worlds-of-philippine-myth-and-play",
    title: "Worlds of Myth & Play: From Babaylan Lore to Nocturnal Folklore & Strategic Arenas",
    excerpt:
      "A closer look at the cultural inspirations behind Legend of Bakunawa: Chronicles of Babaylan, Habulan: The Curse of the 5th Bell, and Myth Mayhem.",
    body: [
      "Philippine culture encompasses sacred mythological traditions, cautionary nocturnal legends, and expressive community play. AVERXON's slate of original games reflects this rich spectrum.",
      "In Legend of Bakunawa: Chronicles of Babaylan, players step into pre-colonial spiritual lore beneath the shadow of the Bakunawa eclipse, guided by authentic character studies like 'The Remontada'.",
      "Meanwhile, Habulan: The Curse of the 5th Bell channels nocturnal folklore, belfry legends, and tag-and-chase tension into high-stakes survival, while Myth Mayhem brings creatures and guardians of Philippine myth—such as the Night Hunter Manananggal—into a strategic card and arena battle built for community showcases.",
    ],
    category: "devlog",
    publishedAt: "2026-02-01",
    cover: {
      id: "cover-art-2",
      type: "poster",
      src: "/assets/games/myth-mayhem/posters/card-cover.png",
      alt: "Manananggal Entity Card and character design from AVERXON's Myth Mayhem.",
      credit: "AVERXON Studio",
      licenseStatus: "approved_first_party",
    },
    seo: {
      title: "Worlds of Philippine Myth & Play | AVERXON News",
      description:
        "Explore the cultural roots of Legend of Bakunawa: Chronicles of Babaylan, Habulan: The Curse of the 5th Bell, and Myth Mayhem.",
      canonicalPath: "/news/four-worlds-of-philippine-myth-and-play",
      ogImage: "/assets/games/myth-mayhem/posters/myth-mayhem-card.png",
      noIndex: false,
    },
  },
  {
    id: "art-ecosystem-milestones",
    slug: "averxon-ecosystem-milestones-and-partnerships",
    title: "Milestones in Motion: Level Up Showcases, Cyber Craft PH & PROPEL DOST Region IV-B",
    excerpt:
      "Reflecting on AVERXON's journey as a Level Up 2.0 finalist, Level Up 3.0 dual-category finalist, Cyber Craft PH partner, and PROPEL DOST Region IV-B participant.",
    body: [
      "Building a cultural gaming organization requires strong ties across student innovators, professional developers, industry communities, and public-sector innovation programs.",
      "AVERXON is honored to have been recognized as a Finalist in Level Up 2.0 and as a Finalist in both the Professional and Student categories of Level Up 3.0.",
      "Alongside our partnership with Cyber Craft PH and our participation in PROPEL DOST Region IV-B, we remain committed to mentoring emerging talent and advancing Philippine cultural representation in interactive media.",
    ],
    category: "announcement",
    publishedAt: "2026-02-20",
    cover: {
      id: "cover-art-3",
      type: "poster",
      src: "/assets/games/habulan/posters/card-cover.png",
      alt: "Habulan: The Curse of the 5th Bell official logo and character renders representing AVERXON showcase milestones.",
      credit: "AVERXON Editorial",
      licenseStatus: "approved_first_party",
    },
    seo: {
      title: "Ecosystem Milestones & Partnerships | AVERXON News",
      description:
        "Read about AVERXON's finalist recognitions in Level Up 2.0 and 3.0, partnership with Cyber Craft PH, and participation in PROPEL DOST Region IV-B.",
      canonicalPath: "/news/averxon-ecosystem-milestones-and-partnerships",
      ogImage: "/media/posters/ch4-milestones.svg",
      noIndex: false,
    },
  },
];

export const ARTICLES: Article[] = rawArticles.map((art) =>
  ArticleSchema.parse(art)
);

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
