import type { Metadata, Viewport } from "next";
import { Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  BRAND_NAME,
  BRAND_TAGLINE,
  buildMetadata,
  buildOrganizationJsonLd,
} from "@/lib/seo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = buildMetadata({
  title: `${BRAND_NAME} — ${BRAND_TAGLINE}`,
  description:
    "AVERXON is a Philippine cultural gaming association preserving folklore, mythology, and traditional street heritage through immersive games and 3D experiences.",
  canonicalPath: "/",
  ogImage: "/assets/games/chronicles-of-babaylan/posters/bakunawa-key-art.png",
  noIndex: false,
});

export const viewport: Viewport = {
  themeColor: "#030237",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = buildOrganizationJsonLd();

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${spaceGrotesk.variable} dark`}
    >
      <body className="flex min-h-screen flex-col bg-[#030237] text-[#F5F5FA] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
