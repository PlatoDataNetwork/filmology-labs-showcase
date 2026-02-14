import { useTheme } from '@/hooks/use-theme';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NewsSection from '@/components/sections/NewsSection';

const News = () => {
  const { isDark, toggleTheme } = useTheme();

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
