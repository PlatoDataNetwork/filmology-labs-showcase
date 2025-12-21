import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Moon, Sun } from 'lucide-react';

interface NavigationProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Navigation = ({ isDark, toggleTheme }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#vision', label: 'Vision' },
    { href: '#studios', label: 'Studios' },
    { href: '#heritage', label: 'Heritage' },
    { href: '#location', label: 'Location' },
    { href: '#leadership', label: 'Leadership' },
  ];

  const scrollToSection = (href: string) => {
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
        <nav className="container-wide flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex flex-col items-start leading-none"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="text-lg md:text-xl font-bold tracking-tight text-foreground">
              FILMOLOGY LABS
            </span>
            <span className="text-[8px] md:text-[10px] font-medium tracking-[0.25em] text-foreground/80 mt-0.5">
              CONTENT CREATION STUDIOS
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-accent transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Button
              variant="hero"
              size="sm"
              className="hidden md:flex"
              onClick={() => scrollToSection('#contact')}
            >
              Inquire
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-accent transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-500 ease-apple md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className={`text-2xl font-medium text-foreground hover:text-muted-foreground transition-all duration-300 ${
                isMobileMenuOpen ? 'animate-fade-in-up' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {link.label}
            </button>
          ))}
          <Button
            variant="hero"
            size="lg"
            onClick={() => scrollToSection('#contact')}
            className="mt-4"
          >
            Inquire
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
