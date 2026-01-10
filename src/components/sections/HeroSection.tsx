import { useEffect } from 'react';
import heroAerial from '@/assets/hero-aerial-new.png';
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
    <section className="relative flex flex-col min-h-[85vh] md:min-h-screen md:flex-row md:items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroAerial}
          alt="Filmology Labs Content Creation Studios aerial view"
          className="w-full h-full object-cover object-[25%_55%] md:object-center scale-[1.6] md:scale-100"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/20 to-transparent md:from-background/40 md:via-background/10 dark:from-background dark:via-background/20" />
      </div>

      {/* Frosted glass strip */}
      <div className="absolute bottom-0 left-0 right-0 backdrop-blur-[1px] bg-background/5 dark:bg-background/10 z-[5] py-8 md:py-16" />

      {/* Content */}
      <div className="container-wide relative z-10 pb-6 md:pb-6">
        <div className="max-w-4xl mx-auto text-center px-4">
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] text-foreground mb-4 md:mb-8 animate-fade-in-delay-2">
            The World's Largest<br />
            Content Creation Studio
          </h1>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
