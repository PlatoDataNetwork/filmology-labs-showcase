import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Moon, Sun } from 'lucide-react';
import ContactFormModal from '@/components/ContactFormModal';
import logoBlack from '@/assets/thin-logo-black.png';
import logoWhite from '@/assets/thin-logo-white.png';

interface NavigationProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Navigation = ({ isDark, toggleTheme }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { href: string; label: string; isRoute?: boolean }[] = [
    { href: '#vision', label: 'Vision' },
    { href: '#studios', label: 'Studios' },
    { href: '#community', label: 'Community' },
    { href: '#amenities', label: 'Amenities' },
    { href: '#initiatives', label: 'Initiatives' },
    { href: '#location', label: 'Location' },
    { href: '#leadership', label: 'Leadership' },
    { href: '#news', label: 'News' },
    { href: '#investors', label: 'Partners' },
    { href: '/merch', label: 'Merch', isRoute: true },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isRoute?: boolean) => {
    if (isRoute) {
      setIsMobileMenuOpen(false);
      return;
    }
    e.preventDefault();
    
    // If not on homepage, navigate there first with the hash
    if (location.pathname !== '/') {
      navigate('/' + href);
      setIsMobileMenuOpen(false);
      return;
    }
    
    // Update URL hash for shareable links
    window.history.pushState(null, '', href);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] bg-background/95 backdrop-blur-xl border-b border-border`}
      >
        <nav className="container-wide flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center"
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname !== '/') {
                navigate('/');
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <img
              src={isDark ? logoWhite : logoBlack}
              alt="Filmology Labs Content Creation Studios"
              className="h-6 sm:h-8 md:h-11 w-auto"
            />
          </a>

          {/* Desktop Navigation - hidden on mobile and tablet */}
          <div className="hidden lg:flex items-center gap-3 lg:gap-5 xl:gap-8">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-xs lg:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-xs lg:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 whitespace-nowrap"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-accent transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            <ContactFormModal
              trigger={
                <Button variant="hero" size="sm" className="hidden lg:flex">
                  Inquire
                </Button>
              }
            />

            {/* Mobile/Tablet Menu Toggle - visible on mobile and tablet */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-accent transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile/Tablet Menu */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-500 ease-apple lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8">
          {navLinks.map((link, index) => (
            link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-xl sm:text-2xl font-medium text-foreground hover:text-muted-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? 'animate-fade-in-up' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-xl sm:text-2xl font-medium text-foreground hover:text-muted-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? 'animate-fade-in-up' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.label}
              </a>
            )
          ))}
          <ContactFormModal
            trigger={
              <Button variant="hero" size="lg" className="mt-4">
                Inquire
              </Button>
            }
            onOpenChange={(open) => !open && setIsMobileMenuOpen(false)}
          />
        </div>
      </div>
    </>
  );
};

export default Navigation;
