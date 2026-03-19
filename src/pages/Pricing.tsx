import { SectionHeading } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTABanner } from "@/components/ui/CTABanner";
import { pricingTiers, faqs } from "@/data/pricing";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Pricing() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
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
