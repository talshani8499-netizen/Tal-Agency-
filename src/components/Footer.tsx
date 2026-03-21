import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <div style={{ overflow: "hidden", height: "48px", width: "70px" }}>
                <img
                  src="/images/Potential Logo.jpeg"
                  alt="Elevate Digital"
                  style={{ width: "70px", marginTop: "-24px", display: "block", filter: "brightness(0) invert(1)" }}
                />
              </div>
            </Link>
            <p className="text-sm text-slate-400 mb-6 max-w-xs">
              Built for contractors. We handle the calls. You handle the build.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Company</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/case-studies" className="hover:text-blue-400 transition-colors">Case Studies</Link></li>
              <li><Link to="/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link></li>
              <li><Link to="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Trades */}
          <div>
            <h3 className="text-white font-semibold mb-6">Trades</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/roofing" className="hover:text-blue-400 transition-colors">Roofers</Link></li>
              <li><Link to="/hvac" className="hover:text-blue-400 transition-colors">HVAC</Link></li>
              <li><Link to="/remodeling" className="hover:text-blue-400 transition-colors">Remodelers</Link></li>
              <li><Link to="/how-it-works" className="hover:text-blue-400 transition-colors">How It Works</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-6">Legal</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Elevate Digital. All rights reserved.</p>
          <p className="mt-2 md:mt-0">AI-Powered Contractor Infrastructure.</p>
        </div>
      </div>
    </footer>
  );
}
