import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const newsItems = [
  {
    date: 'December 2024',
    category: 'Announcement',
    title: 'Filmology Labs Announces Groundbreaking Ceremony for 2026',
    excerpt: 'The highly anticipated production campus in Paterson\'s historic mill district is set to break ground in early 2026, marking a transformative new chapter for New Jersey\'s film and television industry. This landmark development will bring world-class production facilities to the heart of Paterson\'s Great Falls district, creating hundreds of jobs and establishing the region as a premier destination for filmmakers and content creators.',
    featured: true,
    slug: '/news/groundbreaking-2026',
  },
  {
    date: 'November 2024',
    category: 'Partnership',
    title: 'Strategic Partnership with VERZA TV',
    excerpt: 'Filmology Labs partners with VERZA TV to create dedicated production facilities for short-form vertical content.',
    featured: false,
    slug: '#',
  },
  {
    date: 'October 2024',
    category: 'Community',
    title: 'Paterson Film District Vision Unveiled',
    excerpt: 'Community leaders and stakeholders gather to celebrate the vision for transforming Paterson into a premier film destination.',
    featured: false,
    slug: '#',
  },
  {
    date: 'September 2024',
    category: 'Industry',
    title: 'New Jersey Film Tax Credit Program Expansion',
    excerpt: 'Recent legislation strengthens incentives for productions choosing New Jersey as their home base.',
    featured: false,
    slug: '#',
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
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Featured Article */}
          {featuredNews && (
            <article className="group lg:row-span-2">
              <div className="h-full steel-gradient-card rounded-lg p-8 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs uppercase tracking-wider text-primary font-medium">
                    {featuredNews.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{featuredNews.date}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-light leading-tight mb-6 group-hover:text-primary transition-colors duration-300">
                  {featuredNews.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                  {featuredNews.excerpt}
                </p>
                <Link
                  to={featuredNews.slug}
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-foreground hover:text-primary transition-colors duration-300"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </article>
          )}

          {/* Other Articles */}
          <div className="space-y-6">
            {otherNews.map((item, index) => (
              <article
                key={index}
                className="group border-b border-border/50 pb-6 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xs uppercase tracking-wider text-primary font-medium">
                    {item.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
                <h4 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors duration-300 cursor-pointer">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
