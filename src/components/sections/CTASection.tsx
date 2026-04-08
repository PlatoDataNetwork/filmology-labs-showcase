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
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 md:via-background/90 to-background/70" />
      </div>

      {/* Content */}
      <div className="container-wide relative z-10">
        <div className="max-w-xl">
          <p className="label-editorial mb-3 text-foreground drop-shadow-sm">Get in Touch</p>
          <h2 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground dark:drop-shadow-md" style={{ textShadow: 'var(--cta-text-shadow, none)' }}>
            Lets Make Content
          </h2>
          <p className="text-body-large mb-6 md:mb-10 text-foreground/90 drop-shadow-sm">
            Filmology Labs is more than an adaptive reuse—it's an opportunity 
            to ignite a new industry in Paterson and build a destination where imagination, history<br className="hidden sm:inline" />
            and future potential converge.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <ContactFormModal
              trigger={
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  Inquire Now
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
