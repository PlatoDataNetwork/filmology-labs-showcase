import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const TaxCreditArticle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
    window.scrollTo(0, 0);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

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
              Industry
            </span>
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              September 2024
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-8">
            New Jersey Film Tax Credit Program Expansion
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 font-light">
            Recent legislation strengthens incentives for productions choosing New Jersey 
            as their home base, making the state one of the most competitive filming 
            destinations on the East Coast.
          </p>

          <div className="w-full h-px bg-border mb-12" />

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-foreground/90">
            <p className="leading-relaxed">
              New Jersey has significantly expanded its film and television tax credit 
              program, providing enhanced incentives for productions that choose to 
              film in the Garden State. The expansion represents a major commitment 
              to growing the state's entertainment industry and creating high-quality 
              jobs for residents.
            </p>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">Enhanced Incentives</h2>
            
            <p className="leading-relaxed">
              The expanded program offers competitive tax credits for qualified 
              production expenses incurred in New Jersey. Productions can now access 
              credits of up to 35% on eligible expenses, with additional bonuses 
              available for filming in designated areas and hiring local workforce.
            </p>

            <p className="leading-relaxed">
              Key features of the expanded program include:
            </p>

            <ul className="space-y-3 text-foreground/90">
              <li className="leading-relaxed">Base credit of 30% on qualified film production expenses</li>
              <li className="leading-relaxed">Additional 5% bonus for productions filmed in designated urban areas</li>
              <li className="leading-relaxed">Workforce development credits for hiring New Jersey residents</li>
              <li className="leading-relaxed">Streamlined application and approval process</li>
              <li className="leading-relaxed">Extended program duration providing long-term certainty</li>
            </ul>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">Competitive Positioning</h2>
            
            <p className="leading-relaxed">
              The enhanced incentives position New Jersey as one of the most attractive 
              filming destinations on the East Coast. The state's proximity to New York 
              City, diverse locations, and skilled workforce—combined with the expanded 
              tax credits—create a compelling package for productions of all sizes.
            </p>

            <blockquote className="border-l-2 border-primary pl-6 my-8 italic text-foreground">
              <p className="leading-relaxed mb-4">
                "The expansion of New Jersey's film tax credit program is a game-changer 
                for our industry. It sends a clear message that this state is serious 
                about becoming a major player in entertainment production. At Filmology Labs, 
                we're building facilities that will allow productions to take full advantage 
                of these incentives while accessing world-class infrastructure right here 
                in Paterson."
              </p>
              <cite className="text-sm text-muted-foreground not-italic">
                — Alan Mruvka, Founder of Filmology Labs and E! Entertainment Television
              </cite>
            </blockquote>

            <p className="leading-relaxed">
              "New Jersey has everything productions need: world-class talent, diverse 
              locations from urban streets to pristine beaches, and now one of the 
              most competitive incentive packages in the country," said industry 
              representatives.
            </p>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">Economic Benefits</h2>
            
            <p className="leading-relaxed">
              Studies show that film and television production generates significant 
              economic activity, with every dollar of tax credit returning multiple 
              dollars in economic impact. Productions bring spending on local services, 
              hotels, restaurants, and equipment, while creating both temporary and 
              permanent employment opportunities.
            </p>

            <p className="leading-relaxed">
              The expansion is expected to attract major studio productions as well 
              as independent filmmakers, building a sustainable creative economy 
              that benefits communities across the state.
            </p>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">Impact on Filmology Labs</h2>
            
            <p className="leading-relaxed">
              For developments like Filmology Labs in Paterson, the enhanced tax 
              credit program provides additional incentives for productions to 
              utilize New Jersey-based facilities. The combination of state-of-the-art 
              infrastructure and competitive incentives creates a powerful draw 
              for content creators.
            </p>

            <p className="leading-relaxed">
              Productions filming at facilities in designated areas like Paterson 
              may qualify for the maximum available credits, making New Jersey an 
              increasingly attractive alternative to traditional production centers.
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

      <Footer />
    </div>
  );
};

export default TaxCreditArticle;
