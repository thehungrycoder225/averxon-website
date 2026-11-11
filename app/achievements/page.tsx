import React from "react";
import type { Metadata } from "next";
import { ACHIEVEMENTS, PARTNERS } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { SiteHeader } from "@/components/site/SiteHeader";
import { AchievementCard } from "@/components/site/AchievementCard";
import { CollaborationCTA } from "@/components/site/CollaborationCTA";
import {
  PageParallaxBackdrop,
  ParallaxDepthSection,
} from "@/components/experience/DeepParallaxStage";

export const metadata: Metadata = buildMetadata({
  title: "Achievements & Partnerships | AVERXON",
  description:
    "Explore AVERXON's recognitions as Level Up 2.0 finalist, Level Up 3.0 professional and student finalist, Cyber Craft PH partner, and PROPEL DOST Region IV-B participant.",
  canonicalPath: "/achievements",
  ogImage: "/assets/games/habulan/posters/card-cover.png",
  noIndex: false,
});

export default function AchievementsPage() {
  return (
    <>
      <SiteHeader />
      <PageParallaxBackdrop theme="achievements" />
      <main
        id="main-content"
        className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-5 py-14 md:px-8 md:py-20 xl:px-12"
      >
        <ParallaxDepthSection intensity={0.65}>
          <section
            aria-labelledby="achievements-heading"
            className="max-w-3xl space-y-4"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-block h-[2px] w-6 bg-[#FF6924]"
              />
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-[#FDB001]">
                01 / OUR MILESTONES &amp; PARTNERSHIPS
              </p>
            </div>
            <h1
              id="achievements-heading"
              className="text-4xl font-bold leading-tight tracking-tight text-[#F5F5FA] sm:text-5xl"
            >
              Achievements &amp; Partnerships
            </h1>
            <p className="text-base leading-[1.7] text-[#B6B9C9] sm:text-lg">
              Every milestone below reflects our documented recognitions and
              institutional collaborations across the Philippine creative and
              innovation ecosystem.
            </p>
          </section>
        </ParallaxDepthSection>

        <ParallaxDepthSection intensity={0.85}>
          <section
            aria-labelledby="recognitions-heading"
            className="mt-14 space-y-6"
          >
            <h2
              id="recognitions-heading"
              className="text-2xl font-bold tracking-tight text-[#F5F5FA] sm:text-3xl"
            >
              Competitive Showcases &amp; Program Recognitions
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-0">
              {ACHIEVEMENTS.map((ach, idx) => (
                <AchievementCard
                  key={ach.id}
                  achievement={ach}
                  indexNumber={`0${idx + 1}`}
                />
              ))}
            </div>
          </section>
        </ParallaxDepthSection>

        <ParallaxDepthSection intensity={0.85}>
          <section
            aria-labelledby="partnerships-heading"
            className="mt-16 space-y-6"
          >
            <h2
              id="partnerships-heading"
              className="text-2xl font-bold tracking-tight text-[#F5F5FA] sm:text-3xl"
            >
              Strategic &amp; Institutional Partnerships
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-0">
              {PARTNERS.map((partner, idx) => (
                <div
                  key={partner.id}
                  className="group relative flex flex-col justify-between border border-[#F5F5FA]/10 bg-gradient-to-b from-[#151729]/85 via-[#090B16]/90 to-[#030237]/95 p-7 transition-all duration-500 hover:border-[#8A45CD]/60 sm:p-8"
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
                    <h3 className="text-2xl font-bold tracking-tight text-[#F5F5FA]">
                      {partner.name}
                    </h3>
                    <p className="text-sm leading-[1.7] text-[#B6B9C9]">
                      {partner.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
