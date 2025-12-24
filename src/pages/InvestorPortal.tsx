import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  TrendingUp, 
  Calendar, 
  Building2,
  DollarSign,
  MapPin,
  Users,
  LogOut,
  Loader2
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const documents = [
  {
    title: 'Executive Summary',
    description: 'Overview of the Filmology Labs development and investment opportunity.',
    type: 'PDF',
    size: '2.4 MB',
  },
  {
    title: 'Financial Projections',
    description: 'Detailed 10-year financial model with revenue and expense forecasts.',
    type: 'PDF',
    size: '4.1 MB',
  },
  {
    title: 'Market Analysis',
    description: 'Comprehensive analysis of the Northeast production facility market.',
    type: 'PDF',
    size: '3.2 MB',
  },
  {
    title: 'Development Timeline',
    description: 'Phase-by-phase construction and launch schedule.',
    type: 'PDF',
    size: '1.8 MB',
  },
];

const keyMetrics = [
  { icon: Building2, label: 'Total Square Footage', value: '143,875 SQ FT' },
  { icon: DollarSign, label: 'Total Investment', value: 'Contact for Details' },
  { icon: MapPin, label: 'Location', value: 'Paterson, NJ' },
  { icon: Users, label: 'Jobs Created', value: '500+' },
];

const milestones = [
  { date: 'Q1 2026', title: 'Groundbreaking Ceremony', status: 'upcoming' },
  { date: 'Q4 2026', title: 'Phase 1 Construction Complete', status: 'upcoming' },
  { date: 'Q2 2027', title: 'First Productions Begin', status: 'upcoming' },
  { date: 'Q4 2027', title: 'Full Campus Operational', status: 'upcoming' },
];

interface InvestorUser {
  email: string;
  name?: string;
  company?: string;
}

const InvestorPortal = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<InvestorUser | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Verify authentication with server
    const verifyAuth = async () => {
      const token = localStorage.getItem('investorToken');
      
      if (!token) {
        navigate('/investor-login');
        return;
      }
      
      try {
        const { data, error } = await supabase.functions.invoke('investor-auth', {
          body: { action: 'verify', token },
        });
        
        if (error || !data?.valid) {
          localStorage.removeItem('investorToken');
          navigate('/investor-login');
          return;
        }
        
        setUser(data.user);
        setIsLoading(false);
      } catch (error) {
        localStorage.removeItem('investorToken');
        navigate('/investor-login');
      }
    };
    
    verifyAuth();
  }, [navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem('investorToken');
    
    try {
      await supabase.functions.invoke('investor-auth', {
        body: { action: 'logout', token },
      });
    } catch (error) {
      // Continue with logout even if server call fails
    }
    
    localStorage.removeItem('investorToken');
    toast({
      title: 'Signed out',
      description: 'You have been signed out successfully.',
    });
    navigate('/investor-login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />
      
      <main className="pt-24 md:pt-32 pb-24">
        <div className="container-wide">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <a 
                href="/#investors" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm uppercase tracking-wider">Back to Site</span>
              </a>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light">
                Investor Portal
              </h1>
              {user?.name && (
                <p className="text-muted-foreground mt-2">Welcome, {user.name}</p>
              )}
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="mt-4 md:mt-0 gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {keyMetrics.map((metric, index) => (
              <div 
                key={index}
                className="steel-gradient-card rounded-lg p-6"
              >
                <metric.icon className="w-6 h-6 text-primary mb-4" />
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  {metric.label}
                </p>
                <p className="text-lg font-medium">{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Documents Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-medium">Investment Documents</h2>
              </div>
              
              <div className="space-y-4">
                {documents.map((doc, index) => (
                  <div 
                    key={index}
                    className="steel-gradient-card rounded-lg p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  >
                    <div>
                      <h3 className="font-medium mb-1">{doc.title}</h3>
                      <p className="text-sm text-muted-foreground">{doc.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {doc.type} • {doc.size}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2 flex-shrink-0">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground mt-6">
                * Documents are for illustrative purposes. Contact us for actual investment materials.
              </p>
            </div>

            {/* Timeline Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-medium">Development Timeline</h2>
              </div>
              
              <div className="steel-gradient-card rounded-lg p-6">
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        {index < milestones.length - 1 && (
                          <div className="w-px h-full bg-border mt-2" />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className="text-xs uppercase tracking-wider text-primary font-medium mb-1">
                          {milestone.date}
                        </p>
                        <p className="font-medium">{milestone.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investment Highlights */}
              <div className="mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-medium">Investment Highlights</h2>
                </div>
                
                <div className="steel-gradient-card rounded-lg p-6">
                  <ul className="space-y-4 text-sm">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>Strategic location 20 miles from Manhattan</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>Up to 35% NJ film tax credits available</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>Historic adaptive reuse with modern infrastructure</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>Experienced leadership team with proven track record</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 steel-gradient-card rounded-lg p-8 text-center">
            <h3 className="text-xl font-medium mb-4">Interested in Learning More?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              For detailed investment information, due diligence materials, or to schedule 
              a presentation with our team, please reach out directly.
            </p>
            <a 
              href="mailto:investors@filmologylabs.com"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors duration-300"
            >
              <span className="text-sm uppercase tracking-wider font-medium">Contact Investment Team</span>
            </a>
          </div>
        </div>
      </main>

      <Footer isDark={isDark} />
    </div>
  );
};

export default InvestorPortal;