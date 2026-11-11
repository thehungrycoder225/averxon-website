import React from 'react';
import Link from 'next/link';
import { PARTNERS, PRIMARY_NAV_ITEMS, PROJECTS } from '@/content';

export function SiteFooter() {
  return (
    <footer
      role='contentinfo'
      className='relative z-20 border-t border-[#30344A] bg-[#030237] text-[#B6B9C9]'
    >
      <div
        aria-hidden='true'
        className='avx-brand-rule h-0.5 w-full opacity-75'
      />
      <div className='mx-auto max-w-7xl px-5 py-14 md:px-8 xl:px-12'>
        <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12'>
          {/* Brand Column */}
          <div className='space-y-4 lg:col-span-4'>
            <Link
              href='/'
              className='inline-flex min-h-[44px] items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]'
            >
              <img
                src='/assets/brand/averxon-studios-lockup.png'
                alt='AVERXON Studios'
                width={170}
                height={142}
                className='h-20 w-auto object-contain'
              />
            </Link>
            <p className='text-sm font-semibold text-[#FDB001]'>
              Coding the Culture. Creating the Future.
            </p>
            <p className='text-sm leading-relaxed text-[#B6B9C9]'>
              Philippine creative gaming association dedicated to preserving and
              reimagining Filipino mythology, folklore, and traditional culture
              through interactive games and immersive 3D experiences.
            </p>
          </div>

          {/* Primary Destinations */}
          <div className='space-y-3 lg:col-span-3'>
            <h2 className='text-xs font-bold uppercase tracking-widest text-[#F5F5FA]'>
              Destinations
            </h2>
            <ul className='space-y-1'>
              {PRIMARY_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className='inline-flex min-h-[44px] items-center text-sm text-[#B6B9C9] transition-colors hover:text-[#01BEF5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]'
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Games */}
          <div className='space-y-3 lg:col-span-3'>
            <h2 className='text-xs font-bold uppercase tracking-widest text-[#F5F5FA]'>
              About Our Games
            </h2>
            <ul className='space-y-1'>
              {PROJECTS.map((game) => (
                <li key={game.slug}>
                  <Link
                    href={`/games/${game.slug}`}
                    className='inline-flex min-h-[44px] items-center text-sm text-[#B6B9C9] transition-colors hover:text-[#01BEF5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]'
                  >
                    {game.canonicalTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem & Partners */}
          <div className='space-y-3 lg:col-span-2'>
            <h2 className='text-xs font-bold uppercase tracking-widest text-[#F5F5FA]'>
              Ecosystem
            </h2>
            <ul className='space-y-2 text-xs text-[#B6B9C9]'>
              {PARTNERS.map((partner) => (
                <li key={partner.id} className='leading-relaxed'>
                  <span className='block font-semibold text-[#F5F5FA]'>
                    {partner.name}
                  </span>
                  <span className='text-[#FDB001]'>{partner.relationship}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#30344A] pt-6 text-xs text-[#B6B9C9] sm:flex-row sm:items-center'>
          <p>
            © {new Date().getFullYear()} AVERXON. All rights reserved.
            Philippine Creative Gaming Organization.
          </p>
          <p>Coding the Culture. Creating the Future.</p>
        </div>
      </div>
    </footer>
  );
}
