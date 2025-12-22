import heroAerial from '@/assets/hero-aerial.png';

const HeroSection = () => {
  const scrollToVision = () => {
    const element = document.querySelector('#vision');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-end pb-8 md:pb-12 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroAerial}
          alt="Filmology Labs Content Creation Studios aerial view"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/30 dark:bg-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20 dark:from-background dark:via-background/60 dark:to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent dark:from-background/60" />
      </div>

      {/* Frosted glass strip */}
      <div className="absolute bottom-0 left-0 right-0 backdrop-blur-[2px] bg-background/10 dark:bg-background/20 z-[5] py-8 md:py-12" />

      {/* Content */}
      <div className="container-wide relative z-10">
        <div className="max-w-4xl">
          <p className="text-sm md:text-base uppercase tracking-[0.2em] font-normal text-foreground mb-6 animate-fade-in-delay-1">
            Content Creation Studios
          </p>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1] text-foreground mb-6 md:mb-8 animate-fade-in-delay-2">
            Where Industrial Heritage<br />
            Meets Creative Future
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-light text-foreground/90 dark:text-muted-foreground max-w-2xl mb-8 md:mb-12 animate-fade-in-delay-3">
            A state-of-the-art film and television production campus 
            in Paterson's historic mill district—designed for the creators of tomorrow.
          </p>
          
          <button
            onClick={scrollToVision}
            className="group flex items-center gap-3 text-foreground dark:text-muted-foreground hover:text-foreground transition-colors duration-300 animate-fade-in-delay-4"
          >
            <span className="text-sm md:text-base uppercase tracking-[0.2em] font-normal">Discover Our Vision</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-y-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
