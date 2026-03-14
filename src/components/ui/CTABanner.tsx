import { Button } from "./Button";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export function CTABanner() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="glass-panel p-12 md:p-20 text-center relative overflow-hidden group"
        >
          {/* Abstract background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent/10 rounded-full blur-[80px] group-hover:bg-accent/15 transition-colors duration-700 pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-heading mb-6 tracking-tight text-balance">
              Ready to Find Your <span className="italic text-accent">Perfect Fit?</span>
            </h2>
            <p className="text-xl text-text-body mb-12 max-w-2xl mx-auto leading-relaxed">
              Stop letting inefficiencies drain your profits. Let's build a custom AI strategy that buys back your time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button href="/contact" size="lg" icon>
                Schedule Strategy Call
              </Button>
              <Button href="/guide-to-ai-automation" variant="secondary" size="lg">
                Get the Free AI Guide
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
