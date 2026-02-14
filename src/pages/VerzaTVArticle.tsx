import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, ExternalLink } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const VerzaTVArticle = () => {
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />
      
      <main className="pt-24 md:pt-32">
        {/* Article Header */}
        <article className="container-narrow">
          <Link 
            to="/news" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wider">Back to News</span>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-medium">
              <Tag className="w-3 h-3" />
              Partnership
            </span>
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              October 15, 2025
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-8">
            E! Channel Founder to Launch the First U.S. Platform for Microdramas
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 font-light">
            The founder of E! Entertainment Television, Alan Mruvka, is set to launch the 
            first-ever U.S. platform for microdramas. Mruvka is funding the platform himself.
          </p>

          <div className="w-full h-px bg-border mb-12" />

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-foreground/90">
            <p className="leading-relaxed">
              Verza TV is weeks out from launch, which will make it the first such American 
              platform to market; others have been announced, but are not ready. Most of the 
              existing platforms for microdramas are Chinese.
            </p>

            <p className="leading-relaxed">
              Verza TV, a mobile-first, vertical streamer, has a pay model with a somewhat 
              generous trial. Users can watch up to five episodes of any and every title for 
              free — it will cost $4.99 to access the rest.
            </p>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">A Multi-Billion Dollar Market</h2>
            
            <p className="leading-relaxed">
              The vertical microdrama market surpassed $6.5 billion in revenue in 2024, and 
              is expected to double by 2030.
            </p>

            <p className="leading-relaxed">
              "When I founded E! Entertainment Television, we were the first to pioneer 
              celebrity-based programming and forever changed how audiences watched and engaged 
              with entertainment," Mruvka, the Verza TV founder and CEO, said. "With Verza TV, 
              we're doing it again — this time for the mobile-first era. Today's viewers are 
              more sophisticated than ever, but they consume everything vertically on their 
              phones. We have incredible things planned, and we're going to elevate that 
              experience to an entirely new level."
            </p>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">Authenticity Meets Polish</h2>

            <p className="leading-relaxed">
              "By combining celebrity-driven storytelling with creator-led series, Verza TV 
              will deliver the authenticity Gen Z demands with the polish and credibility that 
              resonates with older demographics," the company promises, unlike its "international 
              out-of-touch competitors."
            </p>

            <p className="leading-relaxed">
              Verza TV's programming will include "trending-TikTok-inspired dramas, reality 
              micro content, exclusive red carpet interviews and fan-favorite microdramas."
            </p>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">E! Entertainment Reunion</h2>
            
            <p className="leading-relaxed">
              Mruvka is joined in the venture by his E! Entertainment Television co-founder 
              Larry Namer as partner; E! was launched on July 31, 1987. Namer will sit on 
              the board of Verza TV and "provide insightful corporate strategy going forward," 
              the company said.
            </p>

            <p className="leading-relaxed">
              This partnership between the E! Entertainment Television co-founders signals 
              a significant move in the rapidly evolving short-form content landscape, 
              positioning Verza TV as a major player in the American microdrama market.
            </p>
          </div>

          <div className="w-full h-px bg-border my-12" />

          {/* Source Attribution */}
          <div className="steel-gradient-card rounded-lg p-6 mb-12">
            <p className="text-sm text-muted-foreground mb-2">Source</p>
            <a 
              href="https://www.hollywoodreporter.com/tv/tv-news/microdramas-come-to-america-verza-tv-vertical-soap-operas-1236401254/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300"
            >
              <span>The Hollywood Reporter</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-xs text-muted-foreground mt-2">
              Article by Tony Maglio • October 15, 2025
            </p>
          </div>

          {/* Back Link */}
          <Link 
            to="/news" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wider">Back to News</span>
          </Link>
        </article>

        <div className="h-24" />
      </main>

      <Footer isDark={isDark} />
    </div>
  );
};

export default VerzaTVArticle;
