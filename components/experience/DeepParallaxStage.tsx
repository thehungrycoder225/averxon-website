"use client";

import React, { useRef } from "react";
import type { ChapterId } from "@/content/schema";
import { cn } from "@/lib/utils";
import { useParallaxMotion } from "@/components/experience/parallaxEngine";

interface DepthLayerSpec {
  src: string;
  alt?: string;
  /** Scroll parallax multiplier (positive moves slower/down, negative moves up) */
  speed: number;
  /** Pointer tilt multiplier in px */
  tilt: number;
  /** Z-translate in px for 3D perspective depth */
  zDepth: number;
  className: string;
  opacity?: number;
}

const CHAPTER_PARALLAX_SCENES: Record<
  ChapterId,
  {
    bgImage: string;
    radialGlow: string;
    layers: DepthLayerSpec[];
  }
> = {
  awakening: {
    bgImage: "/assets/games/chronicles-of-babaylan/posters/hero-awakening-bg.png",
    radialGlow:
      "radial-gradient(circle at 62% 44%, rgba(253, 176, 1, 0.24) 0%, rgba(1, 190, 245, 0.12) 38%, rgba(3, 2, 55, 0.82) 78%)",
    layers: [
      {
        src: "/assets/games/chronicles-of-babaylan/posters/bakunawa-key-art.png",
        speed: 0.22,
        tilt: 18,
        zDepth: -120,
        opacity: 0.35,
        className:
          "right-[-4%] top-[-8%] h-[115%] w-[68%] object-cover object-top mix-blend-screen",
      },
      {
        src: "/assets/brand/averxon-arrow-icon.png",
        speed: -0.18,
        tilt: -26,
        zDepth: -60,
        opacity: 0.14,
        className:
          "left-[42%] top-[12%] h-64 w-64 object-contain blur-[1px] mix-blend-screen",
      },
    ],
  },
  heritage: {
    bgImage: "/media/posters/ch2-heritage.svg",
    radialGlow:
      "radial-gradient(circle at 75% 45%, rgba(138, 69, 205, 0.26) 0%, rgba(253, 176, 1, 0.14) 40%, rgba(3, 2, 55, 0.90) 80%)",
    layers: [
      {
        src: "/assets/games/chronicles-of-babaylan/posters/hero-awakening-bg.png",
        speed: 0.18,
        tilt: 14,
        zDepth: -140,
        opacity: 0.28,
        className: "inset-0 h-full w-full object-cover object-center",
      },
      {
        src: "/assets/games/chronicles-of-babaylan/textures/remontada-back-alpha.png",
        speed: -0.24,
        tilt: 28,
        zDepth: 40,
        opacity: 0.26,
        className:
          "right-[2%] bottom-[-6%] hidden h-[88%] w-auto object-contain lg:block drop-shadow-[0_16px_40px_rgba(0,0,0,0.9)]",
      },
      {
        src: "/assets/brand/averxon-arrow-icon.png",
        speed: 0.3,
        tilt: -20,
        zDepth: -40,
        opacity: 0.16,
        className: "right-[22%] top-[10%] h-52 w-52 object-contain",
      },
    ],
  },
  "four-worlds": {
    bgImage: "/media/posters/ch3-four-worlds.svg",
    radialGlow:
      "radial-gradient(circle at 50% 35%, rgba(1, 190, 245, 0.22) 0%, rgba(255, 105, 36, 0.14) 45%, rgba(3, 2, 55, 0.92) 82%)",
    layers: [
      {
        src: "/assets/games/chronicles-of-babaylan/posters/bakunawa-key-art.png",
        speed: 0.16,
        tilt: 15,
        zDepth: -150,
        opacity: 0.22,
        className: "inset-0 h-full w-full object-cover object-center",
      },
      {
        src: "/assets/games/myth-mayhem/textures/manananggal-turn-front.png",
        speed: -0.28,
        tilt: 32,
        zDepth: 55,
        opacity: 0.24,
        className:
          "right-[-2%] top-[4%] hidden h-[78%] w-auto object-contain xl:block drop-shadow-[0_0_36px_rgba(138,69,205,0.5)]",
      },
      {
        src: "/assets/games/habulan/posters/habulan-logo-transparent.png",
        speed: 0.25,
        tilt: -22,
        zDepth: -50,
        opacity: 0.18,
        className:
          "left-[2%] top-[8%] hidden h-44 w-auto object-contain lg:block",
      },
    ],
  },
  milestones: {
    bgImage: "/media/posters/ch4-milestones.svg",
    radialGlow:
      "radial-gradient(circle at 30% 45%, rgba(253, 176, 1, 0.22) 0%, rgba(1, 190, 245, 0.12) 42%, rgba(3, 2, 55, 0.92) 82%)",
    layers: [
      {
        src: "/assets/games/habulan/textures/ken-ken-alpha.png",
        speed: -0.22,
        tilt: 24,
        zDepth: 35,
        opacity: 0.2,
        className:
          "right-[3%] bottom-[-4%] hidden h-[76%] w-auto object-contain lg:block drop-shadow-[0_14px_34px_rgba(0,0,0,0.85)]",
      },
      {
        src: "/assets/brand/averxon-studios-lockup.png",
        speed: 0.2,
        tilt: -16,
        zDepth: -80,
        opacity: 0.12,
        className:
          "left-[4%] bottom-[8%] hidden h-36 w-auto object-contain md:block",
      },
    ],
  },
  creation: {
    bgImage: "/media/posters/ch5-creation.svg",
    radialGlow:
      "radial-gradient(circle at 68% 45%, rgba(1, 190, 245, 0.24) 0%, rgba(138, 69, 205, 0.18) 42%, rgba(3, 2, 55, 0.92) 82%)",
    layers: [
      {
        src: "/assets/games/myth-mayhem/posters/myth-mayhem-card.png",
        speed: -0.26,
        tilt: 28,
        zDepth: 45,
        opacity: 0.2,
        className:
          "right-[3%] top-[8%] hidden h-80 w-auto rotate-6 rounded-2xl object-contain xl:block",
      },
      {
        src: "/assets/games/myth-mayhem/textures/manananggal-turn-side.png",
        speed: 0.22,
        tilt: -20,
        zDepth: -60,
        opacity: 0.18,
        className:
          "left-[1%] bottom-[4%] hidden h-[72%] w-auto object-contain xl:block",
      },
    ],
  },
  future: {
    bgImage: "/assets/games/chronicles-of-babaylan/posters/hero-awakening-bg.png",
    radialGlow:
      "radial-gradient(circle at 50% 50%, rgba(253, 176, 1, 0.25) 0%, rgba(255, 105, 36, 0.15) 40%, rgba(3, 2, 55, 0.90) 80%)",
    layers: [
      {
        src: "/media/posters/ch6-future.svg",
        speed: 0.16,
        tilt: 14,
        zDepth: -110,
        opacity: 0.45,
        className: "inset-0 h-full w-full object-cover object-center",
      },
      {
        src: "/assets/brand/averxon-arrow-icon.png",
        speed: -0.24,
        tilt: 26,
        zDepth: 30,
        opacity: 0.18,
        className: "right-[8%] top-[14%] h-56 w-56 object-contain",
      },
    ],
  },
};

export interface ChapterParallaxBackdropProps {
  chapterId: ChapterId;
  isHero?: boolean;
}

/**
 * Multi-Plane 2.5D/3D Parallax Scene Backdrop for Homepage Chapters.
 * Optimized: transforms are written directly to the DOM by the shared
 * parallax engine (zero React re-renders) and only while the chapter is
 * near the viewport. Non-hero layers are lazy-loaded and async-decoded.
 */
export function ChapterParallaxBackdrop({
  chapterId,
  isHero = false,
}: ChapterParallaxBackdropProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const farRef = useRef<HTMLImageElement>(null);
  const layerRefs = useRef<Array<HTMLImageElement | null>>([]);

  const config =
    CHAPTER_PARALLAX_SCENES[chapterId] ?? CHAPTER_PARALLAX_SCENES.awakening;

  useParallaxMotion(
    containerRef,
    ({ viewportHeight, pointerX, pointerY }) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const offsetY = rect.top + rect.height * 0.5 - viewportHeight * 0.5;

      if (farRef.current) {
        farRef.current.style.transform = `translate3d(${(pointerX * -10).toFixed(1)}px, ${(offsetY * -0.14).toFixed(1)}px, -160px) scale(1.18)`;
      }

      config.layers.forEach((layer, index) => {
        const el = layerRefs.current[index];
        if (!el) return;
        const dx = pointerX * layer.tilt;
        const dy = offsetY * layer.speed + pointerY * layer.tilt * 0.6;
        el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, ${layer.zDepth}px) rotateX(${(-pointerY * 3).toFixed(2)}deg) rotateY(${(pointerX * 4).toFixed(2)}deg)`;
      });
    },
    [chapterId]
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
    >
      {/* Far Plane (-160px Z): Primary Environment Panorama */}
      <img
        ref={farRef}
        src={config.bgImage}
        alt=""
        width={1920}
        height={1080}
        loading={isHero ? "eager" : "lazy"}
        decoding={isHero ? "sync" : "async"}
        fetchPriority={isHero ? "high" : "low"}
        className={cn(
          "h-full w-full object-cover object-center will-change-transform",
          isHero ? "opacity-92" : "opacity-35"
        )}
        style={{ transform: "translate3d(0px, 0px, -160px) scale(1.18)" }}
      />

      {/* Mid-Far & Mid-Near Staggered Depth Planes */}
      {config.layers.map((layer, index) => (
        <img
          key={`${chapterId}-layer-${index}`}
          ref={(el) => {
            layerRefs.current[index] = el;
          }}
          src={layer.src}
          alt=""
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className={cn("absolute will-change-transform", layer.className)}
          style={{
            opacity: layer.opacity ?? 0.3,
            transform: `translate3d(0px, 0px, ${layer.zDepth}px)`,
          }}
        />
      ))}

      {/* Volumetric God-Ray & Left Safe-Zone Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: isHero
            ? `${config.radialGlow}, linear-gradient(90deg, rgba(3, 2, 55, 0.92) 0%, rgba(3, 2, 55, 0.66) 44%, rgba(3, 2, 55, 0.16) 75%, rgba(3, 2, 55, 0.55) 100%)`
            : config.radialGlow,
        }}
      />

      {/* Top & Bottom Seamless Chapter Blending Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030237]/85 via-transparent to-[#030237]" />
    </div>
  );
}

/**
 * 3D Scroll-Depth Container (`ParallaxDepthSection`)
 * Gives page sections a subtle 3D camera-corridor effect as the user scrolls.
 * Optimized: direct DOM transform writes, active only while near the viewport.
 */
export function ParallaxDepthSection({
  children,
  className,
  intensity = 1,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useParallaxMotion(
    ref,
    ({ viewportHeight }) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Normalized position relative to viewport center: -1 (top) .. 0 (center) .. +1 (bottom)
      const norm = Math.max(
        -1.2,
        Math.min(
          1.2,
          (rect.top + rect.height * 0.35 - viewportHeight * 0.5) /
            (viewportHeight * 0.65)
        )
      );
      const translateY = norm * 22 * intensity;
      const translateZ = -Math.abs(norm) * 36 * intensity;
      const rotateX = norm * 3.2 * intensity;
      el.style.transform = `perspective(1200px) translate3d(0px, ${translateY.toFixed(1)}px, ${translateZ.toFixed(1)}px) rotateX(${rotateX.toFixed(2)}deg)`;
    },
    [intensity]
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

export type PageSceneTheme =
  | "games"
  | "babaylan"
  | "habulan"
  | "myth-mayhem"
  | "about"
  | "achievements"
  | "news"
  | "connect";

const PAGE_SCENE_CONFIG: Record<
  PageSceneTheme,
  {
    bgImage: string;
    fgCutout: string;
    fgSecondary?: string;
    accentGlow: string;
  }
> = {
  games: {
    bgImage: "/assets/games/chronicles-of-babaylan/posters/hero-awakening-bg.png",
    fgCutout: "/assets/games/chronicles-of-babaylan/textures/remontada-front-alpha.png",
    fgSecondary: "/assets/games/myth-mayhem/textures/manananggal-turn-front.png",
    accentGlow:
      "radial-gradient(circle at 68% 35%, rgba(253, 176, 1, 0.24) 0%, rgba(1, 190, 245, 0.14) 40%, rgba(3, 2, 55, 0.92) 78%)",
  },
  babaylan: {
    bgImage: "/assets/games/chronicles-of-babaylan/posters/hero-awakening-bg.png",
    fgCutout: "/assets/games/chronicles-of-babaylan/textures/remontada-front-alpha.png",
    fgSecondary: "/assets/games/chronicles-of-babaylan/posters/bakunawa-key-art.png",
    accentGlow:
      "radial-gradient(circle at 65% 38%, rgba(253, 176, 1, 0.26) 0%, rgba(1, 190, 245, 0.16) 42%, rgba(3, 2, 55, 0.90) 80%)",
  },
  habulan: {
    bgImage: "/media/posters/ch3-four-worlds.svg",
    fgCutout: "/assets/games/habulan/textures/ken-ken-alpha.png",
    fgSecondary: "/assets/games/habulan/posters/habulan-logo-transparent.png",
    accentGlow:
      "radial-gradient(circle at 68% 35%, rgba(255, 105, 36, 0.24) 0%, rgba(253, 176, 1, 0.14) 42%, rgba(3, 2, 55, 0.92) 80%)",
  },
  "myth-mayhem": {
    bgImage: "/media/posters/ch5-creation.svg",
    fgCutout: "/assets/games/myth-mayhem/textures/manananggal-turn-front.png",
    fgSecondary: "/assets/games/myth-mayhem/posters/myth-mayhem-card.png",
    accentGlow:
      "radial-gradient(circle at 68% 35%, rgba(138, 69, 205, 0.28) 0%, rgba(1, 190, 245, 0.15) 42%, rgba(3, 2, 55, 0.92) 80%)",
  },
  about: {
    bgImage: "/assets/games/chronicles-of-babaylan/posters/hero-awakening-bg.png",
    fgCutout: "/assets/games/chronicles-of-babaylan/textures/remontada-front-alpha.png",
    fgSecondary: "/assets/brand/averxon-arrow-icon.png",
    accentGlow:
      "radial-gradient(circle at 70% 35%, rgba(253, 176, 1, 0.22) 0%, rgba(138, 69, 205, 0.16) 42%, rgba(3, 2, 55, 0.92) 80%)",
  },
  achievements: {
    bgImage: "/media/posters/ch4-milestones.svg",
    fgCutout: "/assets/games/habulan/textures/nining-joan-alpha.png",
    fgSecondary: "/assets/brand/averxon-studios-lockup.png",
    accentGlow:
      "radial-gradient(circle at 68% 35%, rgba(253, 176, 1, 0.25) 0%, rgba(1, 190, 245, 0.12) 42%, rgba(3, 2, 55, 0.92) 80%)",
  },
  news: {
    bgImage: "/assets/games/chronicles-of-babaylan/posters/hero-awakening-bg.png",
    fgCutout: "/assets/games/myth-mayhem/textures/manananggal-turn-front.png",
    fgSecondary: "/assets/games/myth-mayhem/posters/myth-mayhem-card.png",
    accentGlow:
      "radial-gradient(circle at 68% 35%, rgba(1, 190, 245, 0.22) 0%, rgba(138, 69, 205, 0.16) 42%, rgba(3, 2, 55, 0.92) 80%)",
  },
  connect: {
    bgImage: "/assets/games/chronicles-of-babaylan/posters/hero-awakening-bg.png",
    fgCutout: "/assets/games/chronicles-of-babaylan/textures/remontada-front-alpha.png",
    fgSecondary: "/assets/brand/averxon-arrow-icon.png",
    accentGlow:
      "radial-gradient(circle at 68% 35%, rgba(253, 176, 1, 0.24) 0%, rgba(1, 190, 245, 0.15) 42%, rgba(3, 2, 55, 0.92) 80%)",
  },
};

/**
 * Reusable Full-Page Multi-Layer Deep Parallax Backdrop for all secondary pages
 * (`/games`, `/games/[slug]`, `/about`, `/achievements`, `/news`, `/connect`).
 * Optimized: zero React re-renders on scroll/pointer (direct DOM writes).
 */
export function PageParallaxBackdrop({ theme }: { theme: PageSceneTheme }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const farRef = useRef<HTMLImageElement>(null);
  const secondaryRef = useRef<HTMLImageElement>(null);
  const cutoutRef = useRef<HTMLImageElement>(null);

  useParallaxMotion(
    rootRef,
    ({ scrollY, pointerX, pointerY }) => {
      if (farRef.current) {
        farRef.current.style.transform = `translate3d(${(pointerX * -12).toFixed(1)}px, ${(scrollY * -0.12).toFixed(1)}px, -160px) scale(1.18)`;
      }
      if (secondaryRef.current) {
        secondaryRef.current.style.transform = `translate3d(${(pointerX * -22).toFixed(1)}px, ${(scrollY * -0.22 + pointerY * -14).toFixed(1)}px, -70px)`;
      }
      if (cutoutRef.current) {
        cutoutRef.current.style.transform = `translate3d(${(pointerX * 26).toFixed(1)}px, ${(scrollY * -0.34 + pointerY * 16).toFixed(1)}px, 45px) rotateY(${(pointerX * 5).toFixed(2)}deg)`;
      }
    },
    [theme]
  );

  const cfg = PAGE_SCENE_CONFIG[theme] ?? PAGE_SCENE_CONFIG.games;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
    >
      {/* Far Plane: Panoramic Crafted Backdrop */}
      <img
        ref={farRef}
        src={cfg.bgImage}
        alt=""
        width={1920}
        height={1080}
        decoding="async"
        fetchPriority="high"
        className="h-full w-full object-cover object-center opacity-40 will-change-transform"
        style={{ transform: "translate3d(0px, 0px, -160px) scale(1.18)" }}
      />

      {/* Mid-Far Secondary Artifact/Emblem Plane */}
      {cfg.fgSecondary && (
        <img
          ref={secondaryRef}
          src={cfg.fgSecondary}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute right-[24%] top-[12%] hidden h-64 w-64 object-contain opacity-15 will-change-transform lg:block"
        />
      )}

      {/* Mid-Near Character Cutout Plane */}
      <img
        ref={cutoutRef}
        src={cfg.fgCutout}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute right-[2%] top-[10%] hidden h-[78vh] w-auto object-contain opacity-25 drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] will-change-transform lg:block"
      />

      {/* Atmospheric Radial Lighting & Left Safe-Zone Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `${cfg.accentGlow}, linear-gradient(90deg, rgba(3, 2, 55, 0.94) 0%, rgba(3, 2, 55, 0.78) 52%, rgba(3, 2, 55, 0.45) 100%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030237]/75 via-transparent to-[#030237]" />
    </div>
  );
}
