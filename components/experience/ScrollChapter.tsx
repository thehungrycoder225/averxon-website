import React from "react";
import type { Chapter } from "@/content/schema";
import { cn } from "@/lib/utils";
import {
  ChapterParallaxBackdrop,
  ParallaxDepthSection,
} from "@/components/experience/DeepParallaxStage";

export interface ScrollChapterProps {
  chapter: Chapter;
  showStaticPoster?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * ScrollChapter Wrapper — Deep Parallax & 3D Scrolling Mode
 * Renders multi-plane 2.5D/3D parallax scene layers crafted from AVERXON's
 * reference assets and wraps chapter content in a 3D perspective scroll container.
 */
export function ScrollChapter({
  chapter,
  showStaticPoster = true,
  className,
  children,
}: ScrollChapterProps) {
  const headingId = `chapter-${chapter.id}-heading`;
  const isHeroChapter = chapter.index === 1;

  return (
    <section
      id={chapter.id}
      aria-labelledby={headingId}
      data-chapter-id={chapter.id}
      data-scene-key={chapter.sceneKey}
      className={cn(
        "relative z-10 w-full scroll-mt-20 overflow-x-clip py-16 md:py-24 xl:py-28",
        className
      )}
    >
      {/* Screen-reader accessible summary of the chapter */}
      <p className="sr-only">{chapter.accessibleSummary}</p>

      {/* Multi-Plane Deep Parallax & 3D Scrolling Backdrop */}
      {(showStaticPoster || isHeroChapter) && (
        <ChapterParallaxBackdrop
          chapterId={chapter.id}
          isHero={isHeroChapter}
        />
      )}

      {/* Subtle IOCO Architectural Vertical Column Grid Lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 mx-auto grid max-w-7xl grid-cols-4 px-5 md:px-8 xl:px-12"
      >
        <div className="border-l border-[#F5F5FA]/[0.05]" />
        <div className="border-l border-[#F5F5FA]/[0.05]" />
        <div className="border-l border-[#F5F5FA]/[0.05]" />
        <div className="border-x border-[#F5F5FA]/[0.05]" />
      </div>

      {/* Full-width balanced content container (right chapter rail commented out) */}
      <ParallaxDepthSection
        intensity={isHeroChapter ? 0.45 : 0.85}
        className="mx-auto w-full max-w-7xl px-5 md:px-8 xl:px-12"
      >
        {!isHeroChapter && (
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[#FDB001]">
              {chapter.eyebrow}
            </p>
            <h2
              id={headingId}
              className="text-3xl font-bold leading-[1.12] tracking-tight text-[#F5F5FA] sm:text-4xl xl:text-[2.75rem]"
            >
              {chapter.title}
            </h2>
          </div>
        )}

        {children}
      </ParallaxDepthSection>
    </section>
  );
}
