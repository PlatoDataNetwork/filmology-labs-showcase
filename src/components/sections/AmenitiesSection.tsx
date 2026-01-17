import { 
  Utensils, 
  Car, 
  Dumbbell, 
  Wifi, 
  ShieldCheck, 
  Coffee, 
  Truck, 
  Shirt, 
  Sparkles, 
  Phone, 
  MapPin, 
  Clock,
  Briefcase,
  Camera,
  Headphones,
  ParkingCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactFormModal from '@/components/ContactFormModal';

const AmenitiesSection = () => {
  const studioAmenities = [
    {
      title: 'On-Site Catering',
      description: 'Full-service craft services and catering for productions of any size, from breakfast spreads to wrap dinners.',
      icon: Utensils,
    },
    {
      title: 'Equipment Rentals',
      description: 'Professional camera, lighting, and grip equipment available on-site, eliminating logistics headaches.',
      icon: Camera,
    },
    {
      title: 'Secure Parking',
      description: 'Dedicated production parking with easy load-in access for equipment trucks and talent vehicles.',
      icon: ParkingCircle,
    },
    {
      title: 'High-Speed Connectivity',
      description: 'Fiber-optic internet throughout the campus with dedicated lines for live streaming and remote collaboration.',
      icon: Wifi,
    },
    {
      title: '24/7 Security',
      description: 'Round-the-clock security personnel and surveillance to protect your production and equipment.',
      icon: ShieldCheck,
    },
    {
      title: 'Green Rooms & Lounges',
      description: 'Comfortable holding areas for talent with premium refreshments, makeup stations, and private spaces.',
      icon: Coffee,
    },
    {
      title: 'Fitness Center',
      description: 'On-site gym and wellness facilities to keep cast and crew energized during long production days.',
      icon: Dumbbell,
    },
    {
      title: 'Post-Production Suites',
      description: 'Sound mixing, color grading, and editing bays equipped with industry-standard software and hardware.',
      icon: Headphones,
    },
  ];

  const conciergeServices = [
    {
      title: 'Transportation Coordination',
      description: 'From airport pickups to daily shuttles, we arrange all ground transportation for your talent and crew.',
      icon: Car,
    },
    {
      title: 'Wardrobe Services',
      description: 'On-site costume storage, pressing, and alterations. Connections to local tailors and costume houses.',
      icon: Shirt,
    },
    {
      title: 'Production Supplies',
      description: 'Same-day procurement of props, set materials, and specialty items through our vendor network.',
      icon: Truck,
    },
    {
      title: 'Local Coordination',
      description: 'Permits, location scouting assistance, and local crew referrals throughout the greater NYC area.',
      icon: MapPin,
    },
    {
      title: 'After-Hours Support',
      description: 'Extended production hours with dedicated staff to handle any need outside of business hours.',
      icon: Clock,
    },
    {
      title: 'Executive Services',
      description: 'Private meeting rooms, videoconferencing, and administrative support for visiting executives.',
      icon: Briefcase,
    },
  ];

  return (
    <section id="amenities" className="section-padding bg-muted/30">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-16">
          <div className="max-w-2xl">
            <p className="label-editorial mb-3 md:mb-4">Studio Amenities</p>
            <h2 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Everything You Need, All in One Place
            </h2>
            <p className="text-body-large">
              From craft services to post-production, Filmology Labs provides a comprehensive 
              suite of amenities designed to streamline your production and keep your 
              team focused on what matters most—creating exceptional content.
            </p>
          </div>
          <div className="flex-shrink-0">
            <ContactFormModal
              trigger={
                <Button variant="hero" size="lg">
                  View Full Amenities
                </Button>
              }
            />
          </div>
        </div>

        {/* Studio Amenities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-20">
          {studioAmenities.map((amenity, index) => (
            <div 
              key={index} 
              className="steel-gradient-card rounded-lg p-4 md:p-6 flex flex-col"
            >
              <div className="p-2 rounded-lg bg-accent w-fit mb-3 md:mb-4">
                <amenity.icon className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
              </div>
              <h3 className="text-sm md:text-base font-medium mb-2">{amenity.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>

        {/* Concierge Service Section */}
        <div className="border-t border-border pt-10 md:pt-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="p-2 rounded-lg bg-primary">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <p className="label-editorial">Concierge Service</p>
              </div>
              <h2 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                White-Glove Production Support
              </h2>
              <p className="text-body-large">
                Our dedicated concierge team handles the details so you can focus on your 
                creative vision. From coordinating transportation to sourcing specialty props, 
                we're here to make your production seamless.
              </p>
            </div>
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span className="text-sm">24/7 Available</span>
              </div>
              <ContactFormModal
                trigger={
                  <Button variant="hero" size="lg">
                    Contact Concierge
                  </Button>
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {conciergeServices.map((service, index) => (
              <div 
                key={index} 
                className="steel-gradient-card rounded-lg p-4 md:p-6 flex flex-col"
              >
                <div className="flex items-center gap-2 md:gap-3 mb-3">
                  <service.icon className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
                  <h3 className="text-sm md:text-base font-medium">{service.title}</h3>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
