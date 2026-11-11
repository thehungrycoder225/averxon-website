import * as THREE from "three";
import type {
  FallbackReason,
  QualityTier,
  QualityTierBudget,
  ResolvedQualityTier,
} from "./stateTypes";

export interface DeviceCapabilities {
  prefersReducedMotion: boolean;
  saveData: boolean;
  webgl2Supported: boolean;
  hardwareConcurrency: number;
  deviceMemoryGb: number;
  maxTextureSize: number;
  isMobileViewport: boolean;
}

export const QUALITY_TIER_BUDGETS: Record<ResolvedQualityTier, QualityTierBudget> = {
  HIGH: {
    tier: "HIGH",
    dpr: [1, 2],
    maxTrianglesPerScene: 60000,
    particleCount: 360,
    enableBloomCorona: true,
    textureSize: 2048,
    minAcceptableFps: 50,
  },
  MEDIUM: {
    tier: "MEDIUM",
    dpr: [1, 1.5],
    maxTrianglesPerScene: 30000,
    particleCount: 150,
    enableBloomCorona: true,
    textureSize: 1024,
    minAcceptableFps: 38,
  },
  LOW: {
    tier: "LOW",
    dpr: [1, 1],
    maxTrianglesPerScene: 12000,
    particleCount: 0,
    enableBloomCorona: false,
    textureSize: 512,
    minAcceptableFps: 28,
  },
  STATIC: {
    tier: "STATIC",
    dpr: [1, 1],
    maxTrianglesPerScene: 0,
    particleCount: 0,
    enableBloomCorona: false,
    textureSize: 0,
    minAcceptableFps: 0,
  },
};

export function resolveQualityTier(
  preference: QualityTier,
  caps: DeviceCapabilities
): { tier: ResolvedQualityTier; fallbackReason?: FallbackReason } {
  if (preference === "STATIC") {
    return { tier: "STATIC", fallbackReason: "USER_SELECTED_STATIC" };
  }
  if (caps.prefersReducedMotion && preference === "AUTO") {
    return { tier: "STATIC", fallbackReason: "REDUCED_MOTION" };
  }
  if (caps.saveData && preference === "AUTO") {
    return { tier: "STATIC", fallbackReason: "SAVE_DATA_ENABLED" };
  }
  if (!caps.webgl2Supported || caps.maxTextureSize < 2048) {
    return { tier: "STATIC", fallbackReason: "WEBGL_UNSUPPORTED" };
  }
  if (preference !== "AUTO") {
    return { tier: preference };
  }
  if (caps.isMobileViewport) {
    return caps.deviceMemoryGb >= 6 && caps.hardwareConcurrency >= 6
      ? { tier: "MEDIUM" }
      : { tier: "LOW" };
  }
  if (
    caps.deviceMemoryGb >= 8 &&
    caps.hardwareConcurrency >= 8 &&
    caps.maxTextureSize >= 4096
  ) {
    return { tier: "HIGH" };
  }
  return { tier: "MEDIUM" };
}

export function downgradeTierOnLowFps(
  current: ResolvedQualityTier
): ResolvedQualityTier {
  if (current === "HIGH") return "MEDIUM";
  if (current === "MEDIUM") return "LOW";
  return "STATIC";
}

export function detectBrowserCapabilities(): DeviceCapabilities {
  if (typeof window === "undefined") {
    return {
      prefersReducedMotion: false,
      saveData: false,
      webgl2Supported: false,
      hardwareConcurrency: 4,
      deviceMemoryGb: 4,
      maxTextureSize: 0,
      isMobileViewport: false,
    };
  }

  const prefersReducedMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  const nav = window.navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };

  const saveData = Boolean(nav.connection?.saveData);
  const hardwareConcurrency = nav.hardwareConcurrency || 4;
  const deviceMemoryGb = nav.deviceMemory || 4;
  const isMobileViewport = window.innerWidth < 768;

  let webgl2Supported = false;
  let maxTextureSize = 0;

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    if (gl && "getParameter" in gl) {
      webgl2Supported = true;
      maxTextureSize = Number(
        (gl as WebGLRenderingContext).getParameter(
          (gl as WebGLRenderingContext).MAX_TEXTURE_SIZE
        ) || 2048
      );
      const loseContextExt = (gl as WebGLRenderingContext).getExtension(
        "WEBGL_lose_context"
      );
      loseContextExt?.loseContext();
    }
  } catch {
    webgl2Supported = false;
  }

  return {
    prefersReducedMotion,
    saveData,
    webgl2Supported,
    hardwareConcurrency,
    deviceMemoryGb,
    maxTextureSize,
    isMobileViewport,
  };
}

/**
 * Deterministic Three.js scene graph resource disposal to prevent GPU memory leaks.
 */
export function disposeObject3D(root: THREE.Object3D | null | undefined): void {
  if (!root) return;
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.isMesh) {
      mesh.geometry?.dispose();
      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
      for (const mat of materials) {
        if (!mat) continue;
        for (const prop of Object.values(mat)) {
          if (prop instanceof THREE.Texture) {
            prop.dispose();
          }
        }
        mat.dispose();
      }
    }
  });
}
