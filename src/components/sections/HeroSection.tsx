import heroAerial from '@/assets/hero-aerial-new.png';
import logoWhite from '@/assets/filmology-logo-white.png';
import logoBlack from '@/assets/filmology-logo-black.png';

interface HeroSectionProps {
  isDark: boolean;
}

const HeroSection = ({ isDark }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-end pb-0 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroAerial}
          alt="Filmology Labs Content Creation Studios aerial view"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Frosted glass strip */}
      <div className="absolute bottom-0 left-0 right-0 backdrop-blur-[2px] bg-background/10 dark:bg-background/20 z-[5] py-8 md:py-12" />

      {/* Content */}
      <div className="container-wide relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <img 
            src={isDark ? logoWhite : logoBlack} 
            alt="Filmology Labs Content Creation Studios" 
            className="h-10 md:h-12 lg:h-14 xl:h-16 mx-auto mb-2 md:mb-3 animate-fade-in-delay-1"
          />
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.1] text-foreground mb-6 md:mb-8 animate-fade-in-delay-2">
            The World's First Vertical<br />
            Content Creation Studio
          </h1>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
