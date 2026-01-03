import logoBlack from '@/assets/filmology-logo-black.png';
import logoWhite from '@/assets/filmology-logo-white.png';

interface FooterProps {
  isDark: boolean;
}

const Footer = ({ isDark }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 md:py-16 bg-background border-t border-border">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 md:gap-6">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={isDark ? logoWhite : logoBlack}
              alt="Filmology Labs Content Creation Studios"
              className="h-8 sm:h-10 md:h-16 w-auto"
            />
          </div>

          {/* Credits */}
          <div className="text-center md:text-right">
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
        <div className="mt-6 md:mt-8 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-center md:text-left">
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