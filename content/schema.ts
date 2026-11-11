import { z } from "zod";

export const LicenseStatusSchema = z.enum([
  "approved_first_party",
  "owner_supplied_reference",
  "authorized_partner",
  "licensed_third_party",
  "pending_owner_approval",
]);

export type LicenseStatus = z.infer<typeof LicenseStatusSchema>;

export const VisualReviewStatusSchema = z.enum([
  "pending_owner_review",
  "reference_locked_2d_only",
  "candidate_3d_in_review",
  "approved_for_production",
  "awaiting_reference_upload",
  "rejected",
]);

export type VisualReviewStatus = z.infer<typeof VisualReviewStatusSchema>;

export const ReconstructionStrategySchema = z.enum([
  "layered_2_5d_poster_parallax",
  "approved_existing_3d_glb",
  "img2threejs_procedural_prop_candidate",
  "controlled_manual_3d_character_workflow",
  "awaiting_owner_reference",
]);

export type ReconstructionStrategy = z.infer<
  typeof ReconstructionStrategySchema
>;

export const AssetManifestEntrySchema = z.object({
  id: z.string().min(1),
  assetCode: z.string().optional(),
  projectId: z.enum([
    "brand-averxon",
    "chronicles-of-babaylan",
    "habulan",
    "myth-mayhem",
  ]),
  projectName: z.string().optional(),
  subjectIdentity: z.string().optional(),
  availableViews: z.array(z.string()).optional(),
  existingModelAvailability: z.string().optional(),
  intendedSection: z.string().optional(),
  fidelityRequirements: z.array(z.string()).optional(),
  type: z.enum(["reference", "poster", "model", "texture"]),
  source: z.string().min(1),
  originalReferencePath: z.string().optional(),
  licenseOrPermission: z.string().min(1),
  isApproved: z.boolean().default(false), // Never true by default per design.md v2.2 Section 6.2
  approvedBy: z.string().nullable().default(null),
  approvalDate: z.string().nullable().default(null),
  caption: z.string().min(1),
  alt: z.string().min(1),
  fileSizeBytes: z.number().int().nonnegative(),
  dimensions: z.object({
    width: z.number().int().positive(),
    height: z.number().int().positive(),
  }),
  visibleDetails: z.array(z.string()).default([]),
  unseenDetails: z.array(z.string()).default([]),
  recommendedStrategy: ReconstructionStrategySchema,
  geometryMetrics: z
    .object({
      triangles: z.number().int().nonnegative(),
      drawCalls: z.number().int().nonnegative(),
    })
    .optional(),
  fallbackPoster: z.string().min(1),
  visualReviewStatus: VisualReviewStatusSchema,
  lastUpdated: z.string().min(1),
});

export type AssetManifestEntry = z.infer<typeof AssetManifestEntrySchema>;

export const MediaSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["image", "video", "model_glb", "poster"]),
  src: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string().optional(),
  credit: z.string().optional(),
  licenseStatus: LicenseStatusSchema,
  poster: z.string().optional(),
  dimensions: z
    .object({
      width: z.number().int().positive(),
      height: z.number().int().positive(),
    })
    .optional(),
  bytes: z.number().int().nonnegative().optional(),
});

export type Media = z.infer<typeof MediaSchema>;

/**
 * v2.2 GameMedia interface supporting poster, approvedGLB, proceduralThree,
 * loading, fallback, reviewStatus, and rights/credit metadata.
 */
export const GameMediaSchema = z.object({
  poster: MediaSchema.nullable(),
  secondaryPreview: MediaSchema.optional(),
  approvedGLB: z.string().nullable().default(null),
  proceduralThree: z
    .enum(["NONE", "MYTH_CARD_PEDESTAL_CANDIDATE"])
    .default("NONE"),
  loadingStateLabel: z.string().default("Loading world preview..."),
  fallbackReasonLabel: z.string().min(1),
  reviewStatus: VisualReviewStatusSchema,
  reconstructionStrategy: ReconstructionStrategySchema,
  worldAccentHex: z.string().min(4),
  worldSurfaceHex: z.string().min(4),
  rights: z.object({
    source: z.string().min(1),
    credit: z.string().min(1),
    licenseStatus: LicenseStatusSchema,
    isApproved: z.boolean().default(false),
  }),
});

export type GameMedia = z.infer<typeof GameMediaSchema>;

export const SEOMetadataSchema = z.object({
  title: z.string().min(1).max(75),
  description: z.string().min(1).max(165),
  canonicalPath: z.string().startsWith("/"),
  ogImage: z.string().optional(),
  noIndex: z.boolean().default(false),
});

export type SEOMetadata = z.infer<typeof SEOMetadataSchema>;

export const GameSlugSchema = z.enum([
  "chronicles-of-babaylan",
  "habulan",
  "myth-mayhem",
]);

export type GameSlug = z.infer<typeof GameSlugSchema>;

export const ProjectSchema = z.object({
  id: z.string().min(1),
  slug: GameSlugSchema,
  canonicalTitle: z.string().min(1),
  subtitle: z.string().optional(),
  subtitlePendingConfirmation: z.boolean().default(false),
  subtitleCandidates: z.array(z.string()).optional(),
  summary: z.string().min(1),
  description: z.string().min(1),
  culturalInspiration: z.string().min(1),
  genres: z.array(z.string()).min(1).max(3), // Capped at <=3 visible chips per design.md v2.2 Section 3
  culturalThemes: z.array(z.string()).min(1),
  status: z
    .enum(["in_development", "prototype", "showcase", "released"])
    .optional(),
  platforms: z.array(z.string()).optional(),
  gameMedia: GameMediaSchema,
  heroMedia: MediaSchema,
  posterFallback: MediaSchema,
  gallery: z.array(MediaSchema),
  features: z.array(
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
    })
  ),
  seo: SEOMetadataSchema,
});

export type Project = z.infer<typeof ProjectSchema>;

export const AchievementSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  category: z.string().optional(),
  outcome: z.string().min(1),
  year: z.number().int().optional(),
  evidenceUrl: z.string().url().optional(),
  verified: z.boolean(),
  summary: z.string().min(1),
  media: MediaSchema.optional(),
});

export type Achievement = z.infer<typeof AchievementSchema>;

export const PartnerSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  relationship: z.string().min(1),
  summary: z.string().min(1),
  logo: MediaSchema.optional(),
  authorizedLogoUse: z.boolean(),
  evidenceUrl: z.string().url().optional(),
});

export type Partner = z.infer<typeof PartnerSchema>;

export const ArticleSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  body: z.array(z.string()).min(1),
  category: z.enum([
    "announcement",
    "devlog",
    "event",
    "culture",
    "partnership",
  ]),
  publishedAt: z.string().min(1),
  cover: MediaSchema.optional(),
  seo: SEOMetadataSchema,
});

export type Article = z.infer<typeof ArticleSchema>;

export const ChapterIdSchema = z.enum([
  "awakening",
  "heritage",
  "four-worlds",
  "milestones",
  "creation",
  "future",
]);

export type ChapterId = z.infer<typeof ChapterIdSchema>;

export const SceneKeySchema = z.enum([
  "SCENE_AWAKENING",
  "SCENE_HERITAGE",
  "SCENE_FOUR_WORLDS",
  "SCENE_MILESTONES",
  "SCENE_CREATION",
  "SCENE_FUTURE",
]);

export type SceneKey = z.infer<typeof SceneKeySchema>;

export const ChapterSchema = z.object({
  id: ChapterIdSchema,
  index: z.number().int().min(1).max(6),
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  accessibleSummary: z.string().min(1),
  sceneKey: SceneKeySchema,
  poster: MediaSchema,
  fallbackContent: z.object({
    heading: z.string().min(1),
    body: z.string().min(1),
    ctaLabel: z.string().optional(),
    ctaHref: z.string().optional(),
    secondaryCtaLabel: z.string().optional(),
    secondaryCtaHref: z.string().optional(),
  }),
  timelineMarkers: z.object({
    scrollStart: z.number().min(0).max(1),
    scrollEnd: z.number().min(0).max(1),
    cameraStartPos: z.tuple([z.number(), z.number(), z.number()]),
    cameraEndPos: z.tuple([z.number(), z.number(), z.number()]),
    cameraLookAt: z.tuple([z.number(), z.number(), z.number()]),
    fov: z.number().positive(),
  }),
});

export type Chapter = z.infer<typeof ChapterSchema>;
