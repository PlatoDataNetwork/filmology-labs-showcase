import aerialView from '@/assets/aerial-view.jpg';

const HeritageSection = () => {
  const benefits = [
    {
      title: 'Environmental Benefits',
      description: 'Converting existing structures reduces construction waste, energy consumption, and carbon footprint. Old buildings with sturdy materials minimize the need for new resources.',
    },
    {
      title: 'Historical Preservation',
      description: 'Preserving historical facades while integrating modern interiors creates a unique charm—the juxtaposition of history and modernity defines our character.',
    },
    {
      title: 'Cost-Efficiency',
      description: 'Renovating existing structures with foundation and structural elements already in place saves time and money, enabling focused investment in production capabilities.',
    },
    {
      title: 'Community Impact',
      description: 'Revitalizing vacant spaces attracts businesses, creates jobs, and enhances neighborhood livability—contributing to the social fabric of Paterson.',
    },
  ];

  return (
    <section id="heritage" className="section-padding bg-background">
      <div className="container-wide">
        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Image */}
          <div className="order-2 lg:order-1">
            <div className="sticky top-24 space-y-6">
              <div className="aspect-[4/5] overflow-hidden rounded-lg">
                <img
                  src={aerialView}
                  alt="Aerial view of Filmology Labs historic mill complex"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Federal Opportunity Zone Badge */}
              <div className="p-6 bg-accent rounded-lg">
                <p className="label-editorial mb-2">Federal Opportunity Zone</p>
                <p className="text-sm text-muted-foreground">
                  Located in a designated Federal Opportunity Zone, offering significant 
                  investment incentives for qualified projects.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <p className="label-editorial mb-4">Industrial Heritage</p>
            <h2 className="mb-6">
              Reinhardt Mills: A Legacy Reimagined
            </h2>
            <p className="text-body-large mb-8">
              The buildings at 61 State Street are part of the historic Reinhardt Mills 
              complex, built around 1900–1920 as speculative factory space for Paterson's 
              booming silk industry—"Silk City."
            </p>
            <p className="text-muted-foreground mb-12 leading-relaxed">
              Featuring multi-story brick warehouses with high ceilings, freight elevators, 
              and industrial character, these designated historic structures represent 
              an extraordinary opportunity for adaptive reuse.
            </p>

            {/* Benefits */}
            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="border-l-2 border-border pl-6">
                  <h4 className="font-medium mb-2">{benefit.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeritageSection;
