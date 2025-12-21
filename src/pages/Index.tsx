import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import VisionSection from '@/components/sections/VisionSection';
import StudiosSection from '@/components/sections/StudiosSection';
import HeritageSection from '@/components/sections/HeritageSection';
import LocationSection from '@/components/sections/LocationSection';
import LeadershipSection from '@/components/sections/LeadershipSection';
import NewsSection from '@/components/sections/NewsSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference on mount
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
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
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
