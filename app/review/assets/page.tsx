import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  FileImage,
  Layers,
  ShieldAlert,
} from "lucide-react";
import { ASSET_MANIFEST, PROJECTS } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { SiteHeader } from "@/components/site/SiteHeader";
import { GameWorldInteractiveStage } from "@/components/experience/GameWorldInteractiveStage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata({
  title: "Internal Asset Inventory & 3D Review | AVERXON",
  description:
    "Internal AVERXON reference intake manifest, visible vs. unseen detail audit, and side-by-side 2D/3D review matrix per design.md v2.2.",
  canonicalPath: "/review/assets",
  noIndex: true,
});

const GATE_DEFINITIONS = [
  {
    gate: "A0",
    name: "Reference Intake",
    criteria:
      "Owner-supplied artwork saved in public/assets/games/{slug}/references/ and registered in content/assetManifest.ts.",
  },
  {
    gate: "A1",
    name: "Subject & Lore Audit",
    criteria:
      "Visible vs. unseen features documented; zero invented characters, costumes, symbols, or cultural claims.",
  },
  {
    gate: "A2",
    name: "Strategy Selection",
    criteria:
      "Explicit choice between existing approved GLB, img2threejs procedural prop, manual/articulated 3D model, or 2D/2.5D poster fallback.",
  },
  {
    gate: "A3",
    name: "2D Fallback Live",
    criteria:
      "Approved 2D poster/card renders cleanly at 320px–2560px with static fallback before any 3D promotion.",
  },
  {
    gate: "A4",
    name: "3D Side-by-Side Review",
    criteria:
      "Turntable/multi-angle comparison against source reference passes silhouette, proportion, palette, and lighting checks.",
  },
  {
    gate: "A5",
    name: "Technical & Perf Gate",
    criteria:
      "Meets polycount/texture budget, GPU resource disposal, and context-loss recovery.",
  },
  {
    gate: "A6",
    name: "Owner Production Signoff",
    criteria:
      "Owner explicitly marks isApproved: true in content/assetManifest.ts.",
  },
];

export default function AssetReviewPage() {
  return (
    <>
      <SiteHeader />
      <main
        id="main-content"
        className="mx-auto w-full max-w-7xl flex-1 space-y-14 px-5 py-14 md:px-8 md:py-20 xl:px-12"
      >
        {/* Header */}
        <section className="space-y-4">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[#01BEF5]">
            INTERNAL DEVELOPER &amp; OWNER REVIEW ROUTE (NOINDEX)
          </p>
          <h1 className="text-3xl font-bold leading-tight text-[#F5F5FA] sm:text-5xl">
            Game Art Inventory &amp; 3D Reconstruction Review
          </h1>
          <p className="max-w-3xl text-base leading-[1.65] text-[#B6B9C9]">
            This internal development tool catalogs every file inspected in{" "}
            <code className="rounded bg-[#22253A] px-1.5 py-0.5 font-mono text-xs text-[#FDB001]">
              image reference/
            </code>
            , documents visible vs. unseen details, enforces the{" "}
            <strong className="text-[#F5F5FA]">A0–A6 approval gates</strong>, and
            provides side-by-side comparison between locked 2D references and
            3D reconstructions. By policy,{" "}
            <code className="rounded bg-[#22253A] px-1.5 py-0.5 font-mono text-xs text-[#01BEF5]">
              isApproved
            </code>{" "}
            remains <strong className="text-[#FDB001]">false</strong> on all
            entries until explicit owner signoff.
          </p>
        </section>

        {/* Gate Legend (A0–A6) */}
        <section aria-labelledby="gates-heading" className="space-y-4">
          <h2
            id="gates-heading"
            className="text-xl font-bold text-[#F5F5FA] sm:text-2xl"
          >
            Approval Gate Protocol (A0 – A6)
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {GATE_DEFINITIONS.map((g) => (
              <div
                key={g.gate}
                className="rounded-xl border border-[#30344A] bg-[#151729] p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-[#FDB001]">
                    GATE {g.gate}
                  </span>
                  <span className="text-xs font-semibold text-[#01BEF5]">
                    {g.name}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#B6B9C9]">
                  {g.criteria}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Structured Asset Inventory Table (Goal 2.2) */}
        <section aria-labelledby="inventory-table-heading" className="space-y-4">
          <h2
            id="inventory-table-heading"
            className="text-xl font-bold text-[#F5F5FA] sm:text-2xl"
          >
            Complete Asset Inventory ({ASSET_MANIFEST.length} Verified Entries)
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-[#30344A] bg-[#151729]">
            <table className="w-full text-left text-xs text-[#B6B9C9]">
              <thead className="border-b border-[#30344A] bg-[#090B16] font-mono uppercase text-[#FDB001]">
                <tr>
                  <th className="p-3">Asset ID</th>
                  <th className="p-3">Project Name</th>
                  <th className="p-3">Original Path</th>
                  <th className="p-3">Subject Identity</th>
                  <th className="p-3">Type &amp; Views</th>
                  <th className="p-3">Method &amp; Section</th>
                  <th className="p-3">Approval Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#30344A]">
                {ASSET_MANIFEST.map((item) => (
                  <tr key={item.id} className="hover:bg-[#22253A]/40">
                    <td className="p-3 font-mono font-bold text-[#01BEF5]">
                      {item.assetCode ?? item.id}
                    </td>
                    <td className="p-3 font-semibold text-[#F5F5FA]">
                      {item.projectName ?? item.projectId}
                    </td>
                    <td className="p-3 font-mono text-[11px]">
                      {item.originalReferencePath}
                    </td>
                    <td className="p-3 text-[#F5F5FA]">
                      {item.subjectIdentity ?? item.caption}
                    </td>
                    <td className="p-3">
                      <span className="block font-mono text-[#FDB001]">
                        {item.type}
                      </span>
                      <span>
                        {item.availableViews?.join(", ") ??
                          `${item.dimensions.width}×${item.dimensions.height}`}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="block font-mono text-[#01BEF5]">
                        {item.recommendedStrategy}
                      </span>
                      <span className="text-[11px]">
                        {item.intendedSection}
                      </span>
                    </td>
                    <td className="p-3 font-mono">
                      <span className="block text-[#FDB001]">
                        {item.visualReviewStatus}
                      </span>
                      <span>isApproved: {String(item.isApproved)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Official Brand Identity Section (brand-averxon) */}
        {ASSET_MANIFEST.filter((e) => e.projectId === "brand-averxon").map(
          (brandEntry) => (
            <section
              key={brandEntry.id}
              id="brand-averxon"
              aria-labelledby="heading-brand-averxon"
              className="scroll-mt-24 space-y-6 border-t border-[#30344A] pt-10"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#FDB001]">
                    BRAND IDENTITY • {brandEntry.assetCode ?? "BRD-01"}
                  </span>
                  <h2
                    id="heading-brand-averxon"
                    className="text-2xl font-bold text-[#F5F5FA] sm:text-3xl"
                  >
                    AVERXON Studios Official Brand Mark
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-[#01BEF5]/40 bg-[#22253A] px-3 py-1 font-mono text-xs text-[#01BEF5]">
                    Status: {brandEntry.visualReviewStatus}
                  </span>
                  <span className="rounded-full border border-[#FDB001]/40 bg-[#151729] px-3 py-1 font-mono text-xs text-[#FDB001]">
                    isApproved: {String(brandEntry.isApproved)}
                  </span>
                </div>
              </div>

              <Card
                data-asset-id={brandEntry.id}
                className="overflow-hidden border-[#30344A] bg-[#151729]/95"
              >
                <CardHeader className="border-b border-[#30344A] bg-[#090B16]/60">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <FileImage
                        className="h-4 w-4 text-[#01BEF5]"
                        aria-hidden="true"
                      />
                      <CardTitle className="text-lg text-[#F5F5FA]">
                        {brandEntry.caption}
                      </CardTitle>
                    </div>
                    <span className="rounded bg-[#22253A] px-2.5 py-1 font-mono text-xs text-[#FDB001]">
                      {brandEntry.assetCode} • {brandEntry.id}
                    </span>
                  </div>
                  <CardDescription className="font-mono text-xs text-[#B6B9C9]">
                    Source: {brandEntry.originalReferencePath}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-12">
                  <div className="space-y-3 lg:col-span-5">
                    <figure className="overflow-hidden rounded-xl border border-[#30344A] bg-[#030237]">
                      <img
                        src={brandEntry.source}
                        alt={brandEntry.alt}
                        width={brandEntry.dimensions.width}
                        height={brandEntry.dimensions.height}
                        className="max-h-[320px] w-full object-contain p-2"
                      />
                      <figcaption className="border-t border-[#30344A] bg-[#090B16] px-3 py-2 font-mono text-[11px] text-[#B6B9C9]">
                        {brandEntry.source} ({brandEntry.dimensions.width}×
                        {brandEntry.dimensions.height}px •{" "}
                        {brandEntry.fileSizeBytes.toLocaleString()} bytes)
                      </figcaption>
                    </figure>
                  </div>
                  <div className="space-y-3 lg:col-span-7">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#FDB001]">
                      Observed Brand &amp; Palette Details (Gate A1)
                    </h3>
                    <ul className="space-y-1.5 text-xs text-[#F5F5FA]">
                      {brandEntry.visibleDetails.map((d) => (
                        <li key={d} className="flex items-start gap-2">
                          <CheckCircle2
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#01BEF5]"
                            aria-hidden="true"
                          />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>
          )
        )}

        {/* Per-Game Side-by-Side Intake & Live 3D Reconstruction Comparison */}
        {PROJECTS.map((project) => {
          const entries = ASSET_MANIFEST.filter(
            (e) => e.projectId === project.slug
          );
          const hasReferences = entries.some(
            (e) => e.visualReviewStatus !== "awaiting_reference_upload"
          );

          return (
            <section
              key={project.slug}
              id={project.slug}
              aria-labelledby={`heading-${project.slug}`}
              className="scroll-mt-24 space-y-6 border-t border-[#30344A] pt-10"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#FDB001]">
                    WORLD REVIEW • {project.slug.toUpperCase()}
                  </span>
                  <h2
                    id={`heading-${project.slug}`}
                    className="text-2xl font-bold text-[#F5F5FA] sm:text-3xl"
                  >
                    {project.canonicalTitle}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-[#01BEF5]/40 bg-[#22253A] px-3 py-1 font-mono text-xs text-[#01BEF5]">
                    Status: {project.gameMedia.reviewStatus}
                  </span>
                  <span className="rounded-full border border-[#FDB001]/40 bg-[#151729] px-3 py-1 font-mono text-xs text-[#FDB001]">
                    isApproved: {String(project.gameMedia.rights.isApproved)}
                  </span>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/games/${project.slug}`}>View Project</Link>
                  </Button>
                </div>
              </div>

              {/* Interactive 3D Reconstruction Preview for Owner Gate A4 Review */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
                <div className="space-y-2 lg:col-span-5">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#01BEF5]">
                    Gate A4 — Live 3D Reconstruction &amp; Multi-Angle Turntable
                  </h3>
                  <p className="text-xs leading-relaxed text-[#B6B9C9]">
                    Use the Front, 3/4 View, Side, and Rear buttons below the
                    stage to compare the 3D reconstruction against the original
                    reference sheets below.
                  </p>
                </div>
                <div className="lg:col-span-7">
                  <GameWorldInteractiveStage
                    slug={project.slug}
                    posterSrc={project.posterFallback.src}
                    posterAlt={project.posterFallback.alt}
                  />
                </div>
              </div>

              {/* Entries Grid */}
              <div className="grid grid-cols-1 gap-6">
                {entries.map((entry) => {
                  const isMissingRef =
                    entry.visualReviewStatus === "awaiting_reference_upload";

                  return (
                    <Card
                      key={entry.id}
                      data-asset-id={entry.id}
                      className="overflow-hidden border-[#30344A] bg-[#151729]/95"
                    >
                      <CardHeader className="border-b border-[#30344A] bg-[#090B16]/60">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <FileImage
                              className="h-4 w-4 text-[#01BEF5]"
                              aria-hidden="true"
                            />
                            <CardTitle className="text-lg text-[#F5F5FA]">
                              {entry.assetCode ? `[${entry.assetCode}] ` : ""}
                              {entry.caption}
                            </CardTitle>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                            <span className="rounded bg-[#22253A] px-2.5 py-1 text-[#FDB001]">
                              {entry.id}
                            </span>
                            <span className="rounded border border-[#30344A] bg-[#151729] px-2.5 py-1 text-[#01BEF5]">
                              Strategy: {entry.recommendedStrategy}
                            </span>
                          </div>
                        </div>
                        <CardDescription className="font-mono text-xs text-[#B6B9C9]">
                          Source:{" "}
                          {entry.originalReferencePath ??
                            "None found in image reference/"}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-12">
                        {/* Left Column: Official 2D Reference Image */}
                        <div className="space-y-3 lg:col-span-5">
                          <h3 className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#01BEF5]">
                            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>1. Source Reference Art (A0 / A3)</span>
                          </h3>

                          {!isMissingRef ? (
                            <figure className="overflow-hidden rounded-xl border border-[#30344A] bg-[#030237]">
                              <img
                                src={entry.source}
                                alt={entry.alt}
                                width={entry.dimensions.width}
                                height={entry.dimensions.height}
                                loading="lazy"
                                className="max-h-[360px] w-full object-contain p-2"
                              />
                              <figcaption className="border-t border-[#30344A] bg-[#090B16] px-3 py-2 font-mono text-[11px] text-[#B6B9C9]">
                                {entry.source} ({entry.dimensions.width}×
                                {entry.dimensions.height}px •{" "}
                                {entry.fileSizeBytes.toLocaleString()} bytes)
                              </figcaption>
                            </figure>
                          ) : (
                            <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-[#FDB001]/50 bg-[#090B16] p-6 text-center">
                              <AlertTriangle
                                className="mb-2 h-8 w-8 text-[#FDB001]"
                                aria-hidden="true"
                              />
                              <p className="text-sm font-semibold text-[#F5F5FA]">
                                Awaiting Reference Artwork
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Middle Column: Visible vs Unseen Audit (A1) */}
                        <div className="space-y-4 lg:col-span-4">
                          <div>
                            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#FDB001]">
                              2. Observed Visible Details (Gate A1)
                            </h3>
                            <ul className="mt-2 space-y-1.5 text-xs text-[#F5F5FA]">
                              {entry.visibleDetails.map((detail) => (
                                <li
                                  key={detail}
                                  className="flex items-start gap-2"
                                >
                                  <CheckCircle2
                                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#01BEF5]"
                                    aria-hidden="true"
                                  />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="border-t border-[#30344A] pt-3">
                            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#FF6924]">
                              3. Unseen / Inferred Details (Documented)
                            </h3>
                            <ul className="mt-2 space-y-1.5 text-xs text-[#B6B9C9]">
                              {entry.unseenDetails.map((unseen) => (
                                <li
                                  key={unseen}
                                  className="flex items-start gap-2"
                                >
                                  <ShieldAlert
                                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FF6924]"
                                    aria-hidden="true"
                                  />
                                  <span>{unseen}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Right Column: 3D Metrics & Gate Status (A2 / A4–A6) */}
                        <div className="space-y-3 rounded-xl border border-[#30344A] bg-[#090B16]/90 p-4 lg:col-span-3">
                          <h3 className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#8A45CD]">
                            <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>4. 3D Reconstruction Metrics</span>
                          </h3>

                          <div className="space-y-2 text-xs">
                            {entry.geometryMetrics && (
                              <div className="rounded-lg border border-[#30344A] bg-[#151729] p-3">
                                <span className="block font-mono text-[11px] text-[#B6B9C9]">
                                  3D Geometry Budget (Gate A5):
                                </span>
                                <span className="font-mono font-semibold text-[#01BEF5]">
                                  {entry.geometryMetrics.triangles.toLocaleString()}{" "}
                                  triangles • {entry.geometryMetrics.drawCalls}{" "}
                                  draw calls
                                </span>
                              </div>
                            )}

                            <div className="rounded-lg border border-[#30344A] bg-[#151729] p-3">
                              <span className="block font-mono text-[11px] text-[#B6B9C9]">
                                Reconstruction Strategy (Gate A2):
                              </span>
                              <span className="font-mono font-semibold text-[#01BEF5]">
                                {entry.recommendedStrategy}
                              </span>
                            </div>

                            <div className="rounded-lg border border-[#30344A] bg-[#151729] p-3">
                              <span className="block font-mono text-[11px] text-[#B6B9C9]">
                                Provenance &amp; Permission:
                              </span>
                              <p className="mt-1 leading-relaxed text-[#B6B9C9]">
                                {entry.licenseOrPermission}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 rounded-lg border border-[#FDB001]/40 bg-[#22253A] px-3 py-2 font-mono text-[11px] text-[#FDB001]">
                              <Clock className="h-3.5 w-3.5 shrink-0" />
                              <span>
                                {hasReferences
                                  ? "3D Reconstruction Ready for Owner A6 Signoff"
                                  : "Awaiting Reference Upload"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
    </>
  );
}
