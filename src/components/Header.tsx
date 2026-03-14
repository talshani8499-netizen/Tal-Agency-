import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Zap } from "lucide-react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { services } from "@/data/services";
import { motion, AnimatePresence } from "motion/react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 px-4 sm:px-6 lg:px-8 pt-6 transition-all duration-500">
      <div 
        className={cn(
          "max-w-7xl mx-auto transition-all duration-500",
          isScrolled ? "glass-nav rounded-2xl py-3 px-6" : "bg-transparent py-4 px-2"
        )}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="glass-panel p-2 rounded-xl group-hover:border-accent transition-colors">
              <Zap className="h-5 w-5 text-accent" />
            </div>
            <span className="font-serif font-medium text-xl tracking-wide text-text-heading">
              Nexus<span className="text-accent italic">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-text-body hover:text-accent transition-colors">
              Home
            </Link>
            
            {/* Services Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button 
                className="flex items-center gap-1 text-sm font-medium text-text-body hover:text-accent transition-colors py-2"
              >
                Services <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", servicesDropdownOpen && "rotate-180")} />
              </button>
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-64 glass-panel p-2 origin-top mt-2"
                  >
                    <Link to="/services" className="block px-4 py-2 text-sm font-medium text-text-heading hover:bg-white/5 rounded-xl mb-1 transition-colors">
                      View All Services
                    </Link>
                    <div className="h-px bg-white/10 my-1 mx-2" />
                    {services.map((service) => (
                      <Link 
                        key={service.id} 
                        to={`/services/${service.slug}`}
                        className="block px-4 py-2 text-sm text-text-body hover:text-accent hover:bg-white/5 rounded-xl transition-colors"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                className="text-sm font-medium text-text-body hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button href="/free-ai-audit" variant="secondary" size="sm">
              Get Free Audit
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-text-body hover:text-accent transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav - Glass Bottom Sheet Style */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-4 right-4 mt-4 glass-panel p-4 flex flex-col gap-2"
          >
            <Link to="/" className="text-base font-medium text-text-heading p-3 hover:bg-white/5 rounded-xl transition-colors">Home</Link>
            <div className="flex flex-col">
              <Link to="/services" className="text-base font-medium text-text-heading p-3 hover:bg-white/5 rounded-xl transition-colors">Services</Link>
              <div className="pl-4 flex flex-col border-l border-white/10 ml-4 mt-1">
                {services.map((service) => (
                  <Link 
                    key={service.id} 
                    to={`/services/${service.slug}`}
                    className="text-sm text-text-body p-3 hover:text-accent transition-colors"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
            {navLinks.slice(1).map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                className="text-base font-medium text-text-heading p-3 hover:bg-white/5 rounded-xl transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-white/10">
              <Button href="/free-ai-audit" variant="primary" className="w-full">
                Get Free Audit
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
