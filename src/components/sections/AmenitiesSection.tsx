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
  ParkingCircle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ContactFormModal from '@/components/ContactFormModal';

// @ts-ignore - vite-imagetools transform
import cateringImg from '@/assets/amenities/catering.jpg?format=webp&quality=80';
// @ts-ignore - vite-imagetools transform
import equipmentImg from '@/assets/amenities/equipment.jpg?format=webp&quality=80';
// @ts-ignore - vite-imagetools transform
import parkingImg from '@/assets/amenities/parking.jpg?format=webp&quality=80';
// @ts-ignore - vite-imagetools transform
import connectivityImg from '@/assets/amenities/connectivity.jpg?format=webp&quality=80';
// @ts-ignore - vite-imagetools transform
import securityImg from '@/assets/amenities/security.jpg?format=webp&quality=80';
// @ts-ignore - vite-imagetools transform
import greenroomImg from '@/assets/amenities/greenroom.jpg?format=webp&quality=80';
// @ts-ignore - vite-imagetools transform
import fitnessImg from '@/assets/amenities/fitness.jpg?format=webp&quality=80';
// @ts-ignore - vite-imagetools transform
import postProductionImg from '@/assets/amenities/post-production.jpg?format=webp&quality=80';

const AmenitiesSection = () => {
  const studioAmenities = [
    {
      title: 'On-Site Commissary',
      description: 'Full-service craft services and commissary for productions of any size, from breakfast spreads to wrap dinners.',
      icon: Utensils,
      image: cateringImg,
    },
    {
      title: 'Equipment Rentals',
      description: 'Professional camera, lighting, and grip equipment available on-site, eliminating logistics headaches.',
      icon: Camera,
      image: equipmentImg,
    },
    {
      title: 'Secure Parking',
      description: 'Dedicated production parking with easy load-in access for equipment trucks and talent vehicles.',
      icon: ParkingCircle,
      image: parkingImg,
    },
    {
      title: 'High-Speed Connectivity',
      description: 'Fiber-optic internet throughout the campus with dedicated lines for live streaming and remote collaboration.',
      icon: Wifi,
      image: connectivityImg,
    },
    {
      title: '24/7 Security',
      description: 'Round-the-clock security personnel and surveillance to protect your production and equipment.',
      icon: ShieldCheck,
      image: securityImg,
    },
    {
      title: 'Green Rooms & Lounges',
      description: 'Comfortable holding areas for talent with premium refreshments, makeup stations, and private spaces.',
      icon: Coffee,
      image: greenroomImg,
    },
    {
      title: 'Fitness Center',
      description: 'On-site gym and wellness facilities to keep cast and crew energized during long production days.',
      icon: Dumbbell,
      image: fitnessImg,
    },
    {
      title: 'Post-Production Suites',
      description: 'Sound mixing, color grading, and editing bays equipped with industry-standard software and hardware.',
      icon: Headphones,
      image: postProductionImg,
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

        {/* Studio Amenities Grid with Images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-12 md:mb-20">
          {studioAmenities.map((amenity, index) => (
            <div 
              key={index} 
              className="steel-gradient-card rounded-lg overflow-hidden h-full flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img 
                  src={amenity.image} 
                  alt={amenity.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-3 md:p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <amenity.icon className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
                  <h3 className="text-sm md:text-base font-medium">{amenity.title}</h3>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {amenity.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Concierge Service Section */}
        <div id="initiatives" className="border-t border-border pt-10 md:pt-16">
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
              <Link to="/concierge">
                <Button variant="hero" size="lg" className="gap-2">
                  Explore Concierge
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
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
