import { Link } from 'react-router-dom';
import logoBlack from '@/assets/filmology-logo-black.png';
import logoWhite from '@/assets/filmology-logo-white.png';

interface FooterProps {
  isDark: boolean;
}

const Footer = ({ isDark }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: '#vision', label: 'Vision' },
    { href: '#studios', label: 'Studios' },
    { href: '#community', label: 'Community' },
    { href: '#initiatives', label: 'Initiatives' },
    { href: '#location', label: 'Location' },
    { href: '#leadership', label: 'Leadership' },
    { href: '#news', label: 'News' },
    { href: '#investors', label: 'Partners' },
    { href: '/merch', label: 'Merch', isRoute: true },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    window.history.pushState(null, '', href);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-10 md:py-16 bg-background border-t border-border">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-6">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={isDark ? logoWhite : logoBlack}
              alt="Filmology Labs Content Creation Studios"
              className="h-8 sm:h-10 md:h-16 w-auto"
            />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-3 md:gap-x-8">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {link.label}
                </a>
              )
            ))}
          </nav>

          {/* Credits */}
          <div className="text-left md:text-right">
            <p className="text-xs text-muted-foreground">
              A Brainchild of E! Entertainment Television
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Architecture by{' '}
              <a 
                href="https://www.architectura.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline-offset-2 hover:underline"
              >
                Architectura
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-center md:text-left">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Filmology Labs. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            61 State Street, Paterson, New Jersey 07514
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
