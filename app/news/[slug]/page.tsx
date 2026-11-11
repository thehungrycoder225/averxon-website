import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ARTICLES, getArticleBySlug } from "@/content";
import { buildArticleJsonLd, buildMetadata } from "@/lib/seo";
import { SiteHeader } from "@/components/site/SiteHeader";
import {
  PageParallaxBackdrop,
  ParallaxDepthSection,
} from "@/components/experience/DeepParallaxStage";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return { title: "Article Not Found | AVERXON" };
  }
  return buildMetadata(article.seo);
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const jsonLd = buildArticleJsonLd(article);

  return (
    <>
      <SiteHeader />
      <PageParallaxBackdrop theme="news" />
      <main
        id="main-content"
        className="relative z-10 mx-auto w-full max-w-4xl flex-1 px-5 py-14 md:px-8 md:py-20"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="mb-8">
          <Link
            href="/news"
            className="inline-flex min-h-[44px] items-center gap-2.5 border border-[#F5F5FA]/15 bg-[#090B16]/75 px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#D0D4E4] transition-all hover:border-[#01BEF5] hover:text-[#F5F5FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]"
          >
            <ArrowLeft className="h-4 w-4 text-[#FF6924]" aria-hidden="true" />
            <span>Back to News &amp; Events</span>
          </Link>
        </div>

        <ParallaxDepthSection intensity={0.65}>
          <article className="border border-[#F5F5FA]/10 bg-gradient-to-b from-[#151729]/85 via-[#090B16]/90 to-[#030237]/95 p-7 sm:p-10">
            <header className="space-y-4 border-b border-[#F5F5FA]/10 pb-8">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="inline-block h-[2px] w-5 bg-[#FF6924]"
                  />
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#FF6924]">
                    {article.category}
                  </span>
                </span>
                <time
                  dateTime={article.publishedAt}
                  className="font-mono text-[#B6B9C9]"
                >
                  Published {article.publishedAt}
                </time>
              </div>
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#F5F5FA] sm:text-5xl">
                {article.title}
              </h1>
              <p className="text-lg leading-relaxed text-[#B6B9C9]">
                {article.excerpt}
              </p>
            </header>

            {article.cover && (
              <figure className="my-8 overflow-hidden border border-[#F5F5FA]/10 bg-[#090B16]">
                <img
                  src={article.cover.src}
                  alt={article.cover.alt}
                  className="aspect-video w-full object-cover"
                />
              </figure>
            )}

            <div className="space-y-5 pt-2 text-base leading-[1.75] text-[#F5F5FA] sm:text-lg">
              {article.body.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </article>
        </ParallaxDepthSection>
      </main>
    </>
  );
}
