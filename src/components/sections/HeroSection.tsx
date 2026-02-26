import { useLocation } from 'react-router-dom';
import heroVideo from '@/assets/hero-video.mp4';

interface HeroSectionProps {
  isDark: boolean;
}

const HeroSection = ({ isDark }: HeroSectionProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Layout - Stacked */}
      <section className="md:hidden flex flex-col">
        <div className="w-full h-[50vh]">
          <video
            key={location.key}
            src={heroVideo}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="bg-background py-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl font-medium leading-[1.15] text-foreground animate-fade-in-delay-2">
              The World's Largest<br />
              Content Creation Studio Campus
            </h1>
          </div>
        </div>
      </section>

      {/* Desktop Layout */}
      <section className="hidden md:flex relative flex-row items-end min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <video
            key={location.key}
            src={heroVideo}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-background/10 to-transparent dark:from-background dark:via-background/20" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 backdrop-blur-[1px] bg-background/5 dark:bg-background/10 z-[5] py-16" />

        <div className="container-wide relative z-10 pb-6 absolute bottom-0 left-0 right-0">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-4xl lg:text-5xl font-medium leading-[1.15] text-foreground mb-8 animate-fade-in-delay-2">
              The World's Largest<br />
              Content Creation Studio Campus
            </h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
