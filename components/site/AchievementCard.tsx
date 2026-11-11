import React from "react";
import { ExternalLink } from "lucide-react";
import type { Achievement } from "@/content/schema";

export interface AchievementCardProps {
  achievement: Achievement;
  indexNumber?: string;
}

/**
 * AchievementCard — Locked IOCO Architectural Column Style
 * - Removed top outcome pill/badge and removed "Official Showcase & Program Recognition" footer
 * - Clean architectural framing with top dash accent, bold title, wide-tracked category, and summary
 */
export function AchievementCard({
  achievement,
  indexNumber,
}: AchievementCardProps) {
  return (
    <div className="group relative flex h-full flex-col justify-between overflow-hidden border border-[#F5F5FA]/10 bg-gradient-to-b from-[#151729]/85 via-[#090B16]/90 to-[#030237]/95 p-7 transition-all duration-500 hover:border-[#8A45CD]/60 hover:from-[#8A45CD]/22 hover:via-[#151729]/90 hover:to-[#090B16] sm:p-8">
      {/* Subtle Top-Down Column Hover Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#01BEF5]/12 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative z-10 space-y-5">
        {/* Minimal Architectural Dash & Optional Index (no pill/badge tags) */}
        <div className="space-y-2.5">
          {indexNumber && (
            <span className="block font-mono text-xs font-bold tracking-[0.2em] text-[#F5F5FA]">
              {indexNumber}
            </span>
          )}
          <span
            aria-hidden="true"
            className="block h-[2px] w-5 bg-[#8A45CD] transition-all duration-300 group-hover:w-9 group-hover:bg-[#FDB001]"
          />
        </div>

        <div className="space-y-2.5">
          <h3 className="text-2xl font-bold tracking-tight text-[#F5F5FA]">
            {achievement.title}
          </h3>

          {achievement.category && (
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#01BEF5]">
              {achievement.category}
            </p>
          )}
        </div>

        <p className="text-sm leading-[1.7] text-[#B6B9C9]">
          {achievement.summary}
        </p>
      </div>

      {achievement.verified && achievement.evidenceUrl && (
        <div className="relative z-10 mt-6 border-t border-[#F5F5FA]/10 pt-4 text-xs">
          <a
            href={achievement.evidenceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#01BEF5] transition-colors hover:text-[#FDB001] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]"
          >
            <span>View Reference</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  );
}
