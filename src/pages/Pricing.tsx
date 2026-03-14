import { SectionHeading } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTABanner } from "@/components/ui/CTABanner";
import { pricingTiers, costDrivers, capabilities, faqs } from "@/data/pricing";
import { motion } from "motion/react";
import { Check, BrainCircuit, Blocks, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  BrainCircuit,
  Blocks,
  Settings
};

export default function Pricing() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-accent font-medium text-xs tracking-widest uppercase mb-8">
              Investment
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-text-heading mb-8 leading-[1.1] tracking-tight text-balance max-w-4xl mx-auto">
              Transparent Pricing for Your <br className="hidden md:block" />
              <span className="italic text-accent">AI-Powered Freedom.</span>
            </h1>
            <p className="text-xl text-text-body max-w-2xl mx-auto leading-relaxed">
              No hidden fees, no confusing jargon. Just clear, value-driven investments designed to save you time, cut costs, and grow your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "relative flex flex-col glass-panel p-10 transition-all duration-500",
                  tier.popular ? "border-accent/40 shadow-[0_0_40px_rgba(212,168,83,0.1)] lg:-mt-4 lg:mb-4 bg-white/5" : ""
                )}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 glass-panel bg-accent/10 border-accent/30 px-4 py-1.5 text-center text-xs font-bold tracking-widest uppercase text-accent whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-2xl font-serif text-text-heading">{tier.name}</h3>
                  <p className="text-sm font-medium text-accent mt-2">{tier.subtitle}</p>
                  <p className="text-sm text-text-body mt-4 h-16 leading-relaxed">{tier.targetAudience}</p>
                </div>

                <div className="mb-8 pb-8 border-b border-white/10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg text-text-body font-serif align-top mt-2">$</span>
                    <span className="text-5xl font-serif text-text-heading">{tier.setupFee.replace('$', '')}</span>
                    <span className="text-text-body text-sm ml-2 uppercase tracking-wider">Setup</span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="text-lg text-text-body font-serif align-top mt-1">+$</span>
                    <span className="text-3xl font-serif text-text-heading">{tier.monthlyFee.replace('$', '')}</span>
                    <span className="text-text-body text-sm ml-2">/mo</span>
                  </div>
                </div>

                <ul className="space-y-5 mb-10 flex-grow">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span className="text-text-body text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  href={tier.ctaLink} 
                  variant={tier.popular ? "primary" : "secondary"} 
                  className="w-full mt-auto"
                >
                  {tier.ctaText}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Drivers */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            label="Variables"
            title="Deconstructing Your Investment" 
            subtitle="What factors influence the final price of your custom AI solution?"
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
            {costDrivers.map((driver, index) => {
              const Icon = iconMap[driver.icon as keyof typeof iconMap];
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-panel p-8 group hover:bg-white/5"
                >
                  <div className="h-12 w-12 glass-panel text-accent flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border-accent/20">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-serif text-text-heading mb-4">{driver.title}</h3>
                  <p className="text-text-body leading-relaxed">{driver.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full Capabilities */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 mix-blend-overlay" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif text-text-heading mb-16">Our Full Capabilities</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {capabilities.map((cap, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="px-6 py-3 glass-panel text-text-heading text-sm hover:border-accent/50 transition-colors cursor-default"
              >
                {cap}
              </motion.div>
            ))}
          </div>
          <p className="mt-16 text-text-body text-lg max-w-2xl mx-auto">
            Need something specific? We build custom solutions tailored to your exact operational bottlenecks.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            label="Clarity"
            title="Frequently Asked Questions" 
            centered
          />
          <div className="mt-16">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
