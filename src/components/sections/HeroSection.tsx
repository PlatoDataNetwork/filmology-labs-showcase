import heroInterior from '@/assets/hero-interior.jpg';

const HeroSection = () => {
  const scrollToVision = () => {
    const element = document.querySelector('#vision');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-end pb-16 md:pb-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroInterior}
          alt="Filmology Labs production studio interior"
          className="w-full h-full object-cover object-top scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent dark:from-background dark:via-background/70 dark:to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-transparent dark:from-background/90 dark:via-background/50" />
      </div>

      {/* Frosted glass strip */}
      <div className="absolute bottom-0 left-0 right-0 backdrop-blur-[2px] bg-background/10 dark:bg-background/20 z-[5] py-16 md:py-24" />

      {/* Content */}
      <div className="container-wide relative z-10">
        <div className="max-w-4xl">
          <p className="text-sm md:text-base uppercase tracking-[0.2em] font-normal text-foreground mb-6 animate-fade-in-delay-1">
            Content Creation Studios
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1] text-foreground mb-8 animate-fade-in-delay-2">
            Where Industrial Heritage<br />
            Meets Creative Future
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed font-light text-foreground/90 dark:text-muted-foreground max-w-2xl mb-12 animate-fade-in-delay-3">
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

      {/* Location Badge */}
      <div className="absolute bottom-8 right-8 hidden lg:block animate-fade-in-delay-4 z-10">
        <p className="text-xs text-foreground/80 dark:text-muted-foreground uppercase tracking-wider">
          61 State Street<br />
          Paterson, New Jersey
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
