"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { QUALITY_TIER_BUDGETS } from "@/experience/quality/qualityTiers";
import type {
  ExperienceLifecycleState,
  ResolvedQualityTier,
} from "@/experience/quality/stateTypes";
import { SceneDirector } from "./SceneDirector";

export interface ExperienceCanvasProps {
  quality: ResolvedQualityTier;
  scrollProgress: number;
  creationStage?: "concept" | "sculpt" | "gameplay";
  onLifecycleChange?: (state: ExperienceLifecycleState) => void;
  onContextLost?: () => void;
  onContextRestored?: () => void;
  onLowFpsDetected?: (fps: number) => void;
}

export function ExperienceCanvas({
  quality,
  scrollProgress,
  creationStage = "gameplay",
  onLifecycleChange,
  onContextLost,
  onContextRestored,
  onLowFpsDetected,
}: ExperienceCanvasProps) {
  const [contextLost, setContextLost] = useState(false);
  const budget = QUALITY_TIER_BUDGETS[quality];

  useEffect(() => {
    if (quality === "STATIC" || contextLost) {
      onLifecycleChange?.("STATIC_FALLBACK");
    } else {
      onLifecycleChange?.("WEBGL_LOADING");
    }
  }, [quality, contextLost, onLifecycleChange]);

  const handleFpsSample = useCallback(
    (fps: number) => {
      if (budget.minAcceptableFps > 0 && fps < budget.minAcceptableFps) {
        onLowFpsDetected?.(fps);
      }
    },
    [budget.minAcceptableFps, onLowFpsDetected]
  );

  if (quality === "STATIC" || contextLost) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      data-testid="experience-canvas-container"
      data-quality-tier={quality}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <Canvas
        dpr={budget.dpr}
        gl={{
          antialias: quality === "HIGH",
          powerPreference: "high-performance",
          alpha: true,
        }}
        camera={{ position: [0, 0, 12], fov: 45, near: 0.1, far: 60 }}
        onCreated={({ gl }) => {
          onLifecycleChange?.("IMMERSIVE_READY");
          const canvasEl = gl.domElement;

          const handleLost = (event: Event) => {
            event.preventDefault();
            setContextLost(true);
            onLifecycleChange?.("STATIC_FALLBACK");
            onContextLost?.();
          };

          const handleRestored = () => {
            setContextLost(false);
            onLifecycleChange?.("IMMERSIVE_READY");
            onContextRestored?.();
          };

          canvasEl.addEventListener("webglcontextlost", handleLost, false);
          canvasEl.addEventListener(
            "webglcontextrestored",
            handleRestored,
            false
          );
        }}
      >
        <SceneDirector
          scrollProgress={scrollProgress}
          quality={quality}
          creationStage={creationStage}
          onFpsSample={handleFpsSample}
        />
      </Canvas>
    </div>
  );
}

export default ExperienceCanvas;
