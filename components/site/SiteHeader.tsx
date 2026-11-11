'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PRIMARY_NAV_ITEMS } from '@/content';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { MobileNav } from './MobileNav';
import { cn } from '@/lib/utils';

/**
 * Single-Page Landing Section Map (Scroll Spy)
 * Each nav destination maps to an in-page section on `/`. The dedicated routes
 * (`/about`, `/games`, …) stay intact for direct links and deep content.
 * `creation` ("Behind the Games") keeps the previous item active so the
 * indicator always travels forward while scrolling down.
 */
export const NAV_SECTION_TARGETS: Record<string, string> = {
  '/': 'awakening',
  '/about': 'heritage',
  '/games': 'four-worlds',
  '/achievements': 'milestones',
  '/news': 'news',
  '/connect': 'future',
};

const SPY_SECTIONS: Array<{ sectionId: string; navHref: string }> = [
  { sectionId: 'awakening', navHref: '/' },
  { sectionId: 'heritage', navHref: '/about' },
  { sectionId: 'four-worlds', navHref: '/games' },
  { sectionId: 'milestones', navHref: '/achievements' },
  { sectionId: 'creation', navHref: '/achievements' },
  { sectionId: 'news', navHref: '/news' },
  { sectionId: 'future', navHref: '/connect' },
];

/** Smoothly scrolls to a landing-page section and syncs the URL hash. */
export function scrollToLandingSection(sectionId: string) {
  const target = document.getElementById(sectionId);
  if (!target) return false;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (sectionId === 'awakening') {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    window.history.replaceState(null, '', '/');
  } else {
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    window.history.replaceState(null, '', `/#${sectionId}`);
  }
  return true;
}

/** Scroll Spy hook — returns the nav href of the section currently in view. */
function useLandingScrollSpy(enabled: boolean) {
  const [spyHref, setSpyHref] = useState<string>('/');

  useEffect(() => {
    if (!enabled) return;
    let rafId = 0;

    const compute = () => {
      rafId = 0;
      const probeLine = window.innerHeight * 0.38;
      let current = SPY_SECTIONS[0]!.navHref;
      for (const { sectionId, navHref } of SPY_SECTIONS) {
        const el = document.getElementById(sectionId);
        if (el && el.getBoundingClientRect().top <= probeLine) {
          current = navHref;
        }
      }
      // Bottom of page → last section
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      ) {
        current = SPY_SECTIONS[SPY_SECTIONS.length - 1]!.navHref;
      }
      // React bails out when the value is unchanged → no re-render per frame
      setSpyHref(current);
    };

    const onScroll = () => {
      if (rafId === 0) rafId = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [enabled]);

  return spyHref;
}

export interface SiteHeaderProps {
  rightSlot?: React.ReactNode;
}

export function SiteHeader({ rightSlot }: SiteHeaderProps) {
  const pathname = usePathname() || '/';
  const isLanding = pathname === '/';
  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [indicatorReady, setIndicatorReady] = useState(false);

  const spyHref = useLandingScrollSpy(isLanding);

  const routeActiveHref = (
    PRIMARY_NAV_ITEMS.find((item) =>
      item.href === '/' ? pathname === '/' : pathname.startsWith(item.href),
    ) ?? PRIMARY_NAV_ITEMS[0]!
  ).href;

  const activeHref = isLanding ? spyHref : routeActiveHref;
  const targetHref = hoveredHref ?? activeHref;

  // Move the single-color indicator with direct DOM writes (no layout state)
  const positionIndicator = useCallback(() => {
    const targetEl = itemRefs.current[targetHref];
    const listEl = listRef.current;
    const indicatorEl = indicatorRef.current;
    if (!targetEl || !listEl || !indicatorEl) return;
    const listRect = listEl.getBoundingClientRect();
    const itemRect = targetEl.getBoundingClientRect();
    indicatorEl.style.width = `${itemRect.width}px`;
    indicatorEl.style.transform = `translate3d(${itemRect.left - listRect.left}px, 0, 0)`;
    setIndicatorReady(true);
  }, [targetHref]);

  useEffect(() => {
    positionIndicator();
    window.addEventListener('resize', positionIndicator, { passive: true });
    return () => window.removeEventListener('resize', positionIndicator);
  }, [positionIndicator, pathname]);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!isLanding) return;
    const sectionId = NAV_SECTION_TARGETS[href];
    if (sectionId && scrollToLandingSection(sectionId)) {
      event.preventDefault();
    }
  };

  return (
    <header
      role='banner'
      className='sticky top-0 z-40 w-full border-b border-[#F5F5FA]/10 bg-[#030237]/90 backdrop-blur-xl'
    >
      {/* Signature 2px Brand Gradient Rule (design.md Section 2.3) */}
      <div aria-hidden='true' className='avx-brand-rule h-0.5 w-full' />

      {/* WCAG 2.2 AA Skip Link */}
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#FDB001] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[#030237] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#01BEF5]'
      >
        Skip to main content
      </a>

      <div className='mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-5 md:px-8 xl:px-12'>
        {/* Brand Emblem & Lockup */}
        <Link
          href='/'
          onClick={(e) => handleNavClick(e, '/')}
          aria-label='AVERXON Studios Home — Coding the Culture. Creating the Future.'
          className='group inline-flex min-h-[44px] items-center gap-3 rounded-lg px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]'
        >
          <img
            src='/assets/brand/averxon-arrow-icon.png'
            alt=''
            width={61}
            height={36}
            decoding='async'
            className='h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105'
          />
          <span className='flex flex-col leading-none'>
            <span className='text-lg font-bold tracking-[0.22em] text-[#F5F5FA]'>
              AVERXON
            </span>
            <span className='mt-0.5 text-[9px] font-medium tracking-[0.42em] text-[#B6B9C9]'>
              STUDIOS
            </span>
          </span>
        </Link>

        {/* Unboxed Navigation Bar with Single-Color Sliding Highlight Indicator */}
        <NavigationMenu
          aria-label='Primary navigation'
          className='hidden lg:flex'
          onMouseLeave={() => setHoveredHref(null)}
        >
          <NavigationMenuList ref={listRef} className='relative flex items-center gap-2'>
            {/* Animated Sliding Highlight Indicator — one color (#FDB001 Solar Amber) */}
            <span
              ref={indicatorRef}
              aria-hidden='true'
              className={cn(
                'pointer-events-none absolute inset-y-1 left-0 z-0 transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                indicatorReady ? 'opacity-100' : 'opacity-0',
              )}
            >
              {/* Soft single-color light wash */}
              <span
                className='absolute inset-0'
                style={{
                  background:
                    'linear-gradient(180deg, rgba(253, 176, 1, 0) 0%, rgba(253, 176, 1, 0.12) 100%)',
                }}
              />
              {/* Single-color bottom highlight line */}
              <span className='absolute inset-x-2 bottom-0 h-[2px] bg-[#FDB001] shadow-[0_0_10px_rgba(253,176,1,0.7)]' />
            </span>

            {PRIMARY_NAV_ITEMS.map((item) => {
              const isActive = item.href === activeHref;
              const sectionId = NAV_SECTION_TARGETS[item.href];
              // On the single-page landing, nav items are in-page anchors
              const href =
                isLanding && sectionId
                  ? sectionId === 'awakening'
                    ? '/'
                    : `/#${sectionId}`
                  : item.href;

              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      ref={(el) => {
                        itemRefs.current[item.href] = el;
                      }}
                      href={href}
                      scroll={!isLanding}
                      onClick={(e) => handleNavClick(e, item.href)}
                      aria-current={
                        isActive ? (isLanding ? 'location' : 'page') : undefined
                      }
                      onMouseEnter={() => setHoveredHref(item.href)}
                      onFocus={() => setHoveredHref(item.href)}
                      onBlur={() => setHoveredHref(null)}
                      className={cn(
                        'relative z-10 inline-flex min-h-[44px] items-center justify-center px-3.5 py-2 text-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#01BEF5]',
                        isActive
                          ? 'text-[#FDB001]'
                          : 'text-[#B6B9C9] hover:text-[#F5F5FA]',
                      )}
                    >
                      {item.label}
                      {/* SSR / Initial fallback underline before client measurement */}
                      {!indicatorReady && isActive && (
                        <span
                          aria-hidden='true'
                          className='pointer-events-none absolute inset-x-2 bottom-1 h-[2px] bg-[#FDB001]'
                        />
                      )}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className='flex items-center gap-2.5'>
          {rightSlot}
          <MobileNav
            activePath={pathname}
            activeHref={activeHref}
            isLanding={isLanding}
          />
        </div>
      </div>
    </header>
  );
}
