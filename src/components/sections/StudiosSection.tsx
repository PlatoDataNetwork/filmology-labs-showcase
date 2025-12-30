import { Film, MonitorPlay, LayoutGrid } from 'lucide-react';
import interiorStudio from '@/assets/interior-studio.jpg';
import interior2 from '@/assets/interior-2.jpg';
import interior3 from '@/assets/interior-3.jpg';
import interior4 from '@/assets/interior-4.jpg';
import studioGreenscreen1 from '@/assets/studio-greenscreen-1.jpeg';
import studioGreenscreen2 from '@/assets/studio-greenscreen-2.jpeg';

const StudiosSection = () => {
  const spaces = [
    {
      title: 'Sound Stages',
      description: '21 pre-lit sound stages with high ceilings, soundproofing, pre-built sets, green screen, cyc walls and flexible configurations for film, television, commercial or content creation.',
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
      specs: 'Approximately 250,000 SQ FT',
      icon: LayoutGrid,
    },
  ];

  return (
    <section id="studios" className="section-padding bg-card">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-2xl mb-10 md:mb-24">
          <p className="label-editorial mb-3 md:mb-4">The Studios</p>
          <h2 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Stages Built for Content Creators
          </h2>
          <p className="text-body-large mb-3 md:mb-4">
            Filmology Labs Content Creation Studios will provide sound stages, 
            production suites, and technology-rich amenities that invite filmmakers, 
            digital creators, and storytellers to bring their ideas to life.
          </p>
          <p className="text-body-large font-medium">
            Rent by the day, week or month.
          </p>
        </div>

        {/* Image Grid - 2x3 */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-6 mb-10 md:mb-24">
          <div className="aspect-[4/3] overflow-hidden rounded-lg">
            <img
              src={interiorStudio}
              alt="Filmology Labs interior studio space"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-apple"
            />
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-lg">
            <img
              src={studioGreenscreen1}
              alt="Filmology Labs green screen studio with production crew"
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
          <div className="aspect-[4/3] overflow-hidden rounded-lg">
            <img
              src={interior2}
              alt="Filmology Labs production facility"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-apple"
            />
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-lg">
            <img
              src={studioGreenscreen2}
              alt="Filmology Labs professional green screen stage"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-apple"
            />
          </div>
        </div>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {spaces.map((space, index) => (
            <div 
              key={index} 
              className="steel-gradient-card rounded-lg p-4 sm:px-5 sm:py-5 md:p-6 h-full flex flex-col"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                <space.icon className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
                <h3 className="text-base sm:text-lg md:text-xl font-medium">{space.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3 md:mb-4 leading-relaxed flex-grow">
                {space.description}
              </p>
              <p className="label-editorial text-foreground text-xs">{space.specs}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudiosSection;
