import { HeroSection } from "@/components/ui/HeroSection";
import { StatBar } from "@/components/ui/StatBar";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { CTABand } from "@/components/ui/CTABand";
import { TradeToggle } from "@/components/ui/TradeToggle";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { PricingCard } from "@/components/ui/PricingCard";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { Phone, Wrench, Flame, Hammer, Shield, Zap, Clock } from "lucide-react";

const mockStats = [
  { value: 500, unit: "+", label: "Calls handled" },
  { value: 27, unit: "%", label: "Calls go to voicemail" },
  { value: 13, unit: "K", label: "Avg job value" },
];

const mockFeatures = [
  { icon: Phone, title: "Every Call Answered", description: "AI picks up in under 2 rings, 24/7.", highlight: true },
  { icon: Shield, title: "Lead Qualified", description: "Each caller scored before your team is notified." },
  { icon: Zap, title: "Instant Follow-Up", description: "Automated text and email within 5 minutes." },
  { icon: Clock, title: "Book Appointments", description: "Direct calendar integration, zero double-bookings." },
];

const mockTrades = [
  { id: "roofing", label: "Roofers", icon: Hammer, content: <p className="text-ink-700 text-center py-8">Roofing content slot</p> },
  { id: "hvac", label: "HVAC", icon: Flame, content: <p className="text-ink-700 text-center py-8">HVAC content slot</p> },
  { id: "remodeling", label: "Remodelers", icon: Wrench, content: <p className="text-ink-700 text-center py-8">Remodeling content slot</p> },
];

const mockComparison = [
  { label: "Missed Calls", before: "3+ per day", after: "Zero" },
  { label: "Follow-up Time", before: "Manual, 24h+", after: "Automated, <5 min" },
  { label: "Review Management", before: "None", after: "Auto-request after job" },
  { label: "Booking Rate", before: "50%", after: "85%" },
  { label: "Weekend Hours", before: "16 hrs", after: "8 hrs" },
];

const mockTier = {
  id: "full-crew",
  name: "Full Crew",
  subtitle: "The Accelerator",
  targetAudience: "For established shops ready to run on autopilot.",
  setupFee: "$2,500",
  monthlyFee: "$600",
  popular: true,
  features: ["AI Voice Agent + Chat Agent", "CRM Integration", "Automated follow-ups", "Landing page (1)"],
  ctaText: "Choose Full Crew",
  ctaLink: "/contact?plan=full-crew",
};

const mockSteps = [
  { number: 1, title: "Free Audit", description: "We pull your call data and identify the revenue gap." },
  { number: 2, title: "Custom Build", description: "We build your AI system in 5 business days." },
  { number: 3, title: "Go Live", description: "Your AI answers every call. You focus on the build." },
];

export default function DesignTest() {
  return (
    <div className="flex flex-col">
      <p className="text-center text-xs font-bold text-red-500 uppercase tracking-widest py-2 bg-red-50">
        Design System Smoke Test — NOT a public page
      </p>

      <HeroSection
        variant="gradient"
        overline="Built for Contractors"
        headline={<>We Handle the Calls.<br /><span className="gradient-text">You Handle the Build.</span></>}
        subheadline="AI-powered call answering, follow-up, and booking — built specifically for roofing, HVAC, and remodeling contractors."
        primaryCTA={{ label: "See How Many Calls You're Missing", href: "/free-ai-audit" }}
        secondaryCTA={{ label: "Watch 90-sec Demo", href: "/ai-voice-demo" }}
        trustStrip={
          <div className="flex flex-wrap gap-6 text-sm font-medium text-ink-500">
            <span>500+ calls handled</span>
            <span>27% of contractor calls go to voicemail</span>
            <span>$13K avg job value</span>
          </div>
        }
      />

      <div className="max-w-6xl mx-auto px-4 py-16 w-full space-y-20">
        <section>
          <h2 className="text-2xl font-bold text-ink-950 mb-6">StatBar (light)</h2>
          <StatBar stats={mockStats} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink-950 mb-6">FeatureGrid (3-col)</h2>
          <FeatureGrid features={mockFeatures} columns={3} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink-950 mb-6">TestimonialCard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TestimonialCard
              quote="Elevate handles 40 calls a day for us. My phone doesn't ring anymore — my calendar just fills up."
              name="Davis Johnson"
              business="Davis Roofing"
              trade="Roofing"
              rating={5}
              variant="compact"
            />
            <TestimonialCard
              quote="We went from missing 30% of calls to zero. Revenue jumped $8K in the first month."
              name="Mike Torres"
              business="AC Pro HVAC"
              trade="HVAC"
              rating={5}
              variant="compact"
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink-950 mb-6">TradeToggle</h2>
          <TradeToggle trades={mockTrades} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink-950 mb-6">ComparisonTable</h2>
          <ComparisonTable rows={mockComparison} leftLabel="Without Elevate" rightLabel="With Elevate" />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink-950 mb-6">PricingCard</h2>
          <div className="max-w-sm mx-auto">
            <PricingCard tier={mockTier} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink-950 mb-6">ProcessSteps (vertical)</h2>
          <ProcessSteps steps={mockSteps} orientation="vertical" />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-ink-950 mb-6">ProcessSteps (horizontal)</h2>
          <ProcessSteps steps={mockSteps} orientation="horizontal" />
        </section>
      </div>

      <CTABand
        headline="Ready to Stop Missing Calls?"
        supporting="Get a free audit showing exactly how many calls you're losing — and what they're worth."
        buttonLabel="Get Your Free Audit"
        buttonHref="/free-ai-audit"
        variant="dark"
      />
    </div>
  );
}
