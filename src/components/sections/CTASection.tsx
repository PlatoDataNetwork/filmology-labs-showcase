import { Button } from '@/components/ui/button';
import entranceDaytime from '@/assets/entrance-daytime.png';

const CTASection = () => {
  return (
    <section id="contact" className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={entranceDaytime}
          alt="Filmology Labs entrance"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
      </div>

      {/* Content */}
      <div className="container-wide relative z-10">
        <div className="max-w-xl">
          <p className="label-editorial mb-4">Get in Touch</p>
          <h2 className="mb-6">
            Let's Build the Future Together
          </h2>
          <p className="text-body-large mb-10">
            Filmology Labs is more than an adaptive reuse—it's an opportunity 
            to ignite a new industry in Paterson and build a destination where 
            imagination, history, and future potential converge.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="xl" asChild>
              <a href="mailto:info@filmologylabs.com">
                Inquire Now
              </a>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="mailto:info@filmologylabs.com?subject=Schedule a Visit">
                Schedule a Visit
              </a>
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mt-16 pt-8 border-t border-border/50">
            <div className="grid sm:grid-cols-2 gap-6">
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
