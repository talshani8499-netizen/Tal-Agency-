import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, PlayCircle, FileText, Target } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export function EbookLanding() {
  return (
    <div className="min-h-screen py-12 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-50 mix-blend-overlay pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-accent font-medium text-xs tracking-widest uppercase mb-8">
              <FileText className="h-4 w-4" /> Free E-Book
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-text-heading tracking-tight mb-6 leading-[1.1]">
              The SMB Owner's Blueprint to <br className="hidden md:block" />
              <span className="italic text-accent">AI Automation</span>
            </h1>
            <p className="text-xl text-text-body max-w-2xl mx-auto leading-relaxed">
              Discover 5 proven ways AI can reclaim your time, boost profits, and transform your business operations. Download your copy now!
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-serif text-text-heading mb-8">Inside this guide, you'll learn:</h3>
            <ul className="space-y-6 mb-12">
              {[
                "How to eliminate 80% of manual data entry.",
                "The exact AI tools that replace expensive software subscriptions.",
                "How to set up a 24/7 AI voice agent that books appointments while you sleep.",
                "The 'Speed to Lead' automation that doubles conversion rates.",
                "A 30-day roadmap to implementing AI without technical skills."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <div className="mt-1 h-6 w-6 rounded-full glass-panel flex items-center justify-center shrink-0 text-accent group-hover:scale-110 transition-transform duration-300 border-accent/30">
                    <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                  </div>
                  <span className="text-lg text-text-body leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Card className="p-8 md:p-12 glass-panel relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <h3 className="text-2xl font-serif text-text-heading mb-2">Where should we send it?</h3>
                <p className="text-text-body mb-8">Enter your details below for instant access.</p>
                
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-medium text-text-heading mb-2">First Name</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-text-heading placeholder-white/30 focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all backdrop-blur-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-heading mb-2">Work Email</label>
                    <input type="email" required className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-text-heading placeholder-white/30 focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all backdrop-blur-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-heading mb-2">Business Name</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-text-heading placeholder-white/30 focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all backdrop-blur-sm" />
                  </div>
                  <Button type="submit" className="w-full mt-4" size="lg">
                    Download Free Guide Now
                  </Button>
                  <p className="text-xs text-text-muted text-center mt-6">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function AuditLanding() {
  return (
    <div className="min-h-screen py-12 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-50 mix-blend-overlay pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-accent font-medium text-xs tracking-widest uppercase mb-8">
            <Target className="h-4 w-4" /> Free Assessment
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-text-heading tracking-tight mb-6 leading-[1.1]">
            Unlock Your Business's <br className="hidden md:block" />
            <span className="italic text-accent">AI Potential</span>
          </h1>
          <p className="text-xl text-text-body mb-16 max-w-2xl mx-auto leading-relaxed">
            In just 2 minutes, discover personalized insights into how AI can save you money, capture more leads, and free up your valuable time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { step: 1, title: "Take the Quiz", desc: "Answer 5 quick questions about your current bottlenecks." },
            { step: 2, title: "Get Analyzed", desc: "Our system identifies your biggest automation opportunities." },
            { step: 3, title: "Receive Roadmap", desc: "Get a custom, actionable plan to implement AI immediately." }
          ].map((item, i) => (
            <motion.div 
              key={item.step} 
              className="glass-panel p-8 rounded-3xl relative overflow-hidden group hover:bg-white/5 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full glass-panel text-accent flex items-center justify-center text-xl font-serif mb-6 mx-auto border-accent/20 group-hover:scale-110 transition-transform duration-500">
                  {item.step}
                </div>
                <h3 className="text-xl font-serif text-text-heading mb-3">{item.title}</h3>
                <p className="text-text-body text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button size="lg" className="text-lg h-16 px-10" onClick={() => alert("Quiz modal would open here")}>
            Start Your Free Audit Now
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export function VoiceDemoLanding() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen py-12 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent opacity-50 mix-blend-overlay pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-text-heading tracking-tight mb-6 leading-[1.1]">
              Experience the Future of <br className="hidden md:block" />
              <span className="italic text-accent">Customer Service</span>
            </h1>
            <p className="text-xl text-text-body max-w-3xl mx-auto leading-relaxed">
              Call our demo line or listen to a simulation to hear how intelligent AI can handle calls, book appointments, and delight your customers 24/7.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Card className="p-8 md:p-16 glass-panel max-w-3xl mx-auto text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-serif text-text-heading mb-10">Call the Live Demo Agent</h2>
              
              <div className="inline-block glass-panel text-text-heading text-4xl md:text-5xl font-mono py-6 px-10 rounded-2xl tracking-widest mb-12 border-accent/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
                (800) 555-0199
              </div>

              <div className="flex items-center justify-center gap-6 mb-12 opacity-50">
                <div className="h-px bg-white/20 flex-grow max-w-[100px]" />
                <span className="text-text-muted font-sans text-xs uppercase tracking-widest">OR LISTEN TO A RECORDING</span>
                <div className="h-px bg-white/20 flex-grow max-w-[100px]" />
              </div>

              <div className="glass-panel rounded-2xl p-6 flex items-center gap-6 mb-12 hover:bg-white/5 transition-colors duration-500">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="h-16 w-16 rounded-full glass-panel text-accent flex items-center justify-center hover:scale-105 transition-all duration-300 shrink-0 border-accent/30"
                >
                  <PlayCircle className="h-8 w-8" strokeWidth={1.5} />
                </button>
                <div className="flex-grow text-left">
                  <p className="font-serif text-lg text-text-heading mb-2">HVAC Emergency Booking Demo</p>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full bg-accent transition-all duration-1000 ease-linear ${isPlaying ? 'w-full' : 'w-0'}`} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button href="/contact" size="lg">
                  Request a Custom Demo
                </Button>
                <Button href="/pricing" variant="secondary" size="lg">
                  View Pricing
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
