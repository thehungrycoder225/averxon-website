'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useParallaxMotion } from '@/components/experience/parallaxEngine';

import { ChevronLeft, ChevronRight } from 'lucide-react';
// Temporarily commented out Play icon used by the commented-out CTAs — preserved for future reuse:
// import { Play } from "lucide-react";

export interface HeroNarrativeProps {
  headingId?: string;
  eyebrow?: string;
  title?: string;
  tagline?: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

interface HeroWorldSlide {
  index: string;
  worldTitle: string;
  subtitle: string;
  characterSrc: string;
  characterDimensions: { width: number; height: number };
  characterAlt: string;
  backdropSrc: string;
  href: string;
  auraGradient: string;
}

const HERO_WORLD_SLIDES: HeroWorldSlide[] = [
  {
    index: '01',
    worldTitle: 'Legend of Bakunawa: Chronicles of Babaylan',
    subtitle: 'THE REMONTADA • PRE-COLONIAL ECLIPSE MYTHOLOGY',
    characterSrc:
      '/assets/games/chronicles-of-babaylan/textures/remontada-front-alpha.png',
    characterDimensions: { width: 508, height: 1065 },
    characterAlt:
      'The Remontada — Babaylan warrior character from Legend of Bakunawa: Chronicles of Babaylan',
    backdropSrc:
      '/assets/games/chronicles-of-babaylan/posters/bakunawa-key-art.png',
    href: '/games/chronicles-of-babaylan',
    auraGradient:
      'radial-gradient(circle at 50% 45%, rgba(138, 69, 205, 0.45) 0%, rgba(1, 190, 245, 0.28) 38%, rgba(253, 176, 1, 0.16) 62%, transparent 80%)',
  },
  {
    index: '02',
    worldTitle: 'Habulan: The Curse of the 5th Bell',
    subtitle: 'JIE • NOCTURNAL BELFRY FOLKLORE',
    characterSrc: '/assets/games/habulan/models/habulan-jie-dynamic_pose.png',
    characterDimensions: { width: 1087, height: 1447 },
    characterAlt:
      'Jie in a dynamic pose from Habulan: The Curse of the 5th Bell',
    backdropSrc: '/assets/games/habulan/posters/habulan-logo-transparent.png',
    href: '/games/habulan',
    auraGradient:
      'radial-gradient(circle at 50% 45%, rgba(255, 105, 36, 0.42) 0%, rgba(138, 69, 205, 0.30) 40%, rgba(253, 176, 1, 0.18) 64%, transparent 80%)',
  },
  {
    index: '03',
    worldTitle: 'Myth Mayhem',
    subtitle: 'MANANANGGAL • COMPETITIVE MYTHOLOGICAL ARENA',
    characterSrc:
      '/assets/games/myth-mayhem/textures/manananggal-turn-front.png',
    characterDimensions: { width: 575, height: 1086 },
    characterAlt: 'Manananggal — character design from Myth Mayhem',
    backdropSrc: '/assets/games/myth-mayhem/posters/myth-mayhem-card.png',
    href: '/games/myth-mayhem',
    auraGradient:
      'radial-gradient(circle at 50% 45%, rgba(138, 69, 205, 0.52) 0%, rgba(255, 105, 36, 0.28) 42%, rgba(1, 190, 245, 0.20) 65%, transparent 80%)',
  },
];

/**
 * Chapter 1: Awakening Hero Stage — Non-Overlapping Architectural Grid
 * - Left controls (`<` `>`), Left-Center text safe zone (`lg:col-span-5`),
 *   Right-Center sculptural character stage (`lg:col-span-4`), and Right slide counter (`lg:col-span-2`)
 *   sit in dedicated grid columns so text never overlaps the character graphic.
 * - Primary and Secondary CTAs (`Explore Our Worlds` / `Discover AVERXON`) are commented out for future reuse.
 */
export function HeroNarrative({
  headingId = 'chapter-awakening-heading',
  eyebrow = '01 / AWAKENING — CODING THE CULTURE. CREATING THE FUTURE.',
  title = 'Bringing Culture to Life.',
  tagline = 'Coding the Culture. Creating the Future.',
  description,
  primaryCtaLabel = 'Explore Our Worlds',
  primaryCtaHref = '#four-worlds',
  secondaryCtaLabel = 'Discover AVERXON',
  secondaryCtaHref = '/about',
}: HeroNarrativeProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const textPlaneRef = useRef<HTMLDivElement>(null);
  const sculptureRef = useRef<HTMLDivElement>(null);

  const activeSlide =
    HERO_WORLD_SLIDES[activeSlideIndex] ?? HERO_WORLD_SLIDES[0]!;

  // Zero-re-render parallax: transforms are written straight to the DOM
  // by the shared motion engine, and only while the hero is on-screen.
  useParallaxMotion(rootRef, ({ scrollY, pointerX, pointerY }) => {
    if (sculptureRef.current) {
      sculptureRef.current.style.transform = `translate3d(${(pointerX * 14).toFixed(1)}px, ${(scrollY * -0.12 + pointerY * 10).toFixed(1)}px, 0px)`;
    }
    if (textPlaneRef.current) {
      textPlaneRef.current.style.transform = `translate3d(${(pointerX * -6).toFixed(1)}px, ${(scrollY * -0.05 + pointerY * -4).toFixed(1)}px, 0px)`;
    }
  });

  const handlePrevSlide = () => {
    setActiveSlideIndex(
      (prev) =>
        (prev - 1 + HERO_WORLD_SLIDES.length) % HERO_WORLD_SLIDES.length,
    );
  };

  const handleNextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % HERO_WORLD_SLIDES.length);
  };

  return (
    <div
      ref={rootRef}
      className='relative w-full py-6 lg:py-8'
      data-primary-cta-label={primaryCtaLabel}
      data-primary-cta-href={primaryCtaHref}
      data-secondary-cta-label={secondaryCtaLabel}
      data-secondary-cta-href={secondaryCtaHref}
    >
      {/* Dedicated Non-Overlapping 12-Column Architectural Grid */}
      <div className='relative z-20 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-6'>
        {/* Column 1: Circular Prev / Next Slide Controls (`<` `>`) */}
        <div className='order-3 flex items-center gap-2.5 lg:order-1 lg:col-span-1 lg:flex-col lg:items-start lg:justify-center'>
          <button
            type='button'
            onClick={handlePrevSlide}
            aria-label='Previous featured game world'
            className='inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#F5F5FA]/20 bg-[#090B16]/70 text-[#B6B9C9] backdrop-blur-md transition-all hover:border-[#01BEF5] hover:text-[#F5F5FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]'
          >
            <ChevronLeft className='h-4 w-4' aria-hidden='true' />
          </button>
          <button
            type='button'
            onClick={handleNextSlide}
            aria-label='Next featured game world'
            className='inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#FF6924]/80 bg-[#090B16]/85 text-[#F5F5FA] shadow-[0_0_20px_rgba(255,105,36,0.28)] backdrop-blur-md transition-all hover:border-[#FDB001] hover:text-[#FDB001] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]'
          >
            <ChevronRight className='h-4 w-4' aria-hidden='true' />
          </button>
        </div>

        {/* Columns 2–6: Dedicated Left Text Safe Zone (never overlaps the character stage) */}
        <div
          ref={textPlaneRef}
          data-testid='hero-text-safe-zone'
          className='order-1 space-y-5 will-change-transform lg:order-2 lg:col-span-5 lg:pr-4'
        >
          <div className='space-y-1.5'>
            <p className='font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#FDB001]'>
              {tagline}
            </p>
            <p className='font-mono text-[10px] uppercase tracking-[0.22em] text-[#01BEF5]'>
              {activeSlide.subtitle}
            </p>
            <p className='sr-only'>{eyebrow}</p>
          </div>

          <h1
            id={headingId}
            className='text-2xl font-bold leading-[1.08] tracking-[-0.025em] text-[#F5F5FA] sm:text-4xl lg:text-[3rem] xl:text-[3.25rem]'
          >
            {title}
          </h1>

          <p className='max-w-lg text-sm leading-[1.7] text-[#D0D4E4] sm:text-base'>
            {description}
          </p>

          {/* Temporarily commented out Explore Our Worlds and Discover AVERXON CTAs — preserved for future reuse:
          <div className="flex flex-wrap items-center gap-5 pt-3">
            <Link
              href={primaryCtaHref}
              className="group inline-flex min-h-[52px] items-stretch border border-[#FF6924]/80 bg-[#090B16]/80 shadow-[0_10px_30px_rgba(0,0,0,0.55)] backdrop-blur-md transition-all hover:border-[#FDB001] hover:shadow-[0_0_28px_rgba(255,105,36,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]"
            >
              <span className="flex items-center px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#F5F5FA] transition-colors group-hover:text-[#FDB001]">
                {primaryCtaLabel}
              </span>
              <span
                aria-hidden="true"
                className="flex w-13 items-center justify-center border-l border-[#FF6924]/50 bg-[#FF6924]/10 px-4 text-[#FF6924] transition-colors group-hover:border-[#FDB001]/60 group-hover:bg-[#FDB001]/20 group-hover:text-[#FDB001]"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
              </span>
            </Link>

            <Link
              href={secondaryCtaHref}
              className="inline-flex min-h-[52px] items-center border border-[#F5F5FA]/20 bg-[#090B16]/55 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#D0D4E4] backdrop-blur-md transition-all hover:border-[#01BEF5] hover:text-[#F5F5FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]"
            >
              {secondaryCtaLabel}
            </Link>
          </div>
          */}
        </div>

        {/* Columns 7–10: Dedicated Sculptural Character Stage (separated in its own column) */}
        <div
          ref={sculptureRef}
          data-testid='hero-visual-stage'
          className='order-2 relative mx-auto flex h-[340px] w-full max-w-md items-center justify-center will-change-transform sm:h-[400px] lg:order-3 lg:col-span-4 lg:h-[480px] lg:max-w-none'
        >
          {/* Luminous Violet / Electric Cyan / Flame Orange Sculptural Bloom */}
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-4 rounded-full blur-3xl transition-all duration-500'
            style={{ background: activeSlide.auraGradient }}
          />

          {/* Secondary Layered Sculptural Backdrop Silhouette */}
          <img
            src={activeSlide.backdropSrc}
            alt=''
            aria-hidden='true'
            className='pointer-events-none absolute h-[84%] w-[84%] rounded-full object-cover opacity-30 mix-blend-screen blur-[1px] transition-all duration-500'
          />

          {/* Thin Architectural Orbital Ring around the Subject */}
          <div
            aria-hidden='true'
            className='pointer-events-none absolute aspect-square h-[82%] rounded-full border border-[#F5F5FA]/12'
          />

          {/* Primary Unboxed Character Artwork */}
          <img
            key={activeSlide.characterSrc}
            src={activeSlide.characterSrc}
            alt={activeSlide.characterAlt}
            width={activeSlide.characterDimensions.width}
            height={activeSlide.characterDimensions.height}
            loading='eager'
            fetchPriority='high'
            decoding='async'
            className='relative z-10 h-full w-auto select-none object-contain drop-shadow-[0_24px_60px_rgba(3,2,55,0.95)] transition-opacity duration-500'
          />

          {/* Seamless Bottom Vignette Mist */}
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 bg-gradient-to-t from-[#030237] via-[#030237]/55 to-transparent'
          />
        </div>

        {/* Columns 11–12: Right Architectural Slide Counter (`01 / 03` + horizontal bar `—`) */}
        <div className='order-4 flex items-center justify-between border-t border-[#F5F5FA]/10 pt-4 lg:col-span-2 lg:flex-col lg:items-end lg:justify-center lg:border-t-0 lg:pt-0'>
          <div className='flex flex-col items-start lg:items-end'>
            <div className='flex items-baseline gap-2 font-mono'>
              <span className='text-3xl font-bold tracking-tight text-[#F5F5FA] sm:text-4xl'>
                {activeSlide.index}
              </span>
              <span className='text-xs font-semibold text-[#FF6924]'>
                / 0{HERO_WORLD_SLIDES.length}
              </span>
            </div>
            <span
              aria-hidden='true'
              className='mt-2 block h-0.5 w-8 bg-[#F5F5FA]'
            />
            <Link
              href={activeSlide.href}
              className='mt-3 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-[#B6B9C9] transition-colors hover:text-[#FDB001] lg:text-right'
            >
              {activeSlide.worldTitle} &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
