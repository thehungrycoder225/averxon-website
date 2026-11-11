import React from "react";
import { Cpu, Dna, Sparkles } from "lucide-react";
import type { CulturalPillar } from "@/content/games";

export interface CulturalPillarCardProps {
  item: CulturalPillar;
}

/**
 * IOCO Vertical Architectural Pillar Column (`01 —`, `02 —`, `03 —`)
 * Inspired by Frame 2 of the IOCO / Biocomputer reference (Mike | Creative Mints):
 * - Top index number (`01`, `02`, `03`) + horizontal dash (`—`)
 * - Thin-line circular emblem housing a luminous vector icon
 * - Bold geometric title + wide-tracked uppercase accent label
 * - Vertical column hover spotlight & bottom micro-arrow indicator (`▸`)
 */
export function CulturalPillarCard({ item }: CulturalPillarCardProps) {
  const Icon =
    item.pillar === "Culture"
      ? Dna
      : item.pillar === "Creativity"
      ? Sparkles
      : Cpu;

  return (
    <div className="group relative flex h-full flex-col justify-between overflow-hidden border border-[#F5F5FA]/10 bg-gradient-to-b from-[#151729]/85 via-[#090B16]/90 to-[#030237]/95 p-7 transition-all duration-500 hover:border-[#8A45CD]/60 hover:from-[#8A45CD]/25 hover:via-[#151729]/90 hover:to-[#090B16] sm:p-8">
      {/* Subtle Top-Down Column Hover Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#01BEF5]/12 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative z-10 space-y-8">
        {/* Top Index & Dash (`01` / `—`) */}
        <div className="space-y-3">
          <span className="block font-mono text-xs font-bold tracking-[0.2em] text-[#F5F5FA]">
            {item.index}
          </span>
          <span
            aria-hidden="true"
            className="block h-[2px] w-4 bg-[#8A45CD] transition-all duration-300 group-hover:w-8 group-hover:bg-[#FDB001]"
          />
        </div>

        {/* Thin-Line Circular Vector Emblem */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#8A45CD]/40 bg-[#090B16]/60 text-[#01BEF5] shadow-[0_0_30px_rgba(138,69,205,0.2)] transition-all duration-500 group-hover:border-[#01BEF5]/70 group-hover:text-[#FDB001] group-hover:shadow-[0_0_35px_rgba(1,190,245,0.3)]">
          <Icon className="h-8 w-8 stroke-[1.5]" aria-hidden="true" />
        </div>

        {/* Title, Wide-Tracked Subtitle & Description */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold tracking-tight text-[#F5F5FA]">
            {item.pillar}
          </h3>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-[#FF6924]">
            {item.title}
          </p>
          <p className="pt-1 text-sm leading-[1.7] text-[#B6B9C9]">
            {item.description}
          </p>
        </div>
      </div>

      {/* Highlights & Bottom Micro-Arrow (`▸`) */}
      <div className="relative z-10 mt-8 space-y-5 border-t border-[#F5F5FA]/10 pt-5">
        <ul className="space-y-2 text-xs text-[#D0D4E4]">
          {item.highlights.map((point) => (
            <li key={point} className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#01BEF5]"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div
          aria-hidden="true"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#B6B9C9] transition-colors group-hover:text-[#FDB001]"
        >
          <span>&#9656;</span>
          <span>0{item.index.replace(/^0/, "")}</span>
        </div>
      </div>
    </div>
  );
}
