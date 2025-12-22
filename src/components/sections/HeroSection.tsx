import heroAerial from '@/assets/hero-aerial.png';

const HeroSection = () => {
  const scrollToVision = () => {
    const element = document.querySelector('#vision');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-end pb-4 md:pb-6 overflow-hidden">
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
        <div className="max-w-4xl">
          <p className="text-sm md:text-base uppercase tracking-[0.2em] font-normal text-foreground mb-6 animate-fade-in-delay-1">
            Content Creation Studios
          </p>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1] text-foreground mb-6 md:mb-8 animate-fade-in-delay-2">
            Where Industrial Heritage<br />
            Meets Creative Future
          </h1>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
