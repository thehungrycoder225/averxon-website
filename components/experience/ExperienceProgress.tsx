"use client";

import React from "react";
import type { Chapter, ChapterId } from "@/content/schema";
import { cn } from "@/lib/utils";

export interface ExperienceProgressProps {
  chapters: Chapter[];
  activeChapter: ChapterId;
  scrollProgress: number;
}

/**
 * Right Chapter Rail & Responsive Compact Progress Bar (design.md v2.2 Section 4.1 & 5)
 * - Desktop (>=1024px): Fixed in the dedicated right-side exclusion zone (72–96px),
 *   while ScrollChapter reserves lg:pr-28 xl:pr-32 so cards and CTAs never collide.
 * - Tablet & Mobile (<1024px): Collapses into a compact horizontal bottom pill bar
 *   so it never overlaps cards or headings on narrow screens.
 */
export function ExperienceProgress({
  chapters,
  activeChapter,
  scrollProgress,
}: ExperienceProgressProps) {
  return (
    <>
      {/* Desktop Right Chapter Rail (>=1024px) */}
      <nav
        aria-label="Homepage chapter navigation"
        className="fixed right-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-1.5 lg:flex xl:right-5"
      >
        <div
          className="mb-2 rounded-full border border-[#01BEF5]/40 bg-[#151729]/95 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wider text-[#01BEF5] shadow-md"
          aria-live="off"
        >
          {Math.round(scrollProgress * 100)}%
        </div>
        <ol className="flex flex-col gap-1 rounded-2xl border border-[#30344A] bg-[#090B16]/90 p-1.5 backdrop-blur-md">
          {chapters.map((chapter) => {
            const isActive = chapter.id === activeChapter;
            return (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.id}`}
                  aria-current={isActive ? "location" : undefined}
                  aria-label={`Chapter ${chapter.index}: ${chapter.id}`}
                  className={cn(
                    "group flex min-h-[44px] min-w-[44px] items-center justify-end gap-2 rounded-xl px-2.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]",
                    isActive
                      ? "bg-[#22253A] text-[#FDB001]"
                      : "text-[#B6B9C9] hover:bg-[#151729] hover:text-[#F5F5FA]"
                  )}
                >
                  <span className="capitalize">
                    {chapter.id.replace("-", " ")}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-2.5 w-2.5 rotate-45 border transition-transform",
                      isActive
                        ? "scale-125 border-[#01BEF5] bg-[#FDB001]"
                        : "border-[#30344A] bg-[#151729] group-hover:border-[#01BEF5]"
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Tablet & Mobile Compact Chapter Bar (<1024px) */}
      <nav
        aria-label="Mobile chapter jump bar"
        className="fixed bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-full border border-[#30344A] bg-[#090B16]/95 px-2.5 py-1 shadow-xl backdrop-blur-md lg:hidden"
      >
        <span className="px-1.5 font-mono text-[11px] font-bold text-[#01BEF5]">
          {Math.round(scrollProgress * 100)}%
        </span>
        <ol className="flex items-center gap-0.5">
          {chapters.map((chapter) => {
            const isActive = chapter.id === activeChapter;
            return (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.id}`}
                  aria-current={isActive ? "location" : undefined}
                  aria-label={`Jump to Chapter ${chapter.index}: ${chapter.id}`}
                  className={cn(
                    "inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-xs font-mono font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]",
                    isActive
                      ? "bg-[#22253A] text-[#FDB001]"
                      : "text-[#B6B9C9] hover:text-[#F5F5FA]"
                  )}
                >
                  0{chapter.index}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
