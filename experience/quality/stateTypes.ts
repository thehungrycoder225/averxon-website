import type { ChapterId } from "@/content/schema";

export type ExperienceLifecycleState =
  | "BOOT"
  | "STATIC_READY"
  | "WEBGL_LOADING"
  | "IMMERSIVE_READY"
  | "STATIC_FALLBACK";

export type QualityTier = "AUTO" | "HIGH" | "MEDIUM" | "LOW" | "STATIC";
export type ResolvedQualityTier = "HIGH" | "MEDIUM" | "LOW" | "STATIC";

export type FallbackReason =
  | "USER_SELECTED_STATIC"
  | "REDUCED_MOTION"
  | "SAVE_DATA_ENABLED"
  | "WEBGL_UNSUPPORTED"
  | "WEBGL_CONTEXT_LOST"
  | "ASSET_LOAD_ERROR"
  | "LOW_FPS_DEGRADATION";

export interface ExperienceStateSnapshot {
  lifecycle: ExperienceLifecycleState;
  userPreference: QualityTier;
  resolvedTier: ResolvedQualityTier;
  activeChapter: ChapterId;
  scrollProgress: number;
  webglContextLostCount: number;
  measuredFps: number | null;
  fallbackReason?: FallbackReason;
}

export interface QualityTierBudget {
  tier: ResolvedQualityTier;
  dpr: [number, number];
  maxTrianglesPerScene: number;
  particleCount: number;
  enableBloomCorona: boolean;
  textureSize: number;
  minAcceptableFps: number;
}
