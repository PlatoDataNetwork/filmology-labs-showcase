import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const GroundbreakingArticle = () => {
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
              Filmology Announcement
            </span>
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              December 2025
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-8">
            Filmology Labs Announces Groundbreaking Ceremony for 2026
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 font-light">
            The highly anticipated production campus in Paterson's historic mill district 
            is set to break ground in early 2026, marking a transformative new chapter 
            for New Jersey's film and television industry.
          </p>

          <div className="w-full h-px bg-border mb-12" />

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-foreground/90">
            <p className="leading-relaxed">
              Filmology Labs, the visionary production campus spearheaded by entertainment 
              pioneer Alan Mruvka, has officially announced plans for a groundbreaking 
              ceremony scheduled for early 2026. The announcement marks a significant 
              milestone in the ambitious project to transform Paterson's historic mill 
              district into a world-class destination for film and television production.
            </p>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">A Vision Realized</h2>
            
            <p className="leading-relaxed">
              The project represents one of the most significant investments in New Jersey's 
              creative economy in decades. Located at 61 State Street in the heart of 
              Paterson's historic Great Falls district, Filmology Labs will occupy a 
              sprawling campus that honors the area's industrial heritage while providing 
              cutting-edge facilities for modern content creators.
            </p>

            <p className="leading-relaxed">
              "This groundbreaking ceremony represents more than just the start of 
              construction," said Alan Mruvka, founder of Filmology Labs and creator of 
              E! Entertainment Television. "It's the beginning of a new era for Paterson 
              and for independent content creators across the region. We're building 
              something that will inspire creativity for generations to come."
            </p>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">World-Class Facilities</h2>
            
            <p className="leading-relaxed">
              The completed campus will feature multiple sound stages ranging from 
              15,000 to 40,000 square feet, state-of-the-art post-production suites, 
              and flexible production spaces designed to accommodate everything from 
              major studio productions to independent filmmakers and digital content 
              creators.
            </p>

            <p className="leading-relaxed">
              Key facilities will include:
            </p>

            <ul className="space-y-3 text-foreground/90">
              <li className="leading-relaxed">Six professional sound stages with full acoustic treatment.</li>
              <li className="leading-relaxed">Dedicated studios for podcasting and streaming content.</li>
              <li className="leading-relaxed">Post-production facilities including color grading suites and sound mixing stages.</li>
              <li className="leading-relaxed">Production offices and collaborative workspaces.</li>
              <li className="leading-relaxed">On-site equipment rental and support services.</li>
            </ul>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">Economic Impact</h2>
            
            <p className="leading-relaxed">
              The project is expected to create hundreds of permanent jobs and generate 
              significant economic activity for the Paterson community. Local officials 
              have praised the development as a catalyst for urban renewal in the 
              historic district.
            </p>

            <p className="leading-relaxed">
              "Filmology Labs represents exactly the kind of investment that Paterson 
              needs," said local officials. "This project will bring jobs, tourism, 
              and renewed energy to our historic downtown while preserving and 
              celebrating our industrial heritage."
            </p>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">Looking Ahead</h2>
            
            <p className="leading-relaxed">
              The groundbreaking ceremony will be open to community members, industry 
              professionals, and media. Details regarding the specific date and 
              registration for the event will be announced in the coming months.
            </p>

            <p className="leading-relaxed">
              Construction is expected to proceed in phases, with the first sound 
              stages anticipated to be operational by late 2027. The full campus 
              completion is targeted for 2028.
            </p>

            <p className="leading-relaxed">
              For updates on the groundbreaking ceremony and project milestones, 
              interested parties are encouraged to check back regularly for news 
              and announcements.
            </p>
          </div>

          <div className="w-full h-px bg-border my-12" />

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

export default GroundbreakingArticle;
