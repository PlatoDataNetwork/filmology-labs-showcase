import { RefreshCw, Sparkles, Building2 } from 'lucide-react';

const VisionSection = () => {
  const pillars = [
    {
      title: 'Adaptive Reuse',
      description: 'Transforming historic mill structures into vibrant creative spaces—preserving character while embracing modern production demands.',
      specs: 'Historic preservation meets innovation',
      icon: RefreshCw,
    },
    {
      title: 'Creative Future',
      description: 'Sound stages, production suites, and collaborative workspaces equipped for filmmakers and digital creators of all scales.',
      specs: 'Next-generation production facilities',
      icon: Sparkles,
    },
    {
      title: 'Cultural Impact',
      description: 'Positioning Paterson as a hub for film, media, and innovation while honoring its extraordinary architectural legacy.',
      specs: 'Establishing the Paterson Film District',
      icon: Building2,
    },
  ];

  return (
    <section id="vision" className="section-padding bg-background">
      <div className="container-wide">
        {/* Label */}
        <p className="label-editorial mb-12 md:mb-16 text-center">Our Vision</p>

        {/* Main Statement */}
        <h2 className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          A Bold New Chapter in American Storytelling
        </h2>

        {/* Body Copy */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
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
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {pillars.map((pillar, index) => (
            <div 
              key={index} 
              className="border-t border-border pt-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <pillar.icon className="w-5 h-5 text-muted-foreground" />
                <h3 className="text-xl font-medium">{pillar.title}</h3>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {pillar.description}
              </p>
              <p className="label-editorial text-foreground">{pillar.specs}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
