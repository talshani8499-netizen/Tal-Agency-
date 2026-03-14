import { SectionHeading, Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/ui/CTABanner";
import { caseStudies } from "@/data/caseStudies";
import { motion } from "motion/react";
import { ArrowRight, TrendingUp } from "lucide-react";

export default function CaseStudies() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-accent font-medium text-xs tracking-widest uppercase mb-8">
              Success Stories
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-text-heading mb-8 leading-[1.1] tracking-tight text-balance max-w-4xl mx-auto">
              Real Results, <span className="italic text-accent">Real Freedom.</span>
            </h1>
            <p className="text-xl text-text-body max-w-2xl mx-auto leading-relaxed">
              See how US SMBs are transforming their operations and achieving unprecedented growth with our AI solutions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="h-full flex flex-col overflow-hidden group hover:bg-white/5 transition-all duration-500">
                  <div className={`h-48 ${study.image} p-6 flex flex-col justify-end relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-background/60 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                    <div className="relative z-10">
                      <div className="inline-block px-3 py-1 glass-panel text-accent text-xs font-bold uppercase tracking-widest rounded-full mb-4 border-accent/20">
                        {study.industry}
                      </div>
                      <h3 className="text-2xl font-serif text-text-heading">{study.client}</h3>
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="mb-8">
                      <h4 className="text-xs font-sans font-semibold text-text-muted uppercase tracking-widest mb-3">The Challenge</h4>
                      <p className="text-text-heading font-medium leading-relaxed">{study.challengeSummary}</p>
                    </div>
                    
                    <div className="mb-10 flex-grow">
                      <h4 className="text-xs font-sans font-semibold text-text-muted uppercase tracking-widest mb-3">The Solution</h4>
                      <p className="text-text-body leading-relaxed">{study.solutionSummary}</p>
                    </div>

                    <div className="pt-8 border-t border-white/10 mb-8">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full glass-panel text-accent flex items-center justify-center shrink-0 border-accent/20">
                          <TrendingUp className="h-5 w-5" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-xs text-text-muted font-medium uppercase tracking-widest mb-1">Key Result</p>
                          <p className="text-2xl font-serif text-accent">{study.keyMetric}</p>
                        </div>
                      </div>
                    </div>

                    <Button href={`/case-studies/${study.slug}`} variant="secondary" className="w-full group-hover:bg-accent group-hover:text-background group-hover:border-accent transition-all duration-300" icon>
                      Read Full Story
                    </Button>
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
