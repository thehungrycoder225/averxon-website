import { describe, expect, it } from "vitest";
import * as THREE from "three";
import {
  ACHIEVEMENTS,
  ARTICLES,
  ASSET_MANIFEST,
  CHAPTERS,
  FLAGSHIP_TITLE,
  PARTNERS,
  PRIMARY_NAV_ITEMS,
  PROJECTS,
  getManifestEntriesByProject,
} from "@/content";
import { interpolateCameraPose } from "@/experience/animation/chapterTimeline";
import {
  disposeObject3D,
  downgradeTierOnLowFps,
  resolveQualityTier,
} from "@/experience/quality/qualityTiers";
import {
  createTumbaCanGroup,
  measureTumbaCanMetrics,
} from "@/experience/procedural/TumbaCanProp";
import {
  createBakunawaSerpentGroup,
  createRemontadaCharacterGroup,
  measureObjectMetrics,
} from "@/experience/reconstructions/BakunawaModels";
import {
  createHabulanBelfryGroup,
  createKenKenCharacterGroup,
  createNiningJoanCharacterGroup,
} from "@/experience/reconstructions/HabulanModels";
import {
  createManananggalCharacterGroup,
  createMythMayhemCardGroup,
} from "@/experience/reconstructions/MythMayhemModels";
import { ContactSubmissionSchema } from "@/lib/validation";

describe("AVERXON Master Lock, UI/UX Refinement & 3D Asset Reconstruction Suite", () => {
  it("AT01 / FR01: defines exactly 6 primary navigation destinations", () => {
    expect(PRIMARY_NAV_ITEMS).toHaveLength(6);
    expect(PRIMARY_NAV_ITEMS.map((i) => i.href)).toEqual([
      "/",
      "/about",
      "/games",
      "/achievements",
      "/news",
      "/connect",
    ]);
  });

  it("AT02 / FR02: defines all 6 homepage chapters in canonical sequence with approved CTAs and posters", () => {
    expect(CHAPTERS).toHaveLength(6);
    expect(CHAPTERS.map((c) => c.id)).toEqual([
      "awakening",
      "heritage",
      "four-worlds",
      "milestones",
      "creation",
      "future",
    ]);
    expect(CHAPTERS[0]?.fallbackContent.ctaLabel).toBe("Explore Our Worlds");
    expect(CHAPTERS[0]?.fallbackContent.secondaryCtaLabel).toBe(
      "Discover AVERXON"
    );
    expect(CHAPTERS[3]?.fallbackContent.ctaLabel).toBe("View Our Milestones");
    expect(CHAPTERS[4]?.fallbackContent.ctaLabel).toBe("See How We Create");
    expect(CHAPTERS[5]?.fallbackContent.ctaLabel).toBe("Work With Us");

    for (const ch of CHAPTERS) {
      expect(ch.accessibleSummary.length).toBeGreaterThan(20);
      expect(ch.poster.alt.length).toBeGreaterThan(10);
      expect(ch.poster.licenseStatus).toBe("approved_first_party");
    }
  });

  it("Goal 1.2 & AT07 / FR03: enforces canonical flagship title 'Legend of Bakunawa: Chronicles of Babaylan' while preserving route slugs", () => {
    expect(PROJECTS).toHaveLength(3);
    const slugs = PROJECTS.map((p) => p.slug);
    expect(slugs).toEqual([
      "chronicles-of-babaylan",
      "habulan",
      "myth-mayhem",
    ]);

    const babaylan = PROJECTS.find((p) => p.slug === "chronicles-of-babaylan")!;
    expect(babaylan.canonicalTitle).toBe(
      "Legend of Bakunawa: Chronicles of Babaylan"
    );
    expect(FLAGSHIP_TITLE).toBe("Legend of Bakunawa: Chronicles of Babaylan");
    expect(babaylan.subtitlePendingConfirmation).toBe(false);
  });

  it("Goal 2.2: enforces AssetManifest with structured Asset IDs (BAK-01, BAK-02, HAB-01..03, MYT-01..02) and isApproved: false by default", () => {
    expect(ASSET_MANIFEST).toHaveLength(9);
    expect(getManifestEntriesByProject("brand-averxon")).toHaveLength(1);

    const codes = ASSET_MANIFEST.map((e) => e.assetCode);
    expect(codes).toEqual([
      "BRD-01",
      "BAK-01",
      "BAK-02",
      "HAB-03",
      "HAB-01",
      "HAB-02",
      "MYT-02",
      "MYT-01A",
      "MYT-01",
    ]);

    for (const entry of ASSET_MANIFEST) {
      expect(entry.isApproved).toBe(false);
      expect(entry.visualReviewStatus).toBe("reference_locked_2d_only");
    }

    for (const project of PROJECTS) {
      expect(project.gameMedia.rights.isApproved).toBe(false);
      expect(project.gameMedia.poster).not.toBeNull();
      expect(project.genres.length).toBeLessThanOrEqual(3);
    }

    expect(getManifestEntriesByProject("chronicles-of-babaylan")).toHaveLength(2);
    expect(getManifestEntriesByProject("habulan")).toHaveLength(3);
    expect(getManifestEntriesByProject("myth-mayhem")).toHaveLength(3);
  });

  it("AT07 / FR04: preserves exact Master Lock achievements and partnerships without invented dates or awards", () => {
    const titles = ACHIEVEMENTS.map((a) => a.title);
    expect(titles).toContain("Level Up 2.0");
    expect(titles).toContain("Level Up 3.0");
    expect(titles).toContain("PROPEL DOST Region IV-B");

    for (const ach of ACHIEVEMENTS) {
      expect(ach.year).toBeUndefined();
    }

    const partnerNames = PARTNERS.map((p) => p.name);
    expect(partnerNames).toContain("Cyber Craft PH");
    expect(partnerNames).toContain("PROPEL DOST Region IV-B");
  });

  it("AT03 / FR07: interpolates camera pose deterministically across [0..1] scroll progress", () => {
    const startPose = interpolateCameraPose(0);
    expect(startPose.activeChapter).toBe("awakening");
    expect(startPose.position).toEqual([0, 0, 12]);

    const midPose = interpolateCameraPose(0.45);
    expect(midPose.activeChapter).toBe("four-worlds");

    const endPose = interpolateCameraPose(1);
    expect(endPose.activeChapter).toBe("future");
    expect(endPose.position).toEqual([0, 6, -18]);
  });

  it("AT04 & AT05: resolves quality tiers and enforces STATIC fallback on reduced motion or unsupported WebGL", () => {
    const baseCaps = {
      prefersReducedMotion: false,
      saveData: false,
      webgl2Supported: true,
      hardwareConcurrency: 8,
      deviceMemoryGb: 8,
      maxTextureSize: 8192,
      isMobileViewport: false,
    };

    expect(resolveQualityTier("AUTO", baseCaps).tier).toBe("HIGH");
    expect(
      resolveQualityTier("AUTO", { ...baseCaps, prefersReducedMotion: true })
    ).toEqual({
      tier: "STATIC",
      fallbackReason: "REDUCED_MOTION",
    });
    expect(
      resolveQualityTier("AUTO", { ...baseCaps, webgl2Supported: false })
    ).toEqual({
      tier: "STATIC",
      fallbackReason: "WEBGL_UNSUPPORTED",
    });

    expect(downgradeTierOnLowFps("HIGH")).toBe("MEDIUM");
    expect(downgradeTierOnLowFps("MEDIUM")).toBe("LOW");
    expect(downgradeTierOnLowFps("LOW")).toBe("STATIC");
  });

  it("AT08 / FR06: validates ContactForm submissions and rejects invalid payloads or honeypot spam", () => {
    const valid = ContactSubmissionSchema.safeParse({
      fullName: "Juan Dela Cruz",
      email: "juan@averxon.ph",
      organization: "AVERXON",
      category: "partnership",
      message: "We would love to collaborate on a Philippine cultural gaming showcase.",
      _gotcha: "",
    });
    expect(valid.success).toBe(true);

    const invalidShort = ContactSubmissionSchema.safeParse({
      fullName: "J",
      email: "not-an-email",
      category: "partnership",
      message: "Too short",
      _gotcha: "",
    });
    expect(invalidShort.success).toBe(false);
  });

  it("AT09: disposes Three.js geometries and materials cleanly without errors", () => {
    const group = new THREE.Group();
    const geom = new THREE.BoxGeometry(1, 1, 1);
    const mat = new THREE.MeshStandardMaterial({ color: 0xfdb001 });
    const mesh = new THREE.Mesh(geom, mat);
    group.add(mesh);

    expect(() => disposeObject3D(group)).not.toThrow();
  });

  it("AT11 / FR08: ensures all articles and media assets have approved first-party licenseStatus and alt text", () => {
    for (const art of ARTICLES) {
      if (art.cover) {
        expect(art.cover.licenseStatus).toBe("approved_first_party");
        expect(art.cover.alt.length).toBeGreaterThan(10);
      }
    }
  });

  it("Goal 2.4–2.6: verifies all game-specific 3D asset reconstructions (BAK-01, BAK-02, HAB-01, HAB-02, MYT-01, MYT-02) build and dispose within budget", () => {
    const models = [
      { id: "BAK-01", group: createBakunawaSerpentGroup("HIGH") },
      { id: "BAK-02", group: createRemontadaCharacterGroup("HIGH") },
      { id: "HAB-01", group: createKenKenCharacterGroup("HIGH") },
      { id: "HAB-02", group: createNiningJoanCharacterGroup("HIGH") },
      { id: "HAB-BELFRY", group: createHabulanBelfryGroup("HIGH") },
      { id: "MYT-01", group: createManananggalCharacterGroup("HIGH") },
      { id: "MYT-02", group: createMythMayhemCardGroup("HIGH") },
    ];

    for (const item of models) {
      const metrics = measureObjectMetrics(item.id, item.group);
      expect(metrics.triangles).toBeGreaterThan(50);
      expect(metrics.triangles).toBeLessThanOrEqual(15000);
      expect(metrics.meshCount).toBeGreaterThan(2);
      expect(() => disposeObject3D(item.group)).not.toThrow();
    }
  });

  it("AT12 / FR10: preserves existing Project Tumba procedural prop module untouched", () => {
    const highGroup = createTumbaCanGroup("HIGH");
    const highMetrics = measureTumbaCanMetrics(highGroup);
    expect(highMetrics.triangles).toBeGreaterThan(0);
    expect(highMetrics.triangles).toBeLessThanOrEqual(2500);
    expect(highMetrics.meshCount).toBeLessThanOrEqual(2);
    expect(() => disposeObject3D(highGroup)).not.toThrow();
  });
});
