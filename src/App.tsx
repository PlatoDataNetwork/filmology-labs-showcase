import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import GroundbreakingArticle from "./pages/GroundbreakingArticle";
import VerzaTVArticle from "./pages/VerzaTVArticle";
import PatersonFilmDistrictArticle from "./pages/PatersonFilmDistrictArticle";
import TaxCreditArticle from "./pages/TaxCreditArticle";
import VarietyArticle from "./pages/VarietyArticle";
import TapIntoArticle from "./pages/TapIntoArticle";
import News12Article from "./pages/News12Article";
import PartnerLogin from "./pages/PartnerLogin";
import PartnerPortal from "./pages/PartnerPortal";
import Merch from "./pages/Merch";
import ProductDetail from "./pages/ProductDetail";
import Concierge from "./pages/Concierge";
import News from "./pages/News";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import SplashScreen from "./components/SplashScreen";

const queryClient = new QueryClient();

// Component to handle initial redirect to home on fresh load
const InitialRedirect = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if this is a fresh page load (not navigation within app)
    const isInitialLoad = !sessionStorage.getItem('appLoaded');
    
    if (isInitialLoad) {
      sessionStorage.setItem('appLoaded', 'true');
      
      // On fresh load, always redirect to clean home page (no hash fragments)
      // Exception: allow partner portal if authenticated
      if (location.pathname === '/partner-portal') {
        const hasToken = localStorage.getItem('partnerToken');
        if (!hasToken) {
          navigate('/', { replace: true });
        }
      } else if (location.pathname === '/' && location.hash) {
        // Clear any hash fragments on fresh load to home
        navigate('/', { replace: true });
      }
    }
  }, []);

  return <>{children}</>;
};

const App = () => {
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('splashShown');
  });

  const handleSplashComplete = () => {
    sessionStorage.setItem('splashShown', 'true');
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <InitialRedirect>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/news/groundbreaking-2026" element={<GroundbreakingArticle />} />
              <Route path="/news/verza-tv-microdramas" element={<VerzaTVArticle />} />
              <Route path="/news/paterson-film-district" element={<PatersonFilmDistrictArticle />} />
              <Route path="/news/nj-tax-credit-expansion" element={<TaxCreditArticle />} />
              <Route path="/news/variety-filmology-labs" element={<VarietyArticle />} />
              <Route path="/news/tapinto-paterson-reaction" element={<TapIntoArticle />} />
              <Route path="/news/news12-silk-city-to-studio-city" element={<News12Article />} />
              <Route path="/partner-login" element={<PartnerLogin />} />
              <Route path="/partner-portal" element={<PartnerPortal />} />
              <Route path="/merch" element={<Merch />} />
              <Route path="/product/:handle" element={<ProductDetail />} />
              <Route path="/concierge" element={<Concierge />} />
              <Route path="/news" element={<News />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </InitialRedirect>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
