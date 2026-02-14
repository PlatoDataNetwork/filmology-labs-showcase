import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, ExternalLink } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const VarietyArticle = () => {
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
              Variety Exclusive
            </span>
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              February 10, 2026
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-8">
            Filmology Labs, a $250 Million Studio Built for Content Creation Like Vertical Micro-Dramas and AI-Driven Media Formats, Set to Open in New Jersey
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 font-light">
            Alan Mruvka, a real estate developer and the co-creator of E! Entertainment Television, 
            announced the launch of Filmology Labs: Content Creation Studios — a $250 million studio 
            complex in Paterson, New Jersey focused on next-gen content creation.
          </p>

          <div className="w-full h-px bg-border mb-12" />

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-foreground/90">
            <p className="leading-relaxed">
              A massive, modern new studio is headed to New Jersey. Alan Mruvka, a real estate 
              developer and the co-creator of E! Entertainment Television, announced the launch 
              of Filmology Labs: Content Creation Studios. The $250 million studio complex will 
              be located in Paterson, New Jersey, and will focus on next-gen content creation like 
              vertical micro-dramas, digital series, podcasts and AI-driven media.
            </p>

            <p className="leading-relaxed">
              The complex will also house Mruvka's vertical micro-drama platform Verza TV, which 
              plans to produce more than two vertical micro-dramas per month, alongside projects 
              from other micro-drama producers, production companies and independent content creators.
            </p>

            <blockquote className="border-l-2 border-primary pl-6 my-8 italic text-foreground">
              <p className="leading-relaxed mb-4">
                "Paterson is one of the most extraordinary cities in New Jersey and a vibrant 
                community. Our goal is to engage local schools to help train young people for 
                careers in this fast-growing industry, while drawing investment into Paterson and 
                showcasing the city to the world. Filmology Labs is about creating opportunity — 
                creatively, economically, and culturally."
              </p>
              <cite className="text-sm text-muted-foreground not-italic">
                — Alan Mruvka, Founder of Filmology Labs and E! Entertainment Television
              </cite>
            </blockquote>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">A Historic Location</h2>

            <p className="leading-relaxed">
              Filmology Labs will be located in Paterson's historic Reinhardt Building at 61 State 
              Street, which once served as a silk mill. Known locally as the Padded Wagon Building, 
              it will become a 250,000 square foot production hub that is close to New York City 
              but can also take advantage of New Jersey tax credits.
            </p>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">World-Class Facilities</h2>

            <p className="leading-relaxed">
              Designed by celebrity architect Conrad Roncati of Architectura, Filmology Labs will 
              differ fundamentally from traditional big-box sound stages. Built as Content Creation 
              Studios, the campus is designed for speed, efficiency, and scale. Filmology Labs will 
              feature 21 production sound stages with pre-built, fully lit, permanent standing sets 
              optimized for vertical storytelling and creator-driven production. This approach 
              eliminates the time and cost typically associated with set design, construction, and 
              lighting — allowing micro-dramas and digital content to be produced quickly and economically.
            </p>

            <p className="leading-relaxed">
              The resources and amenities in the complex will also include sound stages, AI studios, 
              podcast studios, a green-screen stage and an LED Volume Wall stage, which is comparable 
              to the one used on "The Mandalorian." The campus will also include creative office space, 
              a commissary capable of serving 200 people and a fitness and yoga studio.
            </p>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">Civic Support</h2>

            <blockquote className="border-l-2 border-primary pl-6 my-8 italic text-foreground">
              <p className="leading-relaxed mb-4">
                "We are thrilled to welcome Filmology Labs to Paterson. This significant investment 
                will create jobs, spark innovation, and help position our city at the forefront of 
                the evolving media and entertainment economy. Projects like this generate new 
                opportunities for residents, support local businesses, and accelerate Paterson's 
                continued growth and revitalization."
              </p>
              <cite className="text-sm text-muted-foreground not-italic">
                — Mayor André Sayegh, City of Paterson
              </cite>
            </blockquote>
          </div>

          <div className="w-full h-px bg-border my-12" />

          {/* Source Attribution */}
          <div className="steel-gradient-card rounded-lg p-6 mb-12">
            <p className="text-sm text-muted-foreground mb-2">Source</p>
            <a
              href="https://variety.com/2026/digital/news/filmology-labs-content-creation-ai-studio-1236657646/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300"
            >
              <span>Variety</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-xs text-muted-foreground mt-2">
              Article by William Earl • February 10, 2026
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

export default VarietyArticle;
