import {
  AchievementSchema,
  PartnerSchema,
  type Achievement,
  type Partner,
} from "./schema";

/**
 * Authoritative Master Lock v2.1 Achievement & Partnership Claims:
 * - Level Up 2.0 finalist
 * - Level Up 3.0 finalist in Professional and Student categories
 * - Cyber Craft PH partnership
 * - PROPEL DOST Region IV-B participant
 *
 * Non-negotiable governance rule: Do not invent dates, award wins, sponsorships, or endorsements.
 */
const rawAchievements: Achievement[] = [
  {
    id: "ach-level-up-2",
    title: "Level Up 2.0",
    category: "Game Development Competition & Showcase",
    outcome: "Finalist",
    // year & evidenceUrl intentionally omitted until publication evidence URL is supplied by owner
    verified: false,
    summary:
      "Recognized as a Finalist in Level Up 2.0 for advancing Philippine cultural storytelling and original game design.",
  },
  {
    id: "ach-level-up-3",
    title: "Level Up 3.0",
    category: "Professional and Student Categories",
    outcome: "Dual-Category Finalist",
    verified: false,
    summary:
      "Achieved Finalist recognition in both the Professional and Student categories at Level Up 3.0, demonstrating excellence across emerging and established development tracks.",
  },
  {
    id: "ach-propel-dost-4b",
    title: "PROPEL DOST Region IV-B",
    category: "Regional Science, Technology & Innovation Program",
    outcome: "Participant",
    verified: false,
    summary:
      "Participated in PROPEL DOST Region IV-B (MIMAROPA), aligning cultural game technology with regional innovation and creative-industry capacity building.",
  },
];

const rawPartners: Partner[] = [
  {
    id: "partner-cyber-craft-ph",
    name: "Cyber Craft PH",
    relationship: "Strategic Partnership",
    summary:
      "Collaborating with Cyber Craft PH to strengthen community engagement, technical craftsmanship, and opportunities for Filipino digital creators and game developers.",
    authorizedLogoUse: false, // Renders typographic partner card until written logo authorization is locked
  },
  {
    id: "partner-propel-dost-4b",
    name: "PROPEL DOST Region IV-B",
    relationship: "Program Participant",
    summary:
      "Engaged with the Department of Science and Technology (DOST) Region IV-B PROPEL initiative as a participating creative-technology organization.",
    authorizedLogoUse: false,
  },
];

export const ACHIEVEMENTS: Achievement[] = rawAchievements.map((a) =>
  AchievementSchema.parse(a)
);

export const PARTNERS: Partner[] = rawPartners.map((p) =>
  PartnerSchema.parse(p)
);
