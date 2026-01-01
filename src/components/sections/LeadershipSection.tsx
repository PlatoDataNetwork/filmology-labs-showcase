import alanMruvka from '@/assets/alan-mruvka-new.png';

const LeadershipSection = () => {
  return (
    <section id="leadership" className="section-padding bg-background">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-20 items-stretch">
          {/* Image */}
          <div className="overflow-hidden rounded-lg h-full">
            <img
              src={alanMruvka}
              alt="Alan Mruvka, Co-Founder of E! Entertainment Television"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Content */}
          <div>
            <p className="label-editorial mb-4">Leadership</p>
            <h2 className="mb-6">
              Alan Mruvka
            </h2>
            <p className="text-body-large mb-6">
              The visionary who revolutionized entertainment and celebrity-based television 
              as the Co-Founder of E! Entertainment Television—now an NBC/Comcast company 
              valued at over $15 billion.
            </p>

            <div className="space-y-6 text-muted-foreground leading-relaxed text-body-large">
              <p>
                Alan Mruvka is an American entertainment and media entrepreneur whose 
                most distinguished success is in revolutionizing a genre of entertainment 
                and celebrity-based television as the creator of the pop culture icon 
                E! Entertainment Television.
              </p>
              <p>
                He recently announced VERZA TV, the first U.S.-based mobile app dedicated 
                primarily to vertical micro-dramas. The platform debuted with an unprecedented 
                80 original titles, immediately positioning VERZA TV as the new leader in 
                short-form, premium storytelling.
              </p>
              <p>
                As Founder, President and CEO of The Alan Mruvka Company, he brings decades 
                of experience in real estate development with a focus on creating destination 
                projects and urban redevelopment.
              </p>
            </div>

            {/* Credentials */}
            <div className="mt-8 md:mt-10 grid grid-cols-2 gap-4 md:gap-6">
              <div className="steel-gradient-card rounded-lg p-3 md:p-4">
                <p className="text-xl md:text-2xl font-semibold text-foreground">$15B+</p>
                <p className="text-xs md:text-sm text-muted-foreground">E! Entertainment valuation</p>
              </div>
              <div className="steel-gradient-card rounded-lg p-3 md:p-4">
                <p className="text-xl md:text-2xl font-semibold text-foreground">80+</p>
                <p className="text-xs md:text-sm text-muted-foreground">VERZA TV original titles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
