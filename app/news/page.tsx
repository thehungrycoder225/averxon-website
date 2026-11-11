import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Play } from "lucide-react";
import { ARTICLES } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { SiteHeader } from "@/components/site/SiteHeader";
import {
  PageParallaxBackdrop,
  ParallaxDepthSection,
} from "@/components/experience/DeepParallaxStage";

export const metadata: Metadata = buildMetadata({
  title: "News & Events | AVERXON",
  description:
    "Read the latest development dispatches, cultural research essays, and showcase updates from AVERXON.",
  canonicalPath: "/news",
  ogImage: "/assets/games/chronicles-of-babaylan/posters/card-cover.png",
  noIndex: false,
});

export default function NewsIndexPage() {
  return (
    <>
      <SiteHeader />
      <PageParallaxBackdrop theme="news" />
      <main
        id="main-content"
        className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-5 py-14 md:px-8 md:py-20 xl:px-12"
      >
        <ParallaxDepthSection intensity={0.65}>
          <section
            aria-labelledby="news-heading"
            className="max-w-3xl space-y-4"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-block h-[2px] w-6 bg-[#FF6924]"
              />
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-[#FDB001]">
                01 / BEHIND THE GAMES &amp; UPDATES
              </p>
            </div>
            <h1
              id="news-heading"
              className="text-4xl font-bold leading-tight tracking-tight text-[#F5F5FA] sm:text-5xl"
            >
              News &amp; Events
            </h1>
            <p className="text-base leading-[1.7] text-[#B6B9C9] sm:text-lg">
              Updates on our cultural game worlds, behind-the-scenes concept art
              and 3D character design notes, and community appearances.
            </p>
          </section>
        </ParallaxDepthSection>

        <ParallaxDepthSection intensity={0.85}>
          <section
            aria-label="Articles list"
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-0"
          >
            {ARTICLES.map((article, idx) => (
              <article key={article.id} className="h-full">
                <div className="group relative flex h-full flex-col overflow-hidden border border-[#F5F5FA]/10 bg-gradient-to-b from-[#151729]/85 via-[#090B16]/90 to-[#030237]/95 transition-all duration-500 hover:border-[#8A45CD]/60">
                  {/* Generated Reference-Based 16:10 Cover Stage (no floating pill tags) */}
                  {article.cover && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[#F5F5FA]/10 bg-[#090B16]">
                      <img
                        src={article.cover.src}
                        alt={article.cover.alt}
                        width={1280}
                        height={800}
                        loading="lazy"
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090B16] via-transparent to-transparent opacity-80"
                      />
                    </div>
                  )}

                  {/* Architectural Body with 1 Short Tag */}
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

                      <h2 className="text-xl font-bold leading-snug tracking-tight text-[#F5F5FA]">
                        {article.title}
                      </h2>

                      <p className="text-sm leading-[1.7] text-[#B6B9C9]">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Locked IOCO Split-Chamber "Read Article" Button */}
                    <div className="mt-6 border-t border-[#F5F5FA]/10 pt-4">
                      <Link
                        href={`/news/${article.slug}`}
                        className="group/btn flex min-h-[48px] w-full items-stretch justify-between border border-[#FF6924]/75 bg-[#090B16]/85 transition-all hover:border-[#FDB001] hover:shadow-[0_0_24px_rgba(255,105,36,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]"
                      >
                        <span className="flex items-center px-5 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#F5F5FA] transition-colors group-hover/btn:text-[#FDB001]">
                          Read Article
                        </span>
                        <span
                          aria-hidden="true"
                          className="flex w-12 items-center justify-center border-l border-[#FF6924]/50 bg-[#FF6924]/10 text-[#FF6924] transition-colors group-hover/btn:border-[#FDB001]/60 group-hover/btn:bg-[#FDB001]/20 group-hover/btn:text-[#FDB001]"
                        >
                          <Play className="h-3 w-3 fill-current" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </ParallaxDepthSection>
      </main>
    </>
  );
}
