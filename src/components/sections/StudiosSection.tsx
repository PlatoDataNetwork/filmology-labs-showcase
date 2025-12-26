import { Film, MonitorPlay, LayoutGrid } from 'lucide-react';
import interiorStudio from '@/assets/interior-studio.jpg';
import interior2 from '@/assets/interior-2.jpg';
import interior3 from '@/assets/interior-3.jpg';
import interior4 from '@/assets/interior-4.jpg';

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
      description: 'Collaborative workspaces, green rooms, and support facilities that adapt to the needs of productions of all scales. Designed to grow with your vision and evolve with your creative demands while fostering collaboration.',
      specs: 'Approximately 143,875 SQ FT',
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

        {/* Image Grid - 2x2 */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 mb-16 md:mb-24">
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
          <div className="aspect-[4/3] overflow-hidden rounded-lg">
            <img
              src={interior3}
              alt="Filmology Labs film production set"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-apple"
            />
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-lg">
            <img
              src={interior4}
              alt="Filmology Labs studio with equipment"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-apple"
            />
          </div>
        </div>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {spaces.map((space, index) => (
            <div 
              key={index} 
              className="steel-gradient-card rounded-lg px-5 py-5 md:p-6 h-full flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <space.icon className="w-5 h-5 text-foreground" />
                <h3 className="text-lg md:text-xl font-medium">{space.title}</h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4 leading-relaxed flex-grow">
                {space.description}
              </p>
              <p className="label-editorial text-foreground text-xs md:text-sm">{space.specs}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudiosSection;
