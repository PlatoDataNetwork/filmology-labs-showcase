import { Film, MonitorPlay, LayoutGrid } from 'lucide-react';
import interiorStudio from '@/assets/interior-studio.jpg';
import interior2 from '@/assets/interior-2.jpg';

const StudiosSection = () => {
  const spaces = [
    {
      title: 'Sound Stages',
      description: 'Professional-grade sound stages with high ceilings, soundproofing, and flexible configurations for film, television, and commercial production. Built to accommodate projects of any scale with precision acoustics.',
      specs: 'Up to 63\' × 54\' clear span',
      icon: Film,
    },
    {
      title: 'Production Suites',
      description: 'Fully-equipped production offices, editing bays, and post-production facilities designed for seamless creative workflows. Everything you need under one roof to take your project from concept to completion.',
      specs: 'Technology-rich amenities',
      icon: MonitorPlay,
    },
    {
      title: 'Flexible Spaces',
      description: 'Collaborative workspaces, green rooms, and support facilities that adapt to the needs of productions of all scales. Designed to grow with your vision and evolve with your creative demands.',
      specs: 'Approximately 143,875 SF total',
      icon: LayoutGrid,
    },
  ];

  return (
    <section id="studios" className="section-padding bg-card">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-24">
          <p className="label-editorial mb-4">The Studios</p>
          <h2 className="mb-6">
            Spaces Built for Creators
          </h2>
          <p className="text-body-large">
            Filmology Labs Content Creation Studios will provide sound stages, 
            production suites, and technology-rich amenities that invite filmmakers, 
            digital creators, and storytellers to bring their ideas to life.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 mb-16 md:mb-24">
          <div className="aspect-[4/3] overflow-hidden rounded-lg">
            <img
              src={interiorStudio}
              alt="Filmology Labs interior studio space"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-apple"
            />
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-lg">
            <img
              src={interior2}
              alt="Filmology Labs production facility"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-apple"
            />
          </div>
        </div>

        {/* Spaces Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {spaces.map((space, index) => (
            <div 
              key={index} 
              className="border-t border-border pt-6 transition-all duration-300 hover:bg-accent/30 hover:pl-4 rounded-lg cursor-default group"
            >
              <div className="flex items-center gap-3 mb-3">
                <space.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                <h3 className="text-xl font-medium group-hover:text-foreground transition-colors duration-300">{space.title}</h3>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {space.description}
              </p>
              <p className="label-editorial text-foreground">{space.specs}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudiosSection;
