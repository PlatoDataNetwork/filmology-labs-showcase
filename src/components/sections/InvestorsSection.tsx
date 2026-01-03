import { ArrowRight, Lock, TrendingUp, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import verzaTvLogo from '@/assets/verza-tv-logo.png';
import platoAiLogo from '@/assets/plato-ai-logo.png';
import architecturaLogoBlack from '@/assets/architectura-logo-black.png';

const InvestorsSection = () => {
  const { isDark } = useTheme();
  
  return (
    <section id="investors" className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
          <div>
            <p className="label-editorial mb-4">Investment Opportunity</p>
            <h2>Partner with Filmology Labs</h2>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-stretch">
          {/* Left - Description */}
          <div className="flex flex-col justify-center">
            <p className="text-body-large mb-8">
              Join us in building the future of entertainment production. Filmology Labs 
              represents a unique opportunity to invest in a transformative development 
              that combines historic preservation with cutting-edge production technology.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Strong Market Demand</h4>
                  <p className="text-sm text-muted-foreground">
                    Growing demand for production space in the Northeast region with limited supply.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Prime Location</h4>
                  <p className="text-sm text-muted-foreground">
                    Strategic positioning near NYC with competitive New Jersey tax incentives.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - CTA Card */}
          <div className="steel-gradient-card rounded-lg p-6 sm:p-8 md:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <Lock className="w-5 h-5 text-primary" />
              <span className="text-xs uppercase tracking-wider text-primary font-medium">
                Accredited Investors
              </span>
            </div>
            
            <h3 className="text-xl sm:text-2xl md:text-3xl font-light leading-tight mb-3 md:mb-4">
              Access Exclusive Investment Materials
            </h3>
            
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 md:mb-8">
              Detailed financial projections, development timelines, and partnership 
              opportunities are available in our secure partner portal.
            </p>
            
            <Link
              to="/partner-login"
              className="group inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-5 md:px-6 py-3 md:py-4 rounded-md hover:bg-primary/90 transition-colors duration-300 w-full sm:w-fit"
            >
              <span className="text-sm uppercase tracking-wider font-medium">Partner Login</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Partners Section - Full Width Bottom */}
        <div className="mt-12 md:mt-16">
          <h2 className="mb-8 text-center">Partners we create with</h2>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            <img 
              src={verzaTvLogo} 
              alt="Verza TV" 
              className="h-10 md:h-14 object-contain"
            />
            <img 
              src={platoAiLogo} 
              alt="Plato AI" 
              className="h-8 md:h-12 object-contain"
            />
            <span 
              className="text-xl md:text-2xl font-bold text-foreground"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              Typset
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorsSection;
