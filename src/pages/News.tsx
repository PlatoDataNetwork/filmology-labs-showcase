import { useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';
import Navigation from '@/components/Navigation';
import NewsSection from '@/components/sections/NewsSection';
import Footer from '@/components/Footer';

const News = () => {
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />
      <main className="pt-20">
        <NewsSection />
      </main>
      <Footer isDark={isDark} />
    </div>
  );
};

export default News;
