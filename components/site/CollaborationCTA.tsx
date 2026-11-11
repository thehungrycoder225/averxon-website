import React from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';

export interface CollaborationCTAProps {
  heading?: string;
  subtext?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

/**
 * Horizon Finale & Collaboration Stage — Inspired by Frame 3 of IOCO / Biocomputer (Mike | Creative Mints)
 * Features:
 * - Top descending sculptural focal bloom framed by a large thin orbital ring
 * - Ultra-wide letter-spaced horizon motto (`CODING THE CULTURE • CREATING THE FUTURE`)
 * - Monumental centered `AVERXON` display wordmark & heading
 * - Centered IOCO split-chamber rectangular CTA button (`WORK WITH US | ▸`)
 */
export function CollaborationCTA({
  heading = 'Shape the Future of Philippine Cultural Gaming With Us',
  subtext = 'Partner with AVERXON on game co-development, cultural & academic research, interactive 3D showcases, or community events.',
  primaryLabel = 'Work With Us',
  primaryHref = '/connect',
  secondaryLabel = 'Explore Our Worlds',
  secondaryHref = '/games',
}: CollaborationCTAProps) {
  return (
    <div className='relative overflow-hidden border border-[#F5F5FA]/10 bg-gradient-to-b from-[#151729]/90 via-[#090B16]/95 to-[#030237] px-6 py-16 shadow-2xl sm:px-12 sm:py-24'>
      {/* Signature Top Rule */}
      <div
        aria-hidden='true'
        className='avx-brand-rule absolute inset-x-0 top-0 h-0.5 w-full'
      />

      {/* Large Thin Orbital Arc Ring (IOCO Frame 3 Style) */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute left-1/2 top-[-240px] h-[540px] w-[540px] -translate-x-1/2 rounded-full border border-[#F5F5FA]/10 sm:h-[680px] sm:w-[680px]'
      />

      {/* Top Descending Sculptural Bloom & Emblem */}
      <div
        aria-hidden='true'
        className='pointer-events-none relative mx-auto mb-10 flex h-28 w-28 items-center justify-center'
      >
        <div
          className='absolute inset-[-40%] rounded-full blur-2xl'
          style={{
            background:
              'radial-gradient(circle, rgba(138, 69, 205, 0.55) 0%, rgba(1, 190, 245, 0.32) 45%, rgba(255, 105, 36, 0.18) 70%, transparent 85%)',
          }}
        />
        <img
          src='/assets/brand/averxon-arrow-icon.png'
          alt=''
          width={61}
          height={36}
          className='relative z-10 h-14 w-auto object-contain drop-shadow-[0_0_24px_rgba(1,190,245,0.6)]'
        />
      </div>

      <div className='relative z-10 mx-auto max-w-4xl space-y-6 text-center'>
        {/* Ultra-Wide Spaced Horizon Motto (IOCO `B E T T E R   T H A N   Q U A N T U M` Style) */}
        {/* <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.48em] text-[#B6B9C9] sm:text-[11px] sm:tracking-[0.6em]">
          CODING THE CULTURE &bull; CREATING THE FUTURE
        </p> */}

        {/* Monumental Centered Wordmark & Section Heading */}
        <div className='space-y-2'>
          <p className='text-4xl font-extrabold tracking-[0.24em] text-[#F5F5FA] sm:text-5xl'>
            AVERXON
          </p>
          {/* <p className='font-mono text-[10px] font-semibold uppercase tracking-[0.38em] text-[#FF6924]'>
            HYBRID CULTURAL FUTURISM
          </p> */}
        </div>

        <h2 className='mx-auto max-w-2xl pt-2 text-2xl font-bold leading-tight text-[#F5F5FA] sm:text-3xl'>
          {heading}
        </h2>

        <p className='mx-auto max-w-2xl text-sm leading-[1.7] text-[#B6B9C9] sm:text-base'>
          {subtext}
        </p>

        {/* Centered IOCO Split-Chamber Rectangular Action Buttons */}
        <div className='flex flex-wrap items-center justify-center gap-5 pt-4'>
          <Link
            href={primaryHref}
            className='group inline-flex min-h-[52px] items-stretch border border-[#FF6924]/80 bg-[#090B16]/85 shadow-[0_10px_30px_rgba(0,0,0,0.55)] backdrop-blur-md transition-all hover:border-[#FDB001] hover:shadow-[0_0_28px_rgba(255,105,36,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]'
          >
            <span className='flex items-center px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#F5F5FA] transition-colors group-hover:text-[#FDB001]'>
              {primaryLabel}
            </span>
            <span
              aria-hidden='true'
              className='flex items-center justify-center border-l border-[#FF6924]/50 bg-[#FF6924]/10 px-4 text-[#FF6924] transition-colors group-hover:border-[#FDB001]/60 group-hover:bg-[#FDB001]/20 group-hover:text-[#FDB001]'
            >
              <Play className='h-3.5 w-3.5 fill-current' />
            </span>
          </Link>

          <Link
            href={secondaryHref}
            className='inline-flex min-h-[52px] items-center border border-[#F5F5FA]/20 bg-[#090B16]/55 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#D0D4E4] backdrop-blur-md transition-all hover:border-[#01BEF5] hover:text-[#F5F5FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]'
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
