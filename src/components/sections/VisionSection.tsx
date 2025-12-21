import { RefreshCw, Sparkles, Globe } from 'lucide-react';

const VisionSection = () => {
  const pillars = [
    {
      title: 'Adaptive Reuse',
      description: 'Transforming historic mill structures into vibrant creative spaces—preserving character while embracing modern production demands. Breathing new life into architectural treasures that tell the story of American industry.',
      specs: 'Heritage Meets Progress',
      icon: RefreshCw,
    },
    {
      title: 'Creative Future',
      description: 'Sound stages, production suites, and collaborative workspaces equipped for filmmakers and digital creators of all scales. Purpose-built facilities designed for the next generation of storytellers and content creators.',
      specs: 'Future-Ready Studios',
      icon: Sparkles,
    },
    {
      title: 'Cultural Impact',
      description: 'Positioning Paterson as a hub for film, media, and innovation while honoring its extraordinary architectural legacy. Creating economic opportunities and enriching the local community for generations to come.',
      specs: 'The Paterson Film District',
      icon: Globe,
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
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-body-large text-left">
            Filmology Labs represents a bold new chapter in the ongoing reinvention 
            of Paterson's historic mill district. Once a powerhouse of American industry, 
            this remarkable complex is now being transformed into a state-of-the-art 
            film and television production studio.
          </p>
          
          <p className="text-body-large text-left">
            Our vision pairs the authenticity and architectural character of Paterson's 
            industrial heritage with the cutting-edge tools and flexible environments 
            demanded by today's content producers—sparking the establishment of the 
            Paterson Film District.
          </p>
        </div>

        {/* Divider */}
        <div className="divider my-16 md:my-24" />

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {pillars.map((pillar, index) => (
            <div 
              key={index} 
              className="steel-gradient-card rounded-lg px-5 py-5 md:px-8 md:py-6 h-full flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <pillar.icon className="w-5 h-5 text-foreground" />
                <h3 className="text-lg md:text-xl font-medium">{pillar.title}</h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4 leading-relaxed flex-grow">
                {pillar.description}
              </p>
              <p className="label-editorial text-foreground text-xs md:text-sm">{pillar.specs}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
