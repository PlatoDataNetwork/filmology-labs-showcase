import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const INVESTOR_PASSWORD = 'FILMOLOGY123@';

const InvestorLogin = () => {
  const [isDark, setIsDark] = useState(true);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    document.documentElement.classList.add('dark');
    window.scrollTo(0, 0);
    
    // Check if already authenticated
    const isAuthenticated = sessionStorage.getItem('investorAuth');
    if (isAuthenticated === 'true') {
      navigate('/investor-portal');
    }
  }, [navigate]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (password === INVESTOR_PASSWORD) {
        sessionStorage.setItem('investorAuth', 'true');
        toast({
          title: 'Welcome',
          description: 'Access granted to investor portal.',
        });
        navigate('/investor-portal');
      } else {
        toast({
          title: 'Access Denied',
          description: 'Invalid password. Please try again.',
          variant: 'destructive',
        });
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />
      
      <main className="pt-24 md:pt-32 pb-24">
        <div className="container-narrow">
          <a 
            href="/#investors" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wider">Back</span>
          </a>

          <div className="max-w-md mx-auto">
            <div className="steel-gradient-card rounded-lg p-8 md:p-10">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-8">
                <Lock className="w-8 h-8 text-primary" />
              </div>

              <h1 className="text-2xl md:text-3xl font-light text-center mb-4">
                Investor Portal
              </h1>
              
              <p className="text-muted-foreground text-center mb-8">
                Enter your password to access exclusive investment materials and documentation.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-12 h-12 bg-background/50 border-border"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !password}
                  className="w-full h-12 text-sm uppercase tracking-wider"
                >
                  {isLoading ? 'Verifying...' : 'Access Portal'}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-8">
                For investor inquiries, please contact us at{' '}
                <a href="mailto:investors@filmologylabs.com" className="text-primary hover:underline">
                  investors@filmologylabs.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InvestorLogin;
