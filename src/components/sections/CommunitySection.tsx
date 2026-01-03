import { Users, GraduationCap, Heart, Film, Music, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactFormModal from '@/components/ContactFormModal';
import productionCompanies from '@/assets/production-companies.jpg';
import independentFilmmakers from '@/assets/independent-filmmakers.jpg';
import contentCreators from '@/assets/content-creators.jpg';
import artistsMusicians from '@/assets/artists-musicians.jpg';

const CommunitySection = () => {
  const communityMembers = [
    {
      title: 'Production Companies',
      description: 'From major studios to boutique production houses, our facilities support projects of every scale with world-class infrastructure.',
      icon: Film,
      image: productionCompanies,
    },
    {
      title: 'Independent Filmmakers',
      description: 'Access to professional-grade stages and equipment that level the playing field for visionary independent storytellers.',
      icon: Users,
      image: independentFilmmakers,
    },
    {
      title: 'Content Creators',
      description: 'Purpose-built spaces for the next generation of digital creators pushing the boundaries of short-form and streaming content.',
      icon: Palette,
      image: contentCreators,
    },
    {
      title: 'Artists & Musicians',
      description: 'Creative spaces designed for music video production, live performance capture, and immersive visual experiences.',
      icon: Music,
      image: artistsMusicians,
    },
  ];

  const initiatives = [
    {
      title: 'Artist Support Programs',
      description: 'Mentorship, networking events, and professional development opportunities connecting emerging talent with industry veterans.',
      icon: Heart,
    },
    {
      title: 'Grants & Scholarships',
      description: 'Financial support for underrepresented voices and emerging creators through our foundation partnerships.',
      icon: GraduationCap,
    },
  ];

  return (
    <section id="community" className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-16">
          <div className="max-w-2xl">
            <p className="label-editorial mb-3 md:mb-4">The Community</p>
            <h2 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl whitespace-nowrap">
              Where Creators Come Together
            </h2>
            <p className="text-body-large">
              Filmology Labs is more than a studio—it's a thriving ecosystem where 
              production companies, independent filmmakers, content creators, and artists 
              converge to collaborate, innovate, and elevate the art of storytelling in our 
              20,000 square-foot creative office environment.
            </p>
          </div>
          <div className="flex-shrink-0">
            <ContactFormModal
              trigger={
                <Button variant="hero" size="lg">
                  Inquire Now
                </Button>
              }
            />
          </div>
        </div>

        {/* Community Members Grid with Images */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-6 mb-12 md:mb-20">
          {communityMembers.map((member, index) => (
            <div 
              key={index} 
              className="steel-gradient-card rounded-lg overflow-hidden h-full flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5 md:p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <member.icon className="w-5 h-5 text-foreground" />
                  <h3 className="text-base md:text-lg font-medium">{member.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Initiatives Section */}
        <div className="border-t border-border pt-10 md:pt-16">
          <div className="max-w-2xl mb-8 md:mb-12">
            <p className="label-editorial mb-3 md:mb-4">Community Initiatives</p>
            <h2 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl whitespace-nowrap">
              Investing in Tomorrow's Storytellers
            </h2>
            <p className="text-body-large">
              Our commitment extends beyond providing world-class facilities. Through 
              strategic partnerships and dedicated programs, we're building pathways 
              for diverse voices to access the resources they need to succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
            {initiatives.map((initiative, index) => (
              <div 
                key={index} 
                className="steel-gradient-card rounded-lg p-6 md:p-8 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent">
                    <initiative.icon className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                  </div>
                  <h3 className="text-lg md:text-xl font-medium">{initiative.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {initiative.description}
                </p>
              </div>
            ))}
          </div>

          {/* Grant Application CTA */}
          <div className="text-center">
            <ContactFormModal
              trigger={
                <Button variant="hero" size="lg">
                  Apply Now
                </Button>
              }
            />
            <p className="text-sm text-muted-foreground mt-4">
              Applications are reviewed on a rolling basis. Priority given to underrepresented creators.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
