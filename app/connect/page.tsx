import React from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SiteHeader } from "@/components/site/SiteHeader";
import {
  PageParallaxBackdrop,
  ParallaxDepthSection,
} from "@/components/experience/DeepParallaxStage";

export const metadata: Metadata = buildMetadata({
  title: "Work With Us | AVERXON — Partnerships, Research & Events",
  description:
    "Reach out to AVERXON for Philippine cultural game collaborations, academic research, showcase events, and press inquiries.",
  canonicalPath: "/connect",
  ogImage: "/assets/games/chronicles-of-babaylan/posters/hero-awakening-bg.png",
  noIndex: false,
});

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

export default function ConnectPage() {
  return (
    <>
      <SiteHeader />
      <PageParallaxBackdrop theme="connect" />
      <main
        id="main-content"
        className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-5 py-14 md:px-8 md:py-20 xl:px-12"
      >
        <ParallaxDepthSection intensity={0.65}>
          <section
            aria-labelledby="connect-heading"
            className="max-w-3xl space-y-4"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-block h-[2px] w-6 bg-[#FF6924]"
              />
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-[#FDB001]">
                01 / WORK WITH US
              </p>
            </div>
            <h1
              id="connect-heading"
              className="text-4xl font-bold leading-tight tracking-tight text-[#F5F5FA] sm:text-5xl"
            >
              Collaborate on Culture, Games &amp; Immersive 3D
            </h1>
            <p className="text-base leading-[1.7] text-[#B6B9C9] sm:text-lg">
              Whether you are an industry studio, cultural educator, student
              developer community, or event organizer, we welcome conversations
              that advance Philippine cultural gaming.
            </p>
          </section>
        </ParallaxDepthSection>

        <ParallaxDepthSection intensity={0.85}>
          <section
            aria-label="Collaboration pathways and contact information"
            className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-0"
          >
            <div className="flex flex-col border border-[#F5F5FA]/10 bg-gradient-to-b from-[#151729]/85 via-[#090B16]/90 to-[#030237]/95 lg:col-span-5 lg:border-r-0">
              {COLLABORATION_PATHWAYS.map((pathway) => (
                <div
                  key={pathway.index}
                  className="group flex-1 border-b border-[#F5F5FA]/10 p-7 transition-all duration-500 last:border-b-0 hover:bg-[#8A45CD]/15 sm:p-8"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className="inline-block h-[2px] w-4 bg-[#8A45CD] transition-all duration-300 group-hover:w-7 group-hover:bg-[#FDB001]"
                      />
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#FF6924]">
                        {pathway.index} &bull; {pathway.tag}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-[#F5F5FA]">
                      {pathway.title}
                    </h2>
                    <p className="text-sm leading-[1.7] text-[#B6B9C9]">
                      {pathway.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-7">
              <div className="h-full border border-[#F5F5FA]/10 bg-gradient-to-b from-[#151729]/85 via-[#090B16]/90 to-[#030237]/95 p-7 sm:p-9">
                <h2 className="text-2xl font-bold tracking-tight text-[#F5F5FA]">
                  Averxon Studios Association
                </h2>
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
          </section>
        </ParallaxDepthSection>
      </main>
    </>
  );
}
