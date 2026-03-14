import { SectionHeading, Card } from "@/components/ui/Card";
import { CTABanner } from "@/components/ui/CTABanner";
import { motion } from "motion/react";
import { Target, Shield, Zap, Users } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-50 mix-blend-overlay pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-accent font-medium text-xs tracking-widest uppercase mb-8">
              Our Mission
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-text-heading mb-8 leading-[1.1] tracking-tight text-balance max-w-4xl mx-auto">
              <span className="italic text-accent">Time Wealth</span> for SMBs.
            </h1>
            <p className="text-xl text-text-body max-w-3xl mx-auto leading-relaxed">
              We believe small business owners shouldn't have to choose between growing their company and having a life. We build the AI systems that make both possible.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif text-text-heading mb-8">The Nexus AI Story</h2>
              <div className="space-y-6 text-lg text-text-body leading-relaxed">
                <p>
                  Nexus AI was founded on a simple observation: enterprise companies were using AI to become hyper-efficient, while local SMBs were still drowning in manual tasks and missed calls.
                </p>
                <p>
                  We saw business owners working 80-hour weeks, acting as their own receptionists, data entry clerks, and marketers. We knew there was a better way.
                </p>
                <p>
                  Today, we act as the fractional Chief AI Officer for businesses across the US. We don't just sell software; we architect custom automation engines that run silently in the background, capturing leads, booking appointments, and saving thousands of hours.
                </p>
              </div>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
            >
              {[
                { icon: Target, title: "Results First", desc: "We only build what drives ROI." },
                { icon: Shield, title: "Radical Transparency", desc: "No hidden fees, no jargon." },
                { icon: Zap, title: "Speed to Value", desc: "Live in weeks, not months." },
                { icon: Users, title: "True Partners", desc: "We succeed when you scale." },
              ].map((val, i) => {
                const Icon = val.icon;
                return (
                  <Card key={i} className="p-8 glass-panel group hover:bg-white/5 transition-all duration-500">
                    <div className="h-12 w-12 rounded-full glass-panel text-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border-accent/20">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-serif text-text-heading mb-3">{val.title}</h3>
                    <p className="text-sm text-text-body leading-relaxed">{val.desc}</p>
                  </Card>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 mix-blend-overlay" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading 
            label="Leadership"
            title="Meet the Strategists" 
            subtitle="A team of AI engineers, automation experts, and business growth strategists."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
            {[
              { name: "Alex Mercer", role: "Founder & Lead Strategist", bg: "bg-white/5" },
              { name: "Sarah Chen", role: "Head of AI Engineering", bg: "bg-white/10" },
              { name: "Marcus Johnson", role: "Client Success Director", bg: "bg-white/5" },
            ].map((member, i) => (
              <motion.div 
                key={i} 
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={`w-48 h-48 mx-auto rounded-full ${member.bg} mb-8 shadow-inner border border-white/10 group-hover:border-accent/30 transition-colors duration-500 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="text-2xl font-serif text-text-heading mb-2">{member.name}</h3>
                <p className="text-accent font-sans text-sm tracking-widest uppercase">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
