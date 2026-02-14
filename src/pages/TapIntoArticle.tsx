import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, ExternalLink } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const TapIntoArticle = () => {
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
            to="/news" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wider">Back to News</span>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-medium">
              <Tag className="w-3 h-3" />
              Community
            </span>
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              February 13, 2026
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-8">
            Paterson Council, Residents React to $250M Filmology Labs Studio Coming to the City
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 font-light">
            Local leaders and residents weigh in on what the $250 million content creation studio development could mean for the city of Paterson.
          </p>

          <div className="w-full h-px bg-border mb-12" />

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-foreground/90">
            <p className="leading-relaxed">
              With the announcement that a $250 million content creation studio is coming to Paterson, local leaders and residents are weighing in on what the development could mean for the city.
            </p>

            <p className="leading-relaxed">
              Alan Mruvka, a real estate developer and co-creator of E! Entertainment Television, revealed the launch of Filmology Labs: Content Creation Studios, which will focus on next-generation content creation including vertical micro-dramas, digital series, podcasts, and AI-driven media. The complex will also house Mruvka's Verza TV platform, which plans to produce more than two vertical micro-dramas per month alongside projects from other producers and independent creators.
            </p>

            <p className="leading-relaxed">
              The studio will be located in the historic Reinhardt Building at 61 State Street, also known as the Padded Wagon Building, a former silk mill. The 250,000-square-foot facility will include 21 production sound stages, AI studios, podcast studios, a green-screen stage, an LED Volume Wall stage, creative office space, a commissary, and a fitness and yoga studio.
            </p>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">Council Members React</h2>

            <p className="leading-relaxed">
              Fourth Ward Councilwoman Ruby Cotton expressed support for the project, noting the city's strong artistic community. "I think this would be a great opportunity for the artists that we have here to showcase their talents," Cotton told TAPinto Paterson. She added that she plans to speak with the developer to introduce him to local artists in shaping the studio's offerings.
            </p>

            <blockquote className="border-l-2 border-primary pl-6 my-8 italic text-foreground">
              <p className="leading-relaxed mb-4">
                "We are thrilled to welcome Filmology Labs to Paterson. This significant investment will create jobs, spark innovation, and help position our city at the forefront of the evolving media and entertainment economy."
              </p>
              <cite className="text-sm text-muted-foreground not-italic">
                — Mayor André Sayegh
              </cite>
            </blockquote>

            <p className="leading-relaxed">
              Fifth Ward Councilman Luis Velez called the project "a transformative moment for our city," highlighting its economic and cultural potential. "Economically, this project has the potential to create meaningful job opportunities for our residents from construction and skilled trades to long-term careers in film production, technology, design, media, and support services," Velez said. "Culturally, this is just as important. Paterson is one of the most diverse cities in the country. Having a major content creation studio here means our stories, our voices, have a greater chance to be told authentically."
            </p>

            <p className="leading-relaxed">
              Second Ward Councilman Shahin Khalique added, "This is the kind of visionary project that brings jobs, sparks small business growth, and puts Paterson on the map as a hub for creativity, innovation, and opportunity. Just as important, it opens doors for our young people to see real futures."
            </p>

            <p className="leading-relaxed">
              Councilman-at-Large Md Forid Uddin praised the project, calling it "an exciting and transformative opportunity for Paterson. A $250 million investment like Filmology Labs signals that our city is being recognized for its potential."
            </p>

            <p className="leading-relaxed">
              Sixth Ward Councilman Ibby Omar added, "As we're in the early stages, this project is going to be amazing for creative youths. It gives them a chance to explore digital media careers right here in Paterson and build skills that will take them far."
            </p>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">Community Response</h2>

            <p className="leading-relaxed">
              Many residents celebrated the potential opportunities. Residents highlighted educational benefits, noting it as "a great opportunity for young kids in school" and predicting "a huge array of opportunities for Patersonians, for example, electricians, carpenters, production, educational opportunities for our kids."
            </p>

            <p className="leading-relaxed">
              Councilman Velez emphasized the importance of inclusive growth, calling for "local hiring commitments, workforce training programs, opportunities for small, minority-owned, and women-owned businesses, and responsible planning that protects neighborhoods and prevents displacement."
            </p>

            <p className="leading-relaxed">
              As Paterson positions itself as a hub for creative industries, the coming months will reveal how Filmology Labs fits into the city's broader economic and cultural landscape, and whether it can meet the high expectations of both city leaders and residents.
            </p>
          </div>

          <div className="w-full h-px bg-border my-12" />

          <div className="steel-gradient-card rounded-lg p-6 mb-12">
            <p className="text-sm text-muted-foreground mb-2">Source</p>
            <a 
              href="https://www.tapinto.net/towns/paterson/articles/paterson-council-residents-react-to-250m-filmology-labs-studio-coming-to-the-city"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300"
            >
              <span>TAPinto Paterson</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-xs text-muted-foreground mt-2">
              Article by Gabriella Dragone • February 13, 2026
            </p>
          </div>

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

export default TapIntoArticle;
