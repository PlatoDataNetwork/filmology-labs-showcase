const VisionSection = () => {
  return (
    <section id="vision" className="section-padding bg-background">
      <div className="container-narrow">
        {/* Label */}
        <p className="label-editorial mb-12 md:mb-16 text-center">Our Vision</p>

        {/* Main Statement */}
        <h2 className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          A Bold New Chapter in American Storytelling
        </h2>

        {/* Body Copy */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <p className="text-body-large">
            Filmology Labs represents a bold new chapter in the ongoing reinvention 
            of Paterson's historic mill district. Once a powerhouse of American industry, 
            this remarkable complex is now being transformed into a state-of-the-art 
            film and television production studio.
          </p>
          
          <p className="text-body-large">
            Our vision pairs the authenticity and architectural character of Paterson's 
            industrial heritage with the cutting-edge tools and flexible environments 
            demanded by today's content producers—sparking the establishment of the 
            Paterson Film District.
          </p>
        </div>

        {/* Divider */}
        <div className="divider my-16 md:my-24" />

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          <div className="text-center md:text-left">
            <p className="label-editorial mb-4">Adaptive Reuse</p>
            <p className="text-muted-foreground leading-relaxed">
              Transforming historic mill structures into vibrant creative spaces—
              preserving character while embracing modern production demands.
            </p>
          </div>

          <div className="text-center md:text-left">
            <p className="label-editorial mb-4">Creative Future</p>
            <p className="text-muted-foreground leading-relaxed">
              Sound stages, production suites, and collaborative workspaces 
              equipped for filmmakers and digital creators of all scales.
            </p>
          </div>

          <div className="text-center md:text-left">
            <p className="label-editorial mb-4">Cultural Impact</p>
            <p className="text-muted-foreground leading-relaxed">
              Positioning Paterson as a hub for film, media, and innovation 
              while honoring its extraordinary architectural legacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
