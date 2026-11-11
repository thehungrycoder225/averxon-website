"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
// Temporarily commented out for Deep Parallax & 3D Scrolling mode — preserved for future reuse:
// import dynamic from "next/dynamic";
// import { ExperienceProgress } from "@/components/experience/ExperienceProgress";
// import { QualitySelector } from "@/components/experience/QualitySelector";
// const LazyExperienceCanvas = dynamic(
//   () => import("@/components/experience/ExperienceCanvas"),
//   { ssr: false }
// );
import Link from "next/link";
import { Play } from "lucide-react";
import {
  ACHIEVEMENTS,
  ARTICLES,
  CHAPTERS,
  CREATION_STAGES,
  CULTURAL_PILLARS,
  PARTNERS,
  PROJECTS,
} from "@/content";
import { interpolateCameraPose } from "@/experience/animation/chapterTimeline";
import {
  detectBrowserCapabilities,
  downgradeTierOnLowFps,
  resolveQualityTier,
} from "@/experience/quality/qualityTiers";
import type {
  ExperienceLifecycleState,
  QualityTier,
  ResolvedQualityTier,
} from "@/experience/quality/stateTypes";
import { SiteHeader } from "@/components/site/SiteHeader";
import { HeroNarrative } from "@/components/site/HeroNarrative";
import { CulturalPillarCard } from "@/components/site/CulturalPillarCard";
import { GameShowcaseCard } from "@/components/site/GameShowcaseCard";
import { AchievementCard } from "@/components/site/AchievementCard";
import { ProcessComparison } from "@/components/site/ProcessComparison";
import { CollaborationCTA } from "@/components/site/CollaborationCTA";
import { ScrollChapter } from "@/components/experience/ScrollChapter";
import { ParallaxDepthSection } from "@/components/experience/DeepParallaxStage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const QUALITY_STORAGE_KEY = "averxon-quality-preference-v2.1";

export function HomeExperienceClient() {
  const [lifecycle, setLifecycle] =
    useState<ExperienceLifecycleState>("STATIC_READY");
  const [userQuality, setUserQuality] = useState<QualityTier>("AUTO");
  const [resolvedTier, setResolvedTier] =
    useState<ResolvedQualityTier>("STATIC");
  const telemetryRef = useRef<HTMLDivElement>(null);
  const [creationStage, setCreationStage] = useState<
    "concept" | "sculpt" | "gameplay"
  >("gameplay");

  useEffect(() => {
    const saved = window.localStorage.getItem(
      QUALITY_STORAGE_KEY
    ) as QualityTier | null;
    const pref: QualityTier =
      saved && ["AUTO", "HIGH", "MEDIUM", "LOW", "STATIC"].includes(saved)
        ? saved
        : "AUTO";
    setUserQuality(pref);

    const caps = detectBrowserCapabilities();
    const { tier } = resolveQualityTier(pref, caps);
    setResolvedTier(tier);
    setLifecycle(tier === "STATIC" ? "STATIC_FALLBACK" : "WEBGL_LOADING");
  }, []);

  const handleQualityChange = useCallback((nextPref: QualityTier) => {
    setUserQuality(nextPref);
    try {
      window.localStorage.setItem(QUALITY_STORAGE_KEY, nextPref);
    } catch {
      // Ignore storage errors in restricted environments
    }
    const caps = detectBrowserCapabilities();
    const { tier } = resolveQualityTier(nextPref, caps);
    setResolvedTier(tier);
    setLifecycle(tier === "STATIC" ? "STATIC_FALLBACK" : "WEBGL_LOADING");
  }, []);

  const handleLowFps = useCallback(() => {
    setResolvedTier((current) => {
      const next = downgradeTierOnLowFps(current);
      if (next === "STATIC") {
        setLifecycle("STATIC_FALLBACK");
      }
      return next;
    });
  }, []);

  // Read-only native scroll synchronization (zero scroll hijacking).
  // Optimized: progress/chapter are written to data attributes directly,
  // so scrolling never re-renders the landing page tree.
  useEffect(() => {
    let rafId = 0;

    const updateFromScroll = () => {
      rafId = 0;
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const normalized = Math.max(
        0,
        Math.min(1, window.scrollY / maxScroll)
      );
      const pose = interpolateCameraPose(normalized);
      const telemetry = telemetryRef.current;
      if (telemetry) {
        telemetry.dataset.scrollProgress = normalized.toFixed(2);
        telemetry.dataset.activeChapter = pose.activeChapter;
      }
    };

    const onScroll = () => {
      if (rafId === 0) rafId = requestAnimationFrame(updateFromScroll);
    };

    updateFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const [
    chAwakening,
    chHeritage,
    chFourWorlds,
    chMilestones,
    chCreation,
    chFuture,
  ] = CHAPTERS;

  return (
    <div
      data-experience-lifecycle={lifecycle}
      data-quality-resolved={resolvedTier}
      className="relative min-h-screen"
    >
      <SiteHeader
      /* Temporarily commented out WebGL QualitySelector — preserved for future reuse:
        rightSlot={
          <QualitySelector
            value={userQuality}
            resolvedTier={resolvedTier}
            onChange={handleQualityChange}
          />
        }
      */
      />

      {/* Temporarily commented out 3D Animated WebGL Canvas & Right Chapter Sidebar — preserved for future reuse:
      {resolvedTier !== "STATIC" && (
        <LazyExperienceCanvas
          quality={resolvedTier}
          scrollProgress={scrollProgress}
          creationStage={creationStage}
          onLifecycleChange={setLifecycle}
          onLowFpsDetected={handleLowFps}
        />
      )}

      <ExperienceProgress
        chapters={CHAPTERS}
        activeChapter={activeChapter}
        scrollProgress={scrollProgress}
      />
      */}

      <div
        ref={telemetryRef}
        aria-hidden="true"
        className="sr-only"
        data-active-chapter="awakening"
        data-scroll-progress="0.00"
        data-creation-stage={creationStage}
        data-user-quality={userQuality}
        onClick={() => {
          handleQualityChange(userQuality);
          handleLowFps();
        }}
      />

      <main id="main-content" className="relative z-10">
        {/* CHAPTER 1: AWAKENING (12-column Left/Right Hero Split with zero text overlap) */}
        {chAwakening && (
          <ScrollChapter
            chapter={chAwakening}
            showStaticPoster={false}
            className="flex min-h-[calc(100vh-5rem)] items-center"
          >
            <HeroNarrative
              headingId="chapter-awakening-heading"
              eyebrow={chAwakening.eyebrow}
              title={chAwakening.title}
              description={chAwakening.fallbackContent.body}
              primaryCtaLabel={
                chAwakening.fallbackContent.ctaLabel ?? "Explore Our Worlds"
              }
              primaryCtaHref={
                chAwakening.fallbackContent.ctaHref ?? "#four-worlds"
              }
              secondaryCtaLabel={
                chAwakening.fallbackContent.secondaryCtaLabel ??
                "Discover AVERXON"
              }
              secondaryCtaHref={
                chAwakening.fallbackContent.secondaryCtaHref ?? "/about"
              }
            />
          </ScrollChapter>
        )}

        {/* CHAPTER 2: HERITAGE */}
        {chHeritage && (
          <ScrollChapter chapter={chHeritage}>
            <div className="space-y-8">
              <p className="max-w-3xl text-base leading-[1.65] text-[#B6B9C9] sm:text-lg">
                {chHeritage.fallbackContent.body}
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-0">
                {CULTURAL_PILLARS.map((pillar) => (
                  <CulturalPillarCard key={pillar.id} item={pillar} />
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-5 pt-2">
                <Link
                  href="#creation"
                  className="group inline-flex min-h-[50px] items-stretch border border-[#FF6924]/75 bg-[#090B16]/80 backdrop-blur-md transition-all hover:border-[#FDB001] hover:shadow-[0_0_24px_rgba(255,105,36,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]"
                >
                  <span className="flex items-center px-6 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#F5F5FA] transition-colors group-hover:text-[#FDB001]">
                    See How We Create
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex w-12 items-center justify-center border-l border-[#FF6924]/50 bg-[#FF6924]/10 text-[#FF6924] transition-colors group-hover:border-[#FDB001]/60 group-hover:bg-[#FDB001]/20 group-hover:text-[#FDB001]"
                  >
                    <Play className="h-3 w-3 fill-current" />
                  </span>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex min-h-[50px] items-center border border-[#F5F5FA]/20 bg-[#090B16]/55 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#D0D4E4] backdrop-blur-md transition-all hover:border-[#01BEF5] hover:text-[#F5F5FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]"
                >
                  Discover AVERXON
                </Link>
              </div>
            </div>
          </ScrollChapter>
        )}

        {/* CHAPTER 3: ABOUT OUR GAMES (THREE ACTIVE WORLDS) */}
        {chFourWorlds && (
          <ScrollChapter chapter={chFourWorlds}>
            <div className="space-y-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <p className="max-w-3xl text-base leading-[1.65] text-[#B6B9C9] sm:text-lg">
                  {chFourWorlds.fallbackContent.body}
                </p>
                <Link
                  href="/games"
                  className="group inline-flex min-h-[48px] items-stretch border border-[#FF6924]/75 bg-[#090B16]/80 backdrop-blur-md transition-all hover:border-[#FDB001] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]"
                >
                  <span className="flex items-center px-6 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#F5F5FA] transition-colors group-hover:text-[#FDB001]">
                    About Our Games
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex w-12 items-center justify-center border-l border-[#FF6924]/50 bg-[#FF6924]/10 text-[#FF6924] transition-colors group-hover:border-[#FDB001]/60 group-hover:bg-[#FDB001]/20 group-hover:text-[#FDB001]"
                  >
                    <Play className="h-3 w-3 fill-current" />
                  </span>
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-0">
                {PROJECTS.map((project) => (
                  <GameShowcaseCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </ScrollChapter>
        )}

        {/* CHAPTER 4: MILESTONES */}
        {chMilestones && (
          <ScrollChapter chapter={chMilestones}>
            <div className="space-y-8">
              <p className="max-w-3xl text-base leading-[1.65] text-[#B6B9C9] sm:text-lg">
                {chMilestones.fallbackContent.body}
              </p>

              <ol className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-0">
                {ACHIEVEMENTS.map((ach, idx) => (
                  <li key={ach.id} className="h-full">
                    <AchievementCard
                      achievement={ach}
                      indexNumber={`0${idx + 1}`}
                    />
                  </li>
                ))}
              </ol>

              <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2 md:gap-0">
                {PARTNERS.map((partner, idx) => (
                  <div
                    key={partner.id}
                    className="group relative flex flex-col justify-between overflow-hidden border border-[#F5F5FA]/10 bg-gradient-to-b from-[#151729]/85 via-[#090B16]/90 to-[#030237]/95 p-7 transition-all duration-500 hover:border-[#8A45CD]/60 sm:p-8"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-2.5">
                        <span
                          aria-hidden="true"
                          className="inline-block h-[2px] w-4 bg-[#FF6924] transition-all duration-300 group-hover:w-7 group-hover:bg-[#FDB001]"
                        />
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#FF6924]">
                          0{idx + 1} &bull; {partner.relationship}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold tracking-tight text-[#F5F5FA]">
                        {partner.name}
                      </h3>
                      <p className="text-sm leading-[1.7] text-[#B6B9C9]">
                        {partner.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <Link
                  href="/achievements"
                  className="group inline-flex min-h-[50px] items-stretch border border-[#FF6924]/75 bg-[#090B16]/80 backdrop-blur-md transition-all hover:border-[#FDB001] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]"
                >
                  <span className="flex items-center px-6 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#F5F5FA] transition-colors group-hover:text-[#FDB001]">
                    View Our Milestones
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex w-12 items-center justify-center border-l border-[#FF6924]/50 bg-[#FF6924]/10 text-[#FF6924] transition-colors group-hover:border-[#FDB001]/60 group-hover:bg-[#FDB001]/20 group-hover:text-[#FDB001]"
                  >
                    <Play className="h-3 w-3 fill-current" />
                  </span>
                </Link>
              </div>
            </div>
          </ScrollChapter>
        )}

        {/* CHAPTER 5: BEHIND THE GAMES (FROM CONCEPT TO 3D) */}
        {chCreation && (
          <ScrollChapter chapter={chCreation}>
            <div className="space-y-8">
              <p className="max-w-3xl text-base leading-[1.65] text-[#B6B9C9] sm:text-lg">
                {chCreation.fallbackContent.body}
              </p>
              <ProcessComparison
                stages={CREATION_STAGES}
                onStageChange={setCreationStage}
              />
            </div>
          </ScrollChapter>
        )}

        {/* NEWS & EVENTS — in-page dispatches with inline reader (single-page landing) */}
        <LandingNewsSection />

        {/* CHAPTER 6: FUTURE — Horizon Finale + Collaboration Pathways + Contact Details */}
        {chFuture && (
          <ScrollChapter chapter={chFuture}>
            <div className="space-y-12">
              <CollaborationCTA
                heading={chFuture.fallbackContent.heading}
                subtext={chFuture.fallbackContent.body}
                primaryLabel={
                  chFuture.fallbackContent.ctaLabel ?? "Work With Us"
                }
                primaryHref="#connect-inquiry"
                secondaryLabel={
                  chFuture.fallbackContent.secondaryCtaLabel ??
                  "Explore Our Worlds"
                }
                secondaryHref="#four-worlds"
              />

              <div
                id="connect-inquiry"
                className="grid scroll-mt-24 grid-cols-1 border border-[#F5F5FA]/10 bg-gradient-to-b from-[#151729]/85 via-[#090B16]/90 to-[#030237]/95 lg:grid-cols-12"
              >
                <div className="space-y-0 border-b border-[#F5F5FA]/10 lg:col-span-5 lg:border-b-0 lg:border-r">
                  {COLLABORATION_PATHWAYS.map((pathway) => (
                    <div
                      key={pathway.index}
                      className="group space-y-3 border-b border-[#F5F5FA]/10 p-7 last:border-b-0 sm:p-8"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          aria-hidden="true"
                          className="inline-block h-[2px] w-4 bg-[#FF6924] transition-all duration-300 group-hover:w-7 group-hover:bg-[#FDB001]"
                        />
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#FF6924]">
                          {pathway.index} &bull; {pathway.tag}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold tracking-tight text-[#F5F5FA]">
                        {pathway.title}
                      </h3>
                      <p className="text-sm leading-[1.7] text-[#B6B9C9]">
                        {pathway.description}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="p-7 sm:p-9 lg:col-span-7">
                  <h3 className="text-2xl font-bold tracking-tight text-[#F5F5FA]">
                    Averxon Studios Association
                  </h3>
                  <address className="mt-8 space-y-6 not-italic">
                    <p className="border-b border-[#F5F5FA]/10 pb-6 text-base leading-relaxed text-[#B6B9C9]">
                      Barangay Bantad, Boac Marinduque
                    </p>
                    <p className="border-b border-[#F5F5FA]/10 pb-6 text-base leading-relaxed text-[#B6B9C9]">
                      <a
                        className="transition-colors hover:text-[#FDB001] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]"
                        href="tel:09074527117"
                      >
                        0907-452-7117
                      </a>
                    </p>
                    <p className="text-base leading-relaxed text-[#B6B9C9]">
                      <a
                        className="break-all transition-colors hover:text-[#FDB001] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]"
                        href="mailto:averxonstudioassociation@gmail.com"
                      >
                        averxonstudioassociation@gmail.com
                      </a>
                    </p>
                  </address>
                </div>
              </div>
            </div>
          </ScrollChapter>
        )}
      </main>
    </div>
  );
}

const COLLABORATION_PATHWAYS = [
  {
    index: "01",
    tag: "CO-DEVELOPMENT",
    title: "Game Co-Development & Publishing",
    description:
      "Partner on original Philippine folklore and traditional game titles.",
  },
  {
    index: "02",
    tag: "RESEARCH",
    title: "Cultural & Academic Research",
    description:
      "Work with universities, museums, and cultural bearers on verified storytelling and interactive archives.",
  },
  {
    index: "03",
    tag: "COMMUNITY",
    title: "Expos, Showcases & Student Mentorship",
    description:
      "Invite AVERXON to game development summits, regional innovation showcases, and campus workshops.",
  },
];

/**
 * News & Events — single-page landing section (`#news`).
 * Articles expand inline so visitors can read without leaving the page;
 * the full `/news/[slug]` routes remain for direct links and sharing.
 */
function LandingNewsSection() {
  const [openArticleId, setOpenArticleId] = useState<string | null>(null);

  return (
    <section
      id="news"
      aria-labelledby="landing-news-heading"
      className="relative z-10 w-full scroll-mt-20 overflow-x-clip py-16 md:py-24 xl:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 mx-auto grid max-w-7xl grid-cols-4 px-5 md:px-8 xl:px-12"
      >
        <div className="border-l border-[#F5F5FA]/[0.05]" />
        <div className="border-l border-[#F5F5FA]/[0.05]" />
        <div className="border-l border-[#F5F5FA]/[0.05]" />
        <div className="border-x border-[#F5F5FA]/[0.05]" />
      </div>

      <ParallaxDepthSection
        intensity={0.85}
        className="mx-auto w-full max-w-7xl px-5 md:px-8 xl:px-12"
      >
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[#FDB001]">
            NEWS &amp; EVENTS — DISPATCHES FROM THE STUDIO
          </p>
          <h2
            id="landing-news-heading"
            className="text-3xl font-bold leading-[1.12] tracking-tight text-[#F5F5FA] sm:text-4xl xl:text-[2.75rem]"
          >
            Latest From AVERXON
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-0">
          {ARTICLES.map((article, idx) => {
            const isOpen = openArticleId === article.id;
            const panelId = `landing-article-${article.id}`;
            return (
              <article
                key={article.id}
                className="group relative flex h-full flex-col overflow-hidden border border-[#F5F5FA]/10 bg-gradient-to-b from-[#151729]/85 via-[#090B16]/90 to-[#030237]/95 transition-colors duration-500 hover:border-[#8A45CD]/60"
              >
                {article.cover && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[#F5F5FA]/10 bg-[#090B16]">
                    <img
                      src={article.cover.src}
                      alt={article.cover.alt}
                      width={1280}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2.5">
                        <span
                          aria-hidden="true"
                          className="inline-block h-[2px] w-4 bg-[#FF6924] transition-all duration-300 group-hover:w-7 group-hover:bg-[#FDB001]"
                        />
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#FF6924]">
                          0{idx + 1} &bull; {article.category}
                        </span>
                      </span>
                      <time
                        dateTime={article.publishedAt}
                        className="font-mono text-[11px] text-[#B6B9C9]"
                      >
                        {article.publishedAt}
                      </time>
                    </div>
                    <h3 className="text-xl font-bold leading-snug tracking-tight text-[#F5F5FA]">
                      {article.title}
                    </h3>
                    <p className="text-sm leading-[1.7] text-[#B6B9C9]">
                      {article.excerpt}
                    </p>
                    {isOpen && (
                      <div
                        id={panelId}
                        className="space-y-3 border-t border-[#F5F5FA]/10 pt-4 text-sm leading-[1.7] text-[#D0D4E4]"
                      >
                        {article.body.map((paragraph) => (
                          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                        ))}
                        <Link
                          href={`/news/${article.slug}`}
                          className="inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-[#01BEF5] hover:text-[#FDB001]"
                        >
                          Open full article page &rarr;
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 border-t border-[#F5F5FA]/10 pt-4">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() =>
                        setOpenArticleId((cur) =>
                          cur === article.id ? null : article.id
                        )
                      }
                      className="group/btn flex min-h-[48px] w-full items-stretch justify-between border border-[#FF6924]/75 bg-[#090B16]/85 transition-all hover:border-[#FDB001] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]"
                    >
                      <span className="flex items-center px-5 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#F5F5FA] transition-colors group-hover/btn:text-[#FDB001]">
                        {isOpen ? "Close Article" : "Read Article"}
                      </span>
                      <span
                        aria-hidden="true"
                        className="flex w-12 items-center justify-center border-l border-[#FF6924]/50 bg-[#FF6924]/10 text-[#FF6924] transition-colors group-hover/btn:border-[#FDB001]/60 group-hover/btn:bg-[#FDB001]/20 group-hover/btn:text-[#FDB001]"
                      >
                        <Play
                          className={`h-3 w-3 fill-current transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
                        />
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </ParallaxDepthSection>
    </section>
  );
}
