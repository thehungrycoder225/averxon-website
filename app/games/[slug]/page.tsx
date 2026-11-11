import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { PROJECTS, getProjectBySlug } from "@/content";
import { buildMetadata, buildVideoGameJsonLd } from "@/lib/seo";
import { SiteHeader } from "@/components/site/SiteHeader";
import { MediaGallery } from "@/components/site/MediaGallery";
import { CollaborationCTA } from "@/components/site/CollaborationCTA";
import {
  PageParallaxBackdrop,
  ParallaxDepthSection,
  type PageSceneTheme,
} from "@/components/experience/DeepParallaxStage";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Game Not Found | AVERXON" };
  }
  return buildMetadata(project.seo);
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = PROJECTS.findIndex((p) => p.slug === project.slug);
  const prevGame =
    PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length]!;
  const nextGame = PROJECTS[(currentIndex + 1) % PROJECTS.length]!;
  const jsonLd = buildVideoGameJsonLd(project);
  const parallaxTheme: PageSceneTheme =
    project.slug === "habulan"
      ? "habulan"
      : project.slug === "myth-mayhem"
      ? "myth-mayhem"
      : "babaylan";
  const shortTag = project.genres[0] ?? "Mythic World";

  return (
    <>
      <SiteHeader />
      <PageParallaxBackdrop theme={parallaxTheme} />
      <main
        id="main-content"
        className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-5 py-14 md:px-8 md:py-20 xl:px-12"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-[#B6B9C9]"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link
                href="/"
                className="hover:text-[#01BEF5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/games"
                className="hover:text-[#01BEF5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]"
              >
                Our Games
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-[#FDB001]">
              {project.canonicalTitle}
            </li>
          </ol>
        </nav>

        {/* Game detail hero */}
        <ParallaxDepthSection intensity={0.65}>
          <section
            aria-labelledby="game-title"
            className="max-w-3xl space-y-6"
          >
            {/* Single Short Architectural Tag (no multiple pill chips) */}
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-block h-[2px] w-6 bg-[#FF6924]"
              />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FF6924]">
                0{currentIndex + 1} &bull; {shortTag}
              </span>
            </div>

            <h1
              id="game-title"
              className="text-3xl font-bold leading-tight tracking-tight text-[#F5F5FA] sm:text-5xl"
            >
              {project.canonicalTitle}
            </h1>

            <p className="text-base leading-[1.7] text-[#B6B9C9] sm:text-lg">
              {project.summary}
            </p>

            {/* Locked IOCO Split-Chamber Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#gallery"
                className="group inline-flex min-h-[50px] items-stretch border border-[#FF6924]/80 bg-[#090B16]/85 backdrop-blur-md transition-all hover:border-[#FDB001] hover:shadow-[0_0_24px_rgba(255,105,36,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]"
              >
                <span className="flex items-center px-6 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#F5F5FA] transition-colors group-hover:text-[#FDB001]">
                  Concept Art &amp; Character Design
                </span>
                <span
                  aria-hidden="true"
                  className="flex w-12 items-center justify-center border-l border-[#FF6924]/50 bg-[#FF6924]/10 text-[#FF6924] transition-colors group-hover:border-[#FDB001]/60 group-hover:bg-[#FDB001]/20"
                >
                  <Play className="h-3 w-3 fill-current" />
                </span>
              </a>
              <Link
                href="/connect"
                className="inline-flex min-h-[50px] items-center border border-[#F5F5FA]/20 bg-[#090B16]/60 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#D0D4E4] backdrop-blur-md transition-all hover:border-[#01BEF5] hover:text-[#F5F5FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]"
              >
                Work With Us
              </Link>
            </div>
          </section>
        </ParallaxDepthSection>

        {/* Cultural Inspiration & World Overview — Architectural Columns */}
        <ParallaxDepthSection intensity={0.8}>
          <section
            aria-labelledby="cultural-roots-heading"
            className="mt-16 grid grid-cols-1 border border-[#F5F5FA]/10 bg-gradient-to-b from-[#151729]/85 via-[#090B16]/90 to-[#030237]/95 md:mt-24 lg:grid-cols-12"
          >
            <div className="space-y-5 border-b border-[#F5F5FA]/10 p-7 sm:p-9 lg:col-span-7 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="inline-block h-[2px] w-5 bg-[#8A45CD]"
                />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#FDB001]">
                  01 &bull; CULTURAL FOUNDATION
                </span>
              </div>
              <h2
                id="cultural-roots-heading"
                className="text-2xl font-bold tracking-tight text-[#F5F5FA] sm:text-3xl"
              >
                Behind the Game &amp; Cultural Inspiration
              </h2>
              <p className="text-base leading-[1.7] text-[#B6B9C9]">
                {project.description}
              </p>
              <div className="border-t border-[#F5F5FA]/10 pt-5">
                <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#FF6924]">
                  Heritage &amp; Folklore Roots
                </h3>
                <p className="mt-2 text-sm leading-[1.7] text-[#D0D4E4]">
                  {project.culturalInspiration}
                </p>
              </div>
            </div>

            <div className="space-y-5 p-7 sm:p-9 lg:col-span-5">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="inline-block h-[2px] w-5 bg-[#01BEF5]"
                />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#01BEF5]">
                  02 &bull; SPECIFICATIONS
                </span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[#F5F5FA]">
                World Overview
              </h3>
              <div className="space-y-4 border-t border-[#F5F5FA]/10 pt-4 text-sm">
                <div>
                  <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#B6B9C9]">
                    Canonical Title
                  </span>
                  <span className="mt-1 block font-semibold text-[#F5F5FA]">
                    {project.canonicalTitle}
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#B6B9C9]">
                    Primary Discipline
                  </span>
                  <span className="mt-1 block text-[#FDB001]">{shortTag}</span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#B6B9C9]">
                    Cultural Focus
                  </span>
                  <span className="mt-1 block text-[#D0D4E4]">
                    {project.culturalThemes[0]}
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#B6B9C9]">
                    Visual Presentation
                  </span>
                  <span className="mt-1 block text-xs text-[#01BEF5]">
                    Concept Art, Character Design &amp; Interactive 3D Showcase
                  </span>
                </div>
              </div>
            </div>
          </section>
        </ParallaxDepthSection>

        {/* Core Gameplay & Experience Pillars — IOCO Architectural Columns */}
        <ParallaxDepthSection intensity={0.85}>
          <section
            aria-labelledby="features-heading"
            className="mt-16 space-y-6 md:mt-24"
          >
            <h2
              id="features-heading"
              className="text-2xl font-bold tracking-tight text-[#F5F5FA] sm:text-3xl"
            >
              Core Gameplay &amp; Experience Pillars
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-0">
              {project.features.map((feat, idx) => (
                <div
                  key={feat.title}
                  className="group relative flex flex-col justify-between border border-[#F5F5FA]/10 bg-gradient-to-b from-[#151729]/85 via-[#090B16]/90 to-[#030237]/95 p-7 transition-all duration-500 hover:border-[#8A45CD]/60 sm:p-8"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <span className="block font-mono text-xs font-bold tracking-[0.2em] text-[#F5F5FA]">
                        0{idx + 1}
                      </span>
                      <span
                        aria-hidden="true"
                        className="block h-[2px] w-4 bg-[#8A45CD] transition-all duration-300 group-hover:w-8 group-hover:bg-[#FDB001]"
                      />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-[#F5F5FA]">
                      {feat.title}
                    </h3>
                    <p className="text-sm leading-[1.7] text-[#B6B9C9]">
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ParallaxDepthSection>

        {/* Concept Art & Character Design Gallery */}
        <ParallaxDepthSection intensity={0.8}>
          <section
            aria-labelledby="gallery-heading"
            className="mt-16 space-y-6 md:mt-24"
          >
            <h2
              id="gallery-heading"
              className="text-2xl font-bold tracking-tight text-[#F5F5FA] sm:text-3xl"
            >
              Concept Art &amp; Character Design
            </h2>
            {project.gallery.length > 0 && (
              <MediaGallery
                items={project.gallery}
                gameTitle={project.canonicalTitle}
              />
            )}
          </section>
        </ParallaxDepthSection>

        {/* Cross-Navigation */}
        <nav
          aria-label="Other AVERXON worlds"
          className="mt-16 flex flex-col justify-between gap-4 border-t border-[#F5F5FA]/10 pt-8 sm:flex-row sm:items-center"
        >
          <Link
            href={`/games/${prevGame.slug}`}
            className="inline-flex min-h-[48px] items-center gap-3 border border-[#F5F5FA]/15 bg-[#090B16]/75 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#D0D4E4] transition-all hover:border-[#01BEF5] hover:text-[#F5F5FA]"
          >
            <ArrowLeft className="h-4 w-4 text-[#FF6924]" aria-hidden="true" />
            <span>Previous: {prevGame.canonicalTitle}</span>
          </Link>
          <Link
            href={`/games/${nextGame.slug}`}
            className="inline-flex min-h-[48px] items-center gap-3 border border-[#FF6924]/70 bg-[#090B16]/85 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5F5FA] transition-all hover:border-[#FDB001] hover:text-[#FDB001]"
          >
            <span>Next: {nextGame.canonicalTitle}</span>
            <ArrowRight className="h-4 w-4 text-[#FF6924]" aria-hidden="true" />
          </Link>
        </nav>

        <section
          aria-label="Collaboration call to action"
          className="mt-16 md:mt-24"
        >
          <CollaborationCTA />
        </section>
      </main>
    </>
  );
}
