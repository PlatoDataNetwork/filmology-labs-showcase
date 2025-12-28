import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const newsItems = [
  {
    date: 'December 2025',
    category: 'Filmology Announcement',
    title: 'Filmology Labs Announces Groundbreaking Ceremony for 2026',
    excerpt: 'The highly anticipated production campus in Paterson\'s historic mill district is set to break ground in early 2026, marking a transformative new chapter for New Jersey\'s film and television industry. This landmark development will bring world-class production facilities to the heart of Paterson\'s Great Falls district, creating hundreds of jobs and establishing the region as a premier destination for filmmakers and content creators.',
    excerpt2: 'The campus will feature multiple sound stages, post-production suites, and collaborative workspaces designed for the creators of tomorrow. Led by E! Entertainment Television founder Alan Mruvka, this ambitious project represents one of the most significant investments in the region\'s creative economy in decades.',
    featured: true,
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
    excerpt: 'Community leaders and stakeholders gather to celebrate the vision for transforming Paterson into a premier film destination. The initiative marks a historic moment for the city\'s creative future.',
    featured: false,
    slug: '/news/paterson-film-district',
  },
  {
    date: 'December 2025',
    category: 'Industry',
    title: 'New Jersey Film Tax Credit Program Expansion',
    excerpt: 'Recent legislation strengthens incentives for productions choosing New Jersey as their home base. The expanded program positions the state as one of the most competitive filming destinations on the East Coast.',
    featured: false,
    slug: '/news/nj-tax-credit-expansion',
  },
];

const NewsSection = () => {
  const featuredNews = newsItems.find((item) => item.featured);
  const otherNews = newsItems.filter((item) => !item.featured);

  return (
    <section id="news" className="section-padding bg-muted/30">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
          <div>
            <p className="label-editorial mb-4">News & Updates</p>
            <h2>Latest from Filmology Labs</h2>
          </div>
          <a
            href="#"
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 mt-4 md:mt-0"
          >
            <span className="text-sm uppercase tracking-wider">View All News</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

        {/* News Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Featured Article */}
          {featuredNews && (
            <article className="group h-full">
              <div className="steel-gradient-card rounded-lg p-5 md:p-8 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs uppercase tracking-wider text-primary font-medium">
                    {featuredNews.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{featuredNews.date}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-light leading-tight mb-6 group-hover:text-primary transition-colors duration-300">
                  {featuredNews.title}
                </h3>
                <div className="flex-grow space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {featuredNews.excerpt}
                  </p>
                  {featuredNews.excerpt2 && (
                    <p className="text-muted-foreground leading-relaxed">
                      {featuredNews.excerpt2}
                    </p>
                  )}
                </div>
                <div className="mt-6">
                  <Link
                    to={featuredNews.slug}
                    className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-foreground hover:text-primary transition-colors duration-300"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </article>
          )}

          {/* Other Articles */}
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
                <h4 className="text-base md:text-lg font-medium mb-2 group-hover:text-primary transition-colors duration-300 cursor-pointer">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {item.excerpt}
                </p>
                {item.slug !== '#' && (
                  <Link
                    to={item.slug}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-foreground hover:text-primary transition-colors duration-300"
                  >
                    Read More
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
