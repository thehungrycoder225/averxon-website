import React from 'react';
import type { Metadata } from 'next';
import { CULTURAL_PILLARS } from '@/content';
import { buildMetadata } from '@/lib/seo';
import { SiteHeader } from '@/components/site/SiteHeader';
import { CulturalPillarCard } from '@/components/site/CulturalPillarCard';
import { CollaborationCTA } from '@/components/site/CollaborationCTA';
import {
  PageParallaxBackdrop,
  ParallaxDepthSection,
} from '@/components/experience/DeepParallaxStage';

export const metadata: Metadata = buildMetadata({
  title: 'About AVERXON | Coding the Culture. Creating the Future.',
  description:
    'Learn how AVERXON preserves Philippine folklore, mythology, and traditional play through interactive storytelling and real-time 3D craft.',
  canonicalPath: '/about',
  ogImage: '/assets/brand/averxon-studios-logo.jpg',
  noIndex: false,
});

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <PageParallaxBackdrop theme='about' />
      <main
        id='main-content'
        className='relative z-10 mx-auto w-full max-w-7xl flex-1 px-5 py-14 md:px-8 md:py-20 xl:px-12'
      >
        <ParallaxDepthSection intensity={0.65}>
          <section
            aria-labelledby='about-heading'
            className='max-w-3xl space-y-5'
          >
            <div className='flex items-center gap-3'>
              <span
                aria-hidden='true'
                className='inline-block h-[2px] w-6 bg-[#FF6924]'
              />
              <p className='font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-[#FDB001]'>
                01 / DISCOVER AVERXON
              </p>
            </div>
            <h1
              id='about-heading'
              className='text-4xl font-bold leading-tight tracking-tight text-[#F5F5FA] sm:text-5xl'
            >
              Coding the Culture. Creating the Future.
            </h1>
            <p className='text-base leading-[1.7] text-[#B6B9C9] sm:text-lg'>
              AVERXON is a Philippine creative gaming association dedicated to
              preserving and reimagining Filipino mythology, folklore, and
              traditional culture through interactive games and immersive 3D
              experiences. We unite student and professional creators to bring
              local stories into the modern interactive era.
            </p>
          </section>
        </ParallaxDepthSection>

        <ParallaxDepthSection intensity={0.85}>
          <section
            aria-labelledby='pillars-heading'
            className='mt-16 space-y-8 md:mt-24'
          >
            <div className='max-w-2xl space-y-2'>
              <h2
                id='pillars-heading'
                className='text-2xl font-bold tracking-tight text-[#F5F5FA] sm:text-3xl'
              >
                Three Foundational Pillars
              </h2>
              <p className='text-sm text-[#B6B9C9] sm:text-base'>
                Our Hybrid Cultural Futurism approach pairs cultural
                authenticity with contemporary interactive engineering.
              </p>
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-0'>
              {CULTURAL_PILLARS.map((pillar) => (
                <CulturalPillarCard key={pillar.id} item={pillar} />
              ))}
            </div>
          </section>
        </ParallaxDepthSection>

        <ParallaxDepthSection intensity={0.85}>
          <section
            aria-labelledby='methodology-heading'
            className='mt-16 space-y-6 md:mt-24'
          >
            <h2
              id='methodology-heading'
              className='text-2xl font-bold tracking-tight text-[#F5F5FA] sm:text-3xl'
            >
              Behind the Games &amp; Cultural Research
            </h2>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-0'>
              <div className='group relative flex flex-col justify-between border border-[#F5F5FA]/10 bg-gradient-to-b from-[#151729]/85 via-[#090B16]/90 to-[#030237]/95 p-7 transition-all duration-500 hover:border-[#8A45CD]/60 sm:p-8'>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <span className='block font-mono text-xs font-bold tracking-[0.2em] text-[#F5F5FA]'>
                      01
                    </span>
                    <span
                      aria-hidden='true'
                      className='block h-[2px] w-4 bg-[#8A45CD] transition-all duration-300 group-hover:w-8 group-hover:bg-[#FDB001]'
                    />
                  </div>
                  <h3 className='text-xl font-bold tracking-tight text-[#F5F5FA]'>
                    Research-Backed Worldbuilding
                  </h3>
                  <p className='text-sm leading-[1.7] text-[#B6B9C9]'>
                    Whether adapting the Visayan myth of the Bakunawa lunar
                    eclipse in Legend of Bakunawa: Chronicles of Babaylan,
                    nocturnal belfry cautionary lore in Habulan: The Curse of
                    the 5th Bell, or archipelago-wide creature mythology in Myth
                    Mayhem, our team grounds mechanics and character design in
                    documented cultural sources.
                  </p>
                </div>
              </div>

              <div className='group relative flex flex-col justify-between border border-[#F5F5FA]/10 bg-gradient-to-b from-[#151729]/85 via-[#090B16]/90 to-[#030237]/95 p-7 transition-all duration-500 hover:border-[#8A45CD]/60 sm:p-8'>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <span className='block font-mono text-xs font-bold tracking-[0.2em] text-[#F5F5FA]'>
                      02
                    </span>
                    <span
                      aria-hidden='true'
                      className='block h-[2px] w-4 bg-[#8A45CD] transition-all duration-300 group-hover:w-8 group-hover:bg-[#FDB001]'
                    />
                  </div>
                  <h3 className='text-xl font-bold tracking-tight text-[#F5F5FA]'>
                    Community &amp; Ecosystem Mentorship
                  </h3>
                  <p className='text-sm leading-[1.7] text-[#B6B9C9]'>
                    Through showcases like Level Up 2.0 and Level Up 3.0, our
                    partnership with Cyber Craft PH, and participation in PROPEL
                    DOST Region IV-B, AVERXON bridges academic innovation and
                    professional game production.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </ParallaxDepthSection>

        <ParallaxDepthSection intensity={0.75}>
          <section
            aria-label='Collaboration call to action'
            className='mt-16 md:mt-24'
          >
            <CollaborationCTA />
          </section>
        </ParallaxDepthSection>
      </main>
    </>
  );
}
