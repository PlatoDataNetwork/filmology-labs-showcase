import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import VisionSection from '@/components/sections/VisionSection';
import StudiosSection from '@/components/sections/StudiosSection';
import HeritageSection from '@/components/sections/HeritageSection';
import LocationSection from '@/components/sections/LocationSection';
import LeadershipSection from '@/components/sections/LeadershipSection';
import NewsSection from '@/components/sections/NewsSection';
import InvestorsSection from '@/components/sections/InvestorsSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Set dark mode as default
    document.documentElement.classList.add('dark');
  }, []);

  // Handle hash navigation on page load
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
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />
      
      <main>
        <HeroSection />
        <VisionSection />
        <StudiosSection />
        <HeritageSection />
        <LocationSection />
        <LeadershipSection />
        <NewsSection />
        <InvestorsSection />
        <CTASection />
      </main>

      <Footer isDark={isDark} />
    </div>
  );
};

export default Index;
