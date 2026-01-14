import { useEffect } from 'react';
// @ts-ignore - vite-imagetools transform
import heroAerial from '@/assets/hero-aerial-new.png?format=webp&quality=80';
// @ts-ignore - vite-imagetools transform
import heroMobile from '@/assets/hero-mobile.jpg?format=webp&quality=80';
import logoWhite from '@/assets/filmology-logo-white.png';
import logoBlack from '@/assets/filmology-logo-black.png';

interface HeroSectionProps {
  isDark: boolean;
}

const HeroSection = ({ isDark }: HeroSectionProps) => {
  // Preload hero image for faster LCP
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = heroAerial;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      {/* Mobile Layout - Stacked */}
      <section className="md:hidden flex flex-col">
        {/* Mobile Image - Top */}
        <div className="w-full h-[50vh]">
          <img
            src={heroAerial}
            alt="Filmology Labs Content Creation Studios aerial view"
            className="w-full h-full object-cover object-center"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
          />
        </div>
        
        {/* Mobile Content - Below */}
        <div className="bg-background py-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl font-medium leading-[1.15] text-foreground animate-fade-in-delay-2">
              The World's Largest<br />
              Content Creation Studio
            </h1>
          </div>
        </div>
      </section>

      {/* Desktop Layout - Original overlay style */}
      <section className="hidden md:flex relative flex-row items-end min-h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroAerial}
            alt="Filmology Labs Content Creation Studios aerial view"
            className="w-full h-full object-cover object-center"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-background/10 to-transparent dark:from-background dark:via-background/20" />
        </div>

        {/* Frosted glass strip */}
        <div className="absolute bottom-0 left-0 right-0 backdrop-blur-[1px] bg-background/5 dark:bg-background/10 z-[5] py-16" />

        {/* Content */}
        <div className="container-wide relative z-10 pb-6 absolute bottom-0 left-0 right-0">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-4xl lg:text-5xl font-medium leading-[1.15] text-foreground mb-8 animate-fade-in-delay-2">
              The World's Largest<br />
              Content Creation Studio
            </h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
