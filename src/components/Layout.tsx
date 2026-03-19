import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { trackPageView, useScrollDepth, useTimeOnPage } from "@/lib/analytics";
import { MessageSquare } from "lucide-react";

export function Layout() {
  const { pathname } = useLocation();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track page views and analytics
  useScrollDepth();
  useTimeOnPage();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const path = pathname === "/" ? "Home" : pathname.split("/")[1].replace("-", " ");
    const title = path.charAt(0).toUpperCase() + path.slice(1);
    document.title = `${title} | Elevate Digital`;

    // Track page view in Google Analytics
    trackPageView(pathname, document.title);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-accent/30 selection:text-text-heading">
      <div className="bg-noise" />
      <div className="bg-mesh" />
      
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-[2px] bg-accent z-[100] transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <Header />
      <AnimatePresence mode="wait">
        <motion.main 
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex-grow pt-16 pb-16"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      {/* Floating Chat Bubble — visual hook */}
      <div
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg cursor-default select-none"
        role="complementary"
        aria-label="Quick Business AI Audit"
      >
        <div className="shrink-0 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
          <MessageSquare className="h-4 w-4 text-white" aria-hidden="true" />
        </div>
        <span className="text-sm font-semibold leading-tight hidden sm:inline">Quick Business AI Audit</span>
        <span className="absolute -top-1 -right-1 flex h-3 w-3" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
        </span>
      </div>
    </div>
  );
}

export function LeadMagnetLayout() {
  const { pathname } = useLocation();

  // Track page views and analytics
  useScrollDepth();
  useTimeOnPage();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const path = pathname.split("/")[1].replace(/-/g, " ");
    const title = path.charAt(0).toUpperCase() + path.slice(1);
    document.title = `${title} | Elevate Digital`;

    // Track page view in Google Analytics
    trackPageView(pathname, document.title);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-accent/30 selection:text-text-heading">
      <div className="bg-noise" />
      <div className="bg-mesh" />
      
      <AnimatePresence mode="wait">
        <motion.main 
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-grow"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
