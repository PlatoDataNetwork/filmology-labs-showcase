import { useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import VisionSection from '@/components/sections/VisionSection';
import StudiosSection from '@/components/sections/StudiosSection';
import CommunitySection from '@/components/sections/CommunitySection';
import AmenitiesSection from '@/components/sections/AmenitiesSection';
import LocationSection from '@/components/sections/LocationSection';
import LeadershipSection from '@/components/sections/LeadershipSection';
import InvestorsSection from '@/components/sections/InvestorsSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  const { isDark, toggleTheme } = useTheme();

  // Handle hash navigation on page load - scroll to top if no hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Scroll to top on initial load
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />
      
      <main>
        <HeroSection isDark={isDark} />
        <VisionSection />
        <StudiosSection />
        <CommunitySection />
        <AmenitiesSection />
        <LocationSection />
        <LeadershipSection />
        <CTASection />
        <InvestorsSection />
      </main>

      <Footer isDark={isDark} />
    </div>
  );
};

export default Index;
