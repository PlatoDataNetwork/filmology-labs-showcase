import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const PatersonFilmDistrictArticle = () => {
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
              Community
            </span>
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              December 2025
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-8">
            Paterson Film District Vision Unveiled
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 font-light">
            Community leaders and stakeholders gather to celebrate the vision for 
            transforming Paterson into a premier film destination, marking a historic 
            moment for the city's creative future.
          </p>

          <div className="w-full h-px bg-border mb-12" />

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-foreground/90">
            <p className="leading-relaxed">
              In a landmark gathering that brought together city officials, business leaders, 
              and creative industry professionals, the vision for the Paterson Film District 
              was officially unveiled to the community. The announcement marks a pivotal 
              moment in the city's ongoing revitalization efforts.
            </p>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">A Historic Transformation</h2>
            
            <p className="leading-relaxed">
              The Paterson Film District represents an ambitious plan to transform the 
              city's historic Great Falls district into a thriving hub for film, television, 
              and digital content production. Building on the area's rich industrial heritage, 
              the district aims to attract productions of all sizes while creating sustainable 
              economic opportunities for local residents.
            </p>

            <p className="leading-relaxed">
              "Paterson has always been a city of innovation and industry," said local 
              officials at the unveiling event. "The Film District continues that legacy, 
              positioning us as a leader in the creative economy while honoring our 
              extraordinary architectural heritage."
            </p>

            <blockquote className="border-l-2 border-primary pl-6 my-8 italic text-foreground">
              <p className="leading-relaxed mb-4">
                "When I first saw the historic mills of Paterson, I immediately recognized 
                their potential. These buildings tell the story of American innovation—and 
                now they will write the next chapter in American entertainment. The Paterson 
                Film District isn't just about building sound stages; it's about creating 
                a legacy that honors the past while empowering the creators of tomorrow."
              </p>
              <cite className="text-sm text-muted-foreground not-italic">
                — Alan Mruvka, Founder of Filmology Labs and E! Entertainment Television
              </cite>
            </blockquote>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">Community at the Center</h2>
            
            <p className="leading-relaxed">
              Central to the Film District vision is a commitment to community engagement 
              and workforce development. Plans include partnerships with local schools 
              and training programs to prepare Paterson residents for careers in the 
              entertainment industry.
            </p>

            <p className="leading-relaxed">
              The initiative will create pathways for local talent to participate in 
              productions, from entry-level positions to skilled technical roles. 
              Educational partnerships will offer training in areas such as camera 
              operation, sound engineering, set design, and production management.
            </p>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">Economic Impact</h2>
            
            <p className="leading-relaxed">
              Economic projections suggest the Film District could generate significant 
              revenue for local businesses and create hundreds of permanent jobs. The 
              presence of major productions is expected to boost tourism and support 
              the growth of ancillary services including hospitality, catering, and 
              equipment rental.
            </p>

            <p className="leading-relaxed">
              "This is about more than just building sound stages," noted community 
              stakeholders. "It's about creating a sustainable ecosystem that benefits 
              everyone in Paterson—from local restaurants to aspiring filmmakers."
            </p>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">Looking Forward</h2>
            
            <p className="leading-relaxed">
              With the vision now public, planning efforts are moving forward on multiple 
              fronts. The development team is working with city planners to ensure the 
              district integrates seamlessly with existing neighborhoods while meeting 
              the technical requirements of modern production facilities.
            </p>

            <p className="leading-relaxed">
              Community members are encouraged to stay engaged as the project progresses, 
              with additional public meetings and updates planned throughout the 
              development process.
            </p>
          </div>

          <div className="w-full h-px bg-border my-12" />

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

export default PatersonFilmDistrictArticle;
