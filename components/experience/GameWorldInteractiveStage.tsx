"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Eye, Orbit, RotateCcw, Sparkles } from "lucide-react";
import type { GameSlug } from "@/content/schema";
import {
  detectBrowserCapabilities,
  resolveQualityTier,
} from "@/experience/quality/qualityTiers";
import type { ResolvedQualityTier } from "@/experience/quality/stateTypes";
import { BakunawaWorldScene } from "@/experience/reconstructions/BakunawaModels";
import { HabulanWorldScene } from "@/experience/reconstructions/HabulanModels";
import { MythMayhemWorldScene } from "@/experience/reconstructions/MythMayhemModels";
import { cn } from "@/lib/utils";

export interface GameWorldInteractiveStageProps {
  slug: GameSlug;
  posterSrc: string;
  posterAlt: string;
  className?: string;
}

const VIEW_ANGLES: Array<{ label: string; deg: number; rad: number }> = [
  { label: "Front", deg: 0, rad: 0 },
  { label: "3/4 View", deg: 35, rad: (35 * Math.PI) / 180 },
  { label: "Side", deg: 90, rad: Math.PI * 0.5 },
  { label: "Rear", deg: 180, rad: Math.PI },
];

export function GameWorldInteractiveStage({
  slug,
  posterSrc,
  posterAlt,
  className,
}: GameWorldInteractiveStageProps) {
  const [tier, setTier] = useState<ResolvedQualityTier>("STATIC");
  const [viewMode, setViewMode] = useState<"3d" | "2d">("3d");
  const [rotationRad, setRotationRad] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  // Per-game subject selectors
  const [bakunawaSubject, setBakunawaSubject] = useState<
    "bakunawa" | "remontada"
  >("bakunawa");
  const [habulanSubject, setHabulanSubject] = useState<
    "duo" | "ken-ken" | "nining-joan"
  >("duo");
  const [mythSubject, setMythSubject] = useState<
    "both" | "card" | "manananggal"
  >("both");

  useEffect(() => {
    const caps = detectBrowserCapabilities();
    const resolved = resolveQualityTier("AUTO", caps);
    setTier(resolved.tier);
    if (resolved.tier === "STATIC") {
      setViewMode("2d");
    }
  }, []);

  const canRender3D = tier !== "STATIC" && viewMode === "3d";

  const handleAnglePreset = (rad: number) => {
    setAutoRotate(false);
    setRotationRad(rad);
  };

  return (
    <div
      data-testid={`interactive-3d-stage-${slug}`}
      className={cn(
        "overflow-hidden rounded-2xl border border-[#30344A] bg-[#151729]/95 shadow-2xl",
        className
      )}
    >
      {/* Top Control Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#30344A] bg-[#090B16]/90 px-4 py-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#FDB001]" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F5F5FA]">
            {slug === "chronicles-of-babaylan"
              ? "Eclipse & Character 3D Showcase"
              : slug === "habulan"
                ? "Belfry & Character 3D Showcase"
                : "Interactive 3D Card & Character Showcase"}
          </span>
        </div>

        {/* 3D / Concept Art View Switcher */}
        <div className="flex items-center gap-1.5">
          {tier !== "STATIC" && (
            <>
              <button
                type="button"
                onClick={() => setViewMode("3d")}
                aria-pressed={viewMode === "3d"}
                className={cn(
                  "inline-flex min-h-[36px] items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]",
                  viewMode === "3d"
                    ? "bg-[#087BE6] text-[#F5F5FA]"
                    : "bg-[#22253A] text-[#B6B9C9] hover:text-[#F5F5FA]"
                )}
              >
                <Orbit className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Interactive 3D</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("2d")}
                aria-pressed={viewMode === "2d"}
                className={cn(
                  "inline-flex min-h-[36px] items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]",
                  viewMode === "2d"
                    ? "bg-[#087BE6] text-[#F5F5FA]"
                    : "bg-[#22253A] text-[#B6B9C9] hover:text-[#F5F5FA]"
                )}
              >
                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Concept Art</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Viewport (16:10) */}
      <div className="relative aspect-[16/10] w-full bg-gradient-to-b from-[#030237] via-[#090B16] to-[#151729]">
        {canRender3D ? (
          <Canvas
            dpr={tier === "HIGH" ? [1, 2] : [1, 1.5]}
            camera={{ position: [0, 0.1, 3.35], fov: 42, near: 0.1, far: 30 }}
          >
            <ambientLight color="#1E293B" intensity={1.65} />
            <directionalLight
              position={[3.5, 4.5, 5]}
              color="#FFFBEB"
              intensity={1.75}
            />
            <pointLight
              position={[-3, 2, 3]}
              color="#01BEF5"
              intensity={1.25}
              distance={14}
            />
            <Suspense fallback={null}>
              {slug === "chronicles-of-babaylan" && (
                <BakunawaWorldScene
                  quality={tier}
                  activeSubject={bakunawaSubject}
                  rotationY={rotationRad}
                  autoRotate={autoRotate}
                />
              )}
              {slug === "habulan" && (
                <HabulanWorldScene
                  quality={tier}
                  focusTarget={habulanSubject}
                  rotationY={rotationRad}
                  autoRotate={autoRotate}
                />
              )}
              {slug === "myth-mayhem" && (
                <MythMayhemWorldScene
                  quality={tier}
                  focusMode={mythSubject}
                  rotationY={rotationRad}
                  autoRotate={autoRotate}
                />
              )}
            </Suspense>
          </Canvas>
        ) : (
          <img
            src={posterSrc}
            alt={posterAlt}
            className="h-full w-full object-contain p-3"
          />
        )}
      </div>

      {/* Bottom Interactive Controls (Subject Tabs + Front/Side/Rear Presets) */}
      {canRender3D && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#30344A] bg-[#090B16]/90 px-4 py-3 text-xs">
          {/* Subject Selector */}
          <div
            role="group"
            aria-label="Select 3D subject"
            className="flex flex-wrap items-center gap-1.5"
          >
            {slug === "chronicles-of-babaylan" && (
              <>
                <button
                  type="button"
                  onClick={() => setBakunawaSubject("bakunawa")}
                  aria-pressed={bakunawaSubject === "bakunawa"}
                  className={cn(
                    "min-h-[36px] rounded-lg px-3 py-1 font-medium transition-colors",
                    bakunawaSubject === "bakunawa"
                      ? "bg-[#FDB001] text-[#030237] font-semibold"
                      : "bg-[#22253A] text-[#F5F5FA] hover:bg-[#30344A]"
                  )}
                >
                  Bakunawa Eclipse
                </button>
                <button
                  type="button"
                  onClick={() => setBakunawaSubject("remontada")}
                  aria-pressed={bakunawaSubject === "remontada"}
                  className={cn(
                    "min-h-[36px] rounded-lg px-3 py-1 font-medium transition-colors",
                    bakunawaSubject === "remontada"
                      ? "bg-[#FDB001] text-[#030237] font-semibold"
                      : "bg-[#22253A] text-[#F5F5FA] hover:bg-[#30344A]"
                  )}
                >
                  The Remontada
                </button>
              </>
            )}

            {slug === "habulan" && (
              <>
                <button
                  type="button"
                  onClick={() => setHabulanSubject("duo")}
                  aria-pressed={habulanSubject === "duo"}
                  className={cn(
                    "min-h-[36px] rounded-lg px-2.5 py-1 font-medium transition-colors",
                    habulanSubject === "duo"
                      ? "bg-[#FDB001] text-[#030237] font-semibold"
                      : "bg-[#22253A] text-[#F5F5FA] hover:bg-[#30344A]"
                  )}
                >
                  Both Characters
                </button>
                <button
                  type="button"
                  onClick={() => setHabulanSubject("ken-ken")}
                  aria-pressed={habulanSubject === "ken-ken"}
                  className={cn(
                    "min-h-[36px] rounded-lg px-2.5 py-1 font-medium transition-colors",
                    habulanSubject === "ken-ken"
                      ? "bg-[#FDB001] text-[#030237] font-semibold"
                      : "bg-[#22253A] text-[#F5F5FA] hover:bg-[#30344A]"
                  )}
                >
                  Ken-Ken
                </button>
                <button
                  type="button"
                  onClick={() => setHabulanSubject("nining-joan")}
                  aria-pressed={habulanSubject === "nining-joan"}
                  className={cn(
                    "min-h-[36px] rounded-lg px-2.5 py-1 font-medium transition-colors",
                    habulanSubject === "nining-joan"
                      ? "bg-[#FDB001] text-[#030237] font-semibold"
                      : "bg-[#22253A] text-[#F5F5FA] hover:bg-[#30344A]"
                  )}
                >
                  Nining Joan
                </button>
              </>
            )}

            {slug === "myth-mayhem" && (
              <>
                <button
                  type="button"
                  onClick={() => setMythSubject("both")}
                  aria-pressed={mythSubject === "both"}
                  className={cn(
                    "min-h-[36px] rounded-lg px-2.5 py-1 font-medium transition-colors",
                    mythSubject === "both"
                      ? "bg-[#FDB001] text-[#030237] font-semibold"
                      : "bg-[#22253A] text-[#F5F5FA] hover:bg-[#30344A]"
                  )}
                >
                  Card &amp; Character
                </button>
                <button
                  type="button"
                  onClick={() => setMythSubject("card")}
                  aria-pressed={mythSubject === "card"}
                  className={cn(
                    "min-h-[36px] rounded-lg px-2.5 py-1 font-medium transition-colors",
                    mythSubject === "card"
                      ? "bg-[#FDB001] text-[#030237] font-semibold"
                      : "bg-[#22253A] text-[#F5F5FA] hover:bg-[#30344A]"
                  )}
                >
                  3D Card Display
                </button>
                <button
                  type="button"
                  onClick={() => setMythSubject("manananggal")}
                  aria-pressed={mythSubject === "manananggal"}
                  className={cn(
                    "min-h-[36px] rounded-lg px-2.5 py-1 font-medium transition-colors",
                    mythSubject === "manananggal"
                      ? "bg-[#FDB001] text-[#030237] font-semibold"
                      : "bg-[#22253A] text-[#F5F5FA] hover:bg-[#30344A]"
                  )}
                >
                  Manananggal
                </button>
              </>
            )}
          </div>

          {/* Camera View Angle Presets (Front / 3/4 / Side / Rear / Orbit) */}
          <div
            role="group"
            aria-label="Camera angle presets"
            className="flex flex-wrap items-center gap-1"
          >
            {VIEW_ANGLES.map((angle) => {
              const isSelected =
                !autoRotate && Math.abs(rotationRad - angle.rad) < 0.05;
              return (
                <button
                  key={angle.label}
                  type="button"
                  onClick={() => handleAnglePreset(angle.rad)}
                  aria-pressed={isSelected}
                  className={cn(
                    "min-h-[36px] rounded-lg px-2.5 py-1 font-medium transition-colors",
                    isSelected
                      ? "border border-[#01BEF5] bg-[#22253A] text-[#01BEF5]"
                      : "bg-[#151729] text-[#B6B9C9] hover:text-[#F5F5FA]"
                  )}
                >
                  {angle.label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setAutoRotate((prev) => !prev)}
              aria-pressed={autoRotate}
              className={cn(
                "inline-flex min-h-[36px] items-center gap-1 rounded-lg px-2.5 py-1 font-medium transition-colors",
                autoRotate
                  ? "border border-[#01BEF5] bg-[#22253A] text-[#01BEF5]"
                  : "bg-[#151729] text-[#B6B9C9] hover:text-[#F5F5FA]"
              )}
            >
              <RotateCcw className="h-3 w-3" aria-hidden="true" />
              <span>Orbit</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
