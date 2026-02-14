import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const newsItems = [
  {
    date: 'February 2026',
    category: 'Variety Exclusive',
    title: 'Filmology Labs, a $250 Million Studio Built for Content Creation, Set to Open in New Jersey',
    excerpt: 'Alan Mruvka, co-creator of E! Entertainment Television, announced the launch of Filmology Labs: Content Creation Studios — a $250 million complex in Paterson, NJ focused on next-gen content like vertical micro-dramas, digital series, podcasts, and AI-driven media.',
    featured: true,
    slug: '/news/variety-filmology-labs',
  },
  {
    date: 'February 2026',
    category: 'Community',
    title: 'Paterson Council, Residents React to $250M Filmology Labs Studio Coming to the City',
    excerpt: 'Local leaders and residents weigh in on the transformative potential of the $250 million Filmology Labs development, with council members praising economic and cultural opportunities while some residents urge attention to existing city needs.',
    featured: false,
    slug: '/news/paterson-council-reaction',
  },
  {
    date: 'December 2025',
    category: 'Filmology Announcement',
    title: 'Filmology Labs Announces Groundbreaking Ceremony for 2026',
    excerpt: 'The highly anticipated production campus in Paterson\'s historic mill district is set to break ground in early 2026, marking a transformative new chapter for New Jersey\'s film and television industry.',
    featured: false,
    slug: '/news/groundbreaking-2026',
  },
  {
    date: 'October 2025',
    category: 'Partnership',
    title: 'E! Channel Founder to Launch the First U.S. Platform for Microdramas',
    excerpt: 'The founder of E! Entertainment Television, Alan Mruvka, is set to launch the first-ever U.S. platform for microdramas with Verza TV. The vertical microdrama market surpassed $6.5 billion in revenue in 2024.',
    featured: false,
    slug: '/news/verza-tv-microdramas',
  },
  {
    date: 'December 2025',
    category: 'Community',
    title: 'Paterson Film District Vision Unveiled',
    excerpt: 'Community leaders and stakeholders gather to celebrate the vision for transforming Paterson into a premier film destination.',
    featured: false,
    slug: '/news/paterson-film-district',
  },
  {
    date: 'December 2025',
    category: 'Industry',
    title: 'New Jersey Film Tax Credit Program Expansion',
    excerpt: 'Recent legislation strengthens incentives for productions choosing New Jersey as their home base.',
    featured: false,
    slug: '/news/nj-tax-credit-expansion',
  },
];

const News = () => {
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredNews = newsItems.find((item) => item.featured);
  const otherNews = newsItems.filter((item) => !item.featured);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />

      <main className="pt-24 md:pt-32">
        <div className="container-wide">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <p className="label-editorial mb-4">News & Updates</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light">Latest from Filmology Labs</h1>
          </div>

          {/* Featured + Grid */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-stretch mb-16">
            {/* Featured Article */}
            {featuredNews && (
              <article className="group h-full">
                <Link to={featuredNews.slug} className="block h-full">
                  <div className="steel-gradient-card rounded-lg p-5 md:p-8 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-xs uppercase tracking-wider text-primary font-medium">
                        {featuredNews.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{featuredNews.date}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-light leading-tight mb-6 group-hover:text-primary transition-colors duration-300">
                      {featuredNews.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed flex-grow">
                      {featuredNews.excerpt}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-wider text-foreground group-hover:text-primary transition-colors duration-300">
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </article>
            )}

            {/* Other Articles Column */}
            <div className="flex flex-col gap-6 md:gap-0 md:justify-between">
              {otherNews.map((item, index) => (
                <article
                  key={index}
                  className="group border-b border-border/50 pb-5 md:pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-3">
                    <span className="text-xs uppercase tracking-wider text-primary font-medium">
                      {item.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <h3 className="text-base md:text-lg font-medium mb-2 group-hover:text-primary transition-colors duration-300 cursor-pointer">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {item.excerpt}
                  </p>
                  <Link
                    to={item.slug}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-foreground hover:text-primary transition-colors duration-300"
                  >
                    Read More
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="h-24" />
      </main>

      <Footer isDark={isDark} />
    </div>
  );
};

export default News;
