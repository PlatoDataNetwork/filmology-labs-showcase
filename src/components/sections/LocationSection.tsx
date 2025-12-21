import { MapPin, Clock, Building2 } from 'lucide-react';

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
      title: '143,875 SF Campus',
      description: 'Multi-story interconnected mill structures on approximately 1.83 acres.',
    },
  ];

  const specs = [
    { label: 'Address', value: '61 State Street, Paterson, NJ 07522' },
    { label: 'Zoning', value: 'I-1 – Light Industrial District' },
    { label: 'Lot Area', value: 'Approximately 1.83 acres (79,700 SF)' },
    { label: 'Building Height', value: 'Up to 4 stories' },
    { label: 'Parking', value: '50+ spaces with loading areas' },
  ];

  return (
    <section id="location" className="section-padding bg-card">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <p className="label-editorial mb-4">Location</p>
          <h2 className="mb-6">
            The Heart of the Paterson<br />Film District
          </h2>
          <p className="text-body-large">
            Positioned at the crossroads of history and opportunity, with unmatched 
            access to New York City and the nation's largest media market.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 md:mb-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background p-8 rounded-lg text-center"
            >
              <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-accent flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Map Placeholder + Specs */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="aspect-[4/3] bg-accent rounded-lg overflow-hidden relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3015.5!2d-74.17!3d40.92!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDU1JzEyLjAiTiA3NMKwMTAnMTIuMCJX!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Filmology Labs location map"
              className="grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Specs */}
          <div className="bg-background p-8 md:p-12 rounded-lg">
            <p className="label-editorial mb-8">Property Overview</p>
            <div className="space-y-6">
              {specs.map((spec, index) => (
                <div key={index} className="flex justify-between items-start border-b border-border pb-4 last:border-0">
                  <span className="text-muted-foreground text-sm">{spec.label}</span>
                  <span className="text-foreground text-sm font-medium text-right max-w-[60%]">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
