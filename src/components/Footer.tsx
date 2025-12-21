const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 md:py-16 bg-background border-t border-border">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold tracking-tight mb-1">
              FILMOLOGY LABS
            </p>
            <p className="text-sm text-muted-foreground">
              Content Creation Studios
            </p>
          </div>

          {/* Credits */}
          <div className="text-center md:text-right">
            <p className="text-xs text-muted-foreground">
              A Brainchild of E! Entertainment Television
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Architecture by Architectura
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
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
