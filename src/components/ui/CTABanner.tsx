import { Button } from "./Button";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export function CTABanner() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      {/* Background decoration (removed glows — not needed on light bg) */}
      <div className="absolute inset-0 pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight">
            Your business has a next level.<br />
            <span className="text-blue-600">We'll show you exactly how to reach it.</span>
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Most business owners are running at a fraction of their potential — handling calls, admin, and follow-ups manually while their AI-powered competitors scale effortlessly. One free call is all it takes to see where you stand.
          </p>

          {/* Trust bullets */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mb-10">
            {[
              "Free 30-min strategy call",
              "No commitment, no pressure",
              "Real ROI numbers before you spend a dollar",
            ].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="https://cal.com/tal-shani-i0wamv/elevate-digital" size="lg" icon>
              Book a Strategy Call
            </Button>
            <Button href="/free-ai-audit" variant="secondary" size="lg">
              Get Free AI Analysis
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
