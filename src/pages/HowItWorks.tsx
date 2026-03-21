import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { CTABand } from "@/components/ui/CTABand";
import { motion } from "motion/react";
import { fadeUp } from "@/components/ui/animations";

const steps = [
  { number: 1, title: "Free AI Audit", description: "We pull your call data, identify your missed-call window, and show you exactly what's slipping through the cracks." },
  { number: 2, title: "Custom Build (5 Days)", description: "We build your AI voice agent, train it on your services and pricing, and integrate it with your calendar and CRM." },
  { number: 3, title: "Go Live & Optimize", description: "Your AI answers every call from day one. We monitor, refine, and optimize weekly based on real conversations." },
];

export default function HowItWorks() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-20 bg-gradient-to-br from-ink-50 to-brand-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="text-center mb-16">
            <span className="badge badge-blue mb-4">How It Works</span>
            <h1 className="text-4xl md:text-5xl font-bold text-ink-950 tracking-tight mb-4">
              From Missed Calls to Booked Jobs in 3 Steps
            </h1>
            <p className="text-lg text-ink-500 max-w-2xl mx-auto">
              No long onboarding. No complex setup. Just a system that starts working in 5 business days.
            </p>
          </motion.div>
          <ProcessSteps steps={steps} orientation="vertical" />
        </div>
      </section>
      <CTABand
        headline="Ready to See What You're Missing?"
        supporting="Get a free audit showing your missed-call revenue gap."
        buttonLabel="Get Your Free Audit"
        buttonHref="/free-ai-audit"
        variant="dark"
      />
    </div>
  );
}
