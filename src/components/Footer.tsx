const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 md:py-16 bg-background border-t border-border">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start leading-none">
            <span className="text-lg md:text-xl font-bold tracking-[0.18em] text-foreground">
              FILMOLOGY LABS
            </span>
            <span className="text-[8px] md:text-[10px] font-medium tracking-[0.32em] text-foreground/80 mt-1">
              CONTENT CREATION STUDIOS
            </span>
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
