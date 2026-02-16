import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, ExternalLink } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const News12Article = () => {
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />
      
      <main className="pt-24 md:pt-32">
        <article className="container-narrow">
          <Link 
            to="/#news" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wider">Back to News</span>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-medium">
              <Tag className="w-3 h-3" />
              Media
            </span>
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              February 15, 2026
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-8">
            From Silk City to Studio City: Content Creation Studio Coming to Paterson
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 font-light">
            "This is a big win for the city of Paterson, and it essentially solidifies our place as Hollywood East," Mayor Andre Sayegh said.
          </p>

          <div className="w-full h-px bg-border mb-12" />

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-foreground/90">
            <p className="leading-relaxed">
              A $250 million film and content creation studio campus is coming to Paterson, marking what leaders call a major step forward in the city's economic and cultural revival.
            </p>

            <p className="leading-relaxed">
              Filmology Labs, a next-generation content creation studio, will be developed inside the historic Reinhardt Building at 61 State St. The former silk mill, a reminder of Paterson's past as the "Silk City," will be transformed into a 250,000‑square‑foot production hub.
            </p>

            <p className="leading-relaxed">
              The project is led by media pioneer and real estate developer Alan Mruvka, who is also the co‑founder of E! Entertainment Television.
            </p>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">A Landmark Investment</h2>

            <p className="leading-relaxed">
              Plans for the campus include 21 production sound stages, AI studios, podcast studios, a green‑screen stage and an LED volume wall similar to the technology used on <em>The Mandalorian</em>.
            </p>

            <p className="leading-relaxed">
              The studio will also serve as headquarters for Mruvka's vertical micro‑drama platform, which plans to produce more than two short‑form dramas each month.
            </p>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">A Multiplier Effect</h2>

            <p className="leading-relaxed">
              Mayor Sayegh said the investment will bring opportunities beyond film production.
            </p>

            <p className="leading-relaxed italic">
              "This will create opportunities for beauty parlors, barber shops, hardware stores and restaurants," he said. "This will create a multiplier effect, and people will reap the benefits of having a film studio here in the city. This goes beyond making movies."
            </p>

            <p className="leading-relaxed">
              He also said Paterson has long been a film‑friendly location, previously hosting major Hollywood productions.
            </p>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">Construction Timeline</h2>

            <p className="leading-relaxed">
              A groundbreaking ceremony is expected to take place later this year. Construction will move forward in phases, with the first sound stages expected to be operational by late 2027 and full campus completion targeted for 2028.
            </p>
          </div>

          <div className="w-full h-px bg-border my-12" />

          <div className="steel-gradient-card rounded-lg p-6 mb-12">
            <p className="text-sm text-muted-foreground mb-2">Source</p>
            <a 
              href="https://newjersey.news12.com/from-silk-city-to-studio-city-content-creation-studio-coming-to-paterson"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300"
            >
              <span>News 12 New Jersey</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-xs text-muted-foreground mt-2">
              Article by Jennifer Portorreal • February 15, 2026
            </p>
          </div>

          <Link 
            to="/#news" 
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

export default News12Article;
