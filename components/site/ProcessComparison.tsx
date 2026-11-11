"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import type { ProcessStage } from "@/content/games";
import { cn } from "@/lib/utils";

// Code-split: Three.js is only downloaded when Stage 03 is opened
const JieThreePackageViewer = dynamic(
  () => import("@/components/experience/JieThreePackageViewer"),
  { ssr: false }
);

export interface ProcessComparisonProps {
  stages: ProcessStage[];
  onStageChange?: (stageId: "concept" | "sculpt" | "gameplay") => void;
}

/**
 * ProcessComparison — Locked IOCO Architectural Column & Showcase Panel Style
 * - 3 Architectural Tab Columns (`01 —`, `02 —`, `03 —`) with active highlight bar
 * - Sharp architectural panel with 1 short stage label (no rounded pill tags)
 */
export function ProcessComparison({
  stages,
  onStageChange,
}: ProcessComparisonProps) {
  const [activeId, setActiveId] = useState<"concept" | "sculpt" | "gameplay">(
    stages[0]?.id ?? "concept"
  );

  const currentStage =
    stages.find((s) => s.id === activeId) ?? stages[0]!;

  const handleSelect = (id: "concept" | "sculpt" | "gameplay") => {
    setActiveId(id);
    onStageChange?.(id);
  };

  return (
    <div className="space-y-0 border border-[#F5F5FA]/10 bg-[#090B16]/90">
      {/* Architectural 3-Column Tab Selector (`01 —`, `02 —`, `03 —`) */}
      <div
        role="tablist"
        aria-label="AVERXON Concept-to-3D-to-Gameplay production stages"
        className="grid grid-cols-1 border-b border-[#F5F5FA]/10 sm:grid-cols-3"
      >
        {stages.map((stage) => {
          const isSelected = stage.id === activeId;
          return (
            <button
              key={stage.id}
              id={`tab-${stage.id}`}
              role="tab"
              type="button"
              aria-selected={isSelected}
              aria-controls={`panel-${stage.id}`}
              onClick={() => handleSelect(stage.id)}
              className={cn(
                "group relative flex min-h-[76px] flex-col items-start justify-center border-b border-[#F5F5FA]/10 px-6 py-4 text-left transition-all sm:border-b-0 sm:border-r last:sm:border-r-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]",
                isSelected
                  ? "bg-gradient-to-b from-[#8A45CD]/25 via-[#151729]/90 to-[#090B16] text-[#F5F5FA]"
                  : "bg-[#090B16]/70 text-[#B6B9C9] hover:bg-[#151729]/60 hover:text-[#F5F5FA]"
              )}
            >
              {/* Active Bottom Highlight Line */}
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-[#FDB001] transition-opacity duration-300",
                  isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                )}
              />
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#FDB001]">
                  {stage.stepNumber}
                </span>
                <span
                  aria-hidden="true"
                  className="inline-block h-[2px] w-4 bg-[#8A45CD]"
                />
              </div>
              <span className="mt-1.5 text-sm font-bold tracking-tight text-[#F5F5FA]">
                {stage.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Architectural Stage Detail Panel */}
      <div
        id={`panel-${currentStage.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${currentStage.id}`}
        className="grid grid-cols-1 gap-8 bg-gradient-to-b from-[#151729]/85 via-[#090B16]/90 to-[#030237]/95 p-6 sm:p-8 lg:grid-cols-12 lg:items-center"
      >
        <div className="space-y-5 lg:col-span-6">
          {/* 1 Short Architectural Tag (no pill box) */}
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="inline-block h-[2px] w-5 bg-[#FF6924]"
            />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#FF6924]">
              {currentStage.stepNumber} &bull; {currentStage.label}
            </span>
          </div>

          <h3 className="text-2xl font-bold tracking-tight text-[#F5F5FA] sm:text-3xl">
            {currentStage.title}
          </h3>

          <p className="text-sm leading-[1.7] text-[#B6B9C9] sm:text-base">
            {currentStage.description}
          </p>

          <ul className="space-y-2.5 border-t border-[#F5F5FA]/10 pt-5 text-xs text-[#D0D4E4]">
            {currentStage.technicalNotes.map((note) => (
              <li key={note} className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#01BEF5]"
                />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6">
          <figure className="overflow-hidden border border-[#F5F5FA]/10 bg-[#090B16]">
            {currentStage.id === "gameplay" ? (
              /* Stage 03 — From Concept to 3D: interactive Jie GLB (jie_threejs_package) */
              <div className="relative aspect-[16/10] w-full bg-[radial-gradient(circle_at_50%_40%,rgba(1,190,245,0.14)_0%,rgba(3,2,55,0.95)_70%)]">
                <JieThreePackageViewer posterSrc={currentStage.media.src} />
              </div>
            ) : (
              <img
                key={currentStage.media.src}
                src={currentStage.media.src}
                alt={currentStage.media.alt}
                width={currentStage.media.dimensions?.width ?? 960}
                height={currentStage.media.dimensions?.height ?? 540}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full bg-[#030237] object-contain p-2"
              />
            )}
            <figcaption className="border-t border-[#F5F5FA]/10 bg-[#090B16] px-4 py-3 font-mono text-[11px] text-[#B6B9C9]">
              {currentStage.media.caption}
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}
