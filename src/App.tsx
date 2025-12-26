import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GroundbreakingArticle from "./pages/GroundbreakingArticle";
import VerzaTVArticle from "./pages/VerzaTVArticle";
import PatersonFilmDistrictArticle from "./pages/PatersonFilmDistrictArticle";
import TaxCreditArticle from "./pages/TaxCreditArticle";
import PartnerLogin from "./pages/PartnerLogin";
import PartnerPortal from "./pages/PartnerPortal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/news/groundbreaking-2026" element={<GroundbreakingArticle />} />
          <Route path="/news/verza-tv-microdramas" element={<VerzaTVArticle />} />
          <Route path="/news/paterson-film-district" element={<PatersonFilmDistrictArticle />} />
          <Route path="/news/nj-tax-credit-expansion" element={<TaxCreditArticle />} />
          <Route path="/partner-login" element={<PartnerLogin />} />
          <Route path="/partner-portal" element={<PartnerPortal />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
