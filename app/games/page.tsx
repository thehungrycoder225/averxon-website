import React from "react";
import type { Metadata } from "next";
import { PROJECTS } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { SiteHeader } from "@/components/site/SiteHeader";
import { GameShowcaseCard } from "@/components/site/GameShowcaseCard";
import { CollaborationCTA } from "@/components/site/CollaborationCTA";
import {
  PageParallaxBackdrop,
  ParallaxDepthSection,
} from "@/components/experience/DeepParallaxStage";

export const metadata: Metadata = buildMetadata({
  title: "Our Games | AVERXON — Philippine Cultural Game Worlds",
  description:
    "Explore AVERXON's original Philippine cultural games: Legend of Bakunawa: Chronicles of Babaylan, Habulan: The Curse of the 5th Bell, and Myth Mayhem.",
  canonicalPath: "/games",
  ogImage: "/assets/games/chronicles-of-babaylan/posters/bakunawa-key-art.png",
  noIndex: false,
});

export default function GamesIndexPage() {
  return (
    <>
      <SiteHeader />
      <PageParallaxBackdrop theme="games" />
      <main
        id="main-content"
        className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-5 py-14 md:px-8 md:py-20 xl:px-12"
      >
        <ParallaxDepthSection intensity={0.65}>
          <section
            aria-labelledby="games-heading"
            className="max-w-3xl space-y-4"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-block h-[2px] w-6 bg-[#FF6924]"
              />
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-[#FDB001]">
                01 / ABOUT OUR GAMES
              </p>
            </div>
            <h1
              id="games-heading"
              className="text-4xl font-bold leading-tight tracking-tight text-[#F5F5FA] sm:text-5xl"
            >
              Original Worlds of Philippine Myth &amp; Play
            </h1>
            <p className="text-base leading-[1.7] text-[#B6B9C9] sm:text-lg">
              Each AVERXON title preserves a distinct thread of Philippine
              heritage—from pre-colonial Babaylan mythology and nocturnal belfry
              folklore to strategic mythological arenas.
            </p>
          </section>
        </ParallaxDepthSection>

        <ParallaxDepthSection intensity={0.85}>
          <section
            aria-label="AVERXON games catalog"
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-0"
          >
            {PROJECTS.map((project) => (
              <GameShowcaseCard key={project.id} project={project} />
            ))}
          </section>
        </ParallaxDepthSection>

        <ParallaxDepthSection intensity={0.75}>
          <section
            aria-label="Collaboration call to action"
            className="mt-16 md:mt-24"
          >
            <CollaborationCTA />
          </section>
        </ParallaxDepthSection>
      </main>
    </>
  );
}
