import { useTheme } from '@/hooks/use-theme';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const allArticles = [
  {
    date: 'December 2025',
    category: 'Filmology Announcement',
    title: 'Filmology Labs Announces Groundbreaking Ceremony for 2026',
    excerpt: 'The highly anticipated production campus in Paterson\'s historic mill district is set to break ground in early 2026, marking a transformative new chapter for New Jersey\'s film and television industry.',
    slug: '/news/groundbreaking-2026',
  },
  {
    date: 'October 2025',
    category: 'Partnership',
    title: 'E! Channel Founder to Launch the First U.S. Platform for Microdramas',
    excerpt: 'The founder of E! Entertainment Television, Alan Mruvka, is set to launch the first-ever U.S. platform for microdramas with Verza TV.',
    slug: '/news/verza-tv-microdramas',
  },
  {
    date: 'December 2025',
    category: 'Community',
    title: 'Paterson Film District Vision Unveiled',
    excerpt: 'Community leaders and stakeholders gather to celebrate the vision for transforming Paterson into a premier film destination.',
    slug: '/news/paterson-film-district',
  },
  {
    date: 'December 2025',
    category: 'Industry',
    title: 'New Jersey Film Tax Credit Program Expansion',
    excerpt: 'Recent legislation strengthens incentives for productions choosing New Jersey as their home base.',
    slug: '/news/nj-tax-credit-expansion',
  },
];

const News = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />
      <main className="pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="container-wide">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-12 md:mb-16">
            <p className="label-editorial mb-4">News & Updates</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight">All Articles</h1>
          </div>

          {/* 3-column card grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allArticles.map((article, index) => (
              <Link
                key={index}
                to={article.slug}
                className="group"
              >
                <article className="steel-gradient-card rounded-lg p-6 md:p-8 h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs uppercase tracking-wider text-primary font-medium">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{article.date}</span>
                  </div>
                  <h2 className="text-lg md:text-xl font-medium leading-tight mb-4 group-hover:text-primary transition-colors duration-300">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow mb-6">
                    {article.excerpt}
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-foreground group-hover:text-primary transition-colors duration-300">
                    Read More
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer isDark={isDark} />
    </div>
  );
};

export default News;
