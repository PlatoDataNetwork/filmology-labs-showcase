import { MapPin, Clock, Building2 } from 'lucide-react';
import aerialView from '@/assets/aerial-view.jpg';
import locationAerial from '@/assets/location-aerial.png';

const LocationSection = () => {
  const features = [
    {
      icon: MapPin,
      title: '13.5 Miles to NYC',
      description: 'Direct access to Manhattan and the broader tri-state media market via major highways.',
    },
    {
      icon: Clock,
      title: 'Strategic Access',
      description: 'Proximity to Route 80, I-95, and Newark Liberty International Airport.',
    },
    {
      icon: Building2,
      title: '250,000 SQ FT Campus',
      description: 'Multi-story interconnected mill structures on approximately 1.83 acres.',
    },
  ];

  return (
    <section id="location" className="section-padding bg-card">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <p className="label-editorial mb-4">Location</p>
          <h2 className="mb-4 md:mb-6">
            The Heart of the Paterson<br className="hidden sm:inline" /> Film District
          </h2>
          <p className="text-body-large">
            Positioned at the crossroads of history and opportunity, with unmatched access to New York City and the nation's largest media market.
          </p>
        </div>

        {/* Images */}
        <div className="space-y-4 md:space-y-6 mb-12 md:mb-24">
          <div className="aspect-[16/9] overflow-hidden rounded-lg">
            <img
              src={locationAerial}
              alt="Map showing 13.5 miles distance from Paterson to NYC"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[16/9] overflow-hidden rounded-lg">
            <img
              src={aerialView}
              alt="Aerial view of Filmology Labs campus in Paterson"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background p-5 sm:p-6 md:p-8 rounded-lg text-center"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 md:mb-6 rounded-full bg-accent flex items-center justify-center">
                <feature.icon className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
              </div>
              <h3 className="text-base sm:text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
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