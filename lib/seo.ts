import type { Metadata } from "next";
import type { Article, Project, SEOMetadata } from "@/content/schema";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://averxon.ph";

export const BRAND_NAME = "AVERXON";
export const BRAND_TAGLINE = "Coding the Culture. Creating the Future.";

export function buildMetadata(seo: SEOMetadata): Metadata {
  const canonicalUrl = `${SITE_URL}${seo.canonicalPath}`;
  const ogImageUrl = seo.ogImage
    ? seo.ogImage.startsWith("http")
      ? seo.ogImage
      : `${SITE_URL}${seo.ogImage}`
    : `${SITE_URL}/media/posters/ch1-awakening.svg`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: seo.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonicalUrl,
      siteName: BRAND_NAME,
      type: "website",
      locale: "en_PH",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImageUrl],
    },
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    slogan: BRAND_TAGLINE,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/brand/averxon-studios-logo.jpg`,
    description:
      "Philippine cultural gaming association preserving folklore, mythology, and traditional street games through immersive games and 3D experiences.",
  };
}

export function buildVideoGameJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: project.canonicalTitle,
    description: project.description,
    genre: project.genres,
    url: `${SITE_URL}/games/${project.slug}`,
    image: `${SITE_URL}${project.posterFallback.src}`,
    author: {
      "@type": "Organization",
      name: BRAND_NAME,
    },
  };
}

export function buildArticleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    url: `${SITE_URL}/news/${article.slug}`,
    author: {
      "@type": "Organization",
      name: BRAND_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/brand/averxon-studios-logo.jpg`,
      },
    },
  };
}
