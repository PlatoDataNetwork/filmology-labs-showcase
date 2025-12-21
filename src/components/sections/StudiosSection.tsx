import interiorStudio from '@/assets/interior-studio.jpg';
import interior2 from '@/assets/interior-2.jpg';

const StudiosSection = () => {
  const spaces = [
    {
      title: 'Sound Stages',
      description: 'Professional-grade sound stages with high ceilings, soundproofing, and flexible configurations for film, television, and commercial production.',
      specs: 'Up to 63\' × 54\' clear span',
    },
    {
      title: 'Production Suites',
      description: 'Fully-equipped production offices, editing bays, and post-production facilities designed for seamless creative workflows.',
      specs: 'Technology-rich amenities',
    },
    {
      title: 'Flexible Spaces',
      description: 'Collaborative workspaces, green rooms, and support facilities that adapt to the needs of productions of all scales.',
      specs: 'Approximately 143,875 SF total',
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
            <div key={index} className="border-t border-border pt-6">
              <h3 className="text-xl font-medium mb-3">{space.title}</h3>
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
