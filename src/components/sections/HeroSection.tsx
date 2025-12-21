import exteriorRender from '@/assets/exterior-render.jpg';

const HeroSection = () => {
  const scrollToVision = () => {
    const element = document.querySelector('#vision');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-end pb-20 md:pb-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={exteriorRender}
          alt="Filmology Labs exterior architectural render"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-wide relative z-10">
        <div className="max-w-4xl">
          <p className="label-editorial mb-4 animate-fade-in-delay-1">
            Content Creation Studios
          </p>
          
          <h1 className="text-foreground mb-6 animate-fade-in-delay-2">
            Where Industrial Heritage<br />
            Meets Creative Future
          </h1>
          
          <p className="text-body-large max-w-2xl mb-10 animate-fade-in-delay-3">
            A state-of-the-art film and television production campus 
            in Paterson's historic mill district—designed for the creators of tomorrow.
          </p>
          
          <button
            onClick={scrollToVision}
            className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 animate-fade-in-delay-4"
          >
            <span className="label-editorial">Discover Our Vision</span>
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
      <div className="absolute bottom-8 right-8 hidden lg:block animate-fade-in-delay-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          61 State Street<br />
          Paterson, New Jersey
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
