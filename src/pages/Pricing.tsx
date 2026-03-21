import { SectionHeading } from "@/components/ui/Card";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { QuoteBuilder } from "@/components/QuoteBuilder";
import { BookingSection } from "@/components/BookingSection";
import { pricingTiers, faqs } from "@/data/pricing";
import { motion } from "motion/react";
import { PricingCard } from "@/components/ui/PricingCard";

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
              Stop Pricing Like It's 2019. <br className="hidden md:block" />
              <span className="italic text-accent">One Missed $13K Job Covers Your Whole Year.</span>
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
              >
                <PricingCard tier={tier} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <QuoteBuilder />

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

      <BookingSection />
    </div>
  );
}
