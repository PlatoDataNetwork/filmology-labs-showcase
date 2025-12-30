import { Button } from '@/components/ui/button';
import entranceDaytime from '@/assets/entrance-daytime.png';
import ContactFormModal from '@/components/ContactFormModal';

const CTASection = () => {
  return (
    <section id="contact" className="relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden py-12 md:py-0">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={entranceDaytime}
          alt="Filmology Labs entrance"
          className="w-full h-full object-cover object-right md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 md:via-background/80 to-background/60 md:to-background/40" />
      </div>

      {/* Content */}
      <div className="container-wide relative z-10">
        <div className="max-w-xl">
          <p className="label-editorial mb-3">Get in Touch</p>
          <h2 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Lets Make Content
          </h2>
          <p className="text-body-large mb-6 md:mb-10">
            Filmology Labs is more than an adaptive reuse—it's an opportunity 
            to ignite a new industry in Paterson and build a destination where 
            imagination, history, and future potential converge.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <ContactFormModal
              trigger={
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  Inquire Now
                </Button>
              }
            />
            <ContactFormModal
              trigger={
                <Button variant="hero-outline" size="lg" className="w-full sm:w-auto">
                  Schedule a Visit
                </Button>
              }
            />
          </div>

          {/* Contact Info */}
          <div className="mt-8 md:mt-16 pt-5 md:pt-8 border-t border-border/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
              <div>
                <p className="label-editorial mb-2">Location</p>
                <p className="text-muted-foreground text-sm">
                  61 State Street<br />
                  Paterson, New Jersey 07514
                </p>
              </div>
              <div>
                <p className="label-editorial mb-2">Inquiries</p>
                <p className="text-muted-foreground text-sm">
                  info@filmologylabs.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
