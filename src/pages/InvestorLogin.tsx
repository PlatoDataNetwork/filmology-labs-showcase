import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/hooks/use-theme';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

// Validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address").max(255),
  password: z.string().min(1, "Password is required").max(128),
});

const InvestorLogin = () => {
  const { isDark, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if already authenticated via server
    const checkAuth = async () => {
      const token = localStorage.getItem('investorToken');
      if (token) {
        try {
          const { data } = await supabase.functions.invoke('investor-auth', {
            body: { action: 'verify', token },
          });
          if (data?.valid) {
            navigate('/investor-portal');
          } else {
            localStorage.removeItem('investorToken');
          }
        } catch (error) {
          localStorage.removeItem('investorToken');
        }
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Client-side validation
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0] === 'email') fieldErrors.email = err.message;
        if (err.path[0] === 'password') fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('investor-auth', {
        body: { 
          action: 'login',
          email: email.toLowerCase().trim(),
          password,
        },
      });

      if (error || !data?.success) {
        toast({
          title: 'Access Denied',
          description: data?.error || 'Invalid email or password. Please try again.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      // Store token securely
      localStorage.setItem('investorToken', data.token);
      
      toast({
        title: 'Welcome',
        description: 'Access granted to investor portal.',
      });
      navigate('/investor-portal');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Unable to connect. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
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
                Enter your credentials to access exclusive investment materials and documentation.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-background/50 border-border"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-12 h-12 bg-background/50 border-border"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  {errors.password && (
                    <p className="text-sm text-destructive mt-1">{errors.password}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !email || !password}
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

      <Footer isDark={isDark} />
    </div>
  );
};

export default InvestorLogin;