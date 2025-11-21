

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'sonner';
import ScrollToTop from "./components/ScrollToTop";
import SEO from "./components/SEO";
import Breadcrumbs from "./components/Breadcrumbs";

import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import Portfolio from "./pages/Portfolio";
import Reviews from "./pages/Reviews";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import PCSelection from "./pages/PCSelection";

import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AboutPage from "./pages/AboutPage";
import WarrantyPage from "./pages/WarrantyPage";
import DeliveryPage from "./pages/DeliveryPage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      <ScrollToTop />
      <SEO />
      <Breadcrumbs />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pc-selection" element={<PCSelection />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />

          <Route path="/page/:slug" element={<AboutPage />} />
          <Route path="/warranty" element={<WarrantyPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  </QueryClientProvider>
);

export default App;