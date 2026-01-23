import { MapPin, Clock, Building2 } from 'lucide-react';
// @ts-ignore - vite-imagetools transform
import vicinityMap from '@/assets/vicinity-map.png?format=webp&quality=80';
// @ts-ignore - vite-imagetools transform
import locationAerial from '@/assets/location-aerial.png?format=webp&quality=80';

const LocationSection = () => {
  const features = [
    {
      icon: MapPin,
      title: '13.5 Miles to Central Park',
      description: 'Direct access to Manhattan and the broader tri-state media market via major highways.',
    },
    {
      icon: Clock,
      title: 'Strategic Access',
      description: 'Proximity to Route 80, I-95, and Newark Liberty International Airport.',
    },
    {
      icon: Building2,
      title: '250,000 SQ FT of Studio.',
      description: 'Multi story interconnected mill structure on\n3 Acre Campus.',
    },
  ];

  return (
    <section id="location" className="section-padding bg-card">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <p className="label-editorial mb-3 md:mb-4">Location</p>
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground mb-3 md:mb-4">"Lights, Camera.......Paterson!"</p>
          <h2 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl whitespace-nowrap">
            The Heart of the Paterson Film District
          </h2>
          <p className="text-body-large">
            The Filmology Campus is positioned at the crossroads of history and opportunity, with unmatched access to New York City and the nation's largest media market.
          </p>
        </div>

        {/* Images */}
        <div className="space-y-3 md:space-y-6 mb-10 md:mb-24">
          <div className="aspect-[16/9] overflow-hidden rounded-lg bg-muted">
            <img
              src={locationAerial}
              alt="Map showing 13.5 miles distance from Paterson to NYC"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="aspect-[16/9] overflow-hidden rounded-lg bg-muted">
            <img
              src={vicinityMap}
              alt="Vicinity map showing Filmology Labs location in Paterson"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background p-4 sm:p-5 md:p-8 rounded-lg text-center"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-6 rounded-full bg-accent flex items-center justify-center">
                <feature.icon className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
              </div>
              <h3 className="text-base sm:text-lg font-medium mb-1.5 sm:mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationSection;