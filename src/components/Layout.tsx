import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Layout() {
  const { pathname } = useLocation();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const path = pathname === "/" ? "Home" : pathname.split("/")[1].replace("-", " ");
    const title = path.charAt(0).toUpperCase() + path.slice(1);
    document.title = `${title} | Elevate Digital`;
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
          className="flex-grow pt-32 pb-16"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export function LeadMagnetLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const path = pathname.split("/")[1].replace(/-/g, " ");
    const title = path.charAt(0).toUpperCase() + path.slice(1);
    document.title = `${title} | Elevate Digital`;
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
