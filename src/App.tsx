import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout, LeadMagnetLayout } from "./components/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Pricing from "./pages/Pricing";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { EbookLanding, AuditLanding, VoiceDemoLanding } from "./pages/LeadMagnets";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-slate-50">
      <h1 className="text-6xl font-extrabold text-slate-900 mb-4">404</h1>
      <p className="text-xl text-slate-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
      <a href="/" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
        Go Back Home
      </a>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Main Layout Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Lead Magnet Layout Routes (Minimal Nav) */}
        <Route element={<LeadMagnetLayout />}>
          <Route path="/guide-to-ai-automation" element={<EbookLanding />} />
          <Route path="/free-ai-audit" element={<AuditLanding />} />
          <Route path="/ai-voice-demo" element={<VoiceDemoLanding />} />
        </Route>
      </Routes>
    </Router>
  );
}
