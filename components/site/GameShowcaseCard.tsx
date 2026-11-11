import React from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';
import type { Project } from '@/content/schema';
import { splitDisplayTitle } from '@/content/games';

export interface GameShowcaseCardProps {
  project: Project;
}

const GENERATED_CARD_COVERS: Record<string, string> = {
  'chronicles-of-babaylan':
    '/assets/games/chronicles-of-babaylan/posters/card-cover.png',
  habulan: '/assets/games/habulan/posters/card-cover.png',
  'myth-mayhem': '/assets/games/myth-mayhem/posters/card-cover.png',
};

/**
 * GameShowcaseCard — Locked IOCO Architectural Style
 * - Unified 16:10 cover image generated from official reference artwork (zero floating tags on image)
 * - Clean architectural body with canonical title, summary, 1 short tag, and split-chamber "View Project" button
 */
export function GameShowcaseCard({ project }: GameShowcaseCardProps) {
  const { gameMedia } = project;
  const shortTag = project.genres[0] ?? 'Mythic World';
  const coverSrc =
    GENERATED_CARD_COVERS[project.slug] ??
    gameMedia.poster?.src ??
    project.posterFallback.src;
  const coverAlt = gameMedia.poster?.alt ?? project.posterFallback.alt;
  const { main: mainTitle, sub: subTitle } = splitDisplayTitle(
    project.canonicalTitle,
  );

  return (
    <article className='h-full' data-game-slug={project.slug}>
      <div
        style={
          {
            '--world-accent': project.gameMedia.worldAccentHex,
          } as React.CSSProperties
        }
        className='group relative flex h-full flex-col overflow-hidden border border-[#F5F5FA]/10 bg-gradient-to-b from-[#151729]/85 via-[#090B16]/90 to-[#030237]/95 transition-all duration-500 hover:border-[#8A45CD]/60 hover:from-[#8A45CD]/20 hover:via-[#151729]/90 hover:to-[#090B16]'
      >
        {/* Clean 16:10 Key-Art Cover Stage (no floating tags or split-box placeholders) */}
        <div className='relative aspect-[16/10] w-full overflow-hidden border-b border-[#F5F5FA]/10 bg-[#090B16]'>
          <img
            src={coverSrc}
            alt={coverAlt}
            width={1280}
            height={800}
            loading='lazy'
            className='h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]'
          />
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090B16] via-transparent to-transparent opacity-80'
          />
        </div>

        {/* Architectural Card Body */}
        <div className='flex flex-1 flex-col justify-between p-6 sm:p-7'>
          <div className='space-y-4'>
            {/* Single Short Tag */}
            <div className='flex items-center gap-2.5'>
              <span
                aria-hidden='true'
                className='inline-block h-[2px] w-4 bg-[#FF6924] transition-all duration-300 group-hover:w-7 group-hover:bg-[#FDB001]'
              />
              <span className='font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#FF6924]'>
                {shortTag}
              </span>
            </div>

            <h3 className='text-[1.35rem] font-bold leading-[1.2] tracking-tight text-[#F5F5FA]'>
              <span>{mainTitle}</span>
              {subTitle && (
                <span className='mt-1 block font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#01BEF5]'>
                  {subTitle}
                </span>
              )}
            </h3>

            <p className='text-sm leading-[1.7] text-[#B6B9C9]'>
              {project.summary}
            </p>
          </div>

          {/* Locked IOCO Split-Chamber "View Project" Button */}
          <div className='mt-6 pt-4 border-t border-[#F5F5FA]/10'>
            <Link
              href={`/games/${project.slug}`}
              aria-label={`View Project: ${project.canonicalTitle}`}
              className='group/btn flex min-h-[48px] w-full items-stretch justify-between border border-[#FF6924]/75 bg-[#090B16]/85 transition-all hover:border-[#FDB001] hover:shadow-[0_0_24px_rgba(255,105,36,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]'
            >
              <span className='flex items-center px-5 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#F5F5FA] transition-colors group-hover/btn:text-[#FDB001]'>
                View Project
              </span>
              <span
                aria-hidden='true'
                className='flex w-12 items-center justify-center border-l border-[#FF6924]/50 bg-[#FF6924]/10 text-[#FF6924] transition-colors group-hover/btn:border-[#FDB001]/60 group-hover/btn:bg-[#FDB001]/20 group-hover/btn:text-[#FDB001]'
              >
                <Play className='h-3 w-3 fill-current' />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
