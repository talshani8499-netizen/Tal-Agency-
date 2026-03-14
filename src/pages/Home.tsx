import { Button } from "@/components/ui/Button";
import { Card, SectionHeading } from "@/components/ui/Card";
import { CTABanner } from "@/components/ui/CTABanner";
import { services } from "@/data/services";
import { caseStudies } from "@/data/caseStudies";
import { motion } from "motion/react";
import { PhoneCall, MessageSquare, LayoutTemplate, Workflow, ArrowRight, CheckCircle2, Star } from "lucide-react";

const iconMap = {
  PhoneCall,
  MessageSquare,
  LayoutTemplate,
  Workflow,
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Asymmetric Editorial */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-7 z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-accent font-medium text-xs tracking-widest uppercase mb-8">
                <span className="flex h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                AI Automation for US SMBs
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-text-heading mb-8 leading-[1.1] tracking-tight text-balance">
                Reclaim Your Time. <br/>
                <span className="italic text-accent">Automate</span> Your Growth.
              </h1>
              
              <p className="text-xl text-text-body mb-10 max-w-2xl leading-relaxed">
                Stop missing leads and drowning in admin work. We build intelligent AI systems that work 24/7, so you can focus on what actually matters.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <Button href="/free-ai-audit" size="lg" icon>
                  Get Your Free AI Audit
                </Button>
                <Button href="/contact" variant="ghost" size="lg" className="px-0 hover:bg-transparent">
                  Schedule Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 text-text-body text-sm font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" /> No Long-Term Contracts
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" /> Done-For-You Setup
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" /> Guaranteed ROI Focus
                </div>
              </div>
            </motion.div>

            {/* Right Abstract Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-5 relative hidden lg:block"
            >
              <div className="relative w-full aspect-[4/5] glass-panel p-8 flex flex-col justify-between overflow-hidden group">
                {/* Inner ambient glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 group-hover:bg-accent/20 transition-colors duration-700" />
                
                <div className="relative z-10">
                  <div className="text-xs font-bold tracking-widest text-accent uppercase mb-4">Live System Status</div>
                  <div className="space-y-4">
                    {[
                      { label: "Inbound Calls Handled", value: "2,405", trend: "+12%" },
                      { label: "Leads Qualified", value: "842", trend: "+28%" },
                      { label: "Hours Saved", value: "315", trend: "+45%" }
                    ].map((stat, i) => (
                      <div key={i} className="glass-panel p-4 flex justify-between items-center bg-white/5 border-white/5">
                        <span className="text-sm text-text-body">{stat.label}</span>
                        <div className="text-right">
                          <div className="font-serif text-lg text-text-heading">{stat.value}</div>
                          <div className="text-xs text-accent">{stat.trend}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative z-10 mt-8 pt-8 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-body">System Efficiency</span>
                    <span className="font-serif text-2xl text-accent">99.9%</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading 
                label="The Problem"
                title="Your business is growing, but your time isn't."
              />
              <div className="space-y-6 text-lg text-text-body">
                <p>
                  You started your business for freedom, but right now, you're trapped in the day-to-day. Missed calls after hours mean lost revenue. Your team spends hours on repetitive data entry instead of high-value work.
                </p>
                <div className="glass-panel p-6 mt-8 border-l-2 border-l-accent border-y-0 border-r-0 rounded-l-none bg-gradient-to-r from-accent/5 to-transparent">
                  <p className="mb-4">
                    <strong className="text-text-heading font-serif text-xl block mb-1">The old way:</strong> 
                    Hire more staff, increase overhead, and manage more people.
                  </p>
                  <p>
                    <strong className="text-accent font-serif text-xl block mb-1">The new way:</strong> 
                    Implement intelligent AI systems that work 24/7, never call in sick, and scale infinitely without adding to your payroll.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {[
                { metric: "30%", label: "Average increase in lead capture" },
                { metric: "15+", label: "Hours saved per employee weekly" },
                { metric: "24/7", label: "Availability for your customers" },
                { metric: "0", label: "Missed opportunities after hours" },
              ].map((stat, i) => (
                <Card key={i} className="text-center group hover:bg-white/5">
                  <div className="text-4xl md:text-5xl font-serif text-accent mb-3 group-hover:scale-105 transition-transform duration-500">{stat.metric}</div>
                  <div className="text-sm font-medium text-text-body">{stat.label}</div>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            label="Our Expertise"
            title="Intelligent Automation Solutions" 
            subtitle="We build custom AI systems designed specifically to solve the biggest bottlenecks in your business."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors duration-500" />
                    
                    <div className="h-12 w-12 rounded-xl glass-panel text-accent flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border-accent/20">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-serif text-text-heading mb-4">{service.title}</h3>
                    <p className="text-text-body mb-8 flex-grow leading-relaxed">{service.shortDescription}</p>
                    
                    <div className="mt-auto pt-6 border-t border-white/5">
                      <Button href={`/services/${service.slug}`} variant="ghost" className="px-0 h-auto text-sm tracking-wide uppercase font-bold text-text-body group-hover:text-accent">
                        Explore Solution <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 mix-blend-overlay" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading 
            label="Client Success"
            title="Real Results for Real Businesses" 
            subtitle="Don't just take our word for it. See how we've helped SMBs across the US transform their operations."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col relative overflow-hidden group">
                  {/* Warm gradient band at top */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent/40 via-accent/80 to-accent/40 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex gap-1 mb-8 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-accent text-accent opacity-80" />
                    ))}
                  </div>
                  
                  <blockquote className="text-lg text-text-heading mb-8 flex-grow font-serif italic leading-relaxed">
                    "{study.testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <div className="font-medium text-text-heading text-sm">{study.testimonial.author}</div>
                      <div className="text-xs text-text-body uppercase tracking-wider mt-1">{study.client}</div>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-6 border-t border-white/10 glass-panel bg-white/5 -mx-8 -mb-8 px-8 pb-8 rounded-t-none border-x-0 border-b-0">
                    <div className="text-xs text-text-body uppercase tracking-wider mb-2">Key Result</div>
                    <div className="text-2xl font-serif text-accent">{study.keyMetric}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
