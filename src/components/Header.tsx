import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
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
    { name: "Client Cases", href: "/case-studies" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300">
      <div className={cn("w-full bg-white border-b border-slate-200 transition-all duration-300", isScrolled && "shadow-sm")}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/">
              <div style={{ overflow: "hidden", height: "48px", width: "70px" }}>
                <img
                  src="/images/Potential Logo.jpeg"
                  alt="Elevate Digital"
                  style={{ width: "70px", marginTop: "-24px", display: "block", mixBlendMode: "multiply", filter: "brightness(1.06)" }}
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              <Link to="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                Home
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                  aria-expanded={servicesDropdownOpen}
                  aria-haspopup="true"
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setServicesDropdownOpen(!servicesDropdownOpen);
                    }
                    if (e.key === "Escape") setServicesDropdownOpen(false);
                  }}
                >
                  Services <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", servicesDropdownOpen && "rotate-180")} aria-hidden="true" />
                </button>

                <AnimatePresence>
                  {servicesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg p-2 origin-top mt-1"
                    >
                      {services.map((service) => (
                        <Link
                          key={service.id}
                          to={`/services/${service.slug}`}
                          className="block px-4 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
                  className="text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button href="/free-ai-audit" size="sm">
                Get Free Audit
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="md:hidden bg-white border-b border-slate-200 shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              <Link to="/" className="text-base font-medium text-slate-900 px-4 py-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">Home</Link>
              <div className="flex flex-col">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 pt-2 pb-1">Services</p>
                <div className="pl-4 flex flex-col border-l-2 border-blue-100 ml-6 mt-1">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      to={`/services/${service.slug}`}
                      className="text-sm text-slate-600 px-4 py-2.5 hover:text-blue-600 transition-colors"
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
                  className="text-base font-medium text-slate-900 px-4 py-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 mt-1 border-t border-slate-100">
                <Button href="/free-ai-audit" className="w-full justify-center">
                  Get Free Audit
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
