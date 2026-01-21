import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Car, Shirt, Truck, MapPin, Clock, Briefcase, Phone, Mail, Calendar, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/hooks/use-theme';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

// @ts-ignore - vite-imagetools transform
import transportationImg from '@/assets/concierge/transportation.jpg?format=webp&quality=80';
// @ts-ignore - vite-imagetools transform
import wardrobeImg from '@/assets/concierge/wardrobe.jpg?format=webp&quality=80';
// @ts-ignore - vite-imagetools transform
import deskImg from '@/assets/concierge/desk.jpg?format=webp&quality=80';
// @ts-ignore - vite-imagetools transform
import executiveImg from '@/assets/concierge/executive.jpg?format=webp&quality=80';
// @ts-ignore - vite-imagetools transform
import suppliesImg from '@/assets/concierge/supplies.png?format=webp&quality=80';

const Concierge = () => {
  const { isDark, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    date: '',
    details: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      id: 'transportation',
      title: 'Transportation Coordination',
      description: 'Our concierge team arranges comprehensive ground transportation for your entire production. From luxury sedans for talent arrivals to passenger vans for crew shuttles, we coordinate every detail.',
      features: [
        'Airport pickups and drop-offs',
        'Daily crew shuttle service',
        'VIP luxury car service for talent',
        'Equipment truck coordination',
        'Parking management and valet',
      ],
      icon: Car,
      image: transportationImg,
    },
    {
      id: 'wardrobe',
      title: 'Wardrobe Services',
      description: 'Our on-site wardrobe facilities include climate-controlled storage, professional pressing equipment, and connections to the best costume houses and tailors in the greater NYC area.',
      features: [
        'Climate-controlled costume storage',
        'Professional steaming and pressing',
        'On-call alterations and repairs',
        'Costume house referrals',
        'Dry cleaning pickup and delivery',
      ],
      icon: Shirt,
      image: wardrobeImg,
    },
    {
      id: 'supplies',
      title: 'Production Supplies',
      description: 'Need a specialty prop by tomorrow? Our vendor network and procurement team can source virtually anything your production requires, often with same-day delivery.',
      features: [
        'Same-day prop procurement',
        'Set dressing and materials',
        'Expendables and craft supplies',
        'Specialty item sourcing',
        'Vendor account management',
      ],
      icon: Truck,
      image: suppliesImg,
    },
    {
      id: 'local',
      title: 'Local Coordination',
      description: 'Leverage our deep knowledge of New Jersey and the greater NYC area. We assist with permits, location scouting, and connecting you with the best local crew and vendors.',
      features: [
        'Film permit assistance',
        'Location scouting support',
        'Local crew referrals',
        'Vendor recommendations',
        'Community liaison services',
      ],
      icon: MapPin,
      image: deskImg,
    },
    {
      id: 'afterhours',
      title: 'After-Hours Support',
      description: 'Productions don\'t always run 9-to-5. Our extended hours team ensures you have the support you need, whenever you need it.',
      features: [
        'Extended production hours',
        '24/7 emergency support line',
        'Overnight security coordination',
        'Late-night catering arrangements',
        'Weekend and holiday coverage',
      ],
      icon: Clock,
      image: deskImg,
    },
    {
      id: 'executive',
      title: 'Executive Services',
      description: 'For visiting executives and high-profile talent, we offer premium services including private meeting rooms, executive dining, and personalized assistance.',
      features: [
        'Private meeting rooms',
        'Video conferencing facilities',
        'Executive dining arrangements',
        'Administrative support',
        'Confidential document handling',
      ],
      icon: Briefcase,
      image: executiveImg,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Request Submitted",
      description: "Our concierge team will contact you within 24 hours.",
    });
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      date: '',
      details: '',
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />
      
      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="section-padding bg-muted/30">
          <div className="container-wide">
            <Link 
              to="/#amenities" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Amenities
            </Link>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <p className="label-editorial">Concierge Service</p>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6">
                  White-Glove Production Support
                </h1>
                <p className="text-body-large text-muted-foreground mb-6">
                  Our dedicated concierge team handles the logistics so you can focus on your creative vision. 
                  From coordinating transportation to sourcing specialty props, we're here 24/7 to make your 
                  production seamless.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>24/7 Available</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>concierge@filmologylabs.com</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src={deskImg} 
                  alt="Concierge desk" 
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="text-center mb-12">
              <p className="label-editorial mb-4">Our Services</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
                Comprehensive Production Support
              </h2>
              <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
                Every service is designed to remove friction from your production workflow 
                and ensure your team can focus on creating great content.
              </p>
            </div>

            <div className="space-y-16">
              {services.map((service, index) => (
                <div 
                  key={service.id}
                  id={service.id}
                  className={`grid lg:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-accent">
                        <service.icon className="w-5 h-5 text-foreground" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-medium">{service.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section id="booking" className="section-padding bg-muted/30">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                  <p className="label-editorial">Book a Service</p>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
                  Request Concierge Assistance
                </h2>
                <p className="text-muted-foreground">
                  Submit your request below and our concierge team will contact you within 24 hours 
                  to discuss your needs and arrange services.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="steel-gradient-card rounded-lg p-6 md:p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Production Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Company name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="service">Service Needed *</Label>
                    <Select 
                      value={formData.service} 
                      onValueChange={(value) => setFormData({ ...formData, service: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.title}
                          </SelectItem>
                        ))}
                        <SelectItem value="other">Other / Multiple Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">Additional Details *</Label>
                  <Textarea
                    id="details"
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    required
                    placeholder="Please describe your production needs and any specific requirements..."
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer isDark={isDark} />
    </div>
  );
};

export default Concierge;
